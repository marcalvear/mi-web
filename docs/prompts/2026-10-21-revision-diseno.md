# Revisión de diseño con las skills nuevas (#77)

Conversación con Claude Code (Claude Opus 5.5) del 21 de octubre de 2026.

## El encargo

Después de instalar en el proyecto las skills no-ai-design-slop,
audit-ai-design-slop, optimize-web-animations y web-design-engineer, Marc pidió
probarlas:

> Me gustaría que revisaras exhaustivamente el diseño de toda la página web
> entera y me explicaras qué se podría mejorar, teniendo en cuenta la
> implementación de las nuevas skills.

Se revisó la web publicada en escritorio (1280 px), móvil (375 px), claro y
oscuro, con el método de audit-ai-design-slop: pruebas concretas, prioridad
de P0 a P3 y quitar antes que añadir. Después Marc pidió arreglar lo más grave:

> Sí, prepara un PR con los fallos P1 (404, nota al margen, botón del chat) y
> las dos regresiones (fotos del compendio y listas de Me gusta).

## Arreglos

| Fallo | Causa | Arreglo |
|---|---|---|
| 404 sin maquetar, pegada al borde y encima de la línea roja | La página no usaba el contenedor `.wrap` | Mismo encabezado que el resto de páginas y una línea en inglés debajo: GitHub Pages solo sirve una 404, también para `/en/` |
| Nota al margen fuera de la pantalla en Entrar y Sistema | Margen negativo de 72 px desde 1152 px de ancho; hasta unos 1320 px no hay sitio | Dentro de la columna hasta 1344 px; a partir de ahí vuelve a colgar del margen |
| El botón del chat tapaba la última fila del pie | El pie solo tenía 32 px debajo y el botón ocupa 72 px | El pie deja 112 px abajo |
| Fotos de producto enormes en las fichas (regresión de #74) | Con la ficha a todo el ancho, un producto solo se estiraba y su foto cuadrada también | Foto de 8 rem al lado de los datos; `auto-fill` para que un producto solo no se estire; en móvil, foto encima pero de 8 rem |
| Listas de las tarjetas de Me gusta estiradas (regresión de #72) | La fila de la lista se estira para alinear los enlaces y las líneas se repartían el alto | `align-content: start` |

## Comprobación

- Sin scroll horizontal en Entrar, Sistema y Entrar (EN) a 1160, 1280, 1320 y
  1400 px.
- Ficha de enzimas: 1167 → 1038 px en escritorio y 1834 → 1569 px en móvil;
  fotos de 315 → 128 px.
- Al final de la página, ningún enlace del pie queda debajo del botón.
- Lighthouse en `docs/lighthouse.md`. La 404 no se puede medir: Lighthouse no
  puntúa páginas que responden con estado 404.

## Queda para después

Lo demás de la revisión, de prioridad P2 y P3:

- Sobran etiquetas en mayúsculas: 175 en el compendio y «Cuaderno nº 3 · …»
  en cada página.
- La imagen principal de anime-manga se carga en diferido y se ve el panel
  en blanco.
- La tarjeta del formulario de contacto deja medio ancho vacío.
- Hay jerga de Lighthouse en la portada.
- Los enlaces de PubMed y DOI son pequeños para el dedo.
