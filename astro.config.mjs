// @ts-check
import { defineConfig } from "astro/config";

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
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: { prefixDefaultLocale: false },
  },
});
