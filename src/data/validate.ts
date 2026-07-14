import { SPECIALTIES } from "@/data/specialties";
import type { Doctor } from "@/data/doctors";

/**
 * Validaciones que se ejecutan en tiempo de build (y en dev al arrancar).
 * Si alguna falla, `vite build` / `vite dev` aborta con un error legible,
 * evitando que el sitio se despliegue con datos inconsistentes.
 */
export function validateTeamData(doctors: readonly Doctor[]): void {
  const errors: string[] = [];
  const specialtySlugs = new Set(SPECIALTIES.map((s) => s.slug));

  // 1) Cada Doctor.specialtySlug debe existir en SPECIALTIES.
  for (const d of doctors) {
    if (!specialtySlugs.has(d.specialtySlug)) {
      errors.push(
        `Doctor "${d.name}" (${d.slug}) referencia especialidad desconocida: "${d.specialtySlug}". ` +
          `Especialidades válidas: ${[...specialtySlugs].join(", ")}.`,
      );
    }
  }

  // 2) Cada especialidad no aspiracional debe tener al menos un médico.
  for (const s of SPECIALTIES) {
    if (s.aspirational) continue;
    const count = doctors.filter((d) => d.specialtySlug === s.slug).length;
    if (count === 0) {
      errors.push(
        `Especialidad "${s.name}" (${s.slug}) no tiene médicos asignados. ` +
          `Marca la especialidad como "aspirational: true" o agrega al menos un doctor.`,
      );
    }
  }

  // 3) Slugs de médicos deben ser únicos.
  const seen = new Set<string>();
  for (const d of doctors) {
    if (seen.has(d.slug)) {
      errors.push(`Slug duplicado en médicos: "${d.slug}".`);
    }
    seen.add(d.slug);
  }

  // 4) Slugs de especialidades deben ser únicos.
  const seenSpec = new Set<string>();
  for (const s of SPECIALTIES) {
    if (seenSpec.has(s.slug)) {
      errors.push(`Slug duplicado en especialidades: "${s.slug}".`);
    }
    seenSpec.add(s.slug);
  }

  if (errors.length > 0) {
    const msg =
      `\n[ALGOS] Validación de datos del equipo falló:\n` +
      errors.map((e) => `  • ${e}`).join("\n") +
      `\n`;
    throw new Error(msg);
  }
}

/** Verifica que un slug de especialidad usado en enlaces exista en SPECIALTIES. */
export function assertSpecialtySlug(slug: string): string {
  if (!SPECIALTIES.some((s) => s.slug === slug)) {
    throw new Error(
      `[ALGOS] Slug de especialidad inválido: "${slug}". ` +
        `Debe coincidir con SPECIALTIES en src/data/specialties.ts.`,
    );
  }
  return slug;
}
