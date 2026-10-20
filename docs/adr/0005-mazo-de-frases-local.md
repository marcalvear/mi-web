# ADR 0005: Las frases de anime van en un mazo guardado en la web

- **Estado:** aceptada
- **Fecha:** 19/10/2026

## Contexto

En la v2, cada clic en «Frase de Naruto» o «Frase de JoJo» pedía una frase al
azar a [Animechan](https://animechan.io). Pasaban dos cosas:

- **Se repetían.** Animechan solo tiene 7 frases de JoJo, así que a los pocos
  clics salían las mismas. Y aunque de Naruto tiene 193, «al azar» no evita
  repetir.
- **Límite de 100 peticiones al día por IP.** Una clase entera probando la web
  desde la misma red del instituto lo gasta enseguida.

## Decisión

Descargar **una vez** todas las frases de las dos series con
`scripts/descargar-frases.mjs` y guardarlas en `src/data/frases-anime.json`
(200 frases). La web las sirve en `/datos/frases-anime.es.json` y
`/datos/frases-anime.en.json`, y el navegador las baraja.

- **Barajado sin repetir:** Fisher-Yates para el orden y una lista de vistas.
  No sale ninguna frase dos veces hasta agotar el mazo; entonces se baraja
  otra vez y se avisa.
- **Con memoria:** el orden y las vistas se guardan en `localStorage`, así el
  mazo sigue donde lo dejaste aunque cierres la página.
- **La API sigue en uso:** el botón «Pedir una en vivo a Animechan» hace la
  petición real y dice si la frase ya estaba en el mazo o es nueva.
- **Traducidas al español** (añadido el 19/10/2026, issue #43): cada frase
  guarda su traducción en el campo `es`. La web ES enseña la traducción y la
  EN el original. Si una frase en vivo ya estaba en el mazo, en ES sale la
  versión traducida; si es nueva, sale en inglés y se avisa.

## Por qué

- Cero peticiones a Animechan al usar el mazo: el límite diario solo se gasta
  con el botón en vivo.
- Funciona aunque Animechan esté caída.
- Pesa 13 KB comprimido en inglés y 26 KB en español (lleva también el
  original para reconocer las frases en vivo). Solo se descarga cuando el mazo
  está a punto de verse.

## Consecuencias

- Si Animechan añade frases, hay que volver a ejecutar el script. El mazo
  detecta que ha cambiado de tamaño y se baraja de nuevo.
- Las traducciones las hizo la IA (Claude) a partir del original en inglés.
  Si el script trae frases nuevas, avisa de cuántas faltan por traducir y,
  mientras tanto, salen en inglés también en la web ES.
