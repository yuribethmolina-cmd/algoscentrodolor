Actualizar los tabs y copys para eliminar promesas absolutas.

1. **`src/components/PainTabSection.tsx`**
   - Reemplazar el array `BENEFITS` de 5 tabs por 4:
     - `Procedimiento mínimamente invasivo`
     - `Guiado por imagen`
     - `Recuperación pronta`
     - `Diagnóstico preciso`
   - Ajustar posiciones `top`/`left` para distribuir bien los 4 pills sobre la imagen (y mantener el ancho uniforme en mobile).
   - Reescribir el párrafo del tab **“Cómo lo tratamos”**: quitar “sin cirugía abierta, sin hospitalización” y usar “procedimientos mínimamente invasivos guiados por imagen”.

2. **`src/components/WhyDifferentSection.tsx`**
   - Reemplazar el array `ANNOTATIONS` por los mismos 4 tabs y ajustar posiciones.
   - Reescribir el párrafo principal quitando “sin hospitalización” y “sin cirugía abierta”.

3. **`src/components/HerniaVideoSection.tsx`**
   - Cambiar el benefit `Sin cirugía abierta ni hospitalización` por `Procedimiento mínimamente invasivo`.
   - Mantener `Recuperación en días, no meses`.

4. **Verificación**
   - Buscar en el proyecto que no queden “sin hospitalización”, “sin cirugía abierta” ni “recuperación en 24h” en esas secciones.

## Detalle técnico
Los tabs son arrays estáticos dentro de cada componente; el cambio es solo de presentación (etiquetas, posiciones y copy), sin tocar datos ni lógica de negocio.