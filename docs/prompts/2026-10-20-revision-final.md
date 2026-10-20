# Revisión final después de publicar la v3: órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 20 de octubre de 2026, justo
después de publicar la v3 (#51) y cerrar #21 y #35.

## El encargo

> Revisa que todo lo que hemos hecho en GitHub hasta ahora esté correcto y esté
> bien hecho, es decir, acorde a la página, acorde a la rúbrica y al apartado de
> documentación. En general, que las cosas estén bien hechas y que no haya
> errores o imperfecciones por ahí sueltas.

Y sobre la música de fondo (#8):

> no voy a poner música en mi sitio web, por lo menos no en el sitio web
> principal. Esa idea era para la versión 2 de la web, pero al final no la voy a
> incluir

## Qué se revisó

- La web publicada contra la [rúbrica](img/rubrica-1.webp) y la
  [pauta](img/pauta-estructura.webp): las 14 páginas, sus metadatos y los
  enlaces de los correos.
- La documentación: README, ADR, diseño, Lighthouse, guías de `supabase/`,
  `n8n/`, `worker/chatbot/` y `docs/video/`, con todos sus enlaces internos.
- GitHub: issues, PR, etiquetas, ramas, etiquetas de versión, releases,
  workflow y variables.

## Decisiones

- **#8 se cierra como «no planificada»** en vez de borrarla: el historial
  conserva por qué estaba y por qué se descartó.
- **Tarjeta Open Graph** en todas las páginas, con una imagen por idioma: la
  rúbrica pide `<title>`/meta/OG por página y no había ninguna etiqueta OG.
- **Mapa del sitio** con `@astrojs/sitemap`, sin las páginas `noindex`. Sin
  robots.txt: en `/mi-web/` los buscadores no lo leen.
- **Acciones del workflow a Node 24**, que avisaban de Node 20 obsoleto, y fuera
  `.nojekyll`, que solo servía con la publicación antigua desde `main`.
- **Documentación**: el script del vídeo apuntaba al servidor de la v2, la ADR
  0002 contaba 6 pruebas en vez de 8 y el README enlaza las releases.
