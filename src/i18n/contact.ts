// Textos del formulario de contacto y de la página de privacidad (#30).
import type { Lang } from "./ui";

export const contact = {
  es: {
    form: {
      label: "Formulario F-1",
      title: "O escríbeme aquí",
      lead: "Al enviarlo se te crea un espacio en la web donde verás mi respuesta. Te llega un correo con el enlace.",
      name: { label: "Nombre", optional: "opcional", placeholder: "Cómo te llamas" },
      email: { label: "Email", help: "Con él entras en tu espacio, sin contraseña." },
      message: {
        label: "Mensaje",
        placeholder: "Cuéntame tu proyecto, tu duda o lo que quieras.",
        count: "{n} de {max}",
      },
      consent: {
        before: "He leído la",
        link: "política de privacidad",
        after: "y acepto que guardes mis datos para responderme.",
      },
      captcha: "Una comprobación de Cloudflare filtra el spam sin pedirte nada, salvo que dude.",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      done: {
        title: "Recibido",
        body: "Te he enviado un correo a {email} con el enlace a tu espacio. Si no lo ves en unos minutos, mira en spam.",
        again: "Escribir otro mensaje",
      },
      errors: {
        invalid: "Revisa los campos marcados.",
        captchaWait: "Un segundo: la comprobación anti-spam aún no ha terminado. Vuelve a pulsar Enviar.",
        captcha: "No he podido comprobar que eres una persona. Vuelve a intentarlo.",
        captchaLoad: "No se pudo cargar la comprobación anti-spam de Cloudflare. Si usas un bloqueador, desactívalo para esta web.",
        server: "Algo ha fallado al guardar tu mensaje. Inténtalo más tarde o escríbeme por LinkedIn.",
        network: "No se pudo conectar. Revisa tu conexión y vuelve a probar.",
      },
      off: "El formulario aún no está conectado. Mientras tanto, escríbeme por LinkedIn.",
    },
    privacy: {
      meta: {
        title: "Privacidad",
        description: "Qué datos guardo cuando me escribes por el formulario, para qué, dónde y cómo borrarlos.",
      },
      kicker: "Cuaderno nº 3 · Anexo legal",
      title: "Privacidad",
      lead: "Qué pasa con tus datos cuando me escribes por el formulario. Sin letra pequeña.",
      updated: "Actualizado el 19 de octubre de 2026.",
      sections: [
        {
          title: "Quién los guarda",
          body: [
            "Yo, Marc Calatayud, estudiante de 1º de DAM en València. Es mi web personal y la hago con fines educativos: no vendo nada ni cedo datos a nadie.",
            "Para cualquier cosa sobre tus datos, escríbeme por el formulario, desde tu espacio o por LinkedIn.",
          ],
        },
        {
          title: "Qué datos",
          body: [
            "Tu email, tu nombre si lo escribes y tus mensajes, con su fecha. Si entras en tu espacio, también cuándo entras.",
            "Tu IP solo pasa por Cloudflare para la comprobación anti-spam. No la guardo.",
          ],
        },
        {
          title: "Para qué",
          body: [
            "Para responderte y para que veas nuestra conversación en tu espacio. Al recibir tu mensaje te envío un correo automático con el enlace.",
            "Una IA (Claude, de Anthropic) le pone una etiqueta al mensaje, como «proyecto» o «consulta», para ordenarlos. No se usa para nada más.",
          ],
        },
        {
          title: "Con qué permiso",
          body: ["Con tu consentimiento, el de la casilla del formulario. Puedes retirarlo cuando quieras pidiéndome que borre tus datos."],
        },
        {
          title: "Dónde están",
          body: [
            "En Supabase (la base de datos, en servidores de la Unión Europea). Por el camino pasan por n8n (la automatización), Cloudflare (el anti-spam), Anthropic (la etiqueta) y Brevo (el correo).",
            "Alguno de estos servicios puede tratar datos fuera de la UE con las garantías del RGPD, como las cláusulas contractuales tipo.",
          ],
        },
        {
          title: "Cuánto tiempo",
          body: ["Hasta que me pidas que los borre. Si lo haces, se borran tu cuenta, tus mensajes y tu actividad."],
        },
        {
          title: "Tus derechos",
          body: [
            "Puedes pedirme ver, corregir, llevarte o borrar tus datos, u oponerte a que los use. Si crees que no lo hago bien, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es).",
          ],
        },
        {
          title: "Cookies y almacenamiento",
          body: [
            "No uso cookies de publicidad ni de analítica. Tu navegador guarda el tema que elijas, el mazo de frases de anime y, si entras, tu sesión.",
            "La comprobación de Cloudflare puede leer datos técnicos de tu navegador para saber si eres una persona.",
          ],
        },
      ],
      back: "Volver al formulario",
    },
  },
  en: {
    form: {
      label: "Form F-1",
      title: "Or write to me here",
      lead: "Sending it creates a space for you on my website where you'll see my reply. You'll get an email with the link.",
      name: { label: "Name", optional: "optional", placeholder: "What's your name" },
      email: { label: "Email", help: "You sign in to your space with it, no password." },
      message: {
        label: "Message",
        placeholder: "Tell me about your project, your question or anything else.",
        count: "{n} of {max}",
      },
      consent: {
        before: "I've read the",
        link: "privacy policy",
        after: "and I agree that you store my data to reply to me.",
      },
      captcha: "A Cloudflare check filters spam without asking you anything, unless it's unsure.",
      submit: "Send message",
      sending: "Sending…",
      done: {
        title: "Got it",
        body: "I've sent an email to {email} with the link to your space. If it isn't there in a few minutes, check your spam folder.",
        again: "Write another message",
      },
      errors: {
        invalid: "Check the highlighted fields.",
        captchaWait: "One second: the spam check hasn't finished yet. Press Send again.",
        captcha: "I couldn't confirm you're a person. Please try again.",
        captchaLoad: "Cloudflare's spam check couldn't load. If you use a blocker, turn it off for this site.",
        server: "Something went wrong saving your message. Try again later or message me on LinkedIn.",
        network: "Couldn't connect. Check your connection and try again.",
      },
      off: "The form isn't connected yet. In the meantime, message me on LinkedIn.",
    },
    privacy: {
      meta: {
        title: "Privacy",
        description: "What data I keep when you write to me through the form, why, where and how to delete it.",
      },
      kicker: "Notebook no. 3 · Legal appendix",
      title: "Privacy",
      lead: "What happens to your data when you write to me through the form. No small print.",
      updated: "Updated on 19 October 2026.",
      sections: [
        {
          title: "Who keeps it",
          body: [
            "Me, Marc Calatayud, a first-year software development student in València, Spain. This is my personal website and I build it for learning: I don't sell anything or share data with anyone.",
            "For anything about your data, write to me through the form, from your space or on LinkedIn.",
          ],
        },
        {
          title: "What data",
          body: [
            "Your email, your name if you give it, and your messages with their date. If you sign in to your space, also when you sign in.",
            "Your IP address only goes through Cloudflare for the spam check. I don't store it.",
          ],
        },
        {
          title: "What for",
          body: [
            "To reply to you and let you see our conversation in your space. When your message arrives, you get an automatic email with the link.",
            "An AI (Claude, by Anthropic) tags the message, for example as “project” or “question”, so I can sort them. It isn't used for anything else.",
          ],
        },
        {
          title: "On what basis",
          body: ["Your consent, the checkbox in the form. You can withdraw it whenever you like by asking me to delete your data."],
        },
        {
          title: "Where it lives",
          body: [
            "In Supabase (the database, on servers in the European Union). On the way it goes through n8n (the automation), Cloudflare (spam check), Anthropic (the tag) and Brevo (email).",
            "Some of these services may process data outside the EU with GDPR safeguards such as standard contractual clauses.",
          ],
        },
        {
          title: "How long",
          body: ["Until you ask me to delete it. If you do, your account, your messages and your activity are deleted."],
        },
        {
          title: "Your rights",
          body: [
            "You can ask me to see, correct, export or delete your data, or object to its use. If you think I'm not handling it properly, you can complain to the Spanish Data Protection Agency (aepd.es).",
          ],
        },
        {
          title: "Cookies and storage",
          body: [
            "I don't use advertising or analytics cookies. Your browser stores the theme you pick, the anime quote deck and, if you sign in, your session.",
            "The Cloudflare check may read technical data from your browser to tell whether you're a person.",
          ],
        },
      ],
      back: "Back to the form",
    },
  },
} satisfies Record<Lang, unknown>;

export type ContactFormText = (typeof contact)["es"]["form"];
