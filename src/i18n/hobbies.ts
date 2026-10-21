// Textos de las páginas de Me gusta (#71): videojuegos, anime y manga, y
// biohacking. Los de la Pokédex, el mazo de frases y el radar siguen en likes.ts.
//
// Las imágenes son arte y capturas oficiales (src/assets/img/me-gusta/), cada
// una con su crédito. «hours» y «moment» (juegos) y «arc» y «character» (anime)
// son datos personales: si faltan, la ficha no los enseña.
import type { Lang } from "./ui";

export type Shot = { file: string; alt: string; caption?: string };

export type Game = {
  id: "zelda" | "bloodborne" | "pokemon";
  name: string;
  short: string;
  kicker: string;
  text: string[];
  facts: [string, string][];
  hours?: string;
  moment?: string;
  credit: string;
  hero: Shot;
  strip: Shot[];
};

export type Series = {
  id: "naruto" | "jojo";
  name: string;
  kicker: string;
  text: string[];
  facts: [string, string][];
  arc?: string;
  /** Si la obra no va por arcos (JoJo va por partes) */
  arcLabel?: string;
  character?: string;
  credit: string;
  panels: Shot[];
};

type Page = { meta: { title: string; description: string }; kicker: string; title: string; lead: string };

export type HobbiesText = {
  games: Page & {
    navLabel: string;
    factLabels: { hours: string; moment: string };
    pokedexTitle: string;
    pokedexIntro: string;
    creditsNote: string;
    items: Game[];
  };
  anime: Page & {
    factLabels: { arc: string; character: string };
    creditsNote: string;
    items: Series[];
  };
  bio: Page;
};

export const hobbies: Record<Lang, HobbiesText> = {
  es: {
    games: {
      meta: {
        title: "Videojuegos",
        description:
          "Zelda: Breath of the Wild, Bloodborne y Pokémon, con arte oficial, por qué me gustan y una Pokédex con modelos 3D.",
      },
      kicker: "Cuaderno nº 3 · Anexo B · Muestra A",
      title: "Videojuegos",
      lead: "Tres juegos a los que siempre vuelvo, cada uno por un motivo distinto.",
      navLabel: "Los tres juegos",
      factLabels: { hours: "Horas", moment: "Mi momento" },
      pokedexTitle: "Pokédex",
      pokedexIntro:
        "Busca cualquier Pokémon por nombre o número: datos de la PokéAPI y modelos de la Pokémon 3D API.",
      creditsNote:
        "Arte y capturas oficiales de cada juego, sacados de las webs de Nintendo y PlayStation. Los derechos son de sus dueños; aquí solo ilustran por qué me gustan.",
      items: [
        {
          id: "zelda",
          name: "The Legend of Zelda: Breath of the Wild",
          short: "Zelda: BotW",
          kicker: "Nintendo · 2017",
          text: [
            "Nadie te dice por dónde ir. Ves una torre a lo lejos, decides subir y por el camino te encuentras tres cosas que no buscabas.",
            "Le he echado más de 300 horas, y lo mejor sigue siendo el final: la batalla contra Ganon.",
          ],
          facts: [
            ["Año", "2017"],
            ["Estudio", "Nintendo EPD"],
            ["Consola", "Nintendo Switch y Wii U"],
          ],
          hours: "Unas 320",
          moment: "La batalla final contra Ganon",
          credit: "© Nintendo",
          hero: {
            file: "zelda-1",
            alt: "Link de espaldas en lo alto de un risco, mirando el reino de Hyrule al amanecer, junto al logo del juego.",
          },
          strip: [
            { file: "zelda-3", alt: "Link galopa por la hierba alta mientras un enemigo a caballo le persigue." },
            { file: "zelda-4", alt: "La princesa Zelda mira hacia arriba en un bosque iluminado por el sol." },
          ],
        },
        {
          id: "bloodborne",
          name: "Bloodborne",
          short: "Bloodborne",
          kicker: "FromSoftware · 2015",
          text: [
            "Lo que me tiene ganado es Yharnam: el estilo gótico y un mapa espectacular en el que todo acaba conectando, de Yharnam Central a la catedral.",
            "Es difícil a propósito, y cada jefe que cae se nota. El que más recuerdo es Ludwig, en el DLC: medio caballo, medio bestia, y con una espada de luz de luna preciosa.",
          ],
          facts: [
            ["Año", "2015"],
            ["Estudio", "FromSoftware"],
            ["Consola", "PlayStation 4"],
          ],
          hours: "Unas 240",
          moment: "Empezar en Yharnam Central y la pelea contra Ludwig",
          credit: "© Sony Interactive Entertainment · FromSoftware",
          hero: {
            file: "bloodborne-1",
            alt: "Un cazador de espaldas en una calle de Yharnam, con el logo de Bloodborne encima.",
          },
          strip: [
            { file: "bloodborne-2", alt: "Primer plano de un cazador que apunta con un trabuco en un callejón oscuro." },
            { file: "bloodborne-6", alt: "Dos cazadores frente a frente en la oscuridad; uno lleva una antorcha." },
          ],
        },
        {
          id: "pokemon",
          name: "Pokémon",
          short: "Pokémon",
          kicker: "Game Freak · desde 1996",
          text: [
            "Mi favorito es Leyendas Pokémon: Arceus, el de las zonas abiertas que exploras a tu aire. Y mi Pokémon, con diferencia, Mewtwo.",
            "Más de mil especies, cada una con sus tipos y sus estadísticas. Por eso le he hecho una Pokédex: busca cualquiera y verás sus datos y su modelo en 3D.",
          ],
          facts: [
            ["Desde", "1996"],
            ["Estudio", "Game Freak"],
            ["Mi juego", "Leyendas Pokémon: Arceus (2022)"],
            ["Mi Pokémon", "Mewtwo"],
          ],
          hours: "Unas 110",
          credit: "© Nintendo · Creatures Inc. · GAME FREAK inc.",
          hero: {
            file: "pokemon-1",
            alt: "Sprigatito, Quaxly y Fuecoco, los tres Pokémon iniciales de Escarlata y Púrpura, en las escaleras de la academia.",
          },
          strip: [
            { file: "pokemon-4", alt: "Koraidon planea sobre una pradera con el protagonista a lomos." },
            { file: "pokemon-5", alt: "Un Pokémon teracristalizado, con una corona de cristal azul, en pleno combate." },
          ],
        },
      ],
    },
    anime: {
      meta: {
        title: "Anime y manga",
        description:
          "Naruto Shippuden y JoJo's Bizarre Adventure, maquetados como páginas de manga, y un mazo con sus frases traducidas.",
      },
      kicker: "Cuaderno nº 3 · Anexo B · Muestra B",
      title: "Anime y manga",
      lead: "Las dos obras que más me han marcado, montadas como una página de manga.",
      factLabels: { arc: "Mi arco", character: "Mi personaje" },
      creditsNote:
        "Ilustraciones oficiales de las webs de Naruto y del anime de JoJo. Los derechos son de sus autores y estudios.",
      items: [
        {
          id: "naruto",
          name: "Naruto Shippuden",
          kicker: "Masashi Kishimoto · Studio Pierrot",
          text: [
            "Naruto empieza siendo el que nadie toma en serio y acaba cargando con todo. En Shippuden cada combate pesa, porque detrás hay una historia que ya conoces.",
            "Para mí ninguno pesa tanto como Sasuke contra Itachi.",
          ],
          facts: [
            ["Manga", "1999-2014"],
            ["Anime", "2007-2017"],
            ["Episodios", "500"],
          ],
          arc: "Sasuke contra Itachi",
          character: "Sasuke Uchiha",
          credit: "© Masashi Kishimoto · Scott / Shueisha, TV Tokyo, Pierrot",
          panels: [
            {
              file: "naruto-1",
              alt: "Naruto y Sasuke en primer plano, con Kakashi, Sakura e Itachi detrás.",
              caption: "Visual principal, 2007",
            },
            {
              file: "naruto-6",
              alt: "Naruto envuelto en chakra amarillo, con Sakura, Sasuke y Kakashi.",
              caption: "Verano, 2016",
            },
            {
              file: "naruto-3",
              alt: "Itachi de niño, con su sombra de adulto y plumas de cuervo a su espalda.",
              caption: "La historia de Itachi, 2016",
            },
            {
              file: "naruto-4",
              alt: "Kakashi con la máscara de Anbu delante de una luna llena.",
              caption: "Kakashi en Anbu, 2013",
            },
          ],
        },
        {
          id: "jojo",
          name: "JoJo's Bizarre Adventure",
          kicker: "Hirohiko Araki · David Production",
          text: [
            "Cada parte cambia de protagonista, de época y casi de género. Los combates se ganan pensando más que pegando, y las poses ya son marca de la casa.",
            "Mi parte es la quinta, Golden Wind, la de Italia. Y mi personaje es su villano, Diavolo.",
          ],
          facts: [
            ["Manga", "desde 1987"],
            ["Anime", "desde 2012"],
            ["Revista", "Shōnen Jump y Ultra Jump"],
          ],
          arc: "La 5, Golden Wind",
          arcLabel: "Mi parte",
          character: "Diavolo",
          credit: "© LUCKY LAND COMMUNICATIONS / Shueisha · JoJo's Animation Project",
          panels: [
            {
              file: "jojo-1",
              alt: "Giorno y su banda alrededor de un escudo dorado, con el logo de JoJo.",
              caption: "Golden Wind, 2018",
            },
            {
              file: "jojo-3",
              alt: "Josuke y sus amigos en las calles de Morioh, con Kira al fondo.",
              caption: "Diamond is Unbreakable, 2016",
            },
            {
              file: "jojo-4",
              alt: "Jotaro y sus compañeros de Stardust Crusaders, en fila y posando.",
              caption: "Stardust Crusaders, 2014",
            },
          ],
        },
      ],
    },
    bio: {
      meta: {
        title: "Biohacking",
        description:
          "Mi radar de aparatos de biohacking para dormir mejor, recuperarme antes y cuidar la piel, y la entrada al compendio de suplementos.",
      },
      kicker: "Cuaderno nº 3 · Anexo B · Muestra C",
      title: "Biohacking",
      lead: "Aparatos que tengo en el radar para dormir mejor, recuperarme antes y cuidar la piel. Los suplementos, con sus estudios, están en el compendio.",
    },
  },
  en: {
    games: {
      meta: {
        title: "Video games",
        description:
          "Zelda: Breath of the Wild, Bloodborne and Pokémon, with official art, why I like them and a Pokédex with 3D models.",
      },
      kicker: "Notebook no. 3 · Appendix B · Sample A",
      title: "Video games",
      lead: "Three games I always come back to, each for a different reason.",
      navLabel: "The three games",
      factLabels: { hours: "Hours", moment: "My moment" },
      pokedexTitle: "Pokédex",
      pokedexIntro: "Look up any Pokémon by name or number: data from PokéAPI and models from the Pokémon 3D API.",
      creditsNote:
        "Official art and screenshots of each game, taken from the Nintendo and PlayStation websites. Rights belong to their owners; here they only show why I like them.",
      items: [
        {
          id: "zelda",
          name: "The Legend of Zelda: Breath of the Wild",
          short: "Zelda: BotW",
          kicker: "Nintendo · 2017",
          text: [
            "Nobody tells you where to go. You spot a tower in the distance, decide to climb it and find three things you weren't looking for on the way.",
            "I've put over 300 hours into it, and the best part is still the ending: the fight against Ganon.",
          ],
          facts: [
            ["Year", "2017"],
            ["Studio", "Nintendo EPD"],
            ["Console", "Nintendo Switch and Wii U"],
          ],
          hours: "About 320",
          moment: "The final battle against Ganon",
          credit: "© Nintendo",
          hero: {
            file: "zelda-1",
            alt: "Link seen from behind on top of a cliff, looking out over Hyrule at dawn, next to the game's logo.",
          },
          strip: [
            { file: "zelda-3", alt: "Link gallops through tall grass while an enemy on horseback chases him." },
            { file: "zelda-4", alt: "Princess Zelda looks up in a sunlit forest." },
          ],
        },
        {
          id: "bloodborne",
          name: "Bloodborne",
          short: "Bloodborne",
          kicker: "FromSoftware · 2015",
          text: [
            "Yharnam won me over: the gothic style and a stunning map where everything ends up connecting, from Central Yharnam to the cathedral.",
            "It's hard on purpose, and every boss you take down feels like it. The one I remember most is Ludwig, in the DLC: half horse, half beast, with a beautiful moonlight sword.",
          ],
          facts: [
            ["Year", "2015"],
            ["Studio", "FromSoftware"],
            ["Console", "PlayStation 4"],
          ],
          hours: "About 240",
          moment: "Starting out in Central Yharnam, and the fight against Ludwig",
          credit: "© Sony Interactive Entertainment · FromSoftware",
          hero: {
            file: "bloodborne-1",
            alt: "A hunter seen from behind on a street in Yharnam, with the Bloodborne logo above.",
          },
          strip: [
            { file: "bloodborne-2", alt: "Close-up of a hunter aiming a blunderbuss in a dark alley." },
            { file: "bloodborne-6", alt: "Two hunters face each other in the dark; one carries a torch." },
          ],
        },
        {
          id: "pokemon",
          name: "Pokémon",
          short: "Pokémon",
          kicker: "Game Freak · since 1996",
          text: [
            "My favourite is Pokémon Legends: Arceus, the one with open areas you explore at your own pace. And my Pokémon, by far, is Mewtwo.",
            "Over a thousand species, each with its own types and stats. That's why I built a Pokédex: look any of them up and see its data and its 3D model.",
          ],
          facts: [
            ["Since", "1996"],
            ["Studio", "Game Freak"],
            ["My game", "Pokémon Legends: Arceus (2022)"],
            ["My Pokémon", "Mewtwo"],
          ],
          hours: "About 110",
          credit: "© Nintendo · Creatures Inc. · GAME FREAK inc.",
          hero: {
            file: "pokemon-1",
            alt: "Sprigatito, Quaxly and Fuecoco, the three starter Pokémon from Scarlet and Violet, on the academy steps.",
          },
          strip: [
            { file: "pokemon-4", alt: "Koraidon glides over a meadow with the player riding on its back." },
            { file: "pokemon-5", alt: "A Terastallized Pokémon wearing a blue crystal crown in the middle of a battle." },
          ],
        },
      ],
    },
    anime: {
      meta: {
        title: "Anime and manga",
        description:
          "Naruto Shippuden and JoJo's Bizarre Adventure, laid out like manga pages, and a deck of their quotes.",
      },
      kicker: "Notebook no. 3 · Appendix B · Sample B",
      title: "Anime and manga",
      lead: "The two series that have stuck with me most, laid out like a manga page.",
      factLabels: { arc: "My arc", character: "My character" },
      creditsNote: "Official illustrations from the Naruto and JoJo anime websites. Rights belong to their authors and studios.",
      items: [
        {
          id: "naruto",
          name: "Naruto Shippuden",
          kicker: "Masashi Kishimoto · Studio Pierrot",
          text: [
            "Naruto starts out as the one nobody takes seriously and ends up carrying everything. In Shippuden every fight matters, because there's a story behind it you already know.",
            "For me, none matters as much as Sasuke versus Itachi.",
          ],
          facts: [
            ["Manga", "1999-2014"],
            ["Anime", "2007-2017"],
            ["Episodes", "500"],
          ],
          arc: "Sasuke versus Itachi",
          character: "Sasuke Uchiha",
          credit: "© Masashi Kishimoto · Scott / Shueisha, TV Tokyo, Pierrot",
          panels: [
            {
              file: "naruto-1",
              alt: "Naruto and Sasuke up front, with Kakashi, Sakura and Itachi behind them.",
              caption: "Main visual, 2007",
            },
            {
              file: "naruto-6",
              alt: "Naruto wrapped in yellow chakra, with Sakura, Sasuke and Kakashi.",
              caption: "Summer, 2016",
            },
            {
              file: "naruto-3",
              alt: "Itachi as a boy, with his adult shadow and crow feathers behind him.",
              caption: "Itachi's story, 2016",
            },
            {
              file: "naruto-4",
              alt: "Kakashi in his Anbu mask in front of a full moon.",
              caption: "Kakashi in the Anbu, 2013",
            },
          ],
        },
        {
          id: "jojo",
          name: "JoJo's Bizarre Adventure",
          kicker: "Hirohiko Araki · David Production",
          text: [
            "Every part changes its hero, its era and almost its genre. Fights are won by thinking more than punching, and the poses are a trademark by now.",
            "My part is the fifth, Golden Wind, the one set in Italy. And my character is its villain, Diavolo.",
          ],
          facts: [
            ["Manga", "since 1987"],
            ["Anime", "since 2012"],
            ["Magazine", "Shōnen Jump and Ultra Jump"],
          ],
          arc: "Part 5, Golden Wind",
          arcLabel: "My part",
          character: "Diavolo",
          credit: "© LUCKY LAND COMMUNICATIONS / Shueisha · JoJo's Animation Project",
          panels: [
            {
              file: "jojo-1",
              alt: "Giorno and his gang around a golden shield, with the JoJo logo.",
              caption: "Golden Wind, 2018",
            },
            {
              file: "jojo-3",
              alt: "Josuke and his friends on the streets of Morioh, with Kira in the background.",
              caption: "Diamond is Unbreakable, 2016",
            },
            {
              file: "jojo-4",
              alt: "Jotaro and his Stardust Crusaders companions, lined up and posing.",
              caption: "Stardust Crusaders, 2014",
            },
          ],
        },
      ],
    },
    bio: {
      meta: {
        title: "Biohacking",
        description:
          "My radar of biohacking gadgets for better sleep, faster recovery and skin care, and the way into the supplements compendium.",
      },
      kicker: "Notebook no. 3 · Appendix B · Sample C",
      title: "Biohacking",
      lead: "Gadgets on my radar for better sleep, faster recovery and skin care. Supplements, with their studies, are in the compendium.",
    },
  },
};
