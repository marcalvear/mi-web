# Bloque #31 (Mi espacio): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 20 de octubre de 2026.
El contexto está en [2026-10-19-rediseno-v3.md](2026-10-19-rediseno-v3.md)
(sección «Usuarios y panel de administrador»), en la issue #31 y en el
[ADR 0006](../adr/0006-supabase-con-rls.md).

## El encargo

> hola claude, retomamos el proyecto, sigue con #31

La idea de partida, de cuando planteé la web: quien me escribe por el
formulario tiene su propio apartado donde ve su conversación conmigo, como en
el aula del curso.

## Decisiones

- **Página `/mi-espacio/`** (ES/EN), privada y fuera de Google (`noindex`).
  Sin sesión, invita a entrar; con sesión, enseña el hilo y una ficha.
- **El hilo** en orden de fecha, con mis respuestas en rojo y la marca
  «Nuevo» hasta que se leen. Todo con `textContent`: lo que escribe la gente
  nunca se interpreta como HTML.
- **Escribir desde la página**: el mensaje va directo a Supabase. Las reglas
  RLS ya lo permitían solo en el hilo propio y como autor «user».
- **Ficha** con nombre editable, email y fecha de alta, y cerrar sesión.
- **Leído**: RLS no deja a nadie cambiar mensajes, así que una función
  (`mark_replies_read`, migración nueva con 3 pruebas más) marca como leídas
  solo mis respuestas del hilo de quien la llama.
- **Entrar → Mi espacio**: al poner el código o pulsar el enlace del correo,
  se va directo a su espacio. Enlace también en el pie.
- Cada visita y cada mensaje quedan en `events` para el panel (#32).
- Lo probé con un Supabase falso en local para no tocar datos reales.
