Plan: Reemplazar la imagen recortada de la sección "Todo lo que te puede doler" en mobile

Objetivo
--------
En la vista mobile, la imagen que aparece debajo de los enlaces "Más solicitados" (sección de zonas de dolor) muestra a una mujer sentada con la cabeza gacha y no transmite claramente dolor. Se quiere cambiarla por una imagen que haga que el paciente se identifique: anatomía médica de la columna/nervios con zonas de dolor resaltadas, o una imagen que muestre el dolor de forma más directa y comprensible.

Cambios propuestos
------------------
1. Reemplazar el asset actual de `dolor-espalda-1.webp` en `src/components/PainTabSection.tsx` (tab "dolor") por una imagen de anatomía médica centrada en la columna vertebral y nervios periféricos.

2. El nuevo asset debe cumplir:
   - Estilo médico-clínico, no dramático ni agresivo.
   - Zonas de dolor marcadas visualmente (resaltados en tono teal #3D8B96 o gold #C69636).
   - Fondo neutro/cream que no compita con la paleta de la sección.
   - Orientación vertical-friendly para que funcione bien en mobile recortada.
   - Sin texto ni marcas de stock visibles.

3. Opciones de implementación (elegir una):
   a) Generar una nueva imagen con imagegen: anatomía posterior de torso/columna con nervios iluminados y puntos de dolor en cervical, lumbar y ciática.
   b) Reutilizar un asset existente si encaja con el recorte y el tono (por ejemplo `src/assets/ciatica-anatomia.jpeg` o `src/assets/cond-lumbar.jpg`), previa revisión visual.

4. Ajustar la propiedad `objectPosition` y `objectFit` de la imagen en mobile para que el área anatómica relevante quede visible en el recuadro de altura fija (actualmente 300px-45vw).

5. Ajustar el gradiente de overlay en `AnnotatedPanel` para que la imagen de anatomía se vea claramente y el texto "Dónde le duele" siga legible.

6. Revisar el texto alternativo (alt) para reflejar la nueva imagen: "Anatomía de la columna y nervios que ALGOS evalúa y trata".

Validación
----------
- Screenshot mobile de la home centrado en la sección "Todo lo que te puede doler".
- Screenshot desktop de la misma sección para confirmar que el cambio funciona en ambos viewports.
- Verificar que las annotations (PAIN_ZONES) no queden ocultas ni fuera de lugar.
- Revisar Lighthouse/accessibility por contraste de texto sobre imagen.
