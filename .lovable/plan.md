Plan de aplicación de referencias de ESINY a ALGOS usando contenido propio

## Decisiones confirmadas
- Alcance: homepage de ALGOS como primer entregable (se puede extender después).
- Elementos de ESINY a aplicar: hero oscuro/cinematográfico, pasos numerados del journey, tarjetas de equipo con foto.
- Paleta: conservar los tokens de ALGOS (Deep Teal #1A4A55, Teal #3D8B96, Gold #C69636, Cream #F5F0E8).

## Qué NO copiamos de ESINY
- No cambiamos tipografía ni marca; seguimos con Sora/Manrope/Inter definidos en el proyecto.
- No usamos el cyan brillante de ESINY; el color de acento sigue siendo gold/teal.
- No rehacemos la arquitectura de rutas; solo rediseñamos la presentación de la homepage.
- No agregamos testimonios de pacientes en este entregable porque ALGOS aún no tiene reseñas verificadas listas (podemos dejarlo como fase 2).

## Aplicación por bloque

### 1. Hero oscuro y cinematográfico
Objetivo: reemplazar el hero actual (video + overlay cream) por un hero de pantalla completa con imagen de fondo real, overlay teal oscuro y texto centrado, al estilo ESINY.

Contenido que usamos:
- Mantener el mensaje actual: "El dolor tiene causa. Nosotros la tratamos." + subtítulo de Maracaibo.
- CTAs: "Agendar consulta" (WhatsApp) + "Especialidades" (link interno).

Imagen:
- Generar una imagen propia de ALGOS: fotografía médica de calidad que evoque columna/dolor/espalda, o usar un asset existente si hay uno adecuado. Si no hay foto propia, generar una imagen en `src/assets/hero-dark.jpg` con persona de espaldas mostrando la zona lumbar/columna en tonos teal/crema, sin rostros identificables.

Técnica:
- Editar `src/components/HeroSection.tsx`.
- Fondo: imagen full-bleed con `object-cover`, overlay `bg-deep-teal/80` o gradiente `from-deep-teal/90 to-deep-teal/60`.
- Texto centrado, H1 en cream, max-w-4xl, 2–3 líneas.
- CTAs: primario en gold (estilo ESINY) y secundario outline en cream.
- Scroll indicator: agregar flecha animada hacia abajo "Desplazar" (opcional, estilo ESINY).
- Preload de la imagen hero en `index.html` para LCP.

### 2. Pasos numerados del journey (01–06)
Objetivo: crear una nueva sección entre TrustBar y ConditionsSection que muestre los 6 pasos del journey de ALGOS en tarjetas con numeración grande, bordes redondeados y fondo claro, inspirado en ESINY.

Contenido que usamos (de `mem://features/patient-journey`):
1. Consulta Inicial
2. Electrodiagnóstico
3. Evaluación Nutricional
4. Procedimiento guiado por imagen
5. Seguimiento
6. Interconsulta Internacional

Técnica:
- Crear `src/components/PatientJourneySection.tsx`.
- Grid responsive: 1 columna móvil, 2 tablet, 4 desktop (las 2 últimas tarjetas en la última fila se ajustan con grid-flow-dense o span).
- Tarjetas con fondo cream/blanco, border-radius consistente con el sistema (usar `rounded-lg` o `rounded-xl` si se decide, o mantener recto si ALGOS es recto). Dado que ESINY usa redondeado, proponer `rounded-2xl` en estas tarjetas como toque moderno.
- Número grande `/01` en gold, título en deep-teal, descripción corta.
- Iconos de Lucide para cada paso (estetoscopio, activity, apple, target, calendar, globe).
- Animación de entrada staggered con useInViewOnce.

### 3. Tarjetas de equipo con foto
Objetivo: rediseñar `TeamSection` para que, en lugar de mostrar solo todas las especialidades en tarjetas de texto, destaque los perfiles con foto al estilo ESINY.

Contenido que usamos:
- De `src/data/doctors.ts` y `src/data/team.ts`.
- Perfiles con foto confirmada: Dr. Atilio J. Rodríguez y Lic. Daniel Rodríguez.
- Otros médicos aparecen sin foto (placeholder generado o iniciales) hasta que tengamos fotos.

Técnica:
- Editar `src/components/TeamSection.tsx`.
- Grid de 2–4 columnas con tarjetas que incluyan:
  - `/01` índice en gold.
  - Foto del profesional (object-cover, altura fija, aspecto uniforme).
  - Nombre y especialidad.
  - Botón "Ver perfil" o "Agendar" que lleve al perfil del doctor o a WhatsApp.
- Para doctores sin foto: usar un placeholder sutil (iniciales sobre fondo teal) o generar avatares.
- En móvil: scroll horizontal opcional o stack vertical.
- Mantener la sección de "Especialidades" como header, pero el foco visual pasa a los perfiles con foto.

### 4. Ajustes de navegación (complementario, no obligatorio)
ESINY tiene una navbar muy limpia. Proponer un pequeño ajuste a `src/components/Navbar.tsx`:
- Reducir altura de 6rem a ~5rem para un look más premium.
- Aumentar espaciado entre links (gap de 32px a 40px).
- Mantener el logo grande y el CTA de WhatsApp a la derecha.
- No cambiar estructura de dropdowns.

### 5. Tokens y estilo
- Todo el rediseño debe usar los tokens CSS existentes en `src/index.css`:
  - `--primary` (deep teal), `--secondary` (teal), `--accent` (gold), `--background` (cream).
- No hardcodear colores como `text-white` o `bg-black`; usar `text-cream`, `bg-primary`, etc.
- Si se decide usar bordes redondeados en las nuevas tarjetas, agregar un token de radio mayor o usar `rounded-2xl`/`rounded-3xl` de Tailwind consistentemente.

## Archivos a tocar
1. `src/components/HeroSection.tsx` — hero oscuro cinematográfico.
2. `src/index.html` — preload de imagen hero.
3. `src/components/PatientJourneySection.tsx` — nueva sección (crear).
4. `src/pages/Index.tsx` — insertar PatientJourneySection en el orden correcto.
5. `src/components/TeamSection.tsx` — tarjetas de equipo con foto.
6. `src/components/Navbar.tsx` — ajustes opcionales de espaciado/altura.
7. `src/index.css` — agregar utilidades de radio/contrastes si son necesarias.

## Verificación
- Build pasa sin errores.
- Lighthouse: LCP ≤ 2.5s (hero optimizado), contrastes AAA/AA.
- Vista previa: hero centrado, journey numerado, equipo con fotos.
- Responsive: móvil, tablet, desktop.

## Fase 2 (fuera de este plan)
- Testimonios de pacientes con estrellas y fotos cuando haya reseñas verificadas.
- Extender el rediseño a páginas interiores si la homepage convierte.