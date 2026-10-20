# Bloque #32 (panel de administrador): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 20 de octubre de 2026.
El contexto está en [2026-10-19-rediseno-v3.md](2026-10-19-rediseno-v3.md)
(sección «Usuarios y panel de administrador»), en la issue #32 y en los ADR
[0006](../adr/0006-supabase-con-rls.md) y [0007](../adr/0007-contacto-con-n8n.md).

## El encargo

> hecho, adelante

(después de fusionar Mi espacio). La idea de partida, de cuando planteé la web:

> Al iniciar sesión en mi propia web con mi propio usuario, me aparecerá, como
> en un dashboard o en un panel, todos los usuarios registrados. […] También es
> para ver quién me ha escrito, es decir, para no tener que estar mirando por
> email quién me ha escrito y quién no.

## Decisiones

- **`/panel/`** (ES/EN), `noindex`. Lo que protege los datos son las reglas
  RLS: solo el rol admin puede leerlo todo. A cualquier otro le dice que la
  página no es para él y le manda a su espacio.
- **Resumen arriba**: usuarios, mensajes, sin leer y sin responder.
- **Bandeja**: una conversación por persona, la más reciente arriba, con
  filtros (todas, sin leer, sin responder), la categoría de la IA y si ya
  está respondida. Al abrirla, sus mensajes quedan leídos.
- **Responder** desde el panel: se guarda en Supabase y un **segundo flujo de
  n8n** («mi-web · Aviso de respuesta») le avisa por correo. Para que nadie
  más pueda usarlo, n8n llama a `is_admin()` con el token de mi sesión.
  En cada respuesta mía se ve si la persona ya la ha leído.
- **Usuarios**: tabla con alta, mensajes y última actividad; al pulsar un
  nombre, su actividad (formulario, entradas, visitas a su espacio, mensajes).
- **Entrar**: si soy admin, me lleva al panel; si no, a Mi espacio.
- Probado con un Supabase falso en local y el flujo de n8n con datos
  simulados y, publicado, con un token falso (403).
