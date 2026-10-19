# Marc Calatayud, web personal

Web personal y portfolio de Marc Calatayud, estudiante de 1º de DAM en el
IES Dr. Lluís Simarro.

**Publicada en:** https://marcalvear.github.io/mi-web/

> **v3 en obras.** Se está rehaciendo desde cero en la rama `v3`
> ([issue #21](https://github.com/marcalvear/mi-web/issues/21)). Mientras tanto
> sigue publicada la v2. La documentación completa llega en #35.

## Estructura

```
├── astro.config.mjs        base /mi-web/ e idiomas (es, en)
├── src/
│   ├── pages/              una ruta por fichero; en/ para el inglés
│   ├── layouts/            plantilla común (Base.astro)
│   ├── i18n/ui.ts          textos de la interfaz en los dos idiomas
│   └── assets/img/         imágenes que Astro optimiza
├── public/                 ficheros que se copian tal cual (vídeo, landing)
├── worker/chatbot/         Cloudflare Worker del asistente (con pruebas)
├── .github/workflows/      compilación y publicación en GitHub Pages
└── docs/
    ├── adr/                decisiones de arquitectura
    ├── prompts/            órdenes que le di a la IA
    └── video/              script para regenerar la demo
```

## Verlo en local

Hace falta Node 22.22 o superior.

```bash
npm install
npm run dev
```

y abrir http://localhost:4321/mi-web/. Para compilar como en GitHub Pages:
`npm run build` y `npm run preview`.

Pruebas del Worker del chatbot:

```bash
cd worker/chatbot && npm test
```

## Decisiones de arquitectura

- [ADR 0001: Web Components sin herramientas de build](docs/adr/0001-web-components-sin-build.md) (v2, sustituida)
- [ADR 0002: El chatbot pasa por un Cloudflare Worker](docs/adr/0002-chatbot-con-worker.md)
- [ADR 0003: Formulario con envío normal para tener respuesta automática](docs/adr/0003-formulario-envio-normal.md)
- [ADR 0004: Astro con GitHub Actions](docs/adr/0004-astro-con-github-actions.md)
- [ADR 0005: Las frases de anime van en un mazo guardado en la web](docs/adr/0005-mazo-de-frases-local.md)

## Historial

- `v1`: primera versión, una página con estética Cyberpunk 2077.
- `v2`: rediseño espacial inspirado en Super Mario Galaxy, con Web Components sin build.
- `v3` (en curso): cuaderno de laboratorio con Astro, dos idiomas, usuarios y panel de administrador.
