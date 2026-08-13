# Actualización de precios de estudios: ocultar precios públicos y canalizar a WhatsApp

## Resumen
Dr. Atilio compartió los precios actualizados de EMG/EEG, pero pidió explícitamente **no publicar la tasa ni el precio** en la web para que todo se canalice por WhatsApp. Esta tarea elimina los precios visibles del sitio, actualiza el asistente para que nunca los mencione y dirige a los pacientes a escribir por WhatsApp. Es una medida temporal ("al menos por unos días").

## Cambios propuestos

### 1. Página de Electromiografía (EMG)
- Reemplazar la fila de detalle `Precio: $100 · previa cita` por un texto que invite a consultar por WhatsApp, manteniendo la mención de "previa cita".

### 2. Página de Electroencefalograma (EEG)
- Reemplazar la fila de detalle `Precio: $70 · previa cita` por un texto que invite a consultar por WhatsApp, manteniendo la mención de "previa cita".

### 3. Landing page `/lp/dolor`
- Eliminar las etiquetas de precio (`$100` y `$70`) de las tarjetas de EMG y EEG.
- Ajustar el CTA del bloque diagnóstico para que sea consistente con el nuevo mensaje: consultar precio y agendar por WhatsApp.

### 4. Asistente virtual ALGOS
- Actualizar la base de conocimiento del Edge Function `supabase/functions/asistente/index.ts` para reflejar los nuevos precios internos como **uso interno/no publicar**.
- Cambiar la regla del system prompt que ordena "usar precios exactos" a una regla que prohíbe compartir precios o tasas en el chat y redirige siempre a WhatsApp.
- Eliminar el ejemplo de formato que menciona poner precios en negritas.
- Asegurar que el asistente sepa mencionar que los estudios requieren cita previa y que el pago se canaliza por WhatsApp.

## Verificación
- Revisar que no queden precios de EMG/EEG visibles en las páginas públicas.
- Revisar que el asistente no cite precios en sus respuestas.
- Confirmar que los CTAs de WhatsApp y los formularios de agendamiento continúan funcionando.
