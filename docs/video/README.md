# Vídeo de demo de Sonrisa Imperial

El vídeo se graba solo con Chrome sin interfaz, así se puede repetir igual
cada vez que cambie la landing (`public/proyectos/sonrisa-imperial/landing.html`).
Con la web en marcha (`npm run dev`):

```bash
npm install puppeteer-core
node docs/video/grabar-demo.mjs
ffmpeg -i sonrisa-imperial-demo.webm -vf "fps=30,format=yuv420p" -c:v libx264 -preset slow -crf 26 -movflags +faststart -an public/video/sonrisa-imperial-demo.mp4
ffmpeg -ss 0.3 -i public/video/sonrisa-imperial-demo.mp4 -frames:v 1 poster.jpg
cwebp -q 75 poster.jpg -o public/video/sonrisa-imperial-poster.webp
```

- MP4 H.264 porque se reproduce en todos los navegadores, incluido Safari.
- `+faststart` mueve el índice al principio para que empiece a reproducirse antes de bajarse entero.
- Sin pista de audio (`-an`): la demo no la necesita y pesa menos.
- Resultado: 17,5 s y 347 KB.
