# Asistente con IA (Cloudflare Worker)

## Recorrido del dato

```
Visitante → «Marc IA» (GitHub Pages) → POST { lang, mode, messages } → Worker (Cloudflare) → Workers AI (Mistral Small 3.1)
                                      ← { reply }                     ←                     ←
```

1. El widget `src/components/chat/MarcIA.astro` envía la conversación y el
   idioma de la página. Solo aparece si `PUBLIC_CHATBOT_URL` está configurada.
2. El Worker comprueba el origen (mi web y `localhost:4321`/`4322`), limpia los
   mensajes (solo `user`/`assistant`, 800 caracteres, últimos 10 turnos) y añade
   las instrucciones de `src/prompt.js` como mensaje de sistema. Hay dos modos
   ([ADR 0008](../../docs/adr/0008-marc-ia-boticario.md)):
   - **`general`**, en toda la web;
   - **`boticario`**, en el compendio: otras instrucciones, con el compendio
     entero en el idioma de la página. Un modo desconocido se queda en el
     general.
3. Llama al modelo con `env.AI.run()`. El binding de Workers AI no necesita
   claves: no hay ningún secreto ni en la web ni en el repositorio.
4. Devuelve `{ reply }`, sin las negritas de Markdown, o un error que el
   widget explica.

El modelo está en `src/model.js`, no en `index.js`: el runtime de Cloudflare
toma cada export de `index.js` como punto de entrada y no admite un texto.

## Lo que sabe de mí

`src/context.js` **se genera** con `npm run chatbot:contexto` (desde la raíz)
a partir de los mismos textos que pinta la web (`src/i18n/home.ts`,
`projects.ts`, `likes.ts` y `compendio.ts`) y del contenido del compendio
(`src/content/compendio/`, en los dos idiomas). Si cambio un texto o añado un
problema o una ficha, vuelvo a ejecutar el script y a desplegar: el asistente
nunca sabe algo que la web no diga.

## Coste

Plan gratuito de Workers AI: 10.000 neurons al día. Cada respuesta general
gasta unas 60 (≈1.800 tokens de entrada, con el contexto, y 250 de salida);
las del boticario, más o menos el doble (≈3.000 tokens de entrada, con el
compendio, y hasta 450 de salida). Da para entre 80 y 150 respuestas diarias,
según la mezcla. Si se agotan, el Worker responde 503 y
el widget recomienda el formulario de contacto.

## Desplegarlo

Cuenta gratuita de Cloudflare (la misma de Turnstile).

```bash
cd worker/chatbot
npx wrangler@4 login     # una vez: autoriza Wrangler en el navegador
npx wrangler@4 deploy
```

Está desplegado en `https://marc-chatbot.marc-chatbot.workers.dev`. Esa URL
va en la variable pública `PUBLIC_CHATBOT_URL` (GitHub y `.env`).

## Pruebas

```bash
npm run chatbot:test
```

Sustituyen el modelo por uno falso (13 pruebas): respuesta normal, formato
chat.completion, origen no permitido, preflight, error 503, limpieza de
mensajes, contenido real e idioma en las instrucciones, los puertos de Astro,
el modo boticario con el compendio en su idioma, el modo general por defecto
(también con modos raros como `__proto__`), que el general sabe que existe el
compendio y que se quitan las negritas.

Para probarlo con el modelo de verdad sin desplegar:
`npx wrangler@4 dev --port 8787` en `worker/chatbot` (el binding de IA siempre
usa la cuenta de Cloudflare, también en local).
