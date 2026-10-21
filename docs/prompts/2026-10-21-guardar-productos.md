# Compendio: guardar los productos que juntan suplementos (#81)

Conversación con Claude Code (Claude Opus 5.5) del 21 de octubre de 2026.

## El encargo

> He revisado el compendio y he visto que hay algunas tarjetas que no tienen
> opción de guardar. En específico, he visto que la tarjetita del suplemento
> Advanced Antioxidants no tiene opción de guardar.

## Causa

La estrella solo estaba en las fichas de suplemento (las ocho la tienen).
Advanced Antioxidants no es una ficha: es un producto al final del problema
«Envejecer mejor», en «Un producto que los junta», y esa tarjeta no la
llevaba.

## Arreglo

- La estrella pasa a su propio componente (`FavStar.astro`), con sus estilos,
  y la usan las fichas y los productos.
- `ProductList` la pone en cada producto cuando recibe los textos de la
  estrella; el compendio se los da a los productos de cada problema.
- En `favorites.supplement` se guarda el id del producto
  (`blueprint-advanced-antioxidants`). La tabla ya aceptaba cualquier id con
  forma de slug; el esquema del contenido ahora exige ese formato a los ids de
  producto.
- Mi espacio lo pinta con su marca y «Producto que junta varios», y enlaza a la
  tarjeta. El panel lo cuenta en «Lo más guardado» con su nombre.

## Comprobación

Con `astro preview` y el Supabase falso: guardar el producto da «Guardada»,
sale en Mi espacio y su enlace lleva a la tarjeta. Lighthouse del compendio:
95/100/100/100, CLS 0.
