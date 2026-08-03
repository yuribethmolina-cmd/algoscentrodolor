## Objetivo

Completar el perfil clínico de **Dr. Antulio Parra** y **Dr. Miguel Guevara** con las áreas de atención del post de Instagram. Sin datos de contacto ni consultorio externo.

## Estado actual (verificado)

Ambos existen en la tabla `doctors` y en `src/data/doctors.ts` con solo nombre, especialidad ("Traumatología y Ortopedia") y horario ALGOS. `bio`, `credentials` y `languages` están vacíos, por lo que sus páginas `/equipo/<slug>` se ven mínimas.

## Contenido a agregar

Áreas tomadas del post (comunes a ambos traumatólogos):
- Traumatología general
- Ortopedia infantil
- Patología de miembro superior e inferior
- Reemplazos articulares
- Valoración de pie y tobillo
- Patologías dolorosas de hombro, codo, muñeca, mano, cadera, rodilla y pie

**Dr. Antulio Parra** — bio breve: traumatólogo ortopedista con amplia trayectoria en Maracaibo; en ALGOS evalúa patologías dolorosas del aparato locomotor y coordina con el equipo intervencionista cuando el caso lo amerita.

**Dr. Miguel Guevara** — bio breve equivalente, con énfasis en patología de miembro superior e inferior y valoración de pie y tobillo.

Credenciales para ambos: "Médico Traumatólogo Ortopedista", "Ortopedia infantil", "Reemplazos articulares", "Patología de miembro superior e inferior", "Valoración de pie y tobillo". Idiomas: Español.

## Cambios técnicos

1. `src/data/doctors.ts` — agregar `bio`, `credentials` y `languages` a las entradas `dr-antulio-parra` y `dr-miguel-guevara` (se mantienen los horarios ALGOS actuales, no los del post).
2. Migración/actualización en la tabla `doctors` con los mismos valores, para que el panel `/admin/equipo` y `useDoctors` reflejen lo mismo.
3. Verificar que `/equipo`, `/equipo/dr-antulio-parra`, `/equipo/dr-miguel-guevara` y `/especialidades` rendericen sin errores.

## Fuera de alcance

- Dra. Grace Viloria (no está en el equipo).
- Teléfonos, consultorio y dirección del post.
- Fotos nuevas (la imagen subida es captura de Instagram, no sirve como retrato).
