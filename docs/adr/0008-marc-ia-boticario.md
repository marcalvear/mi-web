# ADR 0008: Marc IA hace de «boticario» dentro del compendio

- **Estado:** aceptada
- **Fecha:** 21/10/2026
- **Issue:** [#69](https://github.com/marcalvear/mi-web/issues/69), épica [#63](https://github.com/marcalvear/mi-web/issues/63)

## Contexto

El compendio de biohacking ordena suplementos por problemas, con su nivel de
evidencia, la dosis estudiada, las precauciones y cada estudio enlazado. Marc
quería que el asistente de la web lo conociera entero y orientara a quien
cuenta lo que le pasa: un «boticario».

Hay tres riesgos:

- **Salud.** Un asistente que habla de suplementos puede sonar a consejo
  médico, subir el nivel de evidencia o inventar dosis.
- **Coste.** Workers AI gratis da 10.000 neurons al día. Meter el compendio en
  cada pregunta encarece también las que no van de suplementos.
- **Idioma.** El compendio está en los dos idiomas, pero las instrucciones
  están en español, y el modelo tiende a contestar en español.

## Decisión

**Un mismo Worker con dos modos**, que elige la página:

- **General** (todas las páginas menos el compendio). Igual que antes, con el
  contexto de la web y una línea sobre el compendio: qué es, qué problemas
  cubre y que dentro hay un boticario.
- **Boticario** (`/biohacking/`). El widget se llama «Boticario IA» y manda
  `mode: "boticario"`. El Worker usa otras instrucciones, con el compendio
  entero en el idioma de la página. Un modo que no conoce se queda en el
  general.

**El compendio se genera del contenido.** `npm run chatbot:contexto` lee los
mismos JSON que pinta la web (`src/content/compendio`), así que el boticario
nunca sabe algo que la página no diga.

**Reglas de salud en las instrucciones**, probadas con el modelo real:

- ante una señal de alarma, solo manda al médico, sin hablar de suplementos;
- con medicación, embarazo o una enfermedad, manda consultar antes y nombra
  la precaución de la ficha;
- el nivel de evidencia y las cifras van tal cual, sin sumar estudios;
- si algo no está en el compendio, lo dice y no recomienda nada más;
- cierra con «es divulgación, no consejo médico»;
- respuestas cortas: como mucho 2 fichas y 2 estudios.

El Worker quita además las negritas de Markdown que a veces pone el modelo,
porque el widget pinta texto plano.

## Consecuencias

- Cada respuesta del boticario gasta más: unos 3.000 tokens de entrada frente
  a unos 1.800 del modo general. Las preguntas generales no pagan el compendio.
- Al añadir problemas al compendio hay que volver a ejecutar
  `npm run chatbot:contexto` y desplegar el Worker. Si el compendio crece mucho,
  habrá que mandar solo el problema que toque.
- Las reglas son instrucciones a un modelo, no una garantía. Por eso el widget
  avisa de que es divulgación y de que puede equivocarse.

## Actualización (22/10/2026, [#103](https://github.com/marcalvear/mi-web/issues/103) y [#107](https://github.com/marcalvear/mi-web/issues/107))

El compendio creció a 10 problemas y mandarlo entero en cada pregunta ya no
compensaba. Ahora el boticario recibe el índice de problemas y el detalle solo
del problema que se está leyendo: cada página de problema lo manda en
`problem`, y desde el índice el Worker lo adivina por las palabras de las
últimas preguntas. Si no encaja ninguno, va solo el índice y el boticario
manda a la página que toque. Cada respuesta lleva entre ≈2.000 y ≈4.500 tokens
de entrada según el problema.
