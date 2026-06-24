
# Análisis visual y plan de mejoras

## 1. Diagnóstico (lo que veo en el preview)

### Hero
- **Headline ilegible al final.** "evidencia clínica" en Playfair italic dorado se ve casi transparente sobre el cream — la animación staggered de `AnimatedHeadline` deja `clínica` en un estado de opacidad baja y el dorado `#c69636` sobre `#f5f0e8` apenas tiene contraste (~2.1:1, falla WCAG AA).
- **Body copy chico.** 17px con `text-deep-teal/80` se siente apretado para una landing médica donde el usuario llega con dolor.
- **Eyebrow "MARACAIBO · ALEMANIA"** queda perdido (14px, gold sobre cream).
- **Mucho espacio vacío arriba** — el video de fondo casi no se ve por el overlay cream al 95%, así que la mitad superior es un bloque cream sin información.

### Sección Alianza ALGOS ↔ UDUZ
- **El logo de ALGOS no aparece** en el panel teal oscuro. La causa: el componente toma `logo-transparent.png` (que ya es teal + gold sobre transparente) y le aplica `filter: brightness(0) invert(1)`. Eso convierte TODO en blanco — incluyendo el punto dorado de la marca — y como el PNG original tiene un canal alpha muy suave, el resultado es prácticamente invisible. El logo que subiste (`algos-logo-cream.png`) tampoco sirve directo porque está pensado para fondo blanco, no cream/teal.
- **Tipografía italic delgada** en frases clave ("Lo que hacemos — cómo lo hacemos", "Un ecosistema clínico completo. Sin traslados.") — Playfair Display italic en peso 400 sobre teal oscuro pierde definición.
- **Contraste bajo del párrafo** "ALGOS opera en alianza institucional…" — cream al 70% sobre teal da ~4.3:1, justo en el borde de AA pero a 14px se siente lavado.
- **Bullets de servicios** a 14px con cream al 80% son difíciles de escanear.
- **Bloques 01/02/03** funcionan bien estructuralmente pero el cuerpo a 14px gris (#4a4a4a) sobre cream pierde jerarquía.
- **Numerales italic** dorados están bien pero compiten con los italics del hero — demasiado Playfair italic por toda la página.

### Resto de la página
- **Stats strip muestra `00` y `0`** — los contadores animados no se disparan (probable issue de IntersectionObserver o llegó a viewport sin trigger). Lo dejo anotado pero fuera de scope visual.

---

## 2. Soluciones propuestas

### A. Sistema tipográfico (global, en `src/index.css` y `tailwind.config.ts`)
- **Subir tamaños base de cuerpo:**
  - Body párrafos: 14px → **16px** (mobile) / **17px** (desktop), line-height 1.7.
  - Hero subcopy: 17px → **19–20px**, line-height 1.65.
  - Bullets de listas en alianza: 14px → **16px**.
- **Subir peso del color de cuerpo:** `text-deep-teal/80` → `text-deep-teal/90` o token nuevo `--text-body: #2a4a52` (más oscuro que el teal 80% actual).
- **Reducir uso de Playfair italic.** Mantenerlo solo en H1/H2 del hero y un acento por sección. Reemplazar los italics intermedios (subtítulos "Lo que hacemos", "Lo que necesitas") por Inter semibold uppercase o un display sans más legible.
- **Reemplazar dorado puro en texto pequeño** por un dorado más oscuro `#9a7320` cuando vaya sobre cream (cumple AA a 14px+).

### B. Arreglar el headline del hero
- Quitar el stagger de opacidad o subir el opacity final a 1 con duración corta.
- Subir el contraste del dorado del segundo chunk: usar `#a87a1f` sobre cream (4.7:1) en lugar de `#c69636` (2.1:1).
- Subir el font-weight del italic Playfair de 400 a 600 para que no se adelgace tanto en pantalla.
- Comprimir el padding vertical para que el headline empiece antes (el hero pierde ~400px de cream vacío arriba).

### C. Arreglar la sección Alianza
1. **Logo ALGOS correcto sobre teal oscuro:**
   - Crear un asset dedicado `algos-logo-cream-on-dark.svg` (inline SVG) con la onda + punto dorado + wordmark en cream (#f5f0e8). Reemplaza el hack `filter: brightness(0) invert(1)`.
   - Tamaño 140px de alto, alineación izquierda del panel.
2. **Reescalar el header de cada panel:**
   - Reemplazar el subtítulo italic Playfair ("Lo que hacemos — cómo lo hacemos") por un H3 sans-serif (Inter 600, 22px, tracking ajustado) en cream/teal y un acento dorado en la segunda parte.
3. **Subir contraste del párrafo central del bridge:** cream/70 → cream/95, tamaño 15px → 17px, max-width 60ch.
4. **Bullets más cómodos:** 16px, separación 14px, color cream/90 sobre teal, divisor inferior cream/15.
5. **CTAs finales:** convertirlas en botones reales en vez de underlines casi invisibles — un primario teal + un secundario ghost con borde, ambos cumpliendo contraste.
6. **Numerales 01/02/03:** mantener italic dorado pero a 44px en oscuro `#9a7320` (no en gold puro), para que jerarquicen sin chillar.

### D. Navbar
- Subir tamaño de links 13px → 14px y peso 500 → 600 para mejor lectura.
- Eyebrow "MARACAIBO · ALEMANIA" del hero: 14px → 13px pero con color dorado más oscuro y `letter-spacing: 0.3em` para que respire.

---

## 3. Archivos que tocaré

- `src/index.css` — tokens nuevos: `--text-body`, `--gold-on-cream` (oscuro), tamaños base.
- `tailwind.config.ts` — exponer los tokens nuevos.
- `src/components/HeroSection.tsx` — fix headline (color/opacidad/weight), subir copy a 19px, reducir padding top.
- `src/lib/animations.tsx` — asegurar opacidad final 1 en `AnimatedHeadline` chunks.
- `src/components/AllianceSection.tsx` — reemplazo del logo, nuevo H3 sans-serif por panel, contraste de bullets/párrafo, CTAs reales, numerales en dorado oscuro.
- `src/assets/algos-logo-cream.svg` (nuevo) — logo inline cream-on-dark, basado en el SVG de marca.
- `src/components/Navbar.tsx` — solo ajuste de tamaño/peso de links.

## 4. Lo que NO tocaré (fuera de scope)

- Stats animados en `00/0` (es bug funcional, lo reportaré aparte).
- Estructura de rutas, contenido de copy clínico, otras secciones del home.
- Footer, equipo, tratamientos — solo el hero y alianza en este pase.

---

## 5. Detalles técnicos (referencia)

Tokens nuevos en `index.css`:
```
--text-body: 200 30% 22%;          /* reemplaza deep-teal/80 en párrafos */
--gold-deep: 38 65% 36%;           /* dorado AA-safe sobre cream */
--cream-strong: 38 47% 96%;        /* cream para texto sobre teal */
```

Cambios típicos de utilidad:
- `text-[14px]` en bullets → `text-base` (16px)
- `text-deep-teal/80` en body → `text-[hsl(var(--text-body))]`
- `text-algos-gold` en hero italic → `text-[hsl(var(--gold-deep))]`

¿Apruebas el plan o quieres ajustar el alcance (por ej. dejar la navbar fuera, o también arreglar los contadores del stats strip)?
