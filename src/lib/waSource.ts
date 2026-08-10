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

/** Añade el código de origen al mensaje prellenado de un enlace de WhatsApp. */
export function withSourceCode(url: string, code: string): string {
  if (!url || !code) return url;
  try {
    const parsed = new URL(url, typeof window !== "undefined" ? window.location.origin : "https://algoscentrodolor.com");
    const current = parsed.searchParams.get("text") ?? "";
    if (current.includes("[Ref:")) return url;
    const message = current ? `${current}\n\n[Ref: ${code}]` : `Hola, quisiera información.\n\n[Ref: ${code}]`;
    parsed.searchParams.set("text", message);
    return parsed.toString();
  } catch {
    return url;
  }
}

/** Atajo: construye el código y lo estampa en la URL. */
export function stampWhatsAppUrl(url: string, section?: string, label?: string): { url: string; code: string } {
  const code = buildSourceCode(section, label);
  return { url: withSourceCode(url, code), code };
}
