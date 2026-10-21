-- Favoritos del compendio de biohacking (issue #67, épica #63).
--
-- Cada persona puede guardar fichas del compendio con la estrella. Una fila
-- por persona y ficha: la clave primaria (user_id, supplement) impide guardar
-- la misma dos veces.
--
-- supplement es el id de la ficha en src/content/compendio/suplementos/ (el
-- nombre del fichero sin .json, por ejemplo «jengibre»). La base de datos no
-- conoce la lista de fichas: solo comprueba que tenga forma de id.
--
-- Reglas RLS, las mismas ideas que en las otras tablas:
--   - cada usuario ve, guarda y quita solo sus favoritos;
--   - el rol admin los ve todos (el panel cuenta lo más guardado);
--   - quien no ha entrado no toca nada.
-- No hay nada que editar: un favorito se guarda o se quita.
--
-- Se ejecuta una vez en Supabase (SQL Editor), después de las anteriores.


-- 1. Tabla -------------------------------------------------------------------

create table public.favorites (
  user_id uuid not null references public.profiles (id) on delete cascade,
  supplement text not null check (supplement ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(supplement) <= 64),
  created_at timestamptz not null default now(),
  primary key (user_id, supplement)
);

comment on table public.favorites is 'Fichas del compendio que cada usuario ha guardado con la estrella (#67).';
comment on column public.favorites.supplement is 'Id de la ficha: el nombre del JSON en src/content/compendio/suplementos/.';


-- 2. Tope por persona --------------------------------------------------------
-- Con el registro abierto, nadie debe poder llenar la base de datos a base de
-- favoritos inventados. 100 es mucho más de lo que tendrá el compendio.

create function public.limit_favorites()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if (select count(*) from public.favorites where user_id = new.user_id) >= 100 then
    raise exception 'Has llegado al máximo de 100 favoritos' using errcode = '23514';
  end if;
  return new;
end;
$$;

create trigger limit_favorites
  before insert on public.favorites
  for each row execute function public.limit_favorites();

revoke execute on function public.limit_favorites() from public, anon, authenticated;


-- 3. Permisos ----------------------------------------------------------------
-- Sin update: un favorito no se edita.

revoke all on public.favorites from anon;
grant select, insert, delete on public.favorites to authenticated;
grant all on public.favorites to service_role;


-- 4. Reglas RLS --------------------------------------------------------------

alter table public.favorites enable row level security;

create policy "favorites: cada usuario ve los suyos"
  on public.favorites for select to authenticated
  using (user_id = (select auth.uid()));

create policy "favorites: cada usuario guarda los suyos"
  on public.favorites for insert to authenticated
  with check (user_id = (select auth.uid()));

create policy "favorites: cada usuario quita los suyos"
  on public.favorites for delete to authenticated
  using (user_id = (select auth.uid()));

create policy "favorites: el admin lo puede todo"
  on public.favorites for all to authenticated
  using ((select public.is_admin()))
  with check ((select public.is_admin()));
