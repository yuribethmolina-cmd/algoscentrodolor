
# Plan — Aplicar cambios de la reunión con el Dr. Luis

Basado en `Resumen_reunion_con_luis.docx` y el PDF de rediseño. Objetivo: reposicionar ALGOS como "La Clínica del Dolor" con doble pilar Especialidades + Estudios Diagnósticos, funnel 100% ALGOS, lenguaje accesible doble‑capa.

---

## 1. Home — nueva arquitectura

Nuevo orden en `src/pages/Index.tsx`:

```
Navbar
HeroSection              ← headline nuevo (§2)
TrustBar
EspecialidadesSection    ← pilar 1 (rediseñada, ya existe archivo)
EstudiosDiagnosticosSection  ← pilar 2 (NUEVO)
ServiciosDomicilioSection    ← NUEVO (labs + rayos X)
SedesSection                 ← NUEVO (Zona Sur + Castillo Plaza)
ConditionsSection        ← se conserva (dolores frecuentes)
WhyDifferentSection      ← se conserva
TeamSection              ← ampliado (§5)
HomeFAQSection           ← reescrita (§6)
ProximamenteSection      ← NUEVO (expansión 100 m²)
AllianceSection          ← se mantiene tal cual (decisión usuario)
StatsStrip
FinalCTA
```

Se retiran del home: `ServicesSection`, `GuiasImagenSection` (sus contenidos migran a la nueva página de Estudios Diagnósticos).

---

## 2. Hero — nuevo headline

`src/components/HeroSection.tsx` — cambio del `AnimatedHeadline`:

- Antes: "El dolor tiene causa. Nosotros la tratamos."
- Nuevo: **"¿Tiene dolor? En ALGOS lo evaluamos, diagnosticamos y tratamos."**

Chunks:
- `"¿Tiene dolor? "` — teal
- `"Evaluamos, diagnosticamos y tratamos."` — gold `#9a7320` (sin italic, respeta la regla ESLint)

Subcopy: "Primer centro de dolor intervencionista del Zulia. Especialidades médicas y estudios diagnósticos bajo un mismo techo."

CTAs: Reservar cita · WhatsApp (ya existe).

---

## 3. Especialidades — pilar 1

### 3.1 Rediseño de `src/components/EspecialidadesSection.tsx`

Grid de 9 especialidades confirmadas por el Dr., cada una con icono, nombre y 1 línea de descripción accesible. CTA "Ver todas las especialidades" → `/especialidades`.

Especialidades (orden y textos según reunión):
1. Neurocirugía
2. Traumatología
3. Reumatología
4. Fisiatría
5. Radiología intervencionista
6. Cuidados paliativos
7. Oncología médica
8. Psiquiatría
9. Nutrición

### 3.2 Nueva ruta `/especialidades` — `src/pages/Especialidades.tsx`

Página detalle con estructura "doble capa" por especialidad: qué evalúa/diagnostica, qué trata, quién acompaña la recuperación. Sin nombres de médicos (van en Equipo).

### 3.3 Datos

Nuevo `src/data/specialties.ts` con la lista (id, name, tagline, description, icon).

---

## 4. Estudios Diagnósticos — pilar 2

### 4.1 Nueva sección de home `src/components/EstudiosDiagnosticosSection.tsx`

Tres grupos visuales:
- **Imagen**: Tomografía · Rayos X (convencional y portátil) · Mamografía 3D
- **Cardiología**: ECG · Holter
- **Neurofisiología**: EEG · EMG
- **Laboratorio**: enlace directo (ya hay `EstudiosLaboratorio.tsx`)

CTAs: "Ver todos los estudios" → `/estudios-diagnosticos`.

### 4.2 Nueva ruta `/estudios-diagnosticos` — `src/pages/EstudiosDiagnosticos.tsx`

Cada estudio en formato doble capa:
- **Qué es** (frase accesible)
- **Para qué sirve** (indicaciones frecuentes en lenguaje de paciente — ej. EMG: "cuando el dolor viene con hormigueo o debilidad")
- **Cómo se hace** (detalle técnico corto)
- **Disponibilidad**: horario y sede (ej. EMG/EEG solo miércoles PM)

Migrar contenido útil de `GuiasImagenSection.tsx` y `EstudiosLaboratorio.tsx`.

### 4.3 Datos

Nuevo `src/data/diagnostics.ts`.

### 4.4 Ads / SEO

Meta title y H1 orientados a "tomografía Maracaibo", "Holter Maracaibo", "electromiografía Maracaibo". Actualizar `public/sitemap.xml` y `public/llms.txt`.

---

## 5. Servicios a domicilio + Sedes

### 5.1 `src/components/ServiciosDomicilioSection.tsx` (nuevo)

Bloque compacto: "Laboratorio a domicilio" y "Rayos X a domicilio". CTA WhatsApp.

### 5.2 `src/components/SedesSection.tsx` (nuevo)

Dos tarjetas: **Zona Sur** y **Castillo Plaza**, con dirección, servicios disponibles en cada una y botón "Cómo llegar" (Google Maps). Direcciones pendientes de confirmar — se dejan placeholders visibles y comentados hasta que Secretaría las envíe.

---

## 6. Preguntas frecuentes

Reescribir `src/components/HomeFAQSection.tsx` con las 8 preguntas priorizadas en la reunión:
1. ¿Duele el procedimiento?
2. ¿Es seguro? ¿Qué efectos secundarios puede tener?
3. ¿Cuánto dura el procedimiento y la recuperación?
4. ¿En cuánto tiempo notaré mejoría?
5. ¿Los efectos son permanentes?
6. ¿Cuánto cuesta? (respuesta: se cotiza según caso tras evaluación)
7. ¿Cómo agendo una cita?
8. ¿Necesito referencia médica?

Todo en registro **usted**.

---

## 7. Equipo — ampliación

`src/data/team.ts` — añadir médicos confirmados en la reunión (con datos mínimos placeholder marcados como "pendiente confirmar por Secretaría"):
- Dr. Antonino Parra — Traumatólogo (cadera)
- Dr. Miguel Guevara — [especialidad pendiente]
- Dra. Carolina — Fisiatría
- Dra. Doris Meneses — Neurocirugía (columna)
- Dr. Alirio Ríos — Neurofisiología (EEG/EMG)
- Dra. Alicia — Cardiología (Holter)

Mantener los cuatro miembros actuales (Dr. Atilio, Dr. Luis, Dra. Aliseth, Lcdo. Daniel).

---

## 8. Sección "Próximamente"

`src/components/ProximamenteSection.tsx` (nuevo). Narrativa institucional del proyecto de expansión de 100 m² (consultorios, integración diagnóstico + tratamiento). Sin fotos aún — usar ilustración o mockup textual con un badge "Próximamente Q1 2027".

---

## 9. Registro `usted` y limpieza de tecnicismos

- Auditar copy de nuevos componentes para asegurar registro usted (sin "tú/tienes/puedes").
- No usar en portada: "infiltración ecoguiada", "bloqueo facetario", "radiofrecuencia medial branch" — mover a fichas internas.
- Mantener regla ESLint `no-italic` — todos los headlines nuevos usan Raleway peso variable, no italic.

---

## 10. Rutas nuevas (App.tsx)

Añadir en `src/App.tsx`:
- `/especialidades` → `Especialidades`
- `/estudios-diagnosticos` → `EstudiosDiagnosticos`

Actualizar navbar (`Navbar.tsx` y `GlobalNavbar.tsx`) con enlaces a estas dos rutas.

---

## 11. Fuera de alcance (para próxima iteración)

- Contenido definitivo por especialista (esperando entregas de Secretaría).
- Fichas nuevas de condiciones (túnel carpiano, rodilla) — se dejan listadas pero sin páginas nuevas todavía.
- Google Business Profile, Ads, plan de reseñas — trabajo operativo, no del código.
- Radiofrecuencia como servicio propio — sigue "próximamente" según PDF.
- Precios — bloqueante según reunión.

---

## 12. Orden de implementación

1. Datos nuevos (`specialties.ts`, `diagnostics.ts`, ampliación de `team.ts`).
2. Componentes nuevos (EstudiosDiagnosticos, ServiciosDomicilio, Sedes, Proximamente).
3. Rediseño EspecialidadesSection y HomeFAQSection.
4. Nuevas páginas /especialidades y /estudios-diagnosticos + rutas.
5. Ajuste del Hero.
6. Reorden de `Index.tsx`.
7. Navbar + sitemap + llms.txt.
8. Commit único.

¿Apruebas para pasar a implementación, o quieres ajustar algún bloque (por ejemplo dejar Sedes/Próximamente para una segunda pasada)?
