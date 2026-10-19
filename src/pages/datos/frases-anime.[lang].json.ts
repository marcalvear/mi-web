// Sirve el mazo de frases como /datos/frases-anime.es.json y .en.json. Se
// genera al compilar, así la página solo descarga su idioma cuando el mazo
// está a punto de verse.
import type { APIRoute, GetStaticPaths } from "astro";
import quotes from "../../data/frases-anime.json";

export const getStaticPaths = (() => [{ params: { lang: "es" } }, { params: { lang: "en" } }]) satisfies GetStaticPaths;

// En español va la traducción y el original, que sirve para reconocer las
// frases que llegan en vivo de Animechan. Si falta la traducción, sale en inglés.
const deck = {
  en: quotes.map(({ anime, series, character, text }) => ({ anime, series, character, text })),
  es: quotes.map(({ anime, series, character, text, es }) => ({
    anime,
    series,
    character,
    text: es ?? text,
    original: text,
    ...(es ? {} : { lang: "en" }),
  })),
};

export const GET: APIRoute = ({ params }) =>
  new Response(JSON.stringify(deck[params.lang as keyof typeof deck]), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
