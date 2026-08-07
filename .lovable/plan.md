# Plan: mensaje alternativo fuera del horario de WhatsApp

## Objetivo
Cuando el usuario intente agendar por WhatsApp fuera del horario de atención (lunes a viernes, 7:00 AM a 4:00 PM), mostrar un mensaje alternativo que invite a dejar datos o programar para el siguiente día hábil, en lugar de abrir WhatsApp directamente.

## Alcance
- Componente del asistente: `src/components/AsistenteAlgos.tsx`
- Guardar la solicitud como cita si cae fuera de horario, usando el flujo existente (`submit-appointment`).

## Detalles técnicos
1. **Horario de atención por WhatsApp:** lunes a viernes, 7:00 a 16:00 (hora de Venezuela, UTC-4).
2. **Función de validación:** `isWithinBusinessHours()` que compare la hora actual contra ese rango en la zona horaria local del centro.
3. **Puntos de intervención:**
   - Al pulsar "Agendar rápido por WhatsApp" en el composer.
   - Al enviar el mini-formulario del asistente.
4. **Comportamiento fuera de horario:**
   - No abrir `wa.me`.
   - Mostrar mensaje del asistente explicando el horario y ofreciendo dejar datos.
   - Si el formulario ya tiene datos, enviar la solicitud como cita a través de `submit-appointment` con el evento de seguimiento correspondiente.
5. **Mensaje propuesto:**
   > "Estamos fuera del horario de atención por WhatsApp (lunes a viernes, 7:00 AM a 4:00 PM). Déjanos tu nombre y teléfono y te contactamos al iniciar el siguiente día hábil."
6. **Tracking:** registrar eventos `chat_asistente:off_hours` y `chat_asistente:off_hours_form` en analytics para distinguir conversiones fuera de horario.
7. **Edge case:** si el usuario ya completó el formulario, mantener el botón de acción como "Dejar mis datos".

## No incluye
- Cambios en el backend del asistente.
- Cambios en el horario de atención de los especialistas.
- Cambios visuales mayores del chat.
