// Punto de entrada común a todas las páginas.
// Cada página carga además su propio módulo si lo necesita.

import "./components/site-header.js";
import "./components/site-footer.js";
import { CHATBOT_URL } from "./config.js";
import { initStardust } from "./stardust.js";

initStardust();

// El asistente solo aparece cuando su Worker está desplegado
if (CHATBOT_URL) {
  import("./components/chat-bot.js").then(() => {
    const bot = document.createElement("chat-bot");
    bot.setAttribute("endpoint", CHATBOT_URL);
    document.body.append(bot);
  });
}
