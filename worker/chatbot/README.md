# Asistente con IA (Cloudflare Worker)

## Recorrido del dato

```
Visitante → «Marc IA» (GitHub Pages) → POST { lang, messages } → Worker (Cloudflare) → Workers AI (Mistral Small 3.1)
                                      ← { reply }               ←                     ←
```

1. El widget `src/components/chat/MarcIA.astro` envía la conversación y el
   idioma de la página. Solo aparece si `PUBLIC_CHATBOT_URL` está configurada.
2. El Worker comprueba el origen (mi web y `localhost:4321`/`4322`), limpia los
   mensajes (solo `user`/`assistant`, 800 caracteres, últimos 10 turnos) y añade
   las instrucciones de `src/prompt.js` como mensaje de sistema.
3. Llama al modelo con `env.AI.run()`. El binding de Workers AI no necesita
   claves: no hay ningún secreto ni en la web ni en el repositorio.
4. Devuelve `{ reply }` o un error que el widget explica.

## Lo que sabe de mí

`src/context.js` **se genera** con `npm run chatbot:contexto` (desde la raíz)
a partir de los mismos textos que pinta la web (`src/i18n/home.ts`,
`projects.ts` y `likes.ts`). Si cambio un texto de la web, vuelvo a ejecutar
el script y a desplegar: el asistente nunca sabe algo que la web no diga.

## Coste

Plan gratuito de Workers AI: 10.000 neurons al día. Cada respuesta gasta
unas 60 (≈1.800 tokens de entrada, con el contexto, y 250 de salida), así que
da para unas 150 respuestas diarias. Si se agotan, el Worker responde 503 y
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

Sustituyen el modelo por uno falso (8 pruebas): respuesta normal, formato
chat.completion, origen no permitido, preflight, error 503, limpieza de
mensajes, contenido real e idioma en las instrucciones, y los puertos de Astro.
