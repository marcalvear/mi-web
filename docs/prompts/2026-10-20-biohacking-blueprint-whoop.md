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

## Después: las fotos se veían poco definidas

> me parece que las imágenes de cada producto de biohacking, en general todas,
> se ven a demasiada baja resolución [...] se ve un poco poco profesional.

En una pantalla de densidad 2 (la de casi todos los Mac y móviles), cada hueco
de foto mide 430 px y necesita una imagen de 860 px. La web servía 560 px como
mucho, y tres originales (TheraFace, JetBoots y Eight Sleep) solo tenían 650-670
px.

- **Tamaños**: el componente genera versiones de 440, 880 y 1320 px, en vez de
  320 y 560. Ahora se sirven 880 px en un escritorio de densidad 2 y 1320 px en
  un móvil de densidad 3. Las 8 fotos de 880 px en AVIF pesan unos 96 KB entre
  todas, y se cargan al bajar.
- **Originales nuevos** de las webs oficiales:
  - TheraFace y JetBoots: la misma foto, a 1424 px.
  - Eight Sleep: su foto principal, a 1600 px (la funda sobre el colchón con
    la base al pie), en lugar de un recorte pequeño.
  - Blueprint: a tamaño completo (1024-1200 px).
- **Las fotos de Therabody llenan el marco** (`cover`). Traen su propio fondo
  beis, y con `contain` se veía un rectángulo de otro tono dentro del marco.

## Después: el sérum facial en lugar del capilar

> Quiero que reemplaces el producto, el serum de péptidos capilares, por el
> serum facial que te acabo de pasar. Es de la misma marca [...] fíjate también
> en que la calidad de la imagen sea buena.

- El **SFC Facial Serum** de Blueprint (SFC, NMN y ácido hialurónico; mañana y
  noche; 68,02 € al mes) sustituye al Peptide Hair Serum.
- Va en **Piel**, junto a la TheraFace. **Pelo** se queda solo con la Laser Cap.
- La foto es la de producto de la web oficial, a 1200 px, con el mismo estilo
  de estudio que las otras de Blueprint.
