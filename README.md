# Marc Calatayud, web personal

Web personal y portfolio de Marc Calatayud, estudiante de 1º de DAM en el
IES Dr. Lluís Simarro.

**Publicada en:** https://marcalvear.github.io/mi-web/

## Qué tiene

Tercera versión, con estética de **cuaderno de laboratorio**: papel
cuadriculado, Newsreader y JetBrains Mono, rotulador rojo y diagramas SVG que
se dibujan solos. En español y en inglés, con tema claro, oscuro o del sistema.

- **Portada**: quién soy, lo que he hecho, lo que me gusta y contacto.
- **Caso de estudio** de Sonrisa Imperial, contado como un informe de laboratorio.
- **Me gusta**, en tres páginas a las que se entra desde las tarjetas de la
  portada:
  - **Videojuegos**: Zelda, Bloodborne y Pokémon, con arte oficial y una
    Pokédex con modelos 3D.
  - **Anime y manga**: Naruto y JoJo maquetados como páginas de manga, con un
    mazo de 200 frases traducidas.
  - **Biohacking**: mi radar de aparatos.
- **Compendio de biohacking**: 10 problemas (dormir, estrés, defensas…), cada
  uno en su página con un esquema dibujado a mano, y 38 suplementos con su nivel
  de evidencia, la dosis estudiada, las precauciones y cada estudio de PubMed
  enlazado. Las fichas se guardan con una estrella en Mi espacio, y dentro
  Marc IA hace de «boticario».
- **Formulario de contacto** conectado a n8n: captcha, crea la cuenta de quien
  escribe, clasifica el mensaje con IA y responde por correo.
- **Mi espacio**: cada persona ve su conversación conmigo, entrando sin
  contraseña con un código por email.
- **Panel de administrador**: bandeja con sin leer y sin responder, respuestas
  que avisan por correo, usuarios y su actividad.
- **Marc IA**: asistente con IA que responde con lo que dice la web. En el
  compendio orienta según lo que te pasa ([ADR 0008](docs/adr/0008-marc-ia-boticario.md)).
- **Paleta de comandos** con ⌘K o Ctrl+K.

## Cómo está hecha

```
                 GitHub Pages (Astro, estática)
        ┌────────────────┬───────────────┬────────────────┐
        │ formulario     │ Mi espacio /  │ Marc IA        │
        │                │ panel         │                │
        ▼                ▼               ▼                │
   n8n (webhooks)   Supabase          Cloudflare Worker   │
   captcha, IA,     Postgres + Auth   Workers AI          │
   correo (Brevo)   reglas RLS        (Mistral)           │
        │                ▲                                │
        └── clave secreta┘     ninguna clave secreta en la web
```

- **Astro 7** compila páginas estáticas en los dos idiomas; **GitHub Actions**
  las publica en GitHub Pages ([ADR 0004](docs/adr/0004-astro-con-github-actions.md)).
- **Supabase** guarda usuarios, mensajes y actividad. Lo que protege los datos
  son las reglas RLS de Postgres, probadas con 39 pruebas ([ADR 0006](docs/adr/0006-supabase-con-rls.md)).
- **n8n** recibe el formulario y avisa de mis respuestas; es el único sitio
  con la clave secreta de Supabase ([ADR 0007](docs/adr/0007-contacto-con-n8n.md)).
- **Cloudflare Workers AI** responde al chat sin claves en la web
  ([ADR 0002](docs/adr/0002-chatbot-con-worker.md)).

## Estructura

```
├── astro.config.mjs        base /mi-web/ e idiomas (es, en)
├── src/
│   ├── pages/              una ruta por fichero; en/ para el inglés
│   ├── layouts/Base.astro  plantilla común: cabecera, pie, chat y paleta
│   ├── components/         home/, case/, likes/, compendio/, auth/, space/, panel/, chat/…
│   ├── content/            el compendio: problemas y suplementos en JSON
│   ├── i18n/               todos los textos en los dos idiomas
│   ├── lib/                cliente de Supabase (solo la clave pública), Pokémon
│   ├── data/               las 200 frases de anime con su traducción
│   └── styles/             tokens del diseño y estilos base
├── public/                 ficheros que se copian tal cual (vídeo, landing, imágenes para compartir)
├── scripts/                descargar las frases y generar el contexto del chat
├── supabase/               migraciones, 39 pruebas de RLS y correo de acceso
├── n8n/                    los dos flujos (contacto y aviso) y su guía
├── worker/chatbot/         Cloudflare Worker de Marc IA (con pruebas)
├── .github/workflows/      compilación y publicación en GitHub Pages
└── docs/
    ├── adr/                decisiones de arquitectura
    ├── diseno.md           el sistema de diseño y sus contrastes
    ├── lighthouse.md       mediciones de cada página
    ├── prompts/            las órdenes que le di a la IA, bloque a bloque
    └── video/              script para regenerar la demo de Sonrisa Imperial
```

## Verlo en local

Hace falta Node 22.22 o superior.

```bash
npm install
npm run dev
```

y abrir http://localhost:4321/mi-web/. Para compilar como en GitHub Pages:
`npm run build` y `npm run preview`.

Sin `.env` la web funciona, pero sin las partes conectadas. Copia
`.env.example` como `.env` y rellénalo; **todas las variables son públicas**
(acaban en el JavaScript de la web):

| Variable | Para qué | Guía |
|---|---|---|
| `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` | Entrar, Mi espacio y panel | [supabase/README.md](supabase/README.md) |
| `PUBLIC_N8N_CONTACT_URL`, `PUBLIC_TURNSTILE_SITE_KEY` | Formulario de contacto | [n8n/README.md](n8n/README.md) |
| `PUBLIC_N8N_REPLY_URL` | Aviso por correo de mis respuestas | [n8n/README.md](n8n/README.md) |
| `PUBLIC_CHATBOT_URL` | Marc IA | [worker/chatbot/README.md](worker/chatbot/README.md) |

En GitHub van en *Settings → Secrets and variables → Actions → Variables*.

Otros comandos:

```bash
npm run chatbot:test        # pruebas del Worker de Marc IA
npm run check:enlaces       # tras compilar: los enlaces externos se abren en otra pestaña
npm run chatbot:contexto    # regenera lo que sabe Marc IA a partir de src/i18n
node scripts/descargar-frases.mjs   # vuelve a descargar las frases de Animechan
```

## Calidad

Lighthouse en móvil, en todas las páginas: ver [docs/lighthouse.md](docs/lighthouse.md).
Accesibilidad AA (contrastes en [docs/diseno.md](docs/diseno.md)), navegable con
teclado y con `prefers-reduced-motion`.

## Cómo se ha trabajado

Cada bloque tiene su issue, su rama desde `main` (durante la v3, desde `v3`) y su pull request, con commits
pequeños en español. Las órdenes que le di a la IA están en
[docs/prompts/](docs/prompts/). La issue que lo agrupa todo es la
[#21](https://github.com/marcalvear/mi-web/issues/21).

## Decisiones de arquitectura

- [ADR 0001: Web Components sin herramientas de build](docs/adr/0001-web-components-sin-build.md) (v2, sustituida)
- [ADR 0002: El chatbot pasa por un Cloudflare Worker](docs/adr/0002-chatbot-con-worker.md)
- [ADR 0003: Formulario con envío normal para tener respuesta automática](docs/adr/0003-formulario-envio-normal.md) (v2, sustituida)
- [ADR 0004: Astro con GitHub Actions](docs/adr/0004-astro-con-github-actions.md)
- [ADR 0005: Las frases de anime van en un mazo guardado en la web](docs/adr/0005-mazo-de-frases-local.md)
- [ADR 0006: Usuarios y mensajes en Supabase, protegidos con RLS](docs/adr/0006-supabase-con-rls.md)
- [ADR 0007: El formulario de contacto pasa por un flujo de n8n](docs/adr/0007-contacto-con-n8n.md)
- [ADR 0008: Marc IA hace de «boticario» dentro del compendio](docs/adr/0008-marc-ia-boticario.md)

## Historial

Cada versión tiene su etiqueta y su release en GitHub:

- [`v1`](https://github.com/marcalvear/mi-web/releases/tag/v1): primera versión, una página con estética Cyberpunk 2077.
- [`v2`](https://github.com/marcalvear/mi-web/releases/tag/v2): rediseño espacial inspirado en Super Mario Galaxy, con Web Components sin build ([#19](https://github.com/marcalvear/mi-web/pull/19)).
- [`v3`](https://github.com/marcalvear/mi-web/releases/tag/v3): cuaderno de laboratorio con Astro, dos idiomas, usuarios, Mi espacio, panel de administrador, chatbot con IA y paleta ⌘K ([#21](https://github.com/marcalvear/mi-web/issues/21), [#51](https://github.com/marcalvear/mi-web/pull/51)).
