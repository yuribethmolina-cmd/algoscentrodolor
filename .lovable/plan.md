# Home móvil: lenguaje humano y cercano

## Objetivo
Que el paciente venezolano que entra desde el celular entienda en 3 segundos qué hacemos, sienta que hay personas reales que se ocupan de su dolor, y sepa exactamente qué pasa cuando toca el botón. Sin tecnicismos, sin mensajes de "sistema".

## Diagnóstico del mensaje actual (móvil)
- El bloque de WhatsApp mezcla tres capas: CTA en mayúsculas ("ESCRÍBANOS POR WHATSAPP"), un punto de color con "Fuera de horario" y un texto de apoyo largo. Se lee como aviso de call center, no como una persona.
- "Fuera de horario" comunica rechazo. El paciente con dolor lo lee como "no me van a atender".
- El subtítulo del hero explica el servicio ("Evaluación con el especialista, sin orden médica previa") pero no reconoce lo que la persona está sintiendo.
- Hay dos barras compitiendo abajo (sticky WhatsApp + Agendar) que repiten el mismo estado.

## Cambios de copy (solo texto y jerarquía visual)

### 1. Hero móvil
- Titular: se mantiene "El dolor tiene causa. Nosotros la tratamos." (es claro y ya está validado).
- Subtítulo nuevo, en primera persona del equipo:
  > "Sabemos lo que es vivir con dolor todos los días. Aquí lo escuchamos, buscamos la causa y le decimos con claridad qué se puede hacer. No necesita orden médica."
- Eyebrow: se mantiene la ubicación (genera confianza local).

### 2. Botón de WhatsApp
- Texto del botón, siempre igual y en lenguaje natural (sin mayúsculas gritadas):
  - En horario: "Escríbanos por WhatsApp"
  - Fuera de horario: "Escríbanos por WhatsApp" (mismo texto; el estado se explica debajo)
- El indicador cambia de tono:
  - Abierto: punto verde + "Le respondemos ahora"
  - Cerrado: punto ámbar + "Le respondemos apenas abramos"
- Se elimina la etiqueta "Fuera de horario" como texto principal.

### 3. Microcopy debajo del botón
- En horario: "Le contesta una persona de nuestro equipo, no un robot. Escriba su nombre y cuéntenos qué le molesta."
- Fuera de horario: "Deje su mensaje ahora. Mañana [o el lunes] a las 7:00 AM lo leemos de primero y le confirmamos su cita."
- El día se calcula con la lógica de horarios que ya existe.

### 4. Barra sticky móvil
- WhatsApp: "Escribir" + estado corto ("Respondemos ahora" / "Respondemos al abrir").
- Segundo botón: "Pedir cita" en lugar de "Agendar" (más coloquial en Venezuela).

### 5. Señal humana en el home
- Debajo del hero, una línea breve con foto/nombre del equipo tratante o firma del director médico:
  > "Detrás de cada consulta hay un equipo que conoce su caso por nombre."
  Se reutiliza el bloque de equipo ya existente; solo se añade la línea de conexión.

## Tratamiento
Se mantiene el "usted" cálido que ya usa el sitio (respetuoso y natural en el contexto médico venezolano), pero con frases cortas y verbos en presente. Si prefiere tuteo, se cambia en un solo paso.

## Detalles técnicos
- `src/lib/businessHours.ts`: reescribir `statusLabel`, `helperText`, `ctaLabel` y `nextOpeningLabel` con el copy nuevo. Sin cambios de lógica horaria.
- `src/components/HeroSection.tsx`: subtítulo móvil, quitar el `uppercase`/`letter-spacing` extremo del CTA móvil, ajustar tamaños para que el bloque de estado se lea como frase y no como badge.
- `src/components/MobileStickyCTA.tsx`: etiquetas nuevas.
- Sin cambios de backend, tracking ni rutas.

## No incluye
- Cambios en el hero desktop más allá de heredar el copy compartido.
- Cambios en el asistente ni en el flujo de citas.
