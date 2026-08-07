/**
 * Asignación estable de variantes para experimentos A/B ligeros.
 * La variante se guarda en localStorage para que el visitante vea siempre
 * la misma versión y las métricas no se contaminen entre sesiones.
 */

export type Variant = "a" | "b";

const PREFIX = "algos_ab_";

export function getVariant(experiment: string): Variant {
  if (typeof window === "undefined") return "a";

  const key = PREFIX + experiment;

  try {
    // Override manual para QA: ?ab=b
    const forced = new URLSearchParams(window.location.search).get("ab");
    if (forced === "a" || forced === "b") {
      window.localStorage.setItem(key, forced);
      return forced;
    }

    const stored = window.localStorage.getItem(key);
    if (stored === "a" || stored === "b") return stored;

    const assigned: Variant = Math.random() < 0.5 ? "a" : "b";
    window.localStorage.setItem(key, assigned);
    return assigned;
  } catch {
    return "a";
  }
}
