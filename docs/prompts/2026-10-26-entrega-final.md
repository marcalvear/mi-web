# Entrega final: revisión completa (#115)

Conversación con Claude Code del 26 de octubre de 2026.

> Antes de dejar el proyecto definitivamente, quiero que me hagas una
> revisión de toda la web, de todos los apartados y de todas sus
> funcionalidades. Que lo dejes todo listo: la documentación, bien
> ordenadita para que el profe pueda verla. Cuando acabes, despliega la web,
> revísala online y cierra todo lo que tengas que cerrar en GitHub.

## Qué se revisó, en la web publicada

- **45 páginas** (español e inglés): todas responden, tienen título,
  descripción, idioma y un solo `h1`, ninguna imagen sin `alt` y ningún `id`
  repetido.
- **Enlaces e imágenes**: 46 enlaces internos y 265 imágenes, sin fallos;
  los 466 enlaces externos se abren en otra pestaña (`npm run check:enlaces`).
- **404, landing, vídeo, sitemap e imágenes para compartir**: correctos.
- **Funciones**:
  - tema claro, oscuro y del sistema, que se guarda al recargar;
  - cambio de idioma y paleta ⌘K;
  - Marc IA (modo general) y Boticario IA (modo compendio) responden;
  - visor de fotos, Pokédex (PokéAPI) y mazo de frases;
  - formulario de contacto: la validación marca los campos y no envía nada
    si faltan (no se mandó ningún mensaje real); el captcha se carga al
    acercarse al formulario;
  - Entrar, Mi espacio y panel sin sesión piden entrar; la estrella de
    favoritos avisa y lleva a Entrar con vuelta a la ficha. No se inició
    sesión para no enviar correos.
- **Compendio**: 11 problemas, cada suplemento enciende su zona en ES y EN.
- **Consola**: sin errores en las páginas visitadas.
- **Lighthouse en móvil**: ver `docs/lighthouse.md`.

## Cierre

Documentación al día, índice de las órdenes en `docs/prompts/README.md`,
versión 3.1.0 y release final en GitHub.

## Después de la entrega: Mi espacio y el panel (#117, #118, #119)

Marc revisó el panel y Mi espacio con su cuenta de administrador.

> En Mi espacio, esto está un poco mal ordenado y alineado, ¿no?

- **Tabla de usuarios del panel (#117)**: sin nombre se repetía el email, el
  email y las fechas se partían en dos líneas y el número de favoritos se
  pegaba a la fecha. Ahora pone «Sin nombre», todo va en una línea y los
  números van centrados.

> Si entro con mi correo de administrador, lo primero que me sale en Mi
> espacio es el mismo panel que a un usuario normal. ¿Qué me sugieres?

- Se propusieron dos opciones (adaptar Mi espacio al administrador o
  llevarle directo al panel) y Marc eligió la primera.
- **Mi espacio para el administrador (#118)**: sin conversación ni «Escribe
  a Marc», con sus fichas guardadas, una entradilla propia y un botón «Ir al
  panel». Los usuarios lo siguen viendo igual. El email del lateral corta
  después de la @.
- Marc lo comprobó en la web publicada con su cuenta.

Después se repitió la revisión completa en vivo y se cerró el proyecto con la
release v3.1.1.
