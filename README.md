# Marc Calatayud, web personal

Web personal y portfolio de Marc Calatayud, estudiante de 1º de DAM en el
IES Dr. Lluís Simarro. Diseño espacial inspirado en Super Mario Galaxy.

**Publicada en:** https://marcalvear.github.io/mi-web/

## Páginas

| Página | Ruta | Qué hace |
|---|---|---|
| Inicio | `index.html` | Los seis bloques de la pauta: cabecera, sobre mí, lo que he hecho, me gusta, contacto y pie |
| Caso de estudio | `proyectos/sonrisa-imperial/` | Sonrisa Imperial: problema, solución, resultado y vídeo de demo |
| Landing | `proyectos/sonrisa-imperial/landing.html` | El proyecto en sí |
| Me gusta | `me-gusta.html` | Pokédex, compendio de Zelda, frases de anime y radar de biohacking |
| Mensaje enviado | `gracias.html` | Destino del formulario de contacto |
| 404 | `404.html` | «Perdido en el espacio» |

## Estructura

```
├── index.html, me-gusta.html, gracias.html, 404.html
├── proyectos/sonrisa-imperial/   caso de estudio + landing
├── assets/
│   ├── css/
│   │   ├── fonts.css      @font-face de las fuentes propias
│   │   ├── tokens.css     colores, tipografía y espaciado (único sitio con valores)
│   │   ├── base.css       reset, fondo, tipografía y botones
│   │   ├── layout.css     cabecera, pie, trayectorias, chat y fragmentos
│   │   └── pages/         un fichero por tipo de página
│   ├── js/
│   │   ├── main.js        entrada común
│   │   ├── components/    <site-header>, <site-footer>, <chat-bot>
│   │   ├── lib/           getJSON (APIs) y ayudas del DOM
│   │   ├── me-gusta/      un módulo por API
│   │   ├── contacto.js, theme.js, stardust.js, config.js
│   ├── fonts/  img/  video/
├── worker/chatbot/        Cloudflare Worker del asistente (con pruebas)
└── docs/
    ├── adr/               decisiones de arquitectura
    ├── diseno.md          por qué el diseño es como es
    ├── lighthouse.md      resultados medidos
    ├── prompts/           órdenes que le di a la IA
    ├── og/  video/        plantillas y scripts para regenerar medios
```

## Servicios externos

| Servicio | Para qué |
|---|---|
| GitHub Pages | Alojamiento |
| FormSubmit | Envío del formulario y respuesta automática por correo |
| Cloudflare Workers AI | Asistente con IA (Mistral Small 3.1) |
| PokéAPI y Pokémon 3D API | Pokédex y modelos 3D |
| Hyrule Compendium API | Compendio de Zelda: Breath of the Wild |
| Animechan | Frases de Naruto y JoJo |
| jsDelivr | `<model-viewer>` de Google para los modelos 3D |

## Decisiones de arquitectura

- [ADR 0001: Web Components sin herramientas de build](docs/adr/0001-web-components-sin-build.md)
- [ADR 0002: El chatbot pasa por un Cloudflare Worker](docs/adr/0002-chatbot-con-worker.md)
- [ADR 0003: Formulario con envío normal para tener respuesta automática](docs/adr/0003-formulario-envio-normal.md)

## Calidad

Lighthouse en móvil: rendimiento 98-100 y accesibilidad 100 en todas las
páginas ([detalle](docs/lighthouse.md)). Contraste AA en los dos temas,
foco visible, menú y chat usables con teclado, y `prefers-reduced-motion`
respetado.

## Verlo en local

Hace falta un servidor (los módulos ES no funcionan abriendo el fichero):

```bash
python3 -m http.server 8080
```

y abrir http://localhost:8080.

Pruebas del Worker del chatbot:

```bash
cd worker/chatbot && npm test
```

## Historial

- `v1`: primera versión, una página con estética Cyberpunk 2077.
- `v2`: este rediseño. Cada bloque se hizo en su rama con su issue y su
  pull request ([issues](https://github.com/marcalvear/mi-web/issues?q=label%3Av2)).
