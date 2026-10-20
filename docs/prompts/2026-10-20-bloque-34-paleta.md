# Bloque #34 (paleta de comandos ⌘K): órdenes a la IA

Conversación con Claude Code (Claude Opus 5.5) del 20 de octubre de 2026.
El contexto está en la issue #34.

## El encargo

> Yes, carry on with #34, the ⌘K command palette.

La issue pedía buscar y navegar por la web con el teclado, con acciones para
el tema, el idioma y el chat.

## Decisiones

- **Se abre con ⌘K (Mac) o Ctrl+K**, o con el botón «Buscar» de la cabecera,
  que en móvil se queda en una lupa (con su nombre para lectores de pantalla).
- **Es un `<dialog>` modal**: el navegador atrapa el foco y Esc lo cierra; al
  cerrar, el foco vuelve a donde estaba.
- **Patrón combobox + listbox de ARIA**: el foco se queda en el campo y
  `aria-activedescendant` marca la opción; flechas, Inicio/Fin y Enter.
- **Búsqueda sin tildes ni mayúsculas**, primero lo que empieza por lo escrito
  y luego lo que lo contiene o sale en las palabras clave.
- **Comandos**: todas las secciones y páginas, tema claro/oscuro/sistema (el
  botón de la cabecera se entera por un evento), la misma página en el otro
  idioma, abrir Marc IA, copiar el enlace, GitHub y LinkedIn.
