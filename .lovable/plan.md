# Plan · Nivel 1 (tracking ampliado) + AI Bot ALGOS

Dos entregables. El primero se implementa ahora. El segundo es solo el plan para que lo apruebes antes de construirlo.

---

## Parte 1 — Nivel 1: capturar más datos del formulario de cita

**Objetivo:** saber quién agendó, cómo contactarlo, y darle seguimiento manual desde el panel.

### Cambios en el formulario (`/agendar`)
Agregar campos obligatorios/opcionales:
- **Nombre completo** (obligatorio)
- **Teléfono / WhatsApp** (obligatorio, validación VE)
- **Email** (opcional)
- **Fecha preferida** (opcional, selector)
- **Turno preferido** (mañana / tarde)
- **Notas adicionales** (opcional, textarea corto)

Los campos actuales (condición, estudios previos) se mantienen.

### Backend
Nueva tabla `appointment_requests` en Lovable Cloud:
```
id, created_at, name, phone, email, condition,
has_studies, preferred_date, preferred_shift, notes,
source_section, device, status ('pendiente'|'contactado'|
'agendado'|'asistio'|'no_asistio'|'realizado'),
status_updated_at, status_updated_by, internal_notes
```

- RLS: insert público via edge function (rate-limited), select/update solo admins.
- Edge function `submit-appointment` reemplaza el envío directo actual: valida con Zod, guarda en DB, y devuelve el link de WhatsApp con el mensaje prellenado (comportamiento actual preservado).

### Panel admin
Nueva ruta `/admin/citas`:
- Tabla ordenada por fecha, con filtros por estado y condición.
- Cada fila: cambiar estado con dropdown, agregar notas internas, botón "abrir WhatsApp con este paciente".
- Contador de conversión: enviadas → contactadas → asistieron → realizadas.

### Analytics
El dashboard `/admin/conversiones` gana una tarjeta nueva: **funnel de conversión real** (no solo envíos).

---

## Parte 2 — Plan del AI Bot de ALGOS (solo plan, no se construye aún)

**Objetivo:** asistente conversacional en el sitio que responde dudas de pacientes, orienta sobre condiciones/procedimientos, y ayuda a agendar.

### Alcance del bot
Un asistente de **solo lectura + captación**, no da diagnóstico médico. Responde sobre:
- Qué condiciones tratamos y síntomas típicos
- En qué consiste cada procedimiento (ozono, radiofrecuencia, infiltraciones, EMG, EEG)
- Qué esperar antes/durante/después
- Cuándo consultar
- Ubicación, horarios, sedes, contacto
- Cuando detecta intención de agendar → recolecta datos y crea un `appointment_request`

**No hace:** diagnosticar, recetar, dar dosis, opinar sobre estudios subidos, sustituir consulta.

### Arquitectura técnica
- **Modelo:** `google/gemini-3-flash-preview` vía Lovable AI Gateway (rápido, barato, buena calidad en español).
- **Backend:** edge function `chat` que hace `streamText` del AI SDK con:
  - System prompt con identidad ALGOS, tono, límites clínicos, y política de derivación a médico.
  - **Tools MCP existentes** (ya hay `list_conditions`, `get_condition`, `list_procedures`, `list_team`, `clinic_info` en `src/lib/mcp/`) → el modelo consulta la fuente de verdad en vez de alucinar.
  - Tool nuevo `create_appointment_request` que escribe en la tabla del Nivel 1.
- **Frontend:** botón flotante estilo chat (esquina inferior izquierda, para no chocar con el botón de WhatsApp). Al abrir, panel lateral con AI Elements.
- **Persistencia:** una conversación por sesión de navegador en `localStorage` (sin threads, sin login). No guardamos historial en DB salvo que aprobemos analytics de chat.
- **Rate limit:** por IP hash, reutilizando la infra de `rate_limits`.

### Decisiones que necesito de ti antes de construir
1. **Nombre y personalidad del bot** — ¿"Asistente ALGOS", un nombre propio (ej. "Vera"), tono cercano o formal?
2. **Ubicación visual** — flotante siempre visible, o solo aparece en ciertas páginas.
3. **¿Puede agendar directamente?** — o siempre termina derivando al WhatsApp humano.
4. **Idiomas** — solo español, o también inglés para pacientes internacionales.
5. **Disclaimer médico** — texto exacto que quieres que aparezca al abrir el chat.

### Costo estimado
Gemini 3 Flash vía Lovable AI: fracción de céntimo por conversación típica. Con 500 conversaciones/mes, costo mensual insignificante frente al valor de captación.

### Fases sugeridas
1. Nivel 1 (esta iteración).
2. Bot MVP: responde preguntas + deriva a WhatsApp.
3. Bot avanzado: crea `appointment_request` directamente + panel de conversaciones en admin.

---

**Confírmame:** ¿arranco con Parte 1 completa, y me respondes las 5 preguntas de la Parte 2 para dejar el plan del bot cerrado?
