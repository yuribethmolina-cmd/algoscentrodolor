# Logos Hospital Clínico + CDD Maracaibo en la barra de alianzas

## Objetivo
Mostrar los logos del **Hospital Clínico de Maracaibo** y de **CDD Radioterapia Maracaibo** en la franja "En alianza con" del home, acompañados de un aviso de **próxima sede** en el Hospital Clínico (Av. 15 Delicias, Urb. La Trinidad), antes de que la sede esté atendiendo. Los pacientes seguirán preguntando por WhatsApp.

## Cambios

### 1. Crear los assets de los logos
- Subir desde los archivos subidos al chat con `lovable-assets`:
  - `WhatsApp_Image_2026-10-10_at_16.04.44.jpeg` → `src/assets/logo-hospital-clinico.png.asset.json` (convertir a PNG con fondo limpio antes de subir para que no quede un JPEG con compresión visible)
  - `Logo_CDD_Radioterapia_Maracaibo_300px_-_Blanco.png` → `src/assets/logo-cdd-maracaibo.png.asset.json`
- No se deja ningún binario en el repo; solo los punteros `.asset.json`.
- La captura de pantalla con la dirección (SCR-20261013-mfvf.png) es solo referencia; no se publica.

### 2. Ampliar `src/components/TrustBar.tsx`
- Junto al logo de UDUZ, agregar los dos logos nuevos con `alt` descriptivo ("Hospital Clínico de Maracaibo" / "CDD Radioterapia Maracaibo"), altura visual equivalente a UDUZ (`clamp(36px, 4.2vw, 48px)`).
- El logo de CDD es blanco: se muestra dentro de un pequeño bloque con fondo **Deep Teal (#1A4A55)** para que sea legible sobre la crema de la franja. El logo del Hospital Clínico (fondo azul) se muestra tal cual, sin bloque.
- Debajo de la fila de logos, agregar una línea corta en mayúsculas doradas (mismo estilo del eyebrow) diciendo algo como:
  - "Próximamente · Nueva sede en el Hospital Clínico de Maracaibo · Av. 15 Delicias, Urb. La Trinidad"
- Los logos no llevan enlace (no hay web confirmada); UDUZ conserva el suyo.
- Sin cambios en SedesSection ni Contacto: la sede se anuncia solo como "próximamente" en la barra.

### 3. Actualizar memoria del proyecto
- Guardar en `mem://` que ALGOS tendrá una nueva sede en el Hospital Clínico de Maracaibo (Av. 15 Delicias, Urb. La Trinidad) con estado "próximamente", y que los logos del Hospital Clínico y CDD Radioterapia Maracaibo son aliados mostrados en la barra del home. La nota actual de "solo 2 sedes" se actualiza para reflejar la tercera en camino.

## Detalle técnico
- `TrustBar.tsx` es el único componente editado; el resto del home no cambia.
- Alturas y espaciados siguen el patrón existente (gap `clamp(28px, 5vw, 64px)`), así la franja se ve bien en móvil (los logos ya hacen wrap con `flex-wrap`).

## Verificación
- Build del proyecto sin errores.
- Captura con Playwright del home en desktop y móvil confirmando que los tres logos se ven y el logo blanco de CDD es legible sobre el bloque teal.
- Confirmar que la línea "Próximamente · Nueva sede…" se muestra sin cortarse en móvil.
