# Portada: Mis vivencias, visor de fotos y repaso de los esquemas (#109-#112)

Conversación con Claude Code del 25 de octubre de 2026, el día de la entrega.

## Portada (#109)

De la revisión de diseño quedaban dos arreglos de la portada: la tabla de
Lighthouse en la tarjeta de Sonrisa Imperial (jerga técnica en la portada) y
la tarjeta del formulario, que dejaba medio ancho vacío. La tabla se quitó
(las métricas siguen en el caso de estudio) y el contacto pasó a dos columnas.

## Mis vivencias (#110, cierra #66)

> Va en la página principal, entre la bitácora y Me gusta. Llámalo, por
> ejemplo, Mis vivencias. Hay fotos de pádel, de una montaña con un atardecer,
> de viajes y de conciertos de The Weeknd y Travis Scott.

- Marc dejó las 11 fotos en `recursos/`. Antes de colocarlas, Claude describió
  qué veía en cada una y Marc lo confirmó.
- Subapartados: deportes favoritos, viajes y conciertos, en un collage de
  fichas pegadas con cinta. Fotos en WebP, sin metadatos (los originales
  tenían GPS).
- Tras verlo, Marc pidió fotos más grandes, animación al pasar el ratón y un
  visor como la Vista Rápida de macOS al hacer clic. El visor salió después a
  un componente común (`Visor.astro` en `Base` y `Ampliable.astro` en cada
  foto) y se usa también en la foto de Sobre mí, Videojuegos y Anime y manga.
- Fallos que encontró Marc y su causa:
  - **Tinte rojo al pulsar**: un clic rápido seleccionaba la imagen y
    `::selection` la pintaba con el rojo del rotulador. Las fotos ampliables
    ya no se pueden seleccionar.
  - **Animación distinta en cada foto**: la foto salía volando desde su
    miniatura, así que llegaba desde arriba o desde abajo según dónde
    estuviera. Ahora todas aparecen igual en el centro.
  - **Retroceso antes de ampliarse**: el `:active` de las fichas, la barra de
    scroll al bloquear la página y la foto grande sin cargar. Los tres se
    arreglaron.
- Además se añadieron las 16 fotos oficiales de Videojuegos y Anime y manga
  que Marc había visto en la hoja de revisión del 21/10 y no se usaron (ver
  `2026-10-21-me-gusta-tres-paginas.md`).

## Pie (#111)

«Cuaderno nº 3» quedaba más arriba que los enlaces del pie (ellos llevan
relleno para el dedo y el texto no). La fila se centró y «Volver arriba» pasó
a su propia línea.

## Esquema de «Envejecer mejor» y repaso de los demás (#112)

> En ese problema no hay una ilustración como en el resto. Haz algún dibujo
> relacionado con el estrés oxidativo, si se puede con una mitocondria.

- Una mitocondria suelta radicales libres (un círculo con un punto: el
  electrón que les falta) hacia la vista, la piel y el hueso. La explicación
  del problema se adaptó para nombrar las mitocondrias.
- Al probarlo salió un fallo general: la tarjeta principal de una ficha no
  usaba la zona del problema (`zonas`), así que no se encendía nada.
- El repaso de los otros nueve esquemas encontró textos que se pisaban en
  Ciclo, Cansancio, Defensas, Recuperación y Sueño, y un hueco sin dibujo en
  Concentración. Se comprobaron los 44 suplementos de los 10 problemas.
