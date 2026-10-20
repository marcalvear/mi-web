# Bloque #33 (chatbot «Marc IA»): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 20 de octubre de 2026.
El contexto está en la issue #33 y en el [ADR 0002](../adr/0002-chatbot-con-worker.md).

## El encargo

> Yes, carry on with #33, the Marc IA chatbot.

La issue pedía desplegar el Worker de Cloudflare y darle mi contenido real como
contexto.

## Decisiones

- **Se reaprovecha el Worker de la v2** (`worker/chatbot`): Workers AI sin
  claves, solo acepta mi web, limpia los mensajes y tiene pruebas.
- **Contenido real**: un script lee los textos de la web (`src/i18n`) y genera
  `worker/chatbot/src/context.js`. El asistente sabe lo mismo que la web.
- **Widget nuevo** en Astro con el estilo del cuaderno, en ES/EN, en todas las
  páginas. Manda el idioma de la página; la conversación dura lo que la pestaña.
- **Despliegue**: autoricé Wrangler en mi cuenta de Cloudflare y la IA lo
  desplegó. La URL va en la variable pública `PUBLIC_CHATBOT_URL`.
