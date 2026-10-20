-- Marcar como leídas mis respuestas (issue #31, Mi espacio).
--
-- Las reglas RLS no dejan que un usuario cambie mensajes, ni siquiera los de
-- su hilo: así nadie puede tocar el texto de mis respuestas. Para que Mi
-- espacio pueda decir «ya lo he leído» hay esta función, que hace una sola
-- cosa: poner read_at = now() en MIS respuestas (author admin) del hilo de
-- quien la llama que aún no estaban leídas. Devuelve cuántas ha marcado.
--
-- security definer: se ejecuta con permisos del dueño y se salta RLS, pero el
-- where la limita al hilo de auth.uid(). Quien no ha entrado no puede usarla.
--
-- Se ejecuta una vez en Supabase (SQL Editor), después de la migración anterior.

create function public.mark_replies_read()
returns integer
language sql
security definer
set search_path = ''
as $$
  with marked as (
    update public.messages
    set read_at = now()
    where user_id = (select auth.uid())
      and author = 'admin'
      and read_at is null
    returning 1
  )
  select count(*)::integer from marked;
$$;

comment on function public.mark_replies_read() is 'Marca como leídas las respuestas del admin en el hilo de quien la llama (Mi espacio, #31).';

revoke execute on function public.mark_replies_read() from public, anon;
grant execute on function public.mark_replies_read() to authenticated;
