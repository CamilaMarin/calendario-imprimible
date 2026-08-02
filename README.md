# Calendario para imprimir

Genera calendarios mensuales personalizables, con notas por día, listos
para imprimir o guardar como PDF. Construido con Vite + React + TypeScript
+ Tailwind CSS v4.

## Funcionalidad

- Navegación entre meses
- Notas editables por día (clic para editar), persistidas en el navegador
- Elegir si la semana empieza en lunes o domingo
- Dos plantillas visuales: minimalista y con acento de color
- Colores de fondo independientes: uno para el calendario y otro para el
  resto de la página (blanco por defecto), más color de acento — en vivo,
  persistidos en el navegador
- Secciones extra debajo del calendario, en grid de 2 columnas: notas
  (redimensionables en ambas direcciones), checklist, cita/frase destacada,
  hábitos (grilla de casillas por día del mes) o prioridades (top 3
  numeradas) — con opción de marcar una sección como "ancho completo"
- El color de texto se calcula automáticamente según el contraste contra
  el fondo elegido (texto claro sobre fondos oscuros, oscuro sobre claros),
  sin necesidad de elegir un color de texto aparte
- Modo "Marco" para ahorrar tinta: en vez de rellenar el fondo con el color
  elegido, solo dibuja un borde con el color de acento y deja todo blanco
- Botón "Imprimir / guardar PDF" que usa el diálogo nativo del navegador
  (en el diálogo de impresión, elige "Guardar como PDF" en destino)

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy a GitHub Pages

1. Settings → Pages → Source: **GitHub Actions**.
2. Push a `main`: el workflow en `.github/workflows/deploy.yml` construye
   y publica automáticamente.
3. Si el repo no se llama `tu-usuario.github.io`, edita `base` en
   `vite.config.ts` a `'/nombre-del-repo/'`.

## Posibles mejoras (fuera del alcance v1)

- Exportar a PDF directo con `jsPDF` + `html2canvas` en vez de depender del
  diálogo de impresión del navegador
- Más plantillas visuales
- Sincronizar notas entre dispositivos (requeriría backend, ver spec del
  portafolio para proyectos con Supabase)
