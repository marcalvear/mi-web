# Compendio: «Dormir mejor» (#83)

Conversación con Claude Code (Claude Opus 5.5) del 21 de octubre de 2026.

## El encargo

Marc entrega la web el viernes 23 y pidió terminar el compendio «lo más
grande posible». Aprobó la propuesta de cuatro problemas nuevos (sueño,
concentración, estrés y recuperación), con este orden de trabajo:

> Las que me has dicho, lo que me has sugerido, está perfecto. Empezamos por
> Sueño, está bien.

## Decisiones

- **Cuatro fichas**, con los estudios leídos en PubMed:
  - Melatonina (moderada): metaanálisis de 19 ensayos, unos 7 minutos menos
    para dormirse (23691095), y dosis-respuesta con 26 ensayos: mejor unas
    3 horas antes y hasta 4 mg (38888087). En España, menos de 2 mg por toma.
  - Magnesio (preliminar): ensayo en 46 mayores con insomnio (23853635) y la
    revisión de 2026, que no lo apoya como tratamiento de rutina (42661485).
  - Glicina (preliminar): 3 g antes de dormir (22529837, 22293292), estudios
    de la empresa que la fabrica, y se dice.
  - L-teanina (preliminar): 30 adultos, 200 mg durante 4 semanas (31623400), y
    la revisión de 50 ensayos (40314930).
- Marc pensaba en la lisina: no hay estudios de lisina para dormir; la
  glicina sí los tiene.
- **Reloj de 24 horas** dibujado a mano alzada con rough.js, como el esquema
  digestivo: medianoche arriba, anillo de sueño de 23:00 a 7:00, la luna y el
  sol, y tres momentos de la noche (2-3 h antes, con la cena y al acostarse)
  que se encienden con cada ficha. Supone que te acuestas a las 23:00.
- El dibujo común pasa a `SketchMap.astro`: el digestivo y el reloj solo
  calculan sus trazos. Cada problema elige su esquema con `mapa`.
- Contexto del Boticario IA regenerado con las fichas nuevas.

## Comprobación

- `astro preview`: el reloj se dibuja al entrar en pantalla, pulsar una ficha
  enciende su momento y lleva a ella; sin scroll horizontal en móvil.
- 13 pruebas del Worker en verde.
- Lighthouse del compendio: 93/100/100/100 en español y en inglés, CLS 0.
