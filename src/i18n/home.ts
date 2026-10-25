// Contenido de la portada en los dos idiomas. Los componentes de
// src/components/home/ solo pintan; los textos están todos aquí.
import type { Lang } from "./ui";

export interface HomeContent {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    tagline: string;
    cta: string;
    secondary: string;
    figure: string;
    flowTitle: string;
    flow: { inputs: [string, string, string]; ai: string; output: string };
  };
  about: {
    kicker: string;
    title: string;
    paragraphs: string[];
    facts: { label: string; value: string }[];
    photoAlt: string;
    photoCaption: string;
  };
  work: {
    kicker: string;
    title: string;
    project: {
      steps: { label: string; text: string }[];
      imageAlt: string;
      caption: string;
      caseLink: string;
      landingLink: string;
    };
    logTitle: string;
    log: { type: string; title: string; text: string; href?: string; linkText?: string }[];
  };
  vivencias: {
    kicker: string;
    title: string;
    groups: {
      title: string;
      photos: { image: string; alt: string; caption: string }[];
    }[];
  };
  likes: {
    kicker: string;
    title: string;
    intro: string;
    /** Cada tarjeta lleva a su página: /me-gusta/<slug>/ (#71) */
    groups: {
      label: string;
      title: string;
      text: string;
      items: string[];
      slug: "videojuegos" | "anime-manga" | "biohacking";
      /** Foto de la tarjeta: nombre del fichero en src/assets/img sin extensión */
      image: string;
    }[];
    /** Texto del enlace de cada tarjeta */
    open: string;
  };
  contact: {
    kicker: string;
    title: string;
    lead: string;
    channels: { name: string; handle: string; href: string }[];
  };
}

export const home: Record<Lang, HomeContent> = {
  es: {
    meta: {
      title: "Marc Calatayud, IA para startups e infoproductores",
      description:
        "Aprendo inteligencia artificial para ayudar a startups e infoproductores a dar vida a sus proyectos. Estudiante de 1º de DAM en València.",
    },
    hero: {
      kicker: "Cuaderno nº 3 · València, 2026",
      tagline:
        "Aprendo inteligencia artificial para ayudar a startups e infoproductores a dar vida a sus proyectos.",
      cta: "Ponte en contacto conmigo",
      secondary: "Ver lo que he hecho",
      figure: "La idea: lo repetitivo, para la IA; lo creativo, para las personas.",
      flowTitle:
        "Diagrama: correos, informes y datos entran en la IA, y lo que sale es tiempo para crear.",
      flow: { inputs: ["Correos", "Informes", "Datos"], ai: "IA", output: "Tiempo para crear" },
    },
    about: {
      kicker: "Quién soy",
      title: "Sobre mí",
      paragraphs: [
        "Soy de València y estudio 1º de DAM en el IES Dr. Lluís Simarro. Me enganché a la inteligencia artificial al ver que hace en mucho menos tiempo, y a menudo mejor, muchas de las tareas de nuestro día a día en el trabajo.",
        "Quiero descubrir hasta dónde llega para delegarle todo lo automatizable y que las personas nos centremos en crear y ser originales, que es justo lo que la IA no sabe hacer. Me gustaría ayudar a construir un mundo en el que nos dediquemos a lo que nos gusta y la IA haga el trabajo aburrido.",
      ],
      facts: [
        { label: "Origen", value: "València, España" },
        { label: "Estudio", value: "1º DAM · IES Dr. Lluís Simarro" },
        { label: "Curso", value: "2026-2027" },
        { label: "Idiomas", value: "Español · Inglés C1" },
      ],
      photoAlt: "Retrato de Marc Calatayud con gafas de cristales naranjas.",
      photoCaption: "El autor del cuaderno.",
    },
    work: {
      kicker: "Qué sé hacer",
      title: "Lo que he hecho",
      project: {
        steps: [
          {
            label: "Problema",
            text: "Si para pedir cita hay que rellenar muchos campos o buscar el botón, una parte de la gente se va sin terminar.",
          },
          {
            label: "Solución",
            text: "Un solo objetivo, un formulario de dos campos y una barra fija con «Llamar» y «Solicitar cita» a mano del pulgar.",
          },
          {
            label: "Resultado",
            text: "Un único HTML de 19 KB que carga rápido y se usa bien en el móvil.",
          },
        ],
        imageAlt:
          "Primera pantalla de la landing de Sonrisa Imperial: una arcada dental dibujada en la cabecera, el titular «Empieza por una revisión sin prisas» y el formulario para pedir cita.",
        caption: "La arcada dental se dibuja en SVG y el formulario se ve sin hacer scroll.",
        caseLink: "Leer el caso completo",
        landingLink: "Abrir la landing",
      },
      logTitle: "Bitácora",
      log: [
        {
          type: "Formación",
          title: "1º DAM",
          text: "Desarrollo de Aplicaciones Multiplataforma en el IES Dr. Lluís Simarro, curso 2026-2027.",
        },
        {
          type: "Certificado",
          title: "Inglés C1",
          text: "C1 Advanced de Cambridge English. Es el idioma en el que se publica casi todo sobre IA.",
        },
        {
          type: "Proyecto",
          title: "Esta web",
          text: "Tres versiones, y cada bloque con su issue, su rama y su pull request.",
          href: "https://github.com/marcalvear/mi-web",
          linkText: "Ver el historial",
        },
        {
          type: "Deporte",
          title: "Pádel",
          text: "Dos años jugando como aficionado con mis amigos.",
        },
      ],
    },
    vivencias: {
      kicker: "Lo que vivo",
      title: "Mis vivencias",
      groups: [
        {
          title: "Deportes favoritos",
          photos: [
            { image: "senderismo-atardecer", alt: "Pinos al atardecer sobre un valle", caption: "Senderismo al atardecer" },
            { image: "padel-anochecer", alt: "Pistas de pádel al anochecer, con las luces encendidas", caption: "Pádel al anochecer" },
            { image: "padel-pabellon", alt: "Pistas de pádel con palmeras y el pabellón detrás", caption: "Pádel con el pabellón detrás" },
          ],
        },
        {
          title: "Viajes",
          photos: [
            { image: "viaje-milan-duomo", alt: "La catedral de Milán con gente en la plaza", caption: "La catedral de Milán" },
            { image: "viaje-milan-galeria", alt: "Galería de cristal y hierro en Milán, con gente", caption: "La Galería Vittorio Emanuele II" },
            { image: "viaje-lago", alt: "Lago con montañas al fondo y una lancha", caption: "Un lago con montañas al fondo" },
            { image: "viaje-malta", alt: "Moto de agua con una costa rocosa al fondo", caption: "Malta, desde el mar" },
            { image: "viaje-valencia-pergola", alt: "Camino bajo una pérgola cubierta de plantas", caption: "Una pérgola en Valencia" },
          ],
        },
        {
          title: "Conciertos",
          photos: [
            { image: "weeknd-estadio", alt: "Estadio lleno de público durante un concierto de The Weeknd", caption: "The Weeknd en directo" },
            { image: "weeknd-pantalla", alt: "Cantante de traje oscuro proyectado en una pantalla gigante", caption: "The Weeknd, en la pantalla" },
            { image: "travis-circus-maximus", alt: "Público con las luces encendidas bajo el cartel Circus Maximus", caption: "Travis Scott, Circus Maximus" },
          ],
        },
      ],
    },
    likes: {
      kicker: "Qué me mueve",
      title: "Me gusta",
      intro: "Lo que hago cuando no estoy estudiando.",
      groups: [
        {
          label: "Muestra A",
          title: "Videojuegos",
          text: "Mis tres favoritos:",
          items: ["Zelda: Breath of the Wild", "Bloodborne", "Pokémon"],
          slug: "videojuegos",
          image: "me-gusta/zelda-3",
        },
        {
          label: "Muestra B",
          title: "Anime y manga",
          text: "Las dos obras que más me han marcado:",
          items: ["Naruto Shippuden", "JoJo's Bizarre Adventure"],
          slug: "anime-manga",
          image: "me-gusta/naruto-1",
        },
        {
          label: "Muestra C",
          title: "Biohacking",
          text: "Usar la tecnología para sacar el máximo partido a nuestro cuerpo: dormir mejor, recuperarse antes, tener más energía.",
          items: ["TheraFace Mask Glo", "JetBoots Prime", "Eight Sleep Pod", "Oura Ring"],
          slug: "biohacking",
          image: "biohacking/theraface-mask-glo",
        },
      ],
      open: "Ver la página",
    },
    contact: {
      kicker: "Cómo escribirme",
      title: "Contacto",
      lead: "¿Tienes una startup o un infoproducto y quieres darle vida con IA? Escríbeme y te respondo.",
      channels: [
        { name: "LinkedIn", handle: "in/marccalatayud", href: "https://www.linkedin.com/in/marccalatayud" },
        { name: "GitHub", handle: "marcalvear", href: "https://github.com/marcalvear" },
      ],
    },
  },

  en: {
    meta: {
      title: "Marc Calatayud, AI for startups and creators",
      description:
        "I study artificial intelligence to help startups and creators bring their projects to life. First-year software development student in València, Spain.",
    },
    hero: {
      kicker: "Notebook no. 3 · València, 2026",
      tagline:
        "I study artificial intelligence to help startups and creators bring their projects to life.",
      cta: "Get in touch",
      secondary: "See what I've done",
      figure: "The idea: repetitive work goes to AI; creative work stays with people.",
      flowTitle:
        "Diagram: emails, reports and data go into AI, and what comes out is time to create.",
      flow: { inputs: ["Emails", "Reports", "Data"], ai: "AI", output: "Time to create" },
    },
    about: {
      kicker: "Who I am",
      title: "About",
      paragraphs: [
        "I'm from València, Spain, and I'm in my first year of Multiplatform App Development (DAM) at IES Dr. Lluís Simarro. I got hooked on artificial intelligence when I saw how it does many everyday work tasks in far less time, and often better.",
        "I want to find out how far it can go, so we can hand it everything that can be automated and focus on creating and being original, which is exactly what AI can't do. I'd like to help build a world where we spend our time on what we love and AI does the boring work.",
      ],
      facts: [
        { label: "From", value: "València, Spain" },
        { label: "Studying", value: "1st year DAM · IES Dr. Lluís Simarro" },
        { label: "Year", value: "2026-2027" },
        { label: "Languages", value: "Spanish · English C1" },
      ],
      photoAlt: "Portrait of Marc Calatayud wearing orange-lens glasses.",
      photoCaption: "The author of this notebook.",
    },
    work: {
      kicker: "What I can do",
      title: "What I've done",
      project: {
        steps: [
          {
            label: "Problem",
            text: "If booking means filling in lots of fields or hunting for the button, some people leave before finishing.",
          },
          {
            label: "Solution",
            text: "One goal, a two-field form and a sticky bar with “Call” and “Book” right under your thumb.",
          },
          {
            label: "Result",
            text: "A single 19 KB HTML file that loads fast and works well on a phone.",
          },
        ],
        imageAlt:
          "First screen of the Sonrisa Imperial landing page: a row of teeth drawn across the header, the headline “Empieza por una revisión sin prisas” and the booking form.",
        caption: "The teeth are drawn in SVG and the form is visible without scrolling.",
        caseLink: "Read the full case study",
        landingLink: "Open the landing page",
      },
      logTitle: "Log",
      log: [
        {
          type: "Education",
          title: "1st year DAM",
          text: "Multiplatform App Development at IES Dr. Lluís Simarro, 2026-2027.",
        },
        {
          type: "Certificate",
          title: "English C1",
          text: "Cambridge C1 Advanced. It's the language almost everything about AI is published in.",
        },
        {
          type: "Project",
          title: "This website",
          text: "Three versions, each part with its own issue, branch and pull request.",
          href: "https://github.com/marcalvear/mi-web",
          linkText: "See the history",
        },
        {
          type: "Sport",
          title: "Padel",
          text: "Two years playing for fun with my friends.",
        },
      ],
    },
    vivencias: {
      kicker: "What I live",
      title: "My experiences",
      groups: [
        {
          title: "Favorite sports",
          photos: [
            { image: "senderismo-atardecer", alt: "Pine trees at sunset over a valley", caption: "Hiking at sunset" },
            { image: "padel-anochecer", alt: "Padel courts at dusk, with the lights on", caption: "Padel at dusk" },
            { image: "padel-pabellon", alt: "Padel courts with palm trees and the sports hall behind", caption: "Padel with the sports hall behind" },
          ],
        },
        {
          title: "Trips",
          photos: [
            { image: "viaje-milan-duomo", alt: "Milan cathedral with people in the square", caption: "Milan Cathedral" },
            { image: "viaje-milan-galeria", alt: "Glass and iron gallery in Milan, with people", caption: "Galleria Vittorio Emanuele II" },
            { image: "viaje-lago", alt: "Lake with mountains behind and a boat", caption: "A lake with mountains behind" },
            { image: "viaje-malta", alt: "Jet ski with a rocky coast behind", caption: "Malta, from the sea" },
            { image: "viaje-valencia-pergola", alt: "Path under a pergola covered in plants", caption: "A pergola in Valencia" },
          ],
        },
        {
          title: "Concerts",
          photos: [
            { image: "weeknd-estadio", alt: "Stadium full of people during a The Weeknd concert", caption: "The Weeknd live" },
            { image: "weeknd-pantalla", alt: "Singer in a dark suit projected on a giant screen", caption: "The Weeknd, on the screen" },
            { image: "travis-circus-maximus", alt: "Crowd with lights on under the Circus Maximus sign", caption: "Travis Scott, Circus Maximus" },
          ],
        },
      ],
    },
    likes: {
      kicker: "What drives me",
      title: "Things I like",
      intro: "What I do when I'm not studying.",
      groups: [
        {
          label: "Sample A",
          title: "Video games",
          text: "My three favourites:",
          items: ["Zelda: Breath of the Wild", "Bloodborne", "Pokémon"],
          slug: "videojuegos",
          image: "me-gusta/zelda-3",
        },
        {
          label: "Sample B",
          title: "Anime and manga",
          text: "The two series that left the biggest mark on me:",
          items: ["Naruto Shippuden", "JoJo's Bizarre Adventure"],
          slug: "anime-manga",
          image: "me-gusta/naruto-1",
        },
        {
          label: "Sample C",
          title: "Biohacking",
          text: "Using technology to get the most out of your body: sleep better, recover faster, have more energy.",
          items: ["TheraFace Mask Glo", "JetBoots Prime", "Eight Sleep Pod", "Oura Ring"],
          slug: "biohacking",
          image: "biohacking/theraface-mask-glo",
        },
      ],
      open: "See the page",
    },
    contact: {
      kicker: "How to reach me",
      title: "Contact",
      lead: "Do you have a startup or an online product and want to bring it to life with AI? Write to me and I'll get back to you.",
      channels: [
        { name: "LinkedIn", handle: "in/marccalatayud", href: "https://www.linkedin.com/in/marccalatayud" },
        { name: "GitHub", handle: "marcalvear", href: "https://github.com/marcalvear" },
      ],
    },
  },
};
