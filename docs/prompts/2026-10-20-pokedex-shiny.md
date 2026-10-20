# La Pokédex 3D se congela con un shiny que no existe (#55): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 20 de octubre de 2026.

## El encargo

> cuando te da el aviso de que un Pokémon no tiene el shiny, es decir, cuando
> ya has apretado el botón de mostrar shiny, el visor 3D se queda congelado. No
> puedes mover el personaje, no puedes darle a activar la versión shiny ni
> desactivar la versión 3D. [...] Revísalo bien y, si puedes, arréglalo.

## Qué pasaba

Se reprodujo en el navegador con #493 Arceus, que tiene modelo normal pero no
shiny. Había dos fallos juntos:

1. Al no encontrar el shiny, el código quitaba el modelo del visor. Pero
   model-viewer sigue pintando el último fotograma, así que se veía un Arceus
   «fantasma» que no se podía girar.
2. No se olvidaba de que el modelo normal estaba cargado. Al pulsar «Ver
   versión normal», o al volver a la vista 3D, creía que ya estaba puesto y no
   hacía nada. Solo se arreglaba cambiando de Pokémon.

## Decisiones

- **Si no hay shiny, se vuelve al modelo normal**, que se puede girar, con el
  aviso de siempre. Es mejor que dejar el visor vacío.
- **El botón shiny se desactiva** para ese Pokémon y se activa al elegir otro.
- **Lo cargado se olvida antes de pedir un modelo nuevo**: si falla, siempre se
  puede volver a pedir.
- **Si un Pokémon no tiene ningún modelo** (p. ej. #1024), el visor se vacía
  y guarda su hueco, en vez de enseñar el Pokémon anterior.
