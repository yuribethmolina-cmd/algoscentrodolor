Plan: Reemplazar la imagen de dolor de espalda por anatomía médica en la sección "Todo lo que te puede doler" (mobile/desktop)

Objetivo
--------
La imagen actual de la sección pain-tab muestra una mujer con dolor de espalda/cuello. Se quiere una imagen de anatomía médica que ayude al paciente a identificar su dolor y entender que ALGOS ataca la causa anatómica, no solo el síntoma.

Cambios propuestos
------------------
1. Reemplazar el asset de `dolor-espalda-1.webp` en `src/components/PainTabSection.tsx` por una imagen de anatomía médica que muestre la columna vertebral, nervios ciáticos o zonas de dolor cervical/lumbar.

2. Opciones de asset a evaluar (ya existen en el proyecto):
   - `src/assets/ciatica-anatomia.jpeg` — anatomía del nervio ciático, útil para dolor lumbar/cadera.
   - `src/assets/cond-cervical.jpg` — anatomía cervical, conecta con dolor de cabeza, cuello y hombros.
   - `src/assets/cond-lumbar.jpg` — anatomía lumbar, conecta con dolor de espalda baja y ciática.
   Si ninguna encaja visualmente con el diseño de la sección, generar una nueva imagen de anatomía médica de cuerpo completo (posterior) con zonas de dolor resaltadas en tonos teal y gold, sobre fondo claro compatible con el cream de la sección.

3. Ajustar el tratamiento visual de la imagen:
   - Mantener o suavizar el gradiente de la izquierda para que el texto "Todo lo que te puede doler" siga legible.
   - Si la imagen es muy técnica/fría, aplicar un overlay cálido o un color grading que la acerque a la paleta ALGOS (teal #1A4A55, gold #C69636) y evite que se vea como un diagrama de textbook.
   - Revisar las annotations flotantes (PAIN_ZONES) para que no queden sobre áreas muy oscuras o muy claras.

4. Revisar el texto alternativo (alt) para que describa correctamente la imagen médica y mantenga accesibilidad.

5. Verificar en ambos tabs:
   - Tab "dolor": imagen de anatomía médica con zonas de dolor.
   - Tab "tratamos": se mantiene la imagen del procedimiento guiado por imagen (sin cambios).

Validación
----------
- Screenshot mobile y desktop de la sección pain-tab con el nuevo asset.
- Confirmar que el texto superpuesto sigue legible.
- Verificar que las annotations flotantes se vean y no se pierdan en el nuevo fondo.
- Revisar Lighthouse/accessibility por contraste de texto sobre imagen.
