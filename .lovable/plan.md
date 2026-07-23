## Panel de edición del equipo médico

### Qué construir

Un panel en `/admin/equipo` (protegido, junto a los demás admin) donde puedes:

- **Ver** la lista completa del equipo (activos + próximos)
- **Editar** cualquier miembro: foto, nombre, cargo, especialidad, horario, bio, credenciales, idiomas
- **Crear** nuevos miembros (tanto médicos reales como "próximamente")
- **Eliminar** miembros
- **Reordenar** con arrastrar/subir-bajar
- **Subir foto** directamente desde el navegador (se guarda en almacenamiento)

Los cambios se reflejan inmediatamente en:
- Sección "Equipo" del home
- Página `/equipo`
- Perfiles individuales `/equipo/:slug`

### Modelo de datos

Una sola tabla `team_members` que reemplaza los archivos estáticos `team.ts` y `doctors.ts`. Contiene los campos de ambos:

- **Identidad**: `slug`, `name`, `kind` (`doctor` real o `aspirational` próximamente)
- **Cargo**: `role`, `specialty`, `specialty_slug`, `is_director`
- **Presentación**: `bio`, `credentials[]`, `languages[]`, `schedule`, `note`
- **Foto**: `photo_url` (URL pública del almacenamiento) + `photo_position`
- **Home**: `group_id` (01/02/03), `display_order`, `profile_line` (texto corto para próximos)
- **Ubicación**: `city`, `country`

Bucket público `team-photos` para las imágenes. Solo admins pueden escribir; lectura pública.

### Cómo llega a las páginas

Nuevo hook `useTeamMembers()` con React Query. Un `TeamDataProvider` en la raíz precarga y cachea. Cada consumidor pasa de importar `DOCTORS`/`TEAM` a leer del hook.

Se conservan los tipos `Doctor` y `TeamMember` como proyecciones derivadas para no reescribir los componentes de presentación.

Mientras el request inicial se resuelve, se muestran los datos actuales como fallback estático (siembra inicial idéntica a `doctors.ts` y `team.ts`), así no hay pantalla en blanco en la primera carga.

### Seguridad

- Bucket público solo lectura; escritura requiere sesión admin.
- Tabla `team_members`: lectura pública (anon+authenticated), escritura solo si `has_role(auth.uid(),'admin')`.
- Foto sube desde el cliente directo al bucket (con sesión admin), sin edge function.

### Alcance técnico

- 1 migración: tabla + índices + RLS + grants + bucket + policies + seed.
- 1 hook `useTeamMembers()` + provider.
- 1 página admin `AdminEquipo.tsx` (lista + editor lateral + subida de foto).
- Refactor de 5 archivos para leer del hook: `TeamSection.tsx`, `HomeTeamSection.tsx`, `Equipo.tsx`, `MedicoPerfil.tsx`, `EquipoSpecialtySections.tsx` (y `EspecialidadesSection.tsx` si depende).
- Ruta protegida en `AnimatedRoutes.tsx` y enlace desde el resto de dashboards admin.
- Se dejan `team.ts` y `doctors.ts` como fuente de la **siembra inicial** y del fallback estático, pero ya no como fuente de verdad.

### Fuera de alcance

- No se modifica `specialties.ts` (los slugs de especialidad siguen fijos como catálogo).
- No se agregan campos que no existan hoy en `team.ts`/`doctors.ts`.
- Sin historial de cambios ni versionado — es sobrescritura directa.

¿Procedo?
