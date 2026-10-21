// Textos del asistente «Marc IA» (#33) en los dos idiomas.
import type { Lang } from "./ui";

export const chat = {
  es: {
    open: "Pregúntame",
    title: "Marc IA",
    note: "Responde una IA con lo que dice esta web. Puede equivocarse.",
    close: "Cerrar el asistente",
    label: "Conversación con Marc IA",
    hello: "Hola. Soy el asistente de la web de Marc. Pregúntame qué estudia, qué ha hecho o cómo escribirle.",
    suggestions: ["¿Qué estudia Marc?", "¿Qué proyectos ha hecho?", "¿Cómo le escribo?"],
    input: "Tu pregunta",
    placeholder: "Escribe tu pregunta…",
    send: "Enviar",
    thinking: "Pensando…",
    you: "Tú",
    bot: "Marc IA",
    clear: "Empezar de nuevo",
    // En el compendio hace de «boticario» (#69): estos textos sustituyen a los de arriba
    boticario: {
      open: "Pregunta al boticario",
      title: "Boticario IA",
      bot: "Boticario IA",
      note: "Responde una IA con lo que dice el compendio. Es divulgación, no consejo médico, y puede equivocarse.",
      hello: "Hola. Cuéntame qué te pasa y te digo qué fichas del compendio mirar, con su evidencia, su dosis estudiada y sus precauciones. No sustituyo a tu médico.",
      suggestions: ["Tengo digestiones pesadas", "¿Qué tiene más evidencia?", "¿Puedo combinarlos?"],
      placeholder: "Cuéntame qué te pasa…",
    },
    errors: {
      busy: "El asistente ha llegado a su límite de hoy. Escríbeme con el formulario de contacto.",
      network: "No he podido conectar con el asistente. Revisa tu conexión.",
      generic: "Algo ha fallado. Prueba otra vez o escríbeme con el formulario de contacto.",
    },
  },
  en: {
    open: "Ask me",
    title: "Marc AI",
    note: "An AI answers with what this site says. It can make mistakes.",
    close: "Close the assistant",
    label: "Conversation with Marc AI",
    hello: "Hi. I'm the assistant on Marc's website. Ask me what he studies, what he's built or how to reach him.",
    suggestions: ["What does Marc study?", "What has he built?", "How can I contact him?"],
    input: "Your question",
    placeholder: "Type your question…",
    send: "Send",
    thinking: "Thinking…",
    you: "You",
    bot: "Marc AI",
    clear: "Start over",
    boticario: {
      open: "Ask the apothecary",
      title: "Apothecary AI",
      bot: "Apothecary AI",
      note: "An AI answers with what the compendium says. It's science writing, not medical advice, and it can make mistakes.",
      hello: "Hi. Tell me what's bothering you and I'll point you to the compendium sheets worth reading, with their evidence, the dose studied and their cautions. I'm no substitute for your doctor.",
      suggestions: ["I get heavy digestion", "Which has the most evidence?", "Can I combine them?"],
      placeholder: "Tell me what's bothering you…",
    },
    errors: {
      busy: "The assistant has reached today's limit. Write to me with the contact form.",
      network: "I couldn't reach the assistant. Check your connection.",
      generic: "Something went wrong. Try again or write to me with the contact form.",
    },
  },
} satisfies Record<Lang, unknown>;

export type ChatText = (typeof chat)["es"];
