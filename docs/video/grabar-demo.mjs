// Graba el vídeo de demo de Sonrisa Imperial con Chrome sin interfaz.
// Uso (con la web en marcha con `npm run dev` y ffmpeg instalado):
//   npm install puppeteer-core && node docs/video/grabar-demo.mjs
// Genera un .webm que luego se convierte a MP4 (ver README de esta carpeta).

import puppeteer from "puppeteer-core";

const URL = process.env.DEMO_URL || "http://localhost:4321/mi-web/proyectos/sonrisa-imperial/landing.html";
const OUT = process.env.DEMO_OUT || "sonrisa-imperial-demo.webm";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

// Primero se carga sin grabar para que fuentes e imágenes estén en caché
await page.goto(URL, { waitUntil: "networkidle0" });
const recorder = await page.screencast({ path: OUT });
await page.reload({ waitUntil: "networkidle0" });
await wait(1600); // los dientes «salen» al cargar

// Un vistazo a la página y vuelta arriba
await page.evaluate(() => window.scrollBy({ top: 900, behavior: "smooth" }));
await wait(1500);
await page.evaluate(() => window.scrollBy({ top: 700, behavior: "smooth" }));
await wait(1500);

// La barra fija del móvil lleva al formulario
await page.click(".mobile-bar a[href='#reserva']");
await wait(1400);

await page.click("#name");
await page.type("#name", "Lucía", { delay: 110 });
await wait(300);
await page.click("#phone");
await page.type("#phone", "600 123 456", { delay: 90 });
await wait(300);
await page.select("#reason", "Revisión y limpieza");
await wait(600);
await page.click(".consent input");
await wait(600);
// El scroll suave de la página puede mover el botón justo al hacer clic:
// se centra primero y se espera a que se quede quieto
await page.$eval("#booking-form button[type='submit']", (b) => b.scrollIntoView({ block: "center" }));
await wait(900);
await page.click("#booking-form button[type='submit']");
await page.waitForSelector("#reserva.done");
await page.$eval("#reserva", (r) => r.scrollIntoView({ block: "center" }));
await wait(2800); // mensaje de confirmación

await recorder.stop();
await browser.close();
console.log("Vídeo guardado en", OUT);
