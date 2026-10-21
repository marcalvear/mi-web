# Compendio de biohacking: integración y Marc IA como boticario (#63, #69)

Conversación con Claude Code (Claude Opus 5.5) del 21 de octubre de 2026.

## El encargo

Con los favoritos publicados, Marc eligió la siguiente fase:

> Fase de integración: menú, ⌘K, el radar de Me gusta y Marc IA como
> boticario.

La idea del boticario venía de la sesión anterior: que Marc IA conozca todo
el compendio y oriente dentro de `/biohacking/` según lo que te pasa, con la
evidencia, las precauciones y el aviso de que no es consejo médico. También,
que conozca los datos y precios de los productos.

## Decisiones

- **El compendio deja de estar oculto**:
  - sin `noindex` y dentro del mapa del sitio;
  - «Biohacking» en la cabecera, marcado cuando estás en la página;
  - una entrada en ⌘K («Compendio de biohacking», que se encuentra también
    buscando suplementos, evidencia o digestión);
  - la entrada del radar en ⌘K pasa a llamarse «Radar de biohacking».
- **Me gusta**: antes de los productos del radar, una ficha en verde de
  laboratorio con las cifras reales del compendio y el enlace. El radar se
  queda como estaba.
- **Mi espacio**: «Fichas guardadas» sale siempre. Sin fichas, invita a abrir
  el compendio.
- **Marc IA con dos modos** ([ADR 0008](../adr/0008-marc-ia-boticario.md)).
  - En el compendio, el widget se llama «Pregunta al boticario» y el Worker
    usa otras instrucciones con el compendio entero.
  - El compendio sale de los mismos JSON que la web, en los dos idiomas.
  - Fuera del compendio, el asistente solo sabe que existe.
- **Probado con el modelo de verdad** (`wrangler dev`, sin desplegar). La
  primera versión fallaba en cuatro cosas, que se corrigieron:
  - respuestas largas y con negritas;
  - ante «heces negras» mandaba al médico, pero luego listaba suplementos;
  - en inglés mezclaba datos en español;
  - sumaba personas de estudios distintos.

  Las pruebas de después cubren varios casos y salen bien: pesadez,
  Sintrom, sueño (que no está en el compendio), heces negras, productos en
  inglés, pedir los estudios y un intento de saltarse las reglas.
- **El Worker no arrancaba** con el Wrangler actual, porque `index.js`
  exportaba un texto (`MODEL`). El modelo pasa a `src/model.js`. Sin esto, el
  próximo despliegue también habría fallado.
- **Prueba en el navegador**: dos cosas que no se veían sin el chat conectado.
  - En móvil, el aviso de la estrella quedaba debajo del botón de Marc IA:
    ahora sale por encima.
  - Las cifras del adelanto se montaban en móvil.
- **Copy** en la voz de Marc, como en las fases anteriores.

## Después de fusionar

Hay que desplegar el Worker (`npx wrangler@4 deploy` en `worker/chatbot`).
Se puede desplegar antes: la web publicada no manda `mode` y recibe el
asistente general de siempre.
