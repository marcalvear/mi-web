# Compendio: índice y una página por problema (#105)

Conversación con Claude Code (Claude Opus 5.5) del 21 de octubre de 2026.

> Me gusta la C: índice con tarjetas, una página por problema, anterior y
> siguiente, y el botón de volver arriba. Hazla.

## Decisiones

- **Índice** (/biohacking/): cifras, aviso y una tarjeta por problema.
  - Cada tarjeta lleva el esquema en miniatura (ya dibujado, sin animación), el número, el nombre, la pregunta, cuántas fichas tiene (y cuántas son compartidas) y los niveles de evidencia.
  - Es una tarjeta entera pulsable que se levanta al pasar el ratón.
  - Envejecer mejor no tiene esquema y lleva un reloj de arena con el mismo trazo.
- **Página de cada problema** (/biohacking/<id>/, en ES y EN):
  - Miga de pan arriba y, abajo, problema anterior, todos los problemas y problema siguiente.
  - El nombre del problema es el h1 y la pregunta, el h2, para no saltar niveles.
- **Volver arriba**: botón redondo abajo a la izquierda (a la derecha está el del chat), con una flecha a mano. Aparece al bajar una pantalla y lleva el foco arriba al terminar de subir.
- **Fichas compartidas**: el resumen enlaza a la página del problema donde está la completa.
- **Enlaces**:
  - Mi espacio y el Boticario apuntan a la página de cada problema.
  - Los enlaces viejos con #problema o #ficha redirigen a su página nueva.
  - La cabecera marca «Compendio» en todas las páginas.

## Comprobación

- 20 páginas nuevas (10 problemas en dos idiomas), sin ids repetidos ni scroll horizontal.
- El enlace viejo #melatonina lleva a /biohacking/dormir-mejor/#melatonina.
- Lighthouse:
  - Índice: 93/100/100/100, 381 KB.
  - Dormir mejor: 94/100/100/100, 407 KB.
  - Antes, la página única daba 90 y pesaba 504 KB.
