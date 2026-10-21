# Ajustes de las animaciones (#79)

Conversación con Claude Code (Claude Opus 5.5) del 21 de octubre de 2026.

## El encargo

Después de instalar las skills de Emil Kowalski (emilkowalski/skills), Marc
pidió estrenarlas:

> Sí, usa improve-animations para revisar todas las animaciones de la web y
> dime qué mejorarías.

La revisión no encontró fallos graves: ni `ease-in`, ni `transition: all`, ni
apariciones desde `scale(0)`, y casi todo anima solo `transform` y `opacity`.
Salieron seis ajustes, y Marc los pidió en un PR:

> Sí, arregla las seis mejoras de las animaciones en un PR, con el flujo de
> siempre.

## Arreglos

| Ajuste | Antes | Ahora |
|---|---|---|
| Duraciones de interfaz | `--slow` (420 ms) en la tarjeta que se levanta, «Ver la ciencia», el sello de la estrella, el logo y los cambios de ficha | Token nuevo `--mid` (240 ms); `--slow` queda para fotos y dibujos. En interfaz, nunca más de 300 ms |
| Cambio de frase y de Pokémon | La tarjeta volvía a opacidad 0 en cada cambio y parpadeaba con clics seguidos | Empieza en 0,4 y a 3 px de su sitio, en 240 ms |
| Hover en el móvil | Al tocar, la tarjeta levantada o la foto ampliada se quedaban así | Lo que se mueve al pasar el ratón va dentro de `@media (hover: hover) and (pointer: fine)`; con el teclado las tarjetas se siguen levantando |
| Barras de la Pokédex | Transición de `width` que nunca se veía, porque la barra nacía ya con su ancho | Crecen desde la izquierda con `transform: scaleX` y `@starting-style` |
| Pulsar | La estrella, los chips de filtro y el botón del chat no reaccionaban | La estrella y los chips bajan a `scale(0.97)`; el botón del chat se hunde sobre su sombra, como los botones |
| Reducir movimiento | La regla global quitaba también los fundidos | Fuera las animaciones y los desplazamientos; se quedan los fundidos de color y opacidad |

## Comprobación

- Con ratón, la tarjeta de Me gusta se levanta 6 px en 240 ms; en móvil
  (sin `hover: hover`), al tocarla no se mueve.
- Tres clics seguidos en «Otra frase»: la tarjeta nunca baja de 0,4 de
  opacidad y la animación dura 240 ms.
- Al pedir otro Pokémon, las seis barras animan `transform`.
- Lighthouse en `docs/lighthouse.md`.

## Queda para después

- El panel del chat aparece de golpe; podría crecer desde el botón de la
  esquina en unos 200 ms.
- El aviso de favoritos entra con movimiento pero se va de golpe.
- Falta notar las animaciones en un móvil de verdad.
