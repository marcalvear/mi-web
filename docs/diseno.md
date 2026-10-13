# Decisiones de diseño

## La idea

Mi web es un pequeño **sistema planetario**. Cada bloque es un planetoide con su
propia gravedad y una **trayectoria** de puntos los une, como los viajes con la
estrella lanzadera de Super Mario Galaxy. Todo está dibujado por mí en SVG; no hay
logos, personajes ni músicas de Nintendo.

Elegí esta referencia porque es un juego que me gusta y porque su lenguaje
(planetas pequeños, gravedad, estrellas que se recogen) da recursos visuales
concretos, no solo «fondo de estrellas».

## Lo que descarté

- **La v1 (Cyberpunk 2077):** tenía personalidad, pero muchos elementos
  llamativos competían entre sí, el amarillo aparecía fuera de su sitio y todo
  eran cajas iguales.
- **El «tema espacial» por defecto:** fondo negro, estrellas y un acento dorado.
  Es lo primero que sale al pensar en «espacio» y no dice nada de mí. Lo cambié
  por un índigo con varios tonos pastel y la metáfora de planetoides con gravedad.

## Color

| Nombre | Hex | Uso |
|---|---|---|
| Espacio | `#141a4a` | Fondo. Índigo y no negro: más cálido, como el cielo del juego |
| Nebulosa | `#3b2a7a` | Planetas y superficies |
| Oro estrella | `#ffcf3f` | Acción principal (botones) y estrellas |
| Cometa | `#7fe3ff` | Enlaces y foco: todo lo que se puede usar |
| Luma rosa | `#ff9ecf` | Acento secundario, en pequeñas dosis |
| Polvo estelar | `#eef0ff` | Texto |

Cada color tiene **una sola función**, así se aprende rápido qué es clicable.
Todos los textos cumplen contraste **AA** en los dos temas (el más justo, 5,5:1).
El tema claro «Observatorio de día» usa los mismos nombres de variable con otros
valores; el oro nunca se usa como texto en claro porque no llega al contraste.

## Tipografía

- **Unbounded** para títulos: ancha y redondeada, recuerda a los rótulos del juego
  sin copiarlos.
- **Atkinson Hyperlegible Next** para leer: diseñada por el Braille Institute para
  que las letras parecidas (l, I, 1) no se confundan.
- Escala de **cuarta justa (1,333)** sobre 18 px, definida una sola vez en
  `tokens.css`. Líneas de texto de 62 caracteres como máximo.
- Las fuentes se sirven desde la propia web (licencia OFL) para no depender de
  Google al cargar.

## Composición

- Texto **alineado a la izquierda**; solo las páginas de aviso (mensaje enviado,
  404) van centradas porque son un único mensaje.
- **Pocas cajas.** Los hechos de «Lo que he hecho» se separan con líneas de órbita
  punteadas en lugar de tarjetas; solo los resultados de las APIs y el formulario
  tienen fondo, porque son zonas de interacción.
- La foto de «Sobre mí» es un planeta: círculo, anillo dorado y una órbita que
  pasa por detrás.

## Movimiento

Solo **un momento animado automático**: al cargar, mi nombre cae con la gravedad
del planeta y rebota (`cubic-bezier(.34, 1.56, .64, 1)`). La luna gira muy despacio
como fondo. El resto del movimiento responde a lo que hace la persona: la estrella
que recorre la trayectoria al hacer scroll, los resultados que «aterrizan», el
menú y el chat al abrirse. Con `prefers-reduced-motion` todo se detiene.

## Microinteracciones

- **Fragmentos de estrella:** como en el juego, se recogen pasando el cursor. El
  contador se guarda entre visitas y se ve en el pie. Es un guiño que premia
  explorar la web.
- **Tema claro/oscuro** con memoria.
- Botones que se elevan un poco al pasar por encima, como si flotaran.

## Textos

- Escritos en primera persona a partir de mis respuestas, sin adjetivos de relleno.
- Los botones dicen lo que pasa: «Ponte en contacto conmigo», «Enviar mensaje» y,
  al llegar, «Mensaje enviado».
- Los errores explican qué ha pasado y qué hacer («Revisa que tenga la forma
  nombre@correo.com»), sin pedir perdón.
