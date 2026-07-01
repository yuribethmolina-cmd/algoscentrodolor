# ALGOS — Adaptación estratégica de contenido

**Fecha:** 2026-07-01  
**Fuente:** Documento Base Web y Redes (PDF, 14 pp.)  
**Branch:** home-redesign  

---

## Objetivo

Adaptar el contenido del sitio al documento de marca aprobado: tagline en el hero, taxonomía de condiciones alineada con el posicionamiento estratégico del PDF, y todo el texto de fichas de tratamiento escrito en registro usted, sin superlativos ni promesas de cura.

---

## Cambios en scope

### 1. HeroSection — h1

**Archivo:** `src/components/HeroSection.tsx`

Cambiar el `AnimatedHeadline` de:
> "Tratamiento del dolor sin cirugía, sin hospitalización."

A:
> "El dolor tiene causa. Nosotros la tratamos."

Chunks para la animación:
- `{ text: "El dolor tiene causa. " }` — teal
- `{ text: "Nosotros la tratamos.", italic: true, color: "#9a7320" }` — gold

El párrafo debajo (frase de apertura) no cambia.

---

### 2. treatments.ts — Reescritura completa

**Archivo:** `src/data/treatments.ts`

#### Taxonomía nueva (5 condiciones)

| # | slug | name | Rol estratégico |
|---|------|------|----------------|
| 1 | `dolor-lumbar-ciatica` | Dolor lumbar y ciática | Protagonista — ancla SEO principal |
| 2 | `dolor-cervical` | Dolor cervical | Principal |
| 3 | `dolor-facetario` | Dolor facetario | Principal |
| 4 | `neuropatia` | Neuropatía | Segundo pilar — enlaza con EMG/UDUZ |
| 5 | `dolor-articular` | Dolor articular | Complementario |

`lesion-deportiva` se elimina (fuera del foco intervencionista según PDF).

#### Estructura de cada condición (ya existe en el tipo `Condition`)

Cada condición recibe contenido real en todos los campos:

- `patientDescription` — 1 oración, registro usted, sin tecnicismos
- `whatIs` — 2–3 párrafos: qué pasa en el cuerpo, por qué duele, cuándo se vuelve crónico
- `symptoms` — 4 síntomas concretos, en primera persona del paciente
- `whenToConsider` — 4 criterios claros para buscar tratamiento intervencionista
- `whatToExpect` — 5 pasos del día del procedimiento con tiempos
- `faq` — 4 preguntas específicas de esa condición con respuestas en usted

#### Reglas de redacción (del PDF)

- Registro usted en todo el texto
- Sin superlativos ("el mejor", "único", "líder")
- Sin prometer cura ni resultado garantizado
- Sin "sin radiación" como gancho
- Ozono: solo indicado para hernia discal confirmada por imagen — nunca "ozonoterapia" suelta
- Radiofrecuencia: mencionada donde aplica; sin captación activa (próximamente según PDF)
- EEG: no asociarlo a cefaleas

#### Procedimientos (`PROCEDURES`)

Actualizar `usedFor` para reflejar nuevos slugs. Agregar:
- `emg` — Electromiografía
- `discólisis-con-ozono` — Discólisis con ozono (hernia discal)

---

### 3. TratamientosSection — Cards del homepage

**Archivo:** `src/components/TratamientosSection.tsx`

Cards principales (grid 2×2): actualizar slugs y textos de 2 cards:
- Card 01: `dolor-lumbar` → `dolor-lumbar-ciatica` | categoría "Columna · Lumbar y ciática"
- Card 03: `lesion-deportiva` → `neuropatia` | nuevo contenido de indicación y técnica

`CARD_CONDITION_SLUGS` array actualizado a:
```
["dolor-lumbar-ciatica", "dolor-cervical", "neuropatia", "dolor-articular"]
```

---

### 4. Registro usted — CTAs pendientes

**Archivos:** `src/pages/Tratamientos.tsx`, `src/pages/TratamientoDetalle.tsx`

- "¿Listo para evaluar **tu** caso?" → "¿Listo para evaluar **su** caso?"
- "Si **tienes** diagnóstico de artrosis" → "Si **tiene** diagnóstico de artrosis"
- Cualquier otro tuteo en esos archivos

---

## Fuera de scope

- Páginas de audiencia (`/pacientes/*`, `/medicos/*`, `/instituciones/*`) — no se tocan
- SEO canonical URLs — se actualizan solo donde el slug cambia (TratamientoDetalle usa `condition.slug` dinámicamente, se resuelve solo)
- Precios — bloqueante según PDF, no se agrega
- Sueroterapia — en pausa según PDF, no se toca
- Radiofrecuencia — próximamente según PDF, solo se menciona donde ya existe

---

## Orden de implementación

1. `src/data/treatments.ts` — primero porque todos los demás dependen de los slugs
2. `src/components/HeroSection.tsx` — cambio aislado
3. `src/components/TratamientosSection.tsx` — actualizar slugs + card 03
4. `src/pages/Tratamientos.tsx` — fix usted en CTAs
5. `src/pages/TratamientoDetalle.tsx` — fix usted en CTAs

Commit único al final con todos los cambios.
