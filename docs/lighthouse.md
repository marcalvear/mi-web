# Lighthouse

## v3 (20/10/2026)

Medido con Lighthouse 12 en modo **móvil** (4G lenta simulada y CPU 4 veces
más lenta) sobre la compilación (`npm run build` + `astro preview`), con todos
los servicios conectados (Supabase, n8n, Turnstile y Marc IA).

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | CLS |
|---|---|---|---|---|---|---|---|
| Inicio | 95 | 100 | 100 | 100 | 1,5 s | 2,9 s | 0 |
| Inicio (EN) | 96 | 100 | 100 | 100 | 1,5 s | 2,7 s | 0 |
| Caso Sonrisa Imperial | 94 | 100 | 100 | 100 | 1,5 s | 3,0 s | 0 |
| Caso Sonrisa Imperial (EN) | 95 | 100 | 100 | 100 | 1,5 s | 2,9 s | 0 |
| Me gusta | 93 | 100 | 100 | 100 | 1,8 s | 3,0 s | 0 |
| Me gusta (EN) | 94 | 100 | 100 | 100 | 1,8 s | 2,9 s | 0 |
| Entrar | 93 | 100 | 100 | 100 | 1,9 s | 3,0 s | 0 |
| Mi espacio | 93 | 100 | 100 | 60* | 2,0 s | 3,0 s | 0 |
| Panel | 93 | 100 | 100 | 60* | 1,9 s | 3,0 s | 0 |
| Privacidad | 97 | 100 | 100 | 100 | 1,5 s | 2,6 s | 0 |
| Sistema de diseño | 96 | 100 | 100 | 60* | 1,5 s | 2,7 s | 0 |
| 404 | 97 | 100 | 100 | 60* | 1,5 s | 2,6 s | 0 |

\* SEO bajo **a propósito**: estas páginas llevan `noindex` porque son
privadas (Mi espacio, panel) o internas (sistema de diseño, 404) y no deben
salir en un buscador. Lighthouse lo puntúa como fallo de SEO.

### Qué cambió el resultado

| Problema detectado | Arreglo | Efecto |
|---|---|---|
| En Mi espacio, panel y Entrar el pie saltaba al aparecer el contenido que pinta JavaScript según la sesión | Alto mínimo (80vh) para esa zona desde el principio | CLS 0,11 → 0 en Mi espacio (rendimiento 90 → 93), 0,078 → 0 en el panel y 0,028 → 0 en Entrar |
| La Pokédex cargaba la ilustración de GitHub como PNG de 111 KB (#28) | `<Picture>` de Astro con AVIF/WebP y carga prioritaria | Me gusta: rendimiento 90 → 94 |
| El script de Turnstile y el chat podrían frenar la portada | Turnstile solo se descarga cuando el formulario está cerca de verse; el chat no hace ninguna petición hasta que se usa | La portada sigue en 95-96 con el formulario y el chat |

### Avisos que quedan

- **JavaScript sin usar (45 KB)** en Entrar, Mi espacio y panel: es el cliente
  de Supabase, que hace falta para la sesión.
- **LCP de 2,6 a 3 s**: es el titular, que espera a la fuente variable, con
  la simulación de móvil lento.
- **Compresión y bfcache**: el servidor local no comprime y bloquea la
  bfcache; GitHub Pages sí comprime (gzip).

## v2 (13/10/2026)

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| Inicio | 98 | 100 | 100 | 100 |
| Me gusta | 98 | 100 | 100 | 100 |
| Caso Sonrisa Imperial | 99 | 100 | 100 | 100 |
| Mensaje enviado | 99 | 100 | 100 | 63* |
| 404 | 100 | 100 | 100 | 63* |

La v2 era más ligera (HTML sin framework, sin usuarios ni servicios externos);
la v3 hace mucho más y se mantiene por encima de 90 en todo.
