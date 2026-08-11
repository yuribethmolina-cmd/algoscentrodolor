declare function gtag(...args: unknown[]): void;

import { supabase } from "@/integrations/supabase/client";
import { stampWhatsAppUrl, sectionLabel, reasonForPath } from "@/lib/waSource";
import { getAttribution } from "@/lib/attribution";



function isMobile(): boolean {
  return typeof window !== "undefined" && window.innerWidth < 768;
}

function device(): "mobile" | "desktop" {
  return isMobile() ? "mobile" : "desktop";
}

function getSectionFromElement(el: Element): string {
  const ancestor = el.closest("[data-section]");
  if (ancestor) return (ancestor as HTMLElement).dataset.section ?? "unknown";
  const withId = el.closest("[id]");
  if (withId) return withId.id || "unknown";
  return "unknown";
}

type EventType = "whatsapp_click" | "appointment_submit" | "cta_click";

interface InternalPayload {
  event_type: EventType;
  section?: string;
  device?: string;
  condition?: string;
  has_studies?: string;
  source?: string;
  label?: string;
  source_code?: string;
  section_label?: string;
  reason?: string;
}

function sendInternal(payload: InternalPayload) {
  try {
    const attribution = getAttribution();
    const body = {
      ...payload,
      ...attribution,
      device: payload.device ?? device(),
      path: typeof window !== "undefined" ? window.location.pathname : undefined,
      referrer: typeof document !== "undefined" ? document.referrer : undefined,
    };
    // Fire-and-forget; do not block user interaction on network.
    void supabase.functions.invoke("track-conversion", { body });
  } catch (err) {
    console.warn("analytics send failed", err);
  }
}

/** Eventos del embudo del formulario de cita: vista, inicio, error y envío. */
export type FormStep = "form_view" | "form_start" | "form_error" | "form_success";

export function trackFormStep(step: FormStep, detail?: string, section = "form_agendar") {
  const label = detail ? `${step}:${detail}` : step;
  if (typeof gtag !== "undefined") {
    gtag("event", step, { event_category: "funnel", event_label: label, section, device: device() });
  }
  sendInternal({ event_type: "cta_click", section, label, source: section });
}


export function trackWA(section: string, label = "whatsapp", sourceCode?: string) {
  const sectionName = sectionLabel(section);
  const reason = reasonForPath();
  if (typeof gtag !== "undefined") {
    gtag("event", "whatsapp_click", {
      event_category: "conversion",
      event_label: label,
      section,
      source_code: sourceCode,
      device: device(),
    });
    gtag("event", "generate_lead", {
      method: "whatsapp",
      event_label: label,
      section,
    });
  }
  sendInternal({
    event_type: "whatsapp_click",
    section,
    label,
    source: sourceCode,
    source_code: sourceCode,
    section_label: sectionName || undefined,
    reason,
  });
}


export function trackCTA(section: string, label: string, destination = "") {
  if (typeof gtag !== "undefined") {
    gtag("event", "cta_click", {
      event_category: "engagement",
      event_label: label,
      section,
      destination,
      device: device(),
    });
  }
  sendInternal({ event_type: "cta_click", section, label });
}

interface AppointmentPayload {
  condition?: string;
  hasStudies?: string;
  source?: string;
}

export function trackAppointment(payload: AppointmentPayload = {}) {
  if (typeof gtag !== "undefined") {
    gtag("event", "appointment_submit", {
      event_category: "conversion",
      event_label: payload.condition || "unspecified",
      condition: payload.condition ?? "unspecified",
      has_studies: payload.hasStudies ?? "unspecified",
      source: payload.source ?? "form_agendar",
      device: device(),
    });
    gtag("event", "generate_lead", {
      method: "whatsapp_form",
      condition: payload.condition ?? "unspecified",
    });
  }
  sendInternal({
    event_type: "appointment_submit",
    section: payload.source ?? "form_agendar",
    condition: payload.condition ?? "unspecified",
    has_studies: payload.hasStudies ?? "unspecified",
    source: payload.source ?? "form_agendar",
  });
}

export function installWAClickTracker() {
  document.addEventListener(
    "click",
    (e) => {
      const target = e.target as Element;
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.includes("wa.me")) return;
      // No estampar mensajes salientes del panel admin hacia pacientes.
      const isAdmin = typeof window !== "undefined" && window.location.pathname.startsWith("/admin");
      const section = getSectionFromElement(anchor);
      const label = anchor.dataset.waLabel || anchor.textContent?.trim() || "whatsapp";

      let code: string | undefined;
      if (!isAdmin) {
        const stamped = stampWhatsAppUrl(anchor.href, section, label);
        code = stamped.code;
        anchor.href = stamped.url;
      }

      if (anchor.dataset.analytics === "manual" || isAdmin) return;
      trackWA(section, label, code);
    },
    true,
  );
}

