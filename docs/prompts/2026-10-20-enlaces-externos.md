# Enlaces externos en otra pestaña (#53): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 20 de octubre de 2026. Es el
primer cambio después de publicar la v3: desde aquí, ramas desde `main`.

## El encargo

> quiero que chequees a ver qué enlaces llevan a sitios externos, por ejemplo,
> el de LinkedIn o el de GitHub, o algún otro que haya por ahí que lleve a otro
> sitio que no sea mi página web. Búscalos. Quiero que se abran en otra pestaña
> diferente dentro del navegador.

## Qué se encontró

Se revisó la web compilada, no solo el código. Salían 8 enlaces distintos a
otras webs. Solo los dos de la paleta ⌘K se abrían ya aparte:

- Pie: «Código en GitHub».
- Contacto: LinkedIn y GitHub.
- «Ver el historial» en Lo que he hecho.
- Los 4 productos de biohacking.
- El botón «Ver el código» del caso de estudio.

## Decisiones

- **`target="_blank"` con `rel="noopener"`**: la página que se abre no puede
  tocar la de la web. En LinkedIn y GitHub se mantiene `rel="me"`.
- **Avisar antes de abrir otra pestaña** (WCAG, técnica G201):
  - Una flecha en diagonal ↗ a la vista. La flecha recta → queda para lo que
    se queda en la web.
  - El texto «(se abre en otra pestaña)» solo para lectores de pantalla
    (componente `NewTab.astro`), en el idioma de la página.
- **El botón tiene una opción `external`** para no repetir esto en cada sitio.
- **Comprobación al compilar** (`npm run check:enlaces`, también en el
  workflow): si un enlace externo nuevo se abre en la misma pestaña, el
  despliegue falla y dice en qué página está.
