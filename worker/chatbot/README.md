# Asistente con IA (Cloudflare Worker)

## Recorrido del dato

```
Visitante → <chat-bot> (GitHub Pages) → POST JSON → Worker (Cloudflare) → Workers AI (Mistral Small 3.1)
                                       ← { reply } ←                     ←
```

1. El widget `assets/js/components/chat-bot.js` envía la conversación (`{ messages }`).
2. El Worker comprueba el origen (solo mi web y localhost), limpia los mensajes
   (solo `user`/`assistant`, 800 caracteres, últimos 10 turnos) y añade
   `src/prompt.js` como mensaje de sistema.
3. Llama al modelo con `env.AI.run()`. El binding de Workers AI no necesita
   claves, así que no hay ningún secreto ni en la web ni en el repositorio.
4. Devuelve `{ reply }` o un error explicado.

## Coste

Plan gratuito de Workers AI: 10.000 neurons al día. Cada respuesta gasta
unos 45 (≈1.000 tokens de entrada y 250 de salida), así que da para unas
200 respuestas diarias. Si se agotan, el Worker responde 503 y el widget
recomienda el formulario de contacto.

## Desplegarlo

Necesitas una cuenta gratuita de Cloudflare.

```bash
cd worker/chatbot
npx wrangler login
npx wrangler deploy
```

`wrangler deploy` imprime la URL (`https://marc-chatbot.<tu-subdominio>.workers.dev`).
Pégala en `assets/js/config.js` (`CHATBOT_URL`) y el botón «Pregúntame»
aparecerá en todas las páginas.

## Pruebas

```bash
cd worker/chatbot
npm test
```

Las pruebas sustituyen el modelo por uno falso y comprueban CORS, el rechazo
de otros orígenes, la limpieza de mensajes y los errores.
