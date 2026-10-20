# Cuatro productos más en el radar de biohacking (#61): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 20 de octubre de 2026.

## El encargo

> Te he pasado unos cuantos enlaces de productos para que añadas también a la
> lista de mis productos de biohacking [...] Añádelo siguiendo el diseño y el
> patrón que habías utilizado y, obviamente, ponlos cada uno en su respectiva
> categoría. Si hace falta, crea alguna categoría u organízalo como mejor creas.

Enlaces: el 302 Laser Cap, el Peptide Hair Serum y los Advanced Antioxidants
de Blueprint (Bryan Johnson), y WHOOP.

## Decisiones

- **Dos categorías nuevas.** «Pelo» para la gorra láser y el sérum, que no
  encajan en piel. «Longevidad» para los antioxidantes, que Blueprint vende
  como apoyo antienvejecimiento celular.
- **WHOOP va en Sueño y Recuperación**, junto al Oura y el Eight Sleep: mide
  sueño, esfuerzo y recuperación.
- **Datos de las webs oficiales**, en octubre de 2026:
  - Blueprint, desde su tienda europea (precios en euros).
  - WHOOP, desde su web en España (membresía desde 199 € al año).
  - La nota de precios pasa de «13 de octubre» a «octubre», porque ahora hay
    productos consultados en días distintos.
- **Fotos de producto de las webs oficiales**, en WebP y sin metadatos. La de
  WHOOP es la pulsera con su batería, con fondo transparente. Las de
  Blueprint son fotos de estudio, que llenan el marco (`cover`).
- **Marc IA** se regenera (`npm run chatbot:contexto`) para que sepa de los
  productos nuevos. Hay que volver a desplegar el Worker al publicar.
