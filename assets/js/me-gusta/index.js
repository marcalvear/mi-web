// Entrada de la página Me gusta: arranca cada módulo por separado,
// así si una API falla el resto sigue funcionando.

import { initPokedex } from "./pokedex.js";
import { initHyrule } from "./hyrule.js";
import { initAnimechan } from "./animechan.js";
import { initBiohacking } from "./biohacking.js";

initPokedex();
initHyrule();
initAnimechan();
initBiohacking();
