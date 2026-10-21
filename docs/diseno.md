# Diseño de la v3: cuaderno de laboratorio

La v3 se presenta como mi **cuaderno de laboratorio**: el sitio donde apunto lo que
aprendo de IA, los experimentos que hago y lo que sale de ellos. La v1 (Cyberpunk 2077)
y la v2 (Super Mario Galaxy) partían de un videojuego. Esta parte de lo que hago: aprender
probando, y para eso se usa un cuaderno.

El muestrario con todas las piezas está en [`/sistema/`](https://marcalvear.github.io/mi-web/sistema/)
(`src/pages/sistema.astro`).

## Decisiones y por qué

| Decisión | Por qué |
|---|---|
| **Papel cuadriculado** de 24 px como fondo | Es lo primero que dice «cuaderno técnico». La cuadrícula también marca el ritmo: todos los espacios son múltiplos de 8 px |
| **Línea roja de margen** (solo en pantallas anchas) | Detalle de libreta que separa el margen de anotaciones del texto. En móvil se quita para no robar ancho |
| **Newsreader** (serif) para leer | Diseñada para textos largos en pantalla y con ajuste óptico: los títulos grandes salen finos y elegantes y el texto pequeño, robusto. Mi web es sobre todo texto con voz propia |
| **JetBrains Mono** para datos | Fechas, números de entrada, etiquetas y diagramas van «a máquina», como las anotaciones técnicas. Separa lo que es dato de lo que es relato |
| **Un solo color fuerte**: rotulador rojo | Se reserva para una acción por pantalla (el CTA), los números de entrada y las notas al margen. Si todo es rojo, nada destaca |
| **Tinta azul** para los enlaces | El azul de bolígrafo de toda la vida: se reconoce como enlace sin explicarlo |
| **Entradas numeradas** (`01 · Marca`) | Cada bloque de la pauta es una entrada del cuaderno. Da orden y ayuda a hablar de la web en la defensa («en la entrada 3…») |
| **Figuras con cinta adhesiva** (`Fig. 1`) | Las capturas y diagramas parecen pegados en la libreta. Un pie numerado obliga a explicar cada imagen |
| **Sombras duras** en los botones | Como una tarjeta de cartulina pegada; al pulsar se «hunde». Microinteracción con sentido físico, sin desenfoques |
| **Logo**: la M como flujo de cinco nodos | Una M hecha de nodos conectados, como los flujos de IA que monto. El nodo rojo del centro es la IA, el punto donde el trabajo aburrido cambia de manos. Es SVG propio y hereda el color del tema |
| **Diagramas SVG animados** | Los cables se dibujan al entrar en pantalla y un punto rojo recorre el flujo como un dato. Explican cómo funcionan las cosas (contacto, chatbot) en vez de decorar |
| **Modo oscuro**: la libreta de noche | Papel grafito, tinta crema y el rojo más claro para mantener el contraste. Sigue al sistema y se puede fijar a mano |

## Paleta

| Token | Claro | Oscuro | Uso | Contraste (claro / oscuro) |
|---|---|---|---|---|
| `--paper` | `#f6f1e6` | `#14171d` | Fondo | — |
| `--sheet` | `#fbf8f1` | `#1b1f27` | Tarjetas, formularios | — |
| `--ink` | `#1c1f26` | `#ece6d8` | Texto | 14,6 / 14,4 |
| `--ink-soft` | `#4a4f5c` | `#a9aebb` | Texto secundario | 7,3 / 8,1 |
| `--accent` | `#b3261e` | `#ff8a70` | CTA, anotaciones | 5,8 / 7,8 |
| `--link` | `#1e4fb3` | `#8db2ff` | Enlaces | 6,6 / 8,5 |
| `--mark` | `#fbe38e` | `#5c4a12` | Resaltado | tinta sobre él: 12,9 / 6,9 |

Todos los pares de texto pasan **AA** (4,5:1) y la mayoría AAA. La cuadrícula y la línea de
margen son decorativas y no llevan información.

## Movimiento

- Duraciones con nombre: `--fast` (160 ms) para hover, foco y pulsar, `--mid` (240 ms) para
  la interfaz (tarjetas, desplegables, cambios de ficha), `--slow` (420 ms) solo para fotos
  y dibujos, y `--draw` (1,4 s) para trazar diagramas. En interfaz, nunca más de 300 ms.
- Los diagramas solo se animan cuando se ven (`IntersectionObserver`) y se paran fuera de
  pantalla.
- Con `prefers-reduced-motion` todo aparece ya dibujado y quieto.

## Accesibilidad

- Foco visible con el rotulador rojo en todos los elementos.
- Objetivos táctiles de 44 px como mínimo en la cabecera y los botones.
- Selector de idioma con el nombre completo para lectores de pantalla («English»), no solo «EN».
- El botón de tema anuncia el tema actual.
- Los enlaces a otras webs se abren en otra pestaña y lo avisan: una flecha en diagonal (↗) a la
  vista y «(se abre en otra pestaña)» para lectores de pantalla. Las flechas rectas (→) se quedan
  en la web. `npm run check:enlaces` lo comprueba en cada despliegue (#53).
- Los diagramas son `role="img"` con un `<title>` que cuenta el recorrido entero.
- En móvil los diagramas mantienen un tamaño de letra legible y se desplazan dentro de su caja,
  sin scroll horizontal en la página.

## Piezas interactivas (bloques #30 a #34)

Todas reutilizan las mismas piezas del cuaderno: la **ficha** (fondo `--sheet`,
borde de tinta y sombra dura), el **rotulador rojo** para lo importante y la
**etiqueta** monoespaciada en mayúsculas.

| Pieza | Patrón | Accesibilidad |
|---|---|---|
| Formulario F-1 | Ficha con campos de tinta; el error se marca en rojo solo después de intentar enviar | Etiquetas visibles, el foco va al primer campo erróneo, mensajes en `role="status"` |
| Mi espacio y panel | Cada mensaje es una entrada del cuaderno; las mías llevan el margen rojo | Hilos en listas ordenadas, textos con `textContent`, la conversación abierta recibe el foco |
| Marc IA | Botón-etiqueta fijo; el chat se abre encima sin moverlo | `role="log"` con `aria-live`, Escape cierra y devuelve el foco |
| Paleta ⌘K | Ficha que cae sobre la página con el fondo atenuado | `<dialog>` modal (foco atrapado), combobox + listbox con `aria-activedescendant` |

## Rendimiento

- Fuentes variables servidas desde la web (paquetes `@fontsource-variable`), con `preload`
  del subconjunto latino.
- CSS dentro del HTML (`inlineStylesheets: "always"`): no bloquea el primer pintado.
- Lighthouse en móvil sobre la compilación de este bloque (#25): rendimiento 97, accesibilidad 100,
  buenas prácticas 100, SEO 100 y CLS 0. Las mediciones de todas las páginas de la v3 están en
  [lighthouse.md](lighthouse.md).

## Herramientas

El punto de partida salió de la skill **UI/UX Pro Max** (`--design-system` para «portfolio
editorial técnico»). Propuso brutalismo y Caveat + Quicksand. Me quedé con la idea de
cuadrícula visible, bordes marcados y contraste alto, y cambié la tipografía por una
pareja serif + mono («Minimalist Monochrome Editorial» de la misma skill, simplificada a
dos familias), porque la escrita a mano no encajaba con un cuaderno técnico.
