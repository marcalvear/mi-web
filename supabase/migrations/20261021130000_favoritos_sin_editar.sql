-- Favoritos: quitar el permiso de editar (issue #67).
--
-- En Supabase, cada tabla nueva de public nace con todos los permisos para
-- anon y authenticated. La migración de favoritos quitaba los de anon y
-- añadía select, insert y delete a authenticated, pero no le quitaba los que
-- ya traía, como update. Las reglas RLS ya impedían cambiar ninguna fila (el
-- update de un usuario afectaba a 0), pero la idea es que un favorito no se
-- pueda ni intentar editar: se guarda o se quita. Lo comprueba la prueba 34.
--
-- Se ejecuta una vez en Supabase (SQL Editor), después de 20261021120000_favoritos.sql.

revoke all on public.favorites from authenticated;
grant select, insert, delete on public.favorites to authenticated;
