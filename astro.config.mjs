// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// GitHub Pages publica el repositorio en /mi-web/, así que todas las rutas
// cuelgan de esa base. El español es el idioma por defecto y va sin prefijo;
// el inglés vive en /en/.
export default defineConfig({
  site: "https://marcalvear.github.io",
  base: "/mi-web",
  trailingSlash: "always",
  // El CSS es pequeño: va dentro del HTML y no bloquea el primer pintado
  build: { inlineStylesheets: "always" },
  // La ilustración del primer Pokémon se descarga al compilar y se sirve
  // optimizada desde la propia web en vez de desde GitHub
  image: { domains: ["raw.githubusercontent.com"] },
  // Mapa del sitio para los buscadores, con cada página enlazada a su versión
  // en el otro idioma. Fuera las que llevan noindex: las privadas (Mi espacio,
  // panel), las internas (sistema de diseño) y el compendio mientras es un
  // prototipo (#64)
  integrations: [
    sitemap({
      i18n: { defaultLocale: "es", locales: { es: "es-ES", en: "en-GB" } },
      filter: (page) => !/\/(mi-espacio|panel|sistema|biohacking)\/$/.test(page),
    }),
  ],
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
});
