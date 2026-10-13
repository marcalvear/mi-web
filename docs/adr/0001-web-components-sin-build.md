# ADR 0001: Web Components sin herramientas de build

- **Estado:** aceptada
- **Fecha:** 13/10/2026

## Contexto

La web tiene cinco páginas que comparten cabecera (logo, menú, menú móvil,
cambio de tema) y pie. Copiar el mismo HTML en cada página obliga a cambiar
cinco ficheros por cada enlace nuevo, y es fácil que alguno se quede atrás.

GitHub Pages solo sirve ficheros estáticos. Las opciones eran:

1. **Copiar y pegar** el HTML en cada página.
2. **Jekyll**, que GitHub Pages ya trae: plantillas `_includes` y `_layouts`.
3. **Un bundler** (Vite, Astro…) con un paso de build y un workflow de GitHub Actions.
4. **Web Components** nativos del navegador: `<site-header>` y `<site-footer>`.

## Decisión

Usar **Web Components** (opción 4), pintando en el DOM normal (sin Shadow DOM)
para que usen el CSS global y los tokens.

```html
<site-header current="me-gusta"></site-header>
```

## Por qué

- **Sin herramientas:** se edita un `.js` y se recarga. No hay que instalar
  Ruby (Jekyll) ni Node (bundler) para trabajar en la web.
- **Es JavaScript estándar** (`customElements.define`), lo mismo que vemos en
  clase, y se puede explicar línea a línea.
- **La raíz se calcula sola** con `import.meta.url`, así los enlaces funcionan
  igual en `/` (local), en `/mi-web/` (GitHub Pages) y en subcarpetas como
  `proyectos/sonrisa-imperial/`.

## Consecuencias

- Sin JavaScript no hay cabecera ni pie. Lo acepto porque el contenido
  principal está en el HTML de cada página y los enlaces internos también.
- Para que la página no salte cuando aparece la cabecera, el CSS le reserva
  el alto antes (`site-header { min-height: 72px }`). Lighthouse mide CLS 0.
- Si la web crece mucho (blog, decenas de páginas), convendría pasar a un
  generador estático como Astro, que también genera el HTML en el servidor.
