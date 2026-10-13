// <chat-bot endpoint="https://…workers.dev">
// Asistente con IA. La web solo habla con mi Worker de Cloudflare;
// el Worker añade las instrucciones y llama al modelo (ver worker/chatbot).

const STORAGE_KEY = "chat";
const GREETING = "¡Hola! Soy el asistente de Marc. Pregúntame por sus proyectos, lo que estudia o cómo contactarle.";
const SUGGESTIONS = ["¿Qué estudia Marc?", "¿Qué puede hacer por mi startup?", "¿Cómo le escribo?"];

const ICON = `<svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true"><circle cx="16" cy="17" r="9" fill="currentColor" opacity=".9"/><ellipse cx="16" cy="17" rx="15" ry="4.5" fill="none" stroke="currentColor" stroke-width="2.2" transform="rotate(-18 16 17)"/></svg>`;

class ChatBot extends HTMLElement {
  connectedCallback() {
    this.endpoint = this.getAttribute("endpoint");
    this.history = this.load();

    this.innerHTML = `
      <button class="chat-launcher" type="button" aria-expanded="false" aria-controls="chat-panel">
        ${ICON}<span>Pregúntame</span>
      </button>
      <section class="chat-panel" id="chat-panel" role="dialog" aria-labelledby="chat-title" aria-describedby="chat-desc" hidden>
        <header class="chat-panel__head">
          <div>
            <h2 id="chat-title">Asistente de Marc</h2>
            <p id="chat-desc">Responde una IA con la información de esta web. Puede equivocarse.</p>
          </div>
          <button class="chat-panel__close" type="button" aria-label="Cerrar el asistente">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>
          </button>
        </header>
        <ol class="chat-log" role="log" aria-live="polite"></ol>
        <div class="chat-suggestions"></div>
        <form class="chat-form">
          <label class="visually-hidden" for="chat-input">Escribe tu pregunta</label>
          <input id="chat-input" type="text" maxlength="800" autocomplete="off" placeholder="Escribe tu pregunta…" required>
          <button class="btn" type="submit">Enviar</button>
        </form>
      </section>`;

    this.launcher = this.querySelector(".chat-launcher");
    this.panel = this.querySelector(".chat-panel");
    this.log = this.querySelector(".chat-log");
    this.form = this.querySelector(".chat-form");
    this.input = this.querySelector("#chat-input");
    this.sendButton = this.form.querySelector("button");
    this.suggestions = this.querySelector(".chat-suggestions");

    this.launcher.addEventListener("click", () => this.toggle(!this.isOpen()));
    this.querySelector(".chat-panel__close").addEventListener("click", () => this.toggle(false));
    this.panel.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.toggle(false);
    });
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.ask(this.input.value);
    });

    SUGGESTIONS.forEach((text) => {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = text;
      b.addEventListener("click", () => this.ask(text));
      this.suggestions.append(b);
    });

    this.render();
  }

  isOpen() {
    return !this.panel.hidden;
  }

  toggle(open) {
    this.panel.hidden = !open;
    this.launcher.setAttribute("aria-expanded", open);
    if (open) {
      this.input.focus();
      this.log.scrollTop = this.log.scrollHeight;
    } else {
      this.launcher.focus();
    }
  }

  // La conversación dura lo que la pestaña (sessionStorage)
  load() {
    try {
      return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  save() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(this.history.slice(-20)));
    } catch {
      // sin almacenamiento la conversación se pierde al cambiar de página
    }
  }

  addBubble(role, text) {
    const li = document.createElement("li");
    li.className = `chat-msg chat-msg--${role}`;
    // textContent: el texto del modelo nunca se interpreta como HTML
    li.textContent = text.replace(/\*\*(.+?)\*\*/g, "$1");
    this.log.append(li);
    this.log.scrollTop = this.log.scrollHeight;
    return li;
  }

  render() {
    this.log.replaceChildren();
    this.addBubble("assistant", GREETING);
    this.history.forEach((m) => this.addBubble(m.role, m.content));
    this.suggestions.hidden = this.history.length > 0;
  }

  async ask(text) {
    const question = text.trim();
    if (!question || this.sendButton.disabled) return;

    this.input.value = "";
    this.suggestions.hidden = true;
    this.history.push({ role: "user", content: question });
    this.addBubble("user", question);
    const pending = this.addBubble("assistant", "Escribiendo…");
    pending.classList.add("is-pending");
    this.sendButton.disabled = true;

    try {
      const res = await fetch(this.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: this.history }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.reply) throw new Error(data.error || "El asistente no puede responder ahora.");
      pending.textContent = data.reply.replace(/\*\*(.+?)\*\*/g, "$1");
      pending.classList.remove("is-pending");
      this.history.push({ role: "assistant", content: data.reply });
    } catch (err) {
      const offline = err instanceof TypeError;
      pending.textContent = offline
        ? "No pude conectar con el asistente. Revisa tu conexión o escríbeme con el formulario de contacto."
        : err.message;
      pending.classList.replace("is-pending", "is-error");
      this.history.pop(); // la pregunta sin respuesta no se guarda
    } finally {
      this.sendButton.disabled = false;
      this.save();
      this.input.focus();
    }
  }
}

customElements.define("chat-bot", ChatBot);
