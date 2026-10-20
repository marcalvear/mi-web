-- Pruebas de las reglas RLS de supabase/migrations/20261019120000_usuarios_mensajes_eventos.sql
-- y de la función de 20261020090000_leer_respuestas.sql (pruebas 25 a 27).
--
-- Cómo ejecutarlas: Supabase → SQL Editor → pegar este fichero → Run.
-- Todo pasa dentro de una transacción que se deshace al final, así que no
-- deja usuarios ni mensajes de prueba.
--   - Si una prueba falla, el script se para con «FALLA nn: …».
--   - Si todas pasan, la última consulta devuelve «OK».
--
-- Para hacerse pasar por un usuario se hace lo mismo que hace Supabase con
-- cada petición de la web: cambiar al rol authenticated y poner el id del
-- usuario en request.jwt.claims, que es de donde lee auth.uid().
--
-- Personajes:
--   Ana    usuaria normal, con un mensaje, mi respuesta y un evento
--   Bruno  usuario normal, con un mensaje y un evento
--   Marc   admin

begin;

-- 0. Datos de prueba ---------------------------------------------------------
-- Como postgres (el SQL Editor), que se salta RLS.

insert into auth.users (id, email, raw_user_meta_data) values
  ('00000000-0000-4000-8000-00000000a7a0', 'ana@prueba.test', '{"name": "Ana"}'),
  ('00000000-0000-4000-8000-00000000b2b0', 'bruno@prueba.test', '{}'),
  ('00000000-0000-4000-8000-00000000c3c0', 'marc@prueba.test', '{"name": "Marc"}');

do $$
begin
  if (select count(*) from public.profiles where email like '%@prueba.test') <> 3 then
    raise exception 'FALLA 01: el trigger no ha creado los tres perfiles';
  end if;
  if exists (select 1 from public.profiles where email like '%@prueba.test' and role <> 'user') then
    raise exception 'FALLA 01: un perfil nuevo no empieza con el rol user';
  end if;
  if (select name from public.profiles where email = 'ana@prueba.test') is distinct from 'Ana'
    or (select name from public.profiles where email = 'bruno@prueba.test') is not null then
    raise exception 'FALLA 01: el nombre no sale bien de los metadatos';
  end if;
  raise notice 'ok 01 · el trigger crea el perfil con rol user y el nombre de los metadatos';
end $$;

update public.profiles set role = 'admin' where id = '00000000-0000-4000-8000-00000000c3c0';

insert into public.messages (user_id, author, body, category) values
  ('00000000-0000-4000-8000-00000000a7a0', 'user', 'Hola Marc, ¿me ayudas con mi web?', 'proyecto'),
  ('00000000-0000-4000-8000-00000000a7a0', 'admin', 'Claro, Ana. Cuéntame más.', null),
  ('00000000-0000-4000-8000-00000000b2b0', 'user', 'Hola, soy Bruno.', 'saludo');

insert into public.events (user_id, type, data) values
  ('00000000-0000-4000-8000-00000000a7a0', 'formulario', '{"idioma": "es"}'),
  ('00000000-0000-4000-8000-00000000b2b0', 'formulario', '{"idioma": "en"}');


-- 1. Ana, usuaria normal -----------------------------------------------------

set local role authenticated;
select set_config('request.jwt.claims', '{"sub": "00000000-0000-4000-8000-00000000a7a0", "role": "authenticated"}', true);

do $$
begin
  if (select count(*) from public.profiles) <> 1
    or (select id from public.profiles) <> '00000000-0000-4000-8000-00000000a7a0' then
    raise exception 'FALLA 02: Ana ve perfiles que no son el suyo';
  end if;
  raise notice 'ok 02 · Ana solo ve su perfil';
end $$;

do $$
begin
  if (select count(*) from public.messages) <> 2
    or exists (select 1 from public.messages where user_id <> '00000000-0000-4000-8000-00000000a7a0') then
    raise exception 'FALLA 03: Ana ve mensajes de otro hilo';
  end if;
  raise notice 'ok 03 · Ana solo ve su hilo (su mensaje y mi respuesta)';
end $$;

do $$
begin
  if (select count(*) from public.events) <> 1 then
    raise exception 'FALLA 04: Ana ve eventos de otros';
  end if;
  raise notice 'ok 04 · Ana solo ve su actividad';
end $$;

do $$
begin
  insert into public.messages (user_id, author, body)
  values ('00000000-0000-4000-8000-00000000a7a0', 'user', 'Te escribo desde Mi espacio.');
  raise notice 'ok 05 · Ana puede escribir en su hilo';
end $$;

do $$
begin
  insert into public.messages (user_id, author, body)
  values ('00000000-0000-4000-8000-00000000a7a0', 'admin', 'Soy Marc, de verdad.');
  raise exception 'FALLA 06: Ana ha escrito un mensaje como admin';
exception when insufficient_privilege then
  raise notice 'ok 06 · Ana no puede hacerse pasar por mí';
end $$;

do $$
begin
  insert into public.messages (user_id, author, body)
  values ('00000000-0000-4000-8000-00000000b2b0', 'user', 'Me cuelo en el hilo de Bruno.');
  raise exception 'FALLA 07: Ana ha escrito en el hilo de Bruno';
exception when insufficient_privilege then
  raise notice 'ok 07 · Ana no puede escribir en el hilo de otro';
end $$;

do $$
begin
  insert into public.messages (user_id, author, body, category, read_at)
  values ('00000000-0000-4000-8000-00000000a7a0', 'user', 'Urgente', 'urgente', now());
  raise exception 'FALLA 08: Ana ha puesto categoría o read_at a su mensaje';
exception when insufficient_privilege then
  raise notice 'ok 08 · Ana no puede ponerse categoría ni marcar como leído';
end $$;

do $$
begin
  insert into public.events (user_id, type)
  values ('00000000-0000-4000-8000-00000000a7a0', 'abre_mi_espacio');
  raise notice 'ok 09 · Ana puede registrar su actividad';
end $$;

do $$
begin
  insert into public.events (user_id, type)
  values ('00000000-0000-4000-8000-00000000b2b0', 'evento_falso');
  raise exception 'FALLA 10: Ana ha registrado un evento a nombre de Bruno';
exception when insufficient_privilege then
  raise notice 'ok 10 · Ana no puede registrar actividad de otro';
end $$;

do $$
declare n int;
begin
  update public.profiles set name = 'Ana García' where id = '00000000-0000-4000-8000-00000000a7a0';
  get diagnostics n = row_count;
  if n <> 1 then raise exception 'FALLA 11: Ana no puede cambiar su nombre'; end if;
  raise notice 'ok 11 · Ana puede cambiar su nombre';
end $$;

do $$
begin
  update public.profiles set role = 'admin' where id = '00000000-0000-4000-8000-00000000a7a0';
  raise exception 'FALLA 12: Ana se ha hecho admin';
exception when insufficient_privilege then
  raise notice 'ok 12 · Ana no puede cambiar su rol';
end $$;

do $$
begin
  update public.profiles set email = 'otra@prueba.test' where id = '00000000-0000-4000-8000-00000000a7a0';
  raise exception 'FALLA 13: Ana ha cambiado su email en el perfil';
exception when insufficient_privilege then
  raise notice 'ok 13 · Ana no puede cambiar su email en el perfil';
end $$;

do $$
declare n int;
begin
  update public.profiles set name = 'Hackeado' where id = '00000000-0000-4000-8000-00000000b2b0';
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FALLA 14: Ana ha cambiado el perfil de Bruno'; end if;
  raise notice 'ok 14 · Ana no puede tocar el perfil de otro';
end $$;

do $$
declare n int;
begin
  update public.messages set body = 'Editado', read_at = now();
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FALLA 15: Ana ha editado mensajes'; end if;
  delete from public.messages;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FALLA 15: Ana ha borrado mensajes'; end if;
  delete from public.events;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FALLA 15: Ana ha borrado eventos'; end if;
  raise notice 'ok 15 · Ana no puede editar ni borrar mensajes ni eventos';
end $$;

do $$
begin
  if public.is_admin() then raise exception 'FALLA 16: is_admin() dice que Ana es admin'; end if;
  raise notice 'ok 16 · is_admin() es falso para Ana';
end $$;


-- 2. Bruno, otro usuario -----------------------------------------------------

select set_config('request.jwt.claims', '{"sub": "00000000-0000-4000-8000-00000000b2b0", "role": "authenticated"}', true);

do $$
begin
  if (select count(*) from public.messages) <> 1
    or (select body from public.messages) <> 'Hola, soy Bruno.' then
    raise exception 'FALLA 17: Bruno ve mensajes de Ana';
  end if;
  if (select count(*) from public.profiles) <> 1 then
    raise exception 'FALLA 17: Bruno ve el perfil de Ana';
  end if;
  raise notice 'ok 17 · Bruno no ve nada de Ana';
end $$;


-- 3. Marc, admin -------------------------------------------------------------

select set_config('request.jwt.claims', '{"sub": "00000000-0000-4000-8000-00000000c3c0", "role": "authenticated"}', true);

do $$
begin
  if (select count(*) from public.profiles where email like '%@prueba.test') <> 3 then
    raise exception 'FALLA 18: el admin no ve todos los perfiles';
  end if;
  -- 3 del principio + el que escribió Ana en la prueba 05
  if (select count(*) from public.messages
      where user_id in (select id from public.profiles where email like '%@prueba.test')) <> 4 then
    raise exception 'FALLA 18: el admin no ve todos los mensajes';
  end if;
  -- 2 del principio + el de Ana en la prueba 09
  if (select count(*) from public.events
      where user_id in (select id from public.profiles where email like '%@prueba.test')) <> 3 then
    raise exception 'FALLA 18: el admin no ve todos los eventos';
  end if;
  raise notice 'ok 18 · el admin ve todos los perfiles, mensajes y eventos';
end $$;

do $$
begin
  insert into public.messages (user_id, author, body)
  values ('00000000-0000-4000-8000-00000000b2b0', 'admin', 'Hola, Bruno. ¿En qué te ayudo?');
  raise notice 'ok 19 · el admin puede responder en cualquier hilo';
end $$;

do $$
declare n int;
begin
  update public.messages set read_at = now(), category = 'proyecto'
  where user_id = '00000000-0000-4000-8000-00000000b2b0' and author = 'user';
  get diagnostics n = row_count;
  if n <> 1 then raise exception 'FALLA 20: el admin no puede marcar como leído'; end if;
  raise notice 'ok 20 · el admin puede marcar como leído y clasificar';
end $$;

do $$
begin
  update public.profiles set role = 'admin' where id = '00000000-0000-4000-8000-00000000b2b0';
  update public.profiles set role = 'user' where id = '00000000-0000-4000-8000-00000000b2b0';
  raise notice 'ok 21 · el admin puede cambiar roles';
end $$;

do $$
begin
  if (select name from public.profiles where id = '00000000-0000-4000-8000-00000000b2b0') is not null then
    raise exception 'FALLA 22: el perfil de Bruno cambió en la prueba 14';
  end if;
  if (select name from public.profiles where id = '00000000-0000-4000-8000-00000000a7a0') <> 'Ana García' then
    raise exception 'FALLA 22: el nombre de Ana no se guardó en la prueba 11';
  end if;
  raise notice 'ok 22 · los cambios de Ana se guardaron solo en su perfil';
end $$;


-- 4. Alguien sin sesión (anon) -----------------------------------------------

reset role;
set local role anon;
select set_config('request.jwt.claims', '{"role": "anon"}', true);

do $$
begin
  perform count(*) from public.profiles;
  raise exception 'FALLA 23: alguien sin sesión puede leer perfiles';
exception when insufficient_privilege then
  raise notice 'ok 23 · sin sesión no se puede leer nada';
end $$;

do $$
begin
  insert into public.messages (user_id, author, body)
  values ('00000000-0000-4000-8000-00000000a7a0', 'user', 'Anónimo');
  raise exception 'FALLA 24: alguien sin sesión puede escribir mensajes';
exception when insufficient_privilege then
  raise notice 'ok 24 · sin sesión no se puede escribir nada';
end $$;

do $$
begin
  perform public.mark_replies_read();
  raise exception 'FALLA 25: alguien sin sesión puede marcar respuestas como leídas';
exception when insufficient_privilege then
  raise notice 'ok 25 · sin sesión no se puede marcar nada como leído';
end $$;


-- 5. Marcar como leídas mis respuestas (Mi espacio) ---------------------------

reset role;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub": "00000000-0000-4000-8000-00000000a7a0", "role": "authenticated"}', true);

do $$
declare n int;
begin
  n := public.mark_replies_read();
  if n <> 1 then raise exception 'FALLA 26: Ana tenía 1 respuesta sin leer y se han marcado %', n; end if;
  if public.mark_replies_read() <> 0 then
    raise exception 'FALLA 26: la segunda vez no tenía que marcar nada';
  end if;
  raise notice 'ok 26 · Ana marca como leída mi respuesta, y solo una vez';
end $$;

reset role;

do $$
begin
  if exists (select 1 from public.messages
             where user_id = '00000000-0000-4000-8000-00000000b2b0' and author = 'admin' and read_at is not null) then
    raise exception 'FALLA 27: Ana ha marcado como leída mi respuesta a Bruno';
  end if;
  if exists (select 1 from public.messages
             where user_id = '00000000-0000-4000-8000-00000000a7a0' and author = 'user' and read_at is not null) then
    raise exception 'FALLA 27: se han marcado mensajes de Ana, no solo mis respuestas';
  end if;
  raise notice 'ok 27 · solo se marcan mis respuestas, y solo en su hilo';
end $$;


-- Fin: se deshace todo y, si se ha llegado hasta aquí, todo ha pasado --------

reset role;
rollback;

select 'OK: las 27 pruebas de RLS pasan' as resultado;
