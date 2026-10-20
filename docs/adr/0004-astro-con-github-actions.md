# ADR 0004: Astro con GitHub Actions

- **Estado:** aceptada
- **Fecha:** 19/10/2026
- **Sustituye a:** [ADR 0001](0001-web-components-sin-build.md)

## Contexto

La v3 deja de ser una web de cinco páginas. Tiene que llevar:

- **Dos idiomas** (español e inglés), con las mismas páginas en cada uno.
- **Zonas con sesión**: el espacio de cada usuario y mi panel de administrador
  (issues #29, #31 y #32).
- **Componentes compartidos** por muchas páginas: cabecera, pie, paleta ⌘K, chatbot.

Con la ADR 0001 cada página es un HTML escrito a mano y la cabecera se pinta
con JavaScript. Duplicar todo eso en dos idiomas a mano es justo el problema
que la propia ADR 0001 avisaba que llegaría si la web crecía.

GitHub Pages sigue siendo el alojamiento y solo sirve ficheros estáticos.

## Decisión

Usar **Astro** como generador estático y publicar con un **workflow de
GitHub Actions** (`.github/workflows/deploy.yml`) que compila en cada push a
`main` y solo comprueba la compilación en los pull request.

- Rutas: español sin prefijo (`/mi-web/`) e inglés en `/mi-web/en/`, con el
  i18n que trae Astro.
- Los textos de la interfaz están en `src/i18n/ui.ts`; cada página elige su
  idioma y Astro genera las dos versiones.
- La v3 se integra en la rama `v3` y pasa a `main` al terminar, así la v2 sigue
  publicada mientras tanto.

## Por qué

- **El HTML sale ya hecho del build.** La cabecera y el pie están en la página
  aunque no haya JavaScript, sin el truco del `min-height` de la v2.
- **Cero JavaScript por defecto.** Astro solo manda JS a las partes que lo
  necesitan (islas), así Lighthouse sigue alto aunque haya panel y chat.
- **Componentes `.astro`** con props y tipos: se parecen a HTML, así que se
  explican igual de fácil que los Web Components.
- **Imágenes optimizadas** con `astro:assets` (WebP/AVIF y tamaños) en vez de
  generarlas a mano como en la v2.
- **Comprobación en cada PR:** si algo no compila, se ve antes de fusionar.

## Alternativas descartadas

- **Seguir sin build (ADR 0001):** sirve para pocas páginas, pero dos idiomas
  y zonas privadas multiplican el HTML repetido.
- **Jekyll:** viene con GitHub Pages, pero es Ruby y no tiene componentes con
  JavaScript en el cliente.
- **Next.js:** su punto fuerte es el servidor, y GitHub Pages no lo tiene.
  Para una web estática es más pesado que Astro.

## Consecuencias

- Hace falta Node (22.22 o superior) para trabajar en local: `npm install` y
  `npm run dev`.
- En GitHub hay que cambiar la fuente de Pages a **GitHub Actions**
  (*Settings → Pages → Source*) cuando la v3 llegue a `main`.
- Los enlaces internos se generan con la base `/mi-web/`
  (`getRelativeLocaleUrl`), así que la `<base>` dinámica de la 404 de la v2
  ya no hace falta.
