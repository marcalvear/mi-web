// Petición GET a una API externa con errores explicados en español.
// Todas las APIs de la web pasan por aquí, así los mensajes son coherentes.

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export async function getJSON(url, { notFound = "No hay resultados para esa búsqueda." } = {}) {
  let res;
  try {
    res = await fetch(url);
  } catch {
    // fetch solo falla así si no hay red o algo (un bloqueador) corta la petición
    throw new ApiError("No se pudo conectar. Revisa tu conexión o desactiva el bloqueador de anuncios para esta web.", 0);
  }
  if (res.status === 404) throw new ApiError(notFound, 404);
  if (res.status === 429) throw new ApiError("La API ha llegado a su límite de peticiones gratuitas. Vuelve a probar en un rato.", 429);
  if (!res.ok) throw new ApiError("La API no responde ahora mismo. Prueba otra vez en un rato.", res.status);
  return res.json();
}
