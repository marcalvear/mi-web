// Sirve el mazo de frases como /datos/frases-anime.json. Se genera al compilar,
// así la página solo lo descarga cuando el mazo está a punto de verse.
import type { APIRoute } from "astro";
import quotes from "../../data/frases-anime.json";

export const GET: APIRoute = () =>
  new Response(JSON.stringify(quotes), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
