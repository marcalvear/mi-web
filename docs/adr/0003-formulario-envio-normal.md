# ADR 0003: Formulario con envío normal para tener respuesta automática

- **Estado:** aceptada
- **Fecha:** 13/10/2026

## Contexto

El formulario de contacto tiene que llegar de verdad a mi correo sin servidor
propio. Quiero además que quien escribe reciba una respuesta automática, para
que sepa que el mensaje ha llegado.

Lo habitual en una web moderna es enviar con `fetch` y mostrar el mensaje de
éxito sin cambiar de página. Pero **FormSubmit**, el servicio elegido (gratis
y sin registro), solo manda la respuesta automática (`_autoresponse`) si:

- el formulario se envía de forma normal (no con AJAX/`fetch`), y
- el captcha está activado.

## Decisión

Envío **normal** (`<form method="POST" action="https://formsubmit.co/…">`),
validado antes en el navegador con `contacto.js`, y página propia
`gracias.html` como destino (`_next`).

## Recorrido del dato

1. La persona rellena nombre, email, tema (opcional) y mensaje.
2. `contacto.js` valida y, si hay errores, los explica debajo de cada campo y
   lleva el foco al primero. Si está bien, **no** cancela el envío.
3. El navegador hace el POST a FormSubmit, que muestra su captcha.
4. FormSubmit me reenvía el mensaje (plantilla de tabla) y manda al
   remitente una copia con mi respuesta automática.
5. Redirige a `gracias.html` («Mensaje enviado»).

## Consecuencias

- Hay un salto de página y un captcha de un tercero. A cambio, la persona
  recibe confirmación en su correo.
- `_next` se calcula en JavaScript desde la página actual, para que funcione
  igual en local y en GitHub Pages.
- El `action` usa el alias aleatorio que da FormSubmit al activar el
  formulario, no mi email, para que los bots que rastrean webs no lo encuentren.
- Anti-spam: campo trampa `_honey` (invisible para las personas) además del
  captcha.
