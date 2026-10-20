# Compendio de biohacking, fase 1: prototipo con «digestiones pesadas» (#63, #64)

Conversación con Claude Code (Claude Opus 5.5) del 20 y 21 de octubre de 2026.

## El encargo

> hacer un mega compendio de productos de biohacking y de salud [...] Lo que me
> gustaría es que ese apartado estuviera organizado un poco por los diferentes
> problemas o diferentes pain points [...] deberíamos indicar las razones,
> indicar la ciencia [...] pondríamos las fuentes científicas [...] Estaría bien
> que fuera un estilo interactivo [...] que no parezca una web totalmente
> diferente [...] cada producto tenga una estrellita [...] función de guardar
> como favorito.

Para empezar el prototipo:

> mejor con tema digestivo, por ejemplo, con el tema de digestiones pesadas.
> Podemos incluir unas enzimas: [...] Sports Research, [...] Enzyme Digest [...]
> la marca española, o el complejo enzimático digestivo de Pure Encapsulation.

Y sobre el registro: «sí, abrimos el registro con Supabase». Queda para la fase
de favoritos.

## Decisiones

- **Página propia** (`/biohacking/`), oculta mientras es un prototipo: lleva
  `noindex`, no está en el mapa del sitio ni en el menú.
- **Se entra por problemas.** Cada problema reúne las fichas de los
  suplementos estudiados para él.
- **El contenido va en ficheros JSON** con un esquema que se comprueba al
  compilar (`src/content.config.ts`). Si a una ficha le falta un idioma, una
  fuente o el nivel de evidencia, la web no se publica. Para añadir un
  problema no hace falta tocar el diseño.
- **Fuentes comprobadas una a una en PubMed**, con su PMID y su DOI. Cada
  hallazgo cita su estudio. Las cifras salen de los resúmenes de los artículos.
- **Nivel de evidencia honesto**: fuerte, moderada o preliminar, con una frase
  que explica el porqué. En este problema ninguno llega a fuerte. El jengibre
  queda en preliminar porque acelera el vaciado del estómago, pero en los
  ensayos las molestias no cambiaron.
- **Modo laboratorio**: el mismo cuaderno con un verde de reactivo (`--lab`,
  AA en los dos temas), cifras de instrumento en la cabecera, medidores de
  evidencia y un esquema del aparato digestivo. El esquema se queda fijo al
  bajar y se enciende donde actúa la ficha en la que estás.
- **Productos de enzimas** con datos y fotos de las webs oficiales:
  - Sports Research: Digestive Enzymes + Probiotic.
  - Pure Encapsulations: Digestive Enzymes Ultra.
  - Alfa Herbal (Vilobí del Penedès): Enzyme Digest. Es la marca española
    que se encontró con ese producto.
- **Señales de alarma** y aviso de que es divulgación, no consejo médico.
- **Copy** escrito con la skill *copywriting* instalada en el proyecto: sin
  cifras que no estén en los estudios y en la voz de Marc.
- Lighthouse en móvil: rendimiento 96, accesibilidad 100, buenas prácticas 100.

## Pendiente (otras fases de #63)

Más problemas, favoritos con estrella y registro abierto, Mi espacio y panel
con favoritos, e integración en el menú, ⌘K y Marc IA.

## Después: un esquema mejor dibujado

> El dibujo está mejorable, la verdad. No sé si sería recomendable, en vez de
> un dibujo, poner una imagen o poner ahí un dibujo de Excalidraw

- **Imagen externa, descartada.** Perdería la interacción (el órgano que se
  enciende con cada ficha) y el estilo del cuaderno.
- **Estilo Excalidraw con rough.js**, la misma librería que usa Excalidraw. La
  anatomía está redibujada: hígado grande con la vesícula y el conducto biliar,
  esófago, estómago en J con su antro, la C del duodeno abrazando al páncreas
  e intestino delgado con sus asas. El relleno es de rayas, como en Excalidraw.
- **Se genera al compilar**, con semilla fija para que el dibujo sea siempre el
  mismo, así que no carga JavaScript en el navegador. Las coordenadas van con
  un decimal: el SVG pasa de 58 a 22 KB.
- La etiqueta de arriba pasa de «Boca» a «Esófago», que es lo que se dibuja.
- Lighthouse en móvil sigue en 96 / 100 / 100.
