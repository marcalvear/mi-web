# Bloque #30 (contacto con n8n): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 19 de octubre de 2026.
Aquí guardo mis órdenes y las decisiones que salieron de ellas. El contexto
está en [2026-10-19-rediseno-v3.md](2026-10-19-rediseno-v3.md) (sección
«Usuarios y panel de administrador»), en la issue #30 y en el
[ADR 0007](../adr/0007-contacto-con-n8n.md).

## El encargo

> Vamos a continuar con el #30.

Lo que ya estaba decidido: el formulario va a n8n, que comprueba el captcha
(Turnstile), crea el usuario en Supabase si no existe, guarda el mensaje, lo
clasifica con IA y responde con el enlace a su espacio. La clave secreta de
Supabase solo vive en n8n. Casilla de consentimiento y página de privacidad.

## De paso: las frases de anime

> he estado revisando la web y he visto que las frases de anime están en
> inglés. Me gustaría que, por lo menos en la versión en español de la web, las
> traduzcas […]. En la versión en inglés de la web, sí que obviamente déjalas
> en inglés.

Fue un bloque aparte (issue #43, PR #44): las 200 frases traducidas y un mazo
por idioma.

## Decisiones

- **n8n Cloud**, que ya tenía conectado. El flujo se creó desde la IA con el
  Workflow SDK de n8n y se guarda en `n8n/contacto.workflow.ts`.
- **Claude con los créditos gratis de n8n** para la categoría: no hace falta
  una clave de IA propia.
- **Cinco categorías**: proyecto, oportunidad, consulta, saludo y spam. Al
  spam se le guarda el mensaje pero no se le contesta.
- **Turnstile en modo «solo si duda»** y un campo trampa invisible.
- **Brevo** como SMTP, el mismo para n8n y para los códigos de Supabase.
- Las credenciales las creo yo en n8n: la IA nunca ve las claves secretas.
