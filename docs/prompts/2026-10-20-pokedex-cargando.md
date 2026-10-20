# La Pokédex avisa mientras carga (#57): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 20 de octubre de 2026.

## El encargo

> me parece que la API de Pokémon va un poco lenta. [...] al cambiar de
> Pokémon, se queda demasiados milisegundos el Pokémon que estaba antes [...]
> Si se puede o no se puede hacer algo, dime algo, dime cosas.

Después de ver las mediciones y cuatro propuestas:

> Vamos a probar a hacer la modificación que sugieres en el punto 1. Lo
> probaremos, veo si me gusta y, si me gusta, lo dejamos así.

## Qué se midió

Casi toda la espera es lo que tarda PokéAPI en responder: entre 0,2 y 1,7 s
según el Pokémon. No es por el tamaño, porque cada respuesta comprimida pesa
4-9 KB. La imagen añade entre 20 y 230 ms. Nuestro código tarda unos 20 ms. La
segunda vez que se ve un Pokémon es instantáneo, por la caché del navegador.

## Decisiones

- **Aviso desde el primer clic.** La ficha anterior se apaga (gris y
  transparente) y lleva un sello «Buscando…», como una entrada del cuaderno
  que se está rehaciendo. Lo anuncia `aria-busy`.
- **El aviso dura hasta que se ve la imagen nueva**, con un máximo de 4 s, para
  no mezclar datos nuevos con el dibujo viejo.
- **Sin aviso al cargar la página**: Pikachu ya viene en el HTML.
- **Con `prefers-reduced-motion`** el sello no parpadea.
- **Quedan fuera:** cargar la imagen en paralelo, tener preparado el siguiente
  Pokémon aleatorio y evitar que una respuesta vieja pise a la nueva. Esto
  último se vio en la prueba: buscando 1, 4 y 7 seguidos se quedó Bulbasaur.

## Después: la respuesta lenta que pisaba a la nueva (#59)

> Yes, open an issue and fix the bug where a slow reply overwrites the newer
> Pokémon.

- **Cada búsqueda tiene su turno** (`searchRequest`), igual que el visor 3D:
  solo pinta la última. Antes de pintar, se comprueba si sigue siendo su turno.
- **La petición anterior se cancela** con `AbortController`, así no se gasta
  red en lo que ya no hace falta. Cancelarla no enseña «error de red».
- Probado buscando seguido «1, 4, 7», «300…303», «150, mew, 9», «258,
  noexiste, 133» y tres veces «Uno al azar»: siempre queda el último.
