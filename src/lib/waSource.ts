/**
 * Código de origen para clics de WhatsApp.
 * Permite identificar desde qué sección o CTA llegó cada paciente
 * al leer el mensaje que envía por WhatsApp.
 *
 * Formato: ALG-<SECCION>-<CTA>-<D>   (D = M móvil / D escritorio)
 * Ej.: ALG-HERO-AGENDAR-M
 */

function normalize(value: string, maxLen: number): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, maxLen)
    .replace(/-+$/g, "");
}

export function buildSourceCode(section?: string, label?: string): string {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const parts = ["ALG"];
  const sec = normalize(section ?? "", 14);
  const lbl = normalize(label ?? "", 14);
  if (sec) parts.push(sec);
  if (lbl && lbl !== sec) parts.push(lbl);
  parts.push(isMobile ? "M" : "D");
  return parts.join("-");
}

/** Nombre legible de la sección de origen, para que el equipo lo lea en el chat. */
const SECTION_LABELS: Record<string, string> = {
  hero: "Portada",
  hero_mobile_a: "Portada (móvil)",
  hero_mobile_b: "Portada (móvil)",
  sticky_mobile_cta: "Barra fija móvil",
  "mobile-navigation": "Menú móvil",
  conditions: "Condiciones que tratamos",
  "pain-tab": "Tipos de dolor",
  "patient-journey": "Ruta del paciente",
  "why-different": "Por qué somos diferentes",
  alliance: "Alianza UDUZ",
  "home-team": "Equipo médico",
  team: "Equipo médico",
  location: "Sedes",
  stats: "Resultados",
  cta: "Contacto",
  "final-cta": "Contacto final",
  chat_asistente: "Asistente virtual",
};

/** Motivo de consulta según la página en la que está el paciente. */
const PATH_REASONS: Array<[RegExp, string]> = [
  [/^\/procedimientos\/emg/, "una Electromiografía (EMG)"],
  [/^\/procedimientos\/eeg/, "un Electroencefalograma (EEG)"],
  [/^\/procedimientos\/ozono/, "el tratamiento con ozono para hernia discal"],
  [/^\/procedimientos\/radiofrecuencia/, "el tratamiento con radiofrecuencia"],
  [/^\/procedimientos\/infiltraciones/, "las infiltraciones y bloqueos"],
  [/^\/procedimientos/, "los procedimientos de ALGOS"],
  [/^\/condiciones\/hernia-discal/, "la hernia discal"],
  [/^\/condiciones\/dolor-lumbar/, "el dolor lumbar"],
  [/^\/condiciones\/dolor-cervical/, "el dolor cervical"],
  [/^\/condiciones\/cefaleas/, "las cefaleas"],
  [/^\/condiciones\/ciatica/, "la ciática"],
  [/^\/condiciones\/neuropatia-diabetica/, "la neuropatía diabética"],
  [/^\/condiciones\/dolor-tras-cirugia/, "el dolor que persiste tras una cirugía"],
  [/^\/condiciones/, "mi dolor"],
  [/^\/estudios-laboratorio/, "los estudios de laboratorio"],
  [/^\/estudios/, "los estudios diagnósticos"],
  [/^\/equipo/, "una consulta con su equipo médico"],
  [/^\/tratamientos/, "sus tratamientos"],
  [/^\/preguntas-frecuentes/, "sus servicios"],
  [/^\/lp\/diagnostico/, "un estudio diagnóstico"],
  [/^\/lp\/dolor/, "el tratamiento de mi dolor"],
  [/^\/contacto/, "sus servicios"],
];

export function sectionLabel(section?: string): string {
  if (!section || section === "unknown") return "";
  return SECTION_LABELS[section] ?? "";
}

/** Motivo por defecto según la ruta actual. */
export function reasonForPath(pathname?: string): string {
  const path = pathname ?? (typeof window !== "undefined" ? window.location.pathname : "/");
  for (const [pattern, reason] of PATH_REASONS) {
    if (pattern.test(path)) return reason;
  }
  return "sus servicios";
}

/** Mensaje preconfigurado con el motivo de consulta y la sección de origen. */
export function buildPrefilledMessage(section?: string, pathname?: string): string {
  const reason = reasonForPath(pathname);
  const label = sectionLabel(section);
  const base = `Hola, mi nombre es __________ y quiero información sobre ${reason}.\nLo que me está molestando es: __________`;
  return label ? `${base}\n(Vengo de la sección "${label}" de la web.)` : base;
}

/**
 * Añade el mensaje preconfigurado (si falta) y el código de origen
 * al enlace de WhatsApp.
 */
export function withSourceCode(url: string, code: string, section?: string): string {
  if (!url || !code) return url;
  try {
    const parsed = new URL(url, typeof window !== "undefined" ? window.location.origin : "https://algoscentrodolor.com");
    const current = parsed.searchParams.get("text") ?? "";
    if (current.includes("[Ref:")) return url;

    const body = current.trim() || buildPrefilledMessage(section);
    const label = sectionLabel(section);
    const ref = label ? `[Ref: ${code} · ${label}]` : `[Ref: ${code}]`;
    parsed.searchParams.set("text", `${body}\n\n${ref}`);
    return parsed.toString();
  } catch {
    return url;
  }
}

/** Atajo: construye el código y lo estampa en la URL. */
export function stampWhatsAppUrl(url: string, section?: string, label?: string): { url: string; code: string } {
  const code = buildSourceCode(section, label);
  return { url: withSourceCode(url, code, section), code };
}

