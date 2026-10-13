# ADR 0002: El chatbot pasa por un Cloudflare Worker

- **Estado:** aceptada
- **Fecha:** 13/10/2026

## Contexto

Quiero un asistente con IA real que responda preguntas sobre mí. Para usar un
modelo de lenguaje hace falta una clave de API, y GitHub Pages solo sirve
ficheros estáticos: **todo lo que hay en la web lo puede leer cualquiera**,
claves incluidas. Una clave en el JavaScript se podría copiar y gastar a mi
costa.

Opciones:

1. Clave en el frontend. Descartada por lo anterior.
2. Chatbot guiado sin IA (respuestas fijas). Funciona, pero no es lo que quiero.
3. Un **intermediario** en otro servicio que guarde la clave y llame al modelo.

## Decisión

Un **Cloudflare Worker** (`worker/chatbot`) hace de intermediario y usa
**Workers AI** con el binding `env.AI`. Ese binding ni siquiera necesita
clave: el permiso va ligado a mi cuenta de Cloudflare, no a un secreto.

```
Web (GitHub Pages) ──POST { messages }──► Worker ──env.AI.run()──► Mistral Small 3.1
                   ◄────── { reply } ─────
```

## Por qué

- **Ningún secreto** en la web ni en el repositorio.
- **Gratis**: 10.000 neurons al día, unas 200 respuestas.
- **Control**: el Worker solo acepta peticiones de mi web, recorta los
  mensajes (800 caracteres, últimos 10 turnos), descarta roles que no sean
  `user` o `assistant` (para que nadie cuele un mensaje de sistema) y añade
  siempre mis instrucciones.
- **Se puede probar sin desplegar**: `npm test` sustituye el modelo por uno
  falso (6 pruebas).

## Consecuencias

- Hay un servicio más que desplegar (`npx wrangler deploy`) y mantener.
- El modelo puede equivocarse. Mitigación: el prompt solo contiene datos que
  están en la web, le pide no inventar y mandar al formulario si no sabe; el
  widget avisa de que responde una IA.
- Si se agota el cupo diario, el Worker responde 503 y el widget lo explica.
- El botón «Pregúntame» solo aparece cuando `CHATBOT_URL` está configurada,
  para no enseñar un chat roto.
