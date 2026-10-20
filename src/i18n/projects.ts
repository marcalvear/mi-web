// Datos de cada proyecto en los dos idiomas. La portada usa la parte común
// (nombre, resumen, métricas) y la página del caso lo usa todo.
import type { Lang } from "./ui";

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  /** «Proyecto · Septiembre de 2026» */
  label: string;
  summary: string;
  metrics: Metric[];
  metricsNote: string;
  caseStudy: {
    title: string;
    back: string;
    meta: { label: string; value: string }[];
    demo: { caption: string; poster: string; src: string };
    problem: { kicker: string; title: string; text: string };
    solution: {
      kicker: string;
      title: string;
      decisions: { title: string; text: string }[];
      journeyTitle: string;
      journeyCaption: string;
      journey: string[];
    };
    result: { kicker: string; title: string; honest: string };
    next: { kicker: string; title: string; text: string };
    links: { landing: string; code: string; codeUrl: string };
  };
}

const codeUrl =
  "https://github.com/marcalvear/mi-web/blob/main/public/proyectos/sonrisa-imperial/landing.html";

export const sonrisaImperial: Record<Lang, Project> = {
  es: {
    slug: "sonrisa-imperial",
    name: "Sonrisa Imperial",
    label: "Proyecto · Septiembre de 2026",
    summary:
      "Landing page para que una clínica dental (ficticia) consiga citas de personas que llegan desde el móvil.",
    metrics: [
      { value: "94", label: "Rendimiento" },
      { value: "100", label: "Accesibilidad" },
      { value: "96", label: "Buenas prácticas" },
      { value: "100", label: "SEO" },
      { value: "58 KB", label: "Peso total" },
      { value: "0", label: "CLS" },
    ],
    metricsNote: "Lighthouse en móvil, 13 de octubre de 2026.",
    caseStudy: {
      title: "Sonrisa Imperial, caso de estudio",
      back: "Volver a lo que he hecho",
      meta: [
        { label: "Mi papel", value: "Diseño y desarrollo" },
        { label: "Fecha", value: "Septiembre de 2026" },
        { label: "Hecho con", value: "HTML, CSS y JavaScript, sin librerías" },
        { label: "Peso", value: "Un único HTML de 19 KB" },
      ],
      demo: {
        caption: "Demo de 17 segundos en un móvil: la página carga, se recorre y se pide cita con el formulario.",
        poster: "video/sonrisa-imperial-poster.webp",
        src: "video/sonrisa-imperial-demo.mp4",
      },
      problem: {
        kicker: "Planteamiento",
        title: "El problema",
        text: "Una clínica dental necesita llenar su agenda, y la mayoría de la gente la busca desde el móvil. Si para pedir cita hay que rellenar muchos campos o buscar el botón, una parte se va sin terminar.",
      },
      solution: {
        kicker: "Método",
        title: "La solución",
        decisions: [
          { title: "Un solo objetivo.", text: "Todos los botones de la página llevan al mismo formulario." },
          {
            title: "Formulario corto.",
            text: "Solo dos campos obligatorios: nombre y teléfono. El motivo de la visita es opcional.",
          },
          {
            title: "Pensada primero para móvil.",
            text: "Una barra fija abajo con «Llamar» y «Solicitar cita», siempre a mano del pulgar.",
          },
          {
            title: "Confianza antes de pedir datos.",
            text: "Presupuesto por escrito y los tres pasos que vienen después de pedir cita.",
          },
          {
            title: "Identidad propia.",
            text: "La arcada dental de la cabecera se dibuja en SVG con JavaScript, con colores de esmalte y encía.",
          },
          { title: "Ligera.", text: "Un único fichero HTML de 19 KB." },
        ],
        journeyTitle:
          "Recorrido de una persona: llega desde el móvil, ve la oferta, pulsa «Solicitar cita», deja nombre y teléfono y la cita queda pedida.",
        journeyCaption: "El recorrido que la página intenta acortar: cuatro pasos hasta la cita.",
        journey: ["Llega desde el móvil", "Ve la oferta", "Solicitar cita", "Nombre + teléfono", "Cita pedida"],
      },
      result: {
        kicker: "Resultados",
        title: "El resultado",
        honest: "La clínica es ficticia, así que no hay datos reales de citas conseguidas.",
      },
      next: {
        kicker: "Conclusiones",
        title: "Lo que haría distinto",
        text: "Conectaría el formulario a un servicio de envío real y probaría con personas de verdad cuánto tardan en pedir cita. Es lo que estoy aplicando en el formulario de contacto de esta web.",
      },
      links: { landing: "Abrir la landing", code: "Ver el código", codeUrl },
    },
  },

  en: {
    slug: "sonrisa-imperial",
    name: "Sonrisa Imperial",
    label: "Project · September 2026",
    summary:
      "A landing page that helps a (fictional) dental clinic book appointments from people arriving on their phones.",
    metrics: [
      { value: "94", label: "Performance" },
      { value: "100", label: "Accessibility" },
      { value: "96", label: "Best practices" },
      { value: "100", label: "SEO" },
      { value: "58 KB", label: "Total weight" },
      { value: "0", label: "CLS" },
    ],
    metricsNote: "Lighthouse, mobile, 13 October 2026.",
    caseStudy: {
      title: "Sonrisa Imperial, case study",
      back: "Back to what I've done",
      meta: [
        { label: "My role", value: "Design and development" },
        { label: "Date", value: "September 2026" },
        { label: "Built with", value: "HTML, CSS and JavaScript, no libraries" },
        { label: "Weight", value: "A single 19 KB HTML file" },
      ],
      demo: {
        caption: "A 17-second demo on a phone: the page loads, you scroll through it and book with the form.",
        poster: "video/sonrisa-imperial-poster.webp",
        src: "video/sonrisa-imperial-demo.mp4",
      },
      problem: {
        kicker: "Question",
        title: "The problem",
        text: "A dental clinic needs to fill its calendar, and most people look it up on their phone. If booking means filling in lots of fields or hunting for the button, some of them leave before finishing.",
      },
      solution: {
        kicker: "Method",
        title: "The solution",
        decisions: [
          { title: "One goal.", text: "Every button on the page leads to the same form." },
          {
            title: "A short form.",
            text: "Only two required fields: name and phone number. The reason for the visit is optional.",
          },
          {
            title: "Mobile first.",
            text: "A sticky bar at the bottom with “Call” and “Book”, always under your thumb.",
          },
          {
            title: "Trust before asking for data.",
            text: "A written quote and the three steps that follow after booking.",
          },
          {
            title: "Its own identity.",
            text: "The row of teeth in the header is drawn in SVG with JavaScript, in enamel and gum colours.",
          },
          { title: "Lightweight.", text: "A single 19 KB HTML file." },
        ],
        journeyTitle:
          "A visitor's journey: arrives on a phone, sees the offer, taps “Book”, leaves name and phone number and the appointment is booked.",
        journeyCaption: "The journey the page tries to shorten: four steps to an appointment.",
        journey: ["Arrives on a phone", "Sees the offer", "Taps “Book”", "Name + phone", "Booked"],
      },
      result: {
        kicker: "Results",
        title: "The result",
        honest: "The clinic is fictional, so there is no real data on bookings.",
      },
      next: {
        kicker: "Conclusions",
        title: "What I'd do differently",
        text: "I'd connect the form to a real sending service and test with real people how long it takes them to book. That's what I'm applying to the contact form on this website.",
      },
      links: { landing: "Open the landing page", code: "See the code", codeUrl },
    },
  },
};
