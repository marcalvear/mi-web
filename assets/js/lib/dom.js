// Pequeñas ayudas para crear elementos sin usar innerHTML con datos de fuera.

export function el(tag, text, className) {
  const node = document.createElement(tag);
  if (text !== undefined && text !== null) node.textContent = text;
  if (className) node.className = className;
  return node;
}

// Mensaje de estado accesible (el elemento debe tener aria-live)
export function setStatus(node, text, isError = false) {
  node.textContent = text;
  node.classList.toggle("is-error", isError);
}

// Reinicia una animación CSS de entrada cada vez que cambia el contenido
export function replay(node, className = "is-entering") {
  node.classList.remove(className);
  void node.offsetWidth;
  node.classList.add(className);
}

export const random = (n) => Math.floor(Math.random() * n);
