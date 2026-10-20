# ADR 0007: El formulario de contacto pasa por un flujo de n8n

- **Estado:** aceptada
- **Fecha:** 19/10/2026
- **Sustituye a:** [ADR 0003](0003-formulario-envio-normal.md)

## Contexto

En la v2 el formulario iba a FormSubmit (ADR 0003): me llegaba un correo y la
persona recibía una respuesta automática. Para la v3 quiero más:

- que al escribirme se cree **su cuenta** y pueda ver la conversación en su
  espacio (#31), y yo en mi panel (#32), sin mirar el correo;
- que el mensaje quede **guardado** en Supabase con una **categoría** puesta
  por IA para ordenar la bandeja;
- respuesta automática **en su idioma** y con el enlace a su espacio.

Crear usuarios necesita la clave secreta de Supabase, que se salta las reglas
RLS (ADR 0006). Esa clave no puede estar en la web: GitHub Pages solo sirve
ficheros y todo lo que hay en el navegador es público.

## Decisión

La web envía el formulario con `fetch` a un **webhook de n8n**
(`mi-web · Contacto`, en n8n Cloud). El flujo:

```
web ──POST──▶ Formulario de la web (webhook)
              Normalizar datos ─ ¿Datos válidos? ──no──▶ 400
              Comprobar captcha (Turnstile) ─ ¿Correcto? ──no──▶ 403
              Crear usuario si no existe (Supabase Auth, clave secreta)
              Buscar perfil (lo crea el trigger de la migración)
              Clasificar con IA (Claude)
              Guardar mensaje ─ Guardar evento
              ¿Spam? ──sí──▶ 200 sin correo
              Redactar respuesta ─ Enviar respuesta (SMTP) ─▶ 200
```

- **Captcha:** Cloudflare Turnstile en modo «solo si duda». La clave de sitio
  va en la web; la secreta, en n8n. Además hay un campo trampa invisible.
- **Validación doble:** el navegador ayuda a rellenar; n8n vuelve a
  comprobarlo todo, porque al webhook se le puede llamar sin la web.
- **Consentimiento** obligatorio, con enlace a `/privacidad/` (RGPD).
- **IA:** Claude pone una de cinco categorías (`proyecto`, `oportunidad`,
  `consulta`, `saludo`, `spam`). El prompt le dice que el mensaje es solo texto
  a clasificar, para que no siga instrucciones escondidas en él. Si falla, el
  mensaje se guarda igual como `sin_clasificar`.
- **Correo:** el nombre y el mensaje se escapan antes de meterlos en el HTML.
  Al spam no se le contesta.
- **Respuestas del webhook:** 200, 400, 403 o 500 con `{ ok, error }`. La web
  explica cada caso y, si algo falla, ofrece LinkedIn.

## Por qué

- **La clave secreta nunca sale de n8n**: ni en la web ni en el repositorio.
- **n8n se ve**: el flujo se lee en el lienzo, con un grupo por etapa, y cada
  ejecución queda registrada para depurar.
- **Los créditos de IA de n8n** bastan para clasificar sin una clave propia.
- **El webhook responde en JSON**, así que la web usa `fetch` y no cambia de
  página (lo que FormSubmit no permitía con respuesta automática).

## Alternativas descartadas

- **Seguir con FormSubmit:** no crea usuarios ni guarda nada.
- **Supabase Edge Function:** también guarda la clave fuera de la web, pero
  sería código en Deno que desplegar y mantener; en n8n cada paso se ve y se
  prueba por separado.
- **Insertar desde la web con la clave pública:** obligaría a dejar que
  cualquiera cree usuarios y escriba mensajes en nombre de otros.

## Consecuencias

- Si n8n no responde, el formulario lo dice y ofrece LinkedIn.
- Antes de abrirlo al público hacen falta: la credencial de Supabase en n8n,
  Turnstile, un SMTP propio (Brevo) y las dos variables públicas en GitHub.
  Los pasos están en [`n8n/README.md`](../../n8n/README.md).
- Cualquiera puede escribir con el email de otra persona. Esa persona recibe
  el correo automático (que lo explica) y puede pedir que la borre; no puede
  entrar nadie más en su espacio, porque el acceso pide el código de su correo.
