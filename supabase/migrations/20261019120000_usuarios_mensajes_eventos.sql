-- Usuarios, mensajes y actividad de la web (issue #29, ADR 0006).
--
-- Tres tablas en el esquema public:
--   profiles  una fila por cada usuario de Supabase Auth, con su rol
--   messages  la conversación de cada usuario conmigo
--   events    lo que hace cada usuario en la web (para el panel, #32)
--
-- Quién puede hacer qué lo deciden las reglas RLS del final, no la web:
--   - cada usuario solo ve sus filas;
--   - el rol admin ve y escribe todo;
--   - un usuario puede añadir sus mensajes y eventos, pero no cambiar su rol.
-- n8n usa la clave service_role, que se salta RLS: esa clave nunca va en la web.
--
-- Se ejecuta una vez en Supabase (SQL Editor) o con `supabase db push`.


-- 1. Tablas ------------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  name text check (char_length(name) <= 120),
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

comment on table public.profiles is 'Un perfil por usuario de Auth. Lo crea el trigger on_auth_user_created.';
comment on column public.profiles.role is 'user o admin. Solo un admin (o la service_role) puede cambiarlo.';

create table public.messages (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  author text not null check (author in ('user', 'admin')),
  body text not null check (char_length(body) between 1 and 5000),
  category text check (char_length(category) <= 40),
  read_at timestamptz,
  created_at timestamptz not null default now()
);

comment on table public.messages is 'Hilo de cada usuario conmigo: lo que escribe (author user) y lo que respondo (author admin).';
comment on column public.messages.category is 'La pone n8n al clasificar el mensaje con IA (#30).';
comment on column public.messages.read_at is 'Cuándo lo leyó el destinatario. Null = sin leer.';

-- El hilo de un usuario siempre se pide por usuario y en orden
create index messages_user_id_created_at_idx on public.messages (user_id, created_at);

create table public.events (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  type text not null check (char_length(type) between 1 and 64),
  -- Límite de tamaño para que nadie llene la base de datos con un solo evento
  data jsonb not null default '{}' check (pg_column_size(data) <= 4096),
  created_at timestamptz not null default now()
);

comment on table public.events is 'Actividad de cada usuario (entrar, abrir su espacio…) para el panel de administrador.';

create index events_user_id_created_at_idx on public.events (user_id, created_at);


-- 2. Perfil automático al crear un usuario de Auth ---------------------------
-- Cuando n8n (o yo desde el panel de Supabase) crea un usuario en auth.users,
-- este trigger le crea su fila en profiles con el rol user. El nombre sale de
-- los metadatos que manda n8n: { "name": "…" }.

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, nullif(trim(new.raw_user_meta_data ->> 'name'), ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Si el usuario cambia de email en Auth, el perfil se mantiene al día
create function public.handle_user_email_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.profiles set email = new.email where id = new.id;
  return new;
end;
$$;

create trigger on_auth_user_email_changed
  after update of email on auth.users
  for each row
  when (old.email is distinct from new.email)
  execute function public.handle_user_email_change();

-- Son funciones de trigger: nadie tiene que poder llamarlas por la API
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.handle_user_email_change() from public, anon, authenticated;


-- 3. ¿Es admin quien hace la consulta? ---------------------------------------
-- security definer: lee profiles saltándose RLS. Si las reglas de profiles
-- consultaran profiles directamente, se llamarían a sí mismas sin fin.

create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated, service_role;


-- 4. Nadie cambia su propio rol ----------------------------------------------
-- RLS decide qué filas se pueden tocar, no qué columnas. Este trigger impide
-- que un usuario normal cambie en su perfil algo que no sea el nombre: ni el
-- rol, ni el email, ni el id. Un admin, n8n (service_role) y el SQL Editor
-- (postgres) sí pueden.

create function public.protect_profile()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if current_user in ('anon', 'authenticated') and not public.is_admin() then
    if new.role is distinct from old.role then
      raise exception 'No puedes cambiar tu rol' using errcode = '42501';
    end if;
    if new.id is distinct from old.id
      or new.email is distinct from old.email
      or new.created_at is distinct from old.created_at then
      raise exception 'Solo puedes cambiar tu nombre' using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

create trigger protect_profile
  before update on public.profiles
  for each row execute function public.protect_profile();


-- 5. Permisos ----------------------------------------------------------------
-- anon (quien no ha entrado) no toca ninguna tabla. authenticated pasa por
-- RLS. service_role (n8n) se salta RLS.

revoke all on public.profiles, public.messages, public.events from anon;
grant select, insert, update, delete on public.profiles, public.messages, public.events to authenticated;
grant all on public.profiles, public.messages, public.events to service_role;


-- 6. Reglas RLS --------------------------------------------------------------
-- Con RLS activado, una fila solo se ve o se toca si alguna regla lo permite.
-- (select auth.uid()) entre paréntesis: Postgres lo calcula una vez por
-- consulta y no una vez por fila.

alter table public.profiles enable row level security;
alter table public.messages enable row level security;
alter table public.events enable row level security;

-- profiles
create policy "profiles: cada usuario ve su perfil"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

create policy "profiles: cada usuario edita su perfil"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

create policy "profiles: el admin lo puede todo"
  on public.profiles for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- messages
create policy "messages: cada usuario ve su hilo"
  on public.messages for select to authenticated
  using (user_id = (select auth.uid()));

-- Un usuario solo escribe en su hilo y como autor «user»: no puede hacerse
-- pasar por mí, ni marcar como leído, ni ponerse categoría.
create policy "messages: cada usuario escribe en su hilo"
  on public.messages for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and author = 'user'
    and read_at is null
    and category is null
  );

create policy "messages: el admin lo puede todo"
  on public.messages for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));

-- events
create policy "events: cada usuario ve su actividad"
  on public.events for select to authenticated
  using (user_id = (select auth.uid()));

create policy "events: cada usuario registra su actividad"
  on public.events for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "events: el admin lo puede todo"
  on public.events for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
