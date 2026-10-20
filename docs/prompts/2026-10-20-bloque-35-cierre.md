# Bloque #35 (documentación, Lighthouse y publicación): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 20 de octubre de 2026.
El contexto está en la issue #35 y en la #21, que agrupa toda la v3.

## El encargo

> Vale, pues el informe antes de fusionar y seguir

(después de la paleta ⌘K). La issue pedía README, ADR, decisiones de diseño,
Lighthouse ≥ 90 en todas las páginas y la etiqueta `v3`. En un comentario
quedó apuntado probar, ya publicada, los botones de los correos de n8n.

## Norma para fusionar

Desde el bloque #32 acordamos esto:

> a partir de ahora, cuando la compilación pase y yo haya probado el bloque,
> fusiona y cierra tú, obviamente me notificarás antes de hacerlo y me harás un
> resumen del PR y el issue que se cierre para poder revisar que está todo bien

El PR final de `v3` a `main` va aparte, porque es el que publica la web.

## Decisiones

- **Lighthouse en las 12 páginas** (ES y EN) sobre la compilación, en móvil.
- **README nuevo**: qué tiene la web, cómo está hecha, estructura, variables
  públicas y cómo se ha trabajado.
- **docs/diseno.md** recoge las piezas interactivas de los bloques #30 a #34.
- **Publicación**: GitHub Pages pasa de publicar la rama `main` a publicar con
  GitHub Actions, se fusiona `v3` en `main` y se etiqueta `v3`.
