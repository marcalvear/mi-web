// Textos de la página Me gusta en los dos idiomas.
import type { Lang } from "./ui";

export const likes = {
  es: {
    meta: {
      title: "Me gusta",
      description: "Pokédex, frases de Naruto y JoJo, y los gadgets de biohacking que me interesan.",
    },
    kicker: "Cuaderno nº 3 · Anexo B",
    title: "Me gusta",
    lead: "Lo que hago cuando no estoy estudiando, con datos de verdad sacados de APIs abiertas.",
    deck: {
      kicker: "Anime y manga",
      title: "Mazo de frases",
      intro:
        "Todas las frases de Naruto y JoJo's Bizarre Adventure que tiene Animechan, barajadas. No se repite ninguna hasta que salgan todas, aunque cierres la página.",
      filters: { label: "Serie", all: "Todas", naruto: "Naruto", jojo: "JoJo" },
      next: "Otra frase",
      live: "Pedir una en vivo a Animechan",
      loading: "Barajando el mazo…",
      liveLoading: "Preguntando a Animechan…",
      fromDeck: "Del mazo",
      liveNew: "En vivo · nueva, no estaba en el mazo",
      liveKnown: "En vivo · ya estaba en el mazo",
      count: "Llevas {seen} de {total}",
      left: "quedan {left}",
      reshuffled: "Ya habías visto todas. He vuelto a barajar el mazo.",
      error: "No he podido cargar el mazo. Recarga la página para intentarlo otra vez.",
      limit: "Animechan solo deja 100 peticiones al día y ya se han gastado. El mazo sigue funcionando.",
      liveError: "Animechan no responde ahora mismo. El mazo sigue funcionando.",
      source: "Frases de Animechan, descargadas con scripts/descargar-frases.mjs. Están en inglés.",
    },
  },
  en: {
    meta: {
      title: "Things I like",
      description: "A Pokédex, quotes from Naruto and JoJo, and the biohacking gadgets I'm into.",
    },
    kicker: "Notebook no. 3 · Appendix B",
    title: "Things I like",
    lead: "What I do when I'm not studying, with real data from open APIs.",
    deck: {
      kicker: "Anime and manga",
      title: "Quote deck",
      intro:
        "Every Naruto and JoJo's Bizarre Adventure quote on Animechan, shuffled. None repeats until you've seen them all, even if you close the page.",
      filters: { label: "Series", all: "All", naruto: "Naruto", jojo: "JoJo" },
      next: "Another quote",
      live: "Ask Animechan for a live one",
      loading: "Shuffling the deck…",
      liveLoading: "Asking Animechan…",
      fromDeck: "From the deck",
      liveNew: "Live · new, it wasn't in the deck",
      liveKnown: "Live · already in the deck",
      count: "{seen} of {total} seen",
      left: "{left} left",
      reshuffled: "You'd seen them all. I've shuffled the deck again.",
      error: "I couldn't load the deck. Reload the page to try again.",
      limit: "Animechan only allows 100 requests a day and they're used up. The deck still works.",
      liveError: "Animechan isn't answering right now. The deck still works.",
      source: "Quotes from Animechan, downloaded with scripts/descargar-frases.mjs.",
    },
  },
} satisfies Record<Lang, unknown>;

export type DeckText = (typeof likes)["es"]["deck"];
