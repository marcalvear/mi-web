# Me gusta en tres páginas: videojuegos, anime y manga, y biohacking (#71)

Conversación con Claude Code (Claude Opus 5.5) del 21 de octubre de 2026. El
encargo llegó desde la sesión principal, con la propuesta ya aprobada por Marc
«por ahora».

## El encargo (resumen del mensaje de Marc)

- Quitar de la portada el enlace «Explorar la Pokédex».
- Entrar a cada apartado haciendo clic en su tarjeta.
- Separar Me gusta en tres páginas, una por afición.
- Videojuegos: además de la Pokédex, fotos de los tres títulos.
- Anime y manga: además de la API de frases, dos apartados con fotos de cada
  serie.
- Biohacking: una sola página, solo con aparatos, y el enlace al compendio.
- Advanced Antioxidants es un suplemento: tiene que ir al compendio.
- Marc pidió una idea de estructura «lo más estética que se pueda», para que a
  quien vea cada título le llame la atención.

Sobre el plan concreto, Marc contestó:

> Vale el plan. Busca tú el arte oficial y enséñame la lista antes de
> descargar; Advanced Antioxidants en un PR aparte; el menú como propones.
> Mis datos personales te los paso después: usa borradores mientras.

## Decisiones

- **Rutas**, en español y en inglés:
  - `/me-gusta/videojuegos/`, `/me-gusta/anime-manga/` y `/me-gusta/biohacking/`;
  - `/me-gusta/` queda como índice con las mismas tarjetas que la portada;
  - los enlaces viejos con `#pokedex`, `#frases` o `#biohacking` llevan a su
    página nueva.
- **Tarjetas de la portada**:
  - cada una lleva una foto y es un enlace entero;
  - el título se estira sobre la tarjeta, así el lector de pantalla oye solo
    el título;
  - al pasar el ratón, la tarjeta se levanta y la foto se acerca.
- **Videojuegos**:
  - arriba, tres «cartuchos» que llevan a cada juego;
  - cada juego tiene su sección con arte grande, ficha (año, estudio, consola)
    y dos capturas;
  - cada uno con su tono: Zelda en verde, Bloodborne a oscuras en los dos temas
    y Pokémon en rojo;
  - la Pokédex va en la sección de Pokémon.
- **Anime y manga**:
  - cada obra es una página de manga, con viñetas de borde grueso, la viñeta de
    texto con trama de puntos y bocadillo, y las cartelas con el título de cada
    ilustración;
  - la página no cambia con el tema, como el papel de un manga;
  - el mazo de frases va al final.
- **Biohacking**: el radar con el adelanto del compendio arriba.
- **Menú**: «Me gusta» lleva a `/me-gusta/` y «Biohacking» pasa a llamarse
  «Compendio».
- **⌘K**: suma Videojuegos y Anime y manga.
- **Marc IA**: conoce las tres páginas y lo que dice cada una.
- **Fotos**:
  - 16 imágenes de páginas oficiales, elegidas por Marc en una hoja de
    revisión antes de descargar nada;
  - fuentes: fichas de Nintendo (Zelda y, al final, Leyendas Pokémon: Arceus), web de
    PlayStation (Bloodborne), galería de naruto-official.com y web del anime
    de JoJo;
  - cada una con su crédito;
  - en WebP, sin metadatos y como mucho a 1600 px; Astro sirve AVIF y WebP
    con tamaños para cada pantalla.
- **Textos**:
  - son borradores en la voz de Marc, sin datos personales inventados;
  - las horas, el momento favorito, el arco y el personaje quedan como campos
    opcionales en `src/i18n/hobbies.ts`: la ficha solo los enseña cuando Marc
    los rellene.
- **Rendimiento**: las secciones de más abajo usan `content-visibility`, para
  no descargar fotos que aún no se ven. Todas las páginas quedan en 90 o más.

## Los datos de Marc

Con las páginas montadas, Marc pasó sus datos: Zelda (unas 320 horas, la
batalla final contra Ganon), Bloodborne (unas 240 horas, Yharnam y la pelea
contra Ludwig en el DLC), Pokémon (unas 110 horas, Leyendas Pokémon: Arceus y
Mewtwo), Naruto (Sasuke contra Itachi, Sasuke Uchiha) y JoJo (la parte 5,
Golden Wind, y Diavolo). Los textos se ajustaron a lo que contó. Su juego de
Pokémon favorito era Arceus, así que las fotos de Escarlata se cambiaron por
tres de Arceus que eligió en otra hoja de revisión.

## Pendiente

- Advanced Antioxidants al compendio, en un PR aparte.
- Desplegar el Worker de Marc IA con el contexto nuevo.

## Las fotos que faltaban (25/10/2026)

Marc recordaba haber visto muchas más fotos en la hoja de revisión que las
que acabaron en la web. Era así: la hoja tenía 7 de Zelda, 9 de Bloodborne y
7 de Arceus (en otra hoja), con una propuesta de 3 por juego marcada en verde.
Marc contestó «Las fotos están bien, entonces descárgalas y continúa», y se
tomó como «vale la propuesta», así que solo se usaron las verdes. Él pensaba
que entrarían todas.

> Quiero que añadas más fotos de esas que me enseñaste, porque había algunas
> que me parecían más bonitas.

Se añadieron las 14 que faltaban de los juegos (4 de Zelda, 6 de Bloodborne
y 4 de Arceus), de las mismas fuentes oficiales, en WebP, sin metadatos y como
mucho a 1600 px. Las capturas pasan a una galería de tres columnas (dos en el
móvil). En Anime y manga quedaron fuera 2 de Naruto y la versión vertical de
una de JoJo; esa página es una maqueta de manga con viñetas fijas.

**Lección:** cuando la respuesta a una hoja de revisión no dice qué códigos,
preguntar si es la propuesta o todas.
