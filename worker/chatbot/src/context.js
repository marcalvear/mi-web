// GENERADO por scripts/contexto-chatbot.mjs a partir de src/i18n y
// src/content/compendio. No lo edites a mano: cambia los textos de la web y
// vuelve a ejecutar `npm run chatbot:contexto`.

export const CONTEXT = `SOBRE MARC
- Aprendo inteligencia artificial para ayudar a startups e infoproductores a dar vida a sus proyectos.
- Soy de València y estudio 1º de DAM en el IES Dr. Lluís Simarro. Me enganché a la inteligencia artificial al ver que hace en mucho menos tiempo, y a menudo mejor, muchas de las tareas de nuestro día a día en el trabajo.
- Quiero descubrir hasta dónde llega para delegarle todo lo automatizable y que las personas nos centremos en crear y ser originales, que es justo lo que la IA no sabe hacer. Me gustaría ayudar a construir un mundo en el que nos dediquemos a lo que nos gusta y la IA haga el trabajo aburrido.
- Origen: València, España.
- Estudio: 1º DAM · IES Dr. Lluís Simarro.
- Curso: 2026-2027.
- Idiomas: Español · Inglés C1.

BITÁCORA
- Formación · 1º DAM: Desarrollo de Aplicaciones Multiplataforma en el IES Dr. Lluís Simarro, curso 2026-2027.
- Certificado · Inglés C1: C1 Advanced de Cambridge English. Es el idioma en el que se publica casi todo sobre IA.
- Proyecto · Esta web: Tres versiones, y cada bloque con su issue, su rama y su pull request.
- Deporte · Pádel: Dos años jugando como aficionado con mis amigos.

PROYECTO: SONRISA IMPERIAL (Proyecto · Septiembre de 2026)
- Landing page para que una clínica dental (ficticia) consiga citas de personas que llegan desde el móvil.
- El problema: Una clínica dental necesita llenar su agenda, y la mayoría de la gente la busca desde el móvil. Si para pedir cita hay que rellenar muchos campos o buscar el botón, una parte se va sin terminar.
- La solución:
  - Un solo objetivo. Todos los botones de la página llevan al mismo formulario.
  - Formulario corto. Solo dos campos obligatorios: nombre y teléfono. El motivo de la visita es opcional.
  - Pensada primero para móvil. Una barra fija abajo con «Llamar» y «Solicitar cita», siempre a mano del pulgar.
  - Confianza antes de pedir datos. Presupuesto por escrito y los tres pasos que vienen después de pedir cita.
  - Identidad propia. La arcada dental de la cabecera se dibuja en SVG con JavaScript, con colores de esmalte y encía.
  - Ligera. Un único fichero HTML de 19 KB.
- Métricas (Lighthouse en móvil, 13 de octubre de 2026.): Rendimiento 94, Accesibilidad 100, Buenas prácticas 96, SEO 100, Peso total 58 KB, CLS 0.
- El resultado: La clínica es ficticia, así que no hay datos reales de citas conseguidas.
- Lo que haría distinto: Conectaría el formulario a un servicio de envío real y probaría con personas de verdad cuánto tardan en pedir cita. Es lo que estoy aplicando en el formulario de contacto de esta web.
- El caso completo está en la web, en «Lo que he hecho».

LO QUE LE GUSTA
- Videojuegos: Zelda: Breath of the Wild, Bloodborne, Pokémon.
- Anime y manga: Naruto Shippuden, JoJo's Bizarre Adventure.
- Biohacking: TheraFace Mask Glo, JetBoots Prime, Eight Sleep Pod, Oura Ring.
- Me fascina usar la tecnología para sacar el máximo partido a nuestro cuerpo según lo que buscamos. Estos son los productos que tengo en el radar.
- Productos de biohacking que sigue: TheraFace Mask Glo (Therabody): Mascarilla LED sin cables para la piel. JetBoots Prime (Therabody): Botas de compresión para recuperar las piernas. Pod 6 (Eight Sleep): Funda de colchón que enfría o calienta cada lado de la cama y mide el sueño sin llevar nada puesto. Oura Ring (Oura): Anillo que mide sueño, frecuencia cardíaca, temperatura y actividad. WHOOP 5.0 (WHOOP): Pulsera sin pantalla que mide el sueño, el esfuerzo y la recuperación, y te dice cuánto entrenar cada día. 302 Laser Cap (Blueprint): Gorra con 302 láseres rojos que estimulan el folículo para frenar la caída del pelo y ayudar a que vuelva a crecer. SFC Facial Serum (Blueprint): Sérum facial con SFC, NMN y ácido hialurónico para una piel más firme y frenar las señales del envejecimiento. Advanced Antioxidants (Blueprint): Cápsulas con licopeno, astaxantina, luteína y vitaminas K contra el estrés oxidativo de las células.
- En la página «Me gusta» hay una Pokédex con modelos 3D, un mazo con las frases de Naruto y JoJo traducidas y su radar de biohacking con fotos.

COMPENDIO DE BIOHACKING
- Elige lo que te pasa y te cuento qué suplementos se han estudiado para eso, cómo actúan en tu cuerpo y qué encontraron los estudios, con cada fuente enlazada. Está en https://marcalvear.github.io/mi-web/biohacking/ (en inglés, /mi-web/en/biohacking/). Esto es divulgación, no consejo médico. Lo escribo leyendo estudios, no como profesional sanitario. Si tomas medicación, estás embarazada o los síntomas no se van, habla antes con tu médico o tu farmacéutico.
- Digestiones pesadas: Enzimas digestivas, Aceite de menta y alcaravea, Extracto de hoja de alcachofa, Jengibre.
- Cada ficha se puede guardar con una estrella y aparece en «Mi espacio». Dentro del compendio, este asistente hace de «boticario»: si alguien quiere saber qué suplemento mirar para lo que le pasa, recomiéndale preguntarle allí.

CONTACTO Y USUARIOS
- ¿Tienes una startup o un infoproducto y quieres darle vida con IA? Escríbeme y te respondo.
- Lo mejor es el formulario de la portada (sección «Contacto»): al enviarlo se crea un espacio privado en la web, «Mi espacio», donde la persona ve la conversación con Marc y su respuesta. Le llega un correo con el enlace y entra con un código, sin contraseña.
- LinkedIn: https://www.linkedin.com/in/marccalatayud
- GitHub: https://github.com/marcalvear

ESTA WEB
- Es la tercera versión de su web personal, con estética de «cuaderno de laboratorio». Está hecha con Astro, en español e inglés, y se publica con GitHub Actions en GitHub Pages.
- Usa Supabase para los usuarios y los mensajes (con reglas de seguridad por fila), n8n para el formulario (captcha, crear la cuenta, clasificar el mensaje con IA y responder por correo) y este asistente en un Cloudflare Worker con Workers AI.
- Cada bloque de la web tiene su issue, su rama y su pull request en github.com/marcalvear/mi-web.`;

export const COMPENDIO = `COMPENDIO DE BIOHACKING: https://marcalvear.github.io/mi-web/biohacking/
Aviso de la página: Esto es divulgación, no consejo médico. Lo escribo leyendo estudios, no como profesional sanitario. Si tomas medicación, estás embarazada o los síntomas no se van, habla antes con tu médico o tu farmacéutico.

PROBLEMA: DIGESTIONES PESADAS (https://marcalvear.github.io/mi-web/biohacking/#digestiones-pesadas)
- Pesadez, hinchazón, sentirte lleno a los pocos bocados. Cuando se repite y el médico no encuentra una causa, se llama dispepsia funcional, y es justo lo que han estudiado los ensayos de esta ficha.
- Qué pasa en el cuerpo: Digerir es partir la comida en piezas que el intestino pueda absorber. Lo hacen las enzimas, con ayuda de la bilis para las grasas, mientras el estómago se contrae para ir pasando la comida al intestino. Si alguna de esas piezas va lenta, la comida se queda más tiempo arriba y aparecen la pesadez y los gases. Cada suplemento de aquí actúa en un punto distinto de ese recorrido.
- Combinarlos: Ningún ensayo de esta ficha probó dos suplementos juntos. Si quieres probar, empieza por uno y espera unas semanas antes de añadir otro, así sabrás cuál te funciona.
- Ve al médico antes que a un suplemento si además: pierdes peso sin buscarlo; vomitas a menudo; te cuesta tragar o te duele; ves heces negras o sangre; tienes más de 55 años y los síntomas son nuevos.

FICHA: Enzimas digestivas (Complejo enzimático) · https://marcalvear.github.io/mi-web/biohacking/#enzimas-digestivas
- Qué es: Cápsulas con las mismas enzimas que fabrica tu cuerpo para partir la comida: amilasa, proteasas, lipasa y lactasa, entre otras.
- Evidencia: Moderada (Al menos un ensayo con placebo que sale a favor). Por qué este nivel: Dos ensayos con placebo en dispepsia funcional salen a favor, pero son pequeños y uno lo firma el fabricante del complejo que se probó.
- Cómo funciona: Se toman con la comida y empiezan a trabajar en el estómago, antes de que lleguen las enzimas del páncreas. Cada una rompe un tipo de alimento: la amilasa, el almidón del pan o la pasta; las proteasas, la carne y el huevo; la lipasa, las grasas; la lactasa, el azúcar de la leche, y la alfa-galactosidasa, los azúcares de las legumbres que fermentan y dan gases. Lo que llega al intestino ya va medio partido.
- Dosis estudiada: 50 mg tres veces al día, o 2 cápsulas de 200 mg al día, durante 2 meses. Cuándo: Al empezar a comer.
- Qué encontraron los estudios:
  - En 40 personas con dispepsia funcional, un complejo de enzimas durante 60 días mejoró todos los cuestionarios de síntomas frente a placebo, sin efectos adversos. [Majeed M et al., 2018, J Med Food 21(11):1120-1128, PMID 30156436]
  - En 120 personas, 2 cápsulas al día durante 2 meses mejoraron la calidad de vida, el dolor y hasta el sueño frente a placebo. [Ullah H et al., 2023, Biomed Pharmacother 169:115858, PMID 37976892]
  - En 16 personas sanas, 280 mg de lipasa antes de una comida con un 55 % de grasa redujeron la sensación de estómago lleno. [Levine ME et al., 2015, Gut Liver 9(4):464-469, PMID 25287168]
  - Con un plato de 420 g de alubias, 1200 GalU de alfa-galactosidasa redujeron los gases y la flatulencia en 8 voluntarios. [Di Stefano M et al., 2007, Dig Dis Sci 52(1):78-83, PMID 17151807]
- Precauciones: No sustituyen a la pancreatina que receta el médico cuando el páncreas no fabrica suficientes enzimas. Muchas fórmulas llevan bromelina (de la piña) o papaína (de la papaya). Evítalas si eres alérgico a esas frutas. La bromelina puede sumarse al efecto de los anticoagulantes. Si los tomas, consulta antes. Algunas versiones llevan además betaína HCl, que no se recomienda si tienes úlcera.
- Productos que miraría Marc (Datos de las webs oficiales en octubre de 2026. No he probado ninguno a fondo y no gano nada si compras.):
  - Sports Research, Digestive Enzymes + Probiotic (Estados Unidos): lleva 15 enzimas, probiótico y jengibre; toma 1 cápsula antes de comer; bote 90 cápsulas; precio 22,95 $. https://www.sportsresearch.com/products/digestive-enzymes
  - Pure Encapsulations, Digestive Enzymes Ultra (Estados Unidos): lleva Proteasas, lipasa, amilasa, lactasa y enzimas para la fibra; toma 2 cápsulas con cada comida; bote 90 o 180 cápsulas; precio 38 $ (90 cápsulas). https://www.pureencapsulationspro.com/digestive-enzymes-ultra.html

FICHA: Aceite de menta y alcaravea (Aceites esenciales en cápsula gastrorresistente) · https://marcalvear.github.io/mi-web/biohacking/#menta-alcaravea
- Qué es: La combinación con el ensayo más claro contra la presión y la sensación de pesadez después de comer.
- Evidencia: Moderada (Al menos un ensayo con placebo que sale a favor). Por qué este nivel: Un ensayo con placebo de 96 pacientes muestra una mejora clara, con números grandes, pero es un solo ensayo con esta dosis.
- Cómo funciona: El mentol de la menta relaja el músculo del tubo digestivo, así que el estómago deja de apretar y se calma el espasmo. La alcaravea, una semilla parecida al comino, ayuda a expulsar los gases. La cápsula gastrorresistente no se abre en el estómago sino más abajo, para que la menta no te vuelva en forma de eructos.
- Dosis estudiada: 90 mg de aceite de menta y 50 mg de alcaravea, 2 veces al día, durante 4 semanas. Cuándo: Mañana y noche, sin masticar la cápsula.
- Qué encontraron los estudios:
  - En 96 pacientes con dispepsia funcional, la presión, la pesadez y la sensación de lleno bajaron un 43 % con la combinación y un 22 % con placebo. [May B et al., 2000, Aliment Pharmacol Ther 14(12):1671-1677, PMID 11121917]
  - El dolor bajó un 40 % frente a un 22 % con placebo, y los médicos vieron mucho mejor al 67 % de los pacientes, frente al 21 % con placebo. [May B et al., 2000, Aliment Pharmacol Ther 14(12):1671-1677, PMID 11121917]
- Precauciones: La menta puede empeorar el ardor si tienes reflujo. La cápsula gastrorresistente lo reduce, pero no lo elimina. No abras ni mastiques la cápsula: la menta se liberaría en el estómago. En el embarazo y la lactancia, solo si te lo indica tu médico.

FICHA: Extracto de hoja de alcachofa (Extracto vegetal) · https://marcalvear.github.io/mi-web/biohacking/#alcachofa
- Qué es: Hace que el hígado suelte más bilis, que es lo que necesitas para digerir las grasas.
- Evidencia: Moderada (Al menos un ensayo con placebo que sale a favor). Por qué este nivel: Lo respalda un ensayo grande, de 247 pacientes en varios hospitales, más un estudio que mide cómo sube la bilis. Falta que otros grupos lo repitan.
- Cómo funciona: La hoja de alcachofa tiene cinarina y otros compuestos que aumentan la bilis que el hígado envía al intestino. La bilis trata la grasa como el jabón: la parte en gotas pequeñas para que la lipasa pueda romperla. En un estudio, la bilis subió un 151 % una hora después de tomar el extracto.
- Dosis estudiada: 2 cápsulas de 320 mg, 3 veces al día (1.920 mg al día), durante 6 semanas. Cuándo: Con las comidas.
- Qué encontraron los estudios:
  - En 247 pacientes con dispepsia funcional, los síntomas mejoraron más con el extracto que con placebo durante las 6 semanas del ensayo. [Holtmann G et al., 2003, Aliment Pharmacol Ther 18(11-12):1099-1105, PMID 14653829]
  - La calidad de vida, medida con un cuestionario de dispepsia, mejoró 41 puntos con alcachofa y 25 con placebo. [Holtmann G et al., 2003, Aliment Pharmacol Ther 18(11-12):1099-1105, PMID 14653829]
  - En 20 voluntarios, la bilis que llega al intestino subió un 151 % a la hora de tomar 1,92 g de extracto, mucho más que con placebo. [Kirchhoff R et al., 1994, Phytomedicine 1(2):107-115, PMID 23195882]
- Precauciones: No la tomes si tienes piedras en la vesícula o las vías biliares obstruidas: más bilis puede provocar un cólico. Si tienes alergia a las margaritas, la manzanilla o la ambrosía, puedes tenerla también a la alcachofa: son de la misma familia.

FICHA: Jengibre (Raíz en cápsulas) · https://marcalvear.github.io/mi-web/biohacking/#jengibre
- Qué es: Hace que el estómago se vacíe antes. En los ensayos eso no se tradujo en menos molestias.
- Evidencia: Preliminar (Estudios pequeños o resultados indirectos). Por qué este nivel: Los estudios miden que el estómago se vacía antes, pero en los dos ensayos las molestias no cambiaron.
- Cómo funciona: El jengibre aumenta las contracciones del antro, la parte baja del estómago que empuja la comida hacia el intestino. En personas sanas, el estómago tardó la mitad en vaciarse a medias.
- Dosis estudiada: 1,2 g en cápsulas, una sola toma. Cuándo: Una hora antes de comer.
- Qué encontraron los estudios:
  - En 24 personas sanas, el estómago tardó 13 minutos en vaciarse a la mitad con jengibre y 27 con placebo. Las molestias fueron las mismas. [Wu KL et al., 2008, Eur J Gastroenterol Hepatol 20(5):436-440, PMID 18403946]
  - En 11 pacientes con dispepsia funcional, el estómago también se vació antes (12 minutos frente a 16), pero los síntomas no cambiaron. [Hu ML et al., 2011, World J Gastroenterol 17(1):105-110, PMID 21218090]
- Precauciones: En dosis altas puede dar ardor de estómago. Puede sumarse al efecto de los anticoagulantes. Si los tomas, consulta antes.
`;
