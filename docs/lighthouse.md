# Lighthouse

Medido el 13/10/2026 con Lighthouse 12 en modo **móvil** (simulación de 4G
lenta y CPU 4x más lenta), con la web servida en local.

| Página | Rendimiento | Accesibilidad | Buenas prácticas | SEO | FCP | LCP | CLS |
|---|---|---|---|---|---|---|---|
| Inicio | 98 | 100 | 100 | 100 | 1,3 s | 2,3 s | 0 |
| Me gusta | 98 | 100 | 100 | 100 | 1,4 s | 2,3 s | 0 |
| Caso Sonrisa Imperial | 99 | 100 | 100 | 100 | 1,1 s | 2,0 s | 0 |
| Mensaje enviado | 99 | 100 | 100 | 63* | 1,1 s | 2,0 s | 0 |
| 404 | 100 | 100 | 100 | 63* | 1,1 s | 1,7 s | 0 |

\* SEO bajo **a propósito**: estas dos páginas llevan `noindex` porque no
tienen sentido en un buscador.

## Qué cambió el resultado

| Problema detectado | Arreglo | Efecto |
|---|---|---|
| Google Fonts bloqueaba el pintado | Fuentes propias con `preload` | Portada: FCP 2,8 s → 1,3 s, rendimiento 91 → 98 |
| Enlace del logo sin nombre en móvil (`display: none`) | Ocultar el texto solo a la vista | Accesibilidad 96 → 100 |
| Captura del proyecto más grande de lo necesario | `srcset` con 480 y 960 px | 16 KB menos en móvil |

## Avisos que solo aparecen en local

- **Compresión de texto:** el servidor de Python no comprime; GitHub Pages sí
  (gzip).
- **bfcache:** lo bloquea la cabecera `Cache-Control: no-store` del servidor
  local de desarrollo.

## Cómo repetir la medición

```bash
npx lighthouse http://localhost:8080/ --view
```
