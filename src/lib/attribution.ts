/**
 * Atribución de campaña: captura los UTM y la página de entrada la primera vez
 * que el visitante llega y los conserva durante toda la sesión, para poder
 * medir el embudo completo (anuncio → landing → clic a WhatsApp → solicitud).
 */

const KEY = "algos_attribution";

export interface Attribution {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_path?: string;
  referrer?: string;
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

function clean(value: string | null): string | undefined {
  const v = (value ?? "").trim().slice(0, 120);
  return v.length > 0 ? v : undefined;
}

/** Deriva el origen cuando no hay UTMs (p. ej. tráfico orgánico de Meta). */
function inferSource(referrer: string): string | undefined {
  if (!referrer) return undefined;
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (typeof window !== "undefined" && host === window.location.hostname) return undefined;
    if (/instagram\./.test(host)) return "instagram";
    if (/facebook\.|fb\./.test(host)) return "facebook";
    if (/google\./.test(host)) return "google";
    return host;
  } catch {
    return undefined;
  }
}

/** Lee (y almacena la primera vez) la atribución de la sesión actual. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};

  let stored: Attribution = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(KEY) || "{}") as Attribution;
  } catch {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const fresh: Attribution = {};
  for (const key of UTM_KEYS) {
    const value = clean(params.get(key));
    if (value) fresh[key] = value;
  }

  // Compatibilidad con enlaces de Meta que sólo traen fbclid.
  if (!fresh.utm_source && clean(params.get("fbclid"))) {
    fresh.utm_source = "meta";
    fresh.utm_medium = fresh.utm_medium ?? "paid_social";
  }

  const hasNewCampaign = Object.keys(fresh).length > 0;
  if (hasNewCampaign || !stored.landing_path) {
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    const attribution: Attribution = {
      ...fresh,
      utm_source: fresh.utm_source ?? stored.utm_source ?? inferSource(referrer),
      landing_path: stored.landing_path ?? window.location.pathname,
      referrer: stored.referrer || referrer || undefined,
    };
    try {
      sessionStorage.setItem(KEY, JSON.stringify(attribution));
    } catch {
      /* modo privado: seguimos en memoria */
    }
    return attribution;
  }

  return stored;
}

/** Inicializa la atribución al cargar la app. */
export function initAttribution(): Attribution {
  return getAttribution();
}
