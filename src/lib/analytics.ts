declare function gtag(...args: unknown[]): void;

function isMobile(): boolean {
  return window.innerWidth < 768;
}

function getSectionFromElement(el: Element): string {
  const ancestor = el.closest("[data-section]");
  if (ancestor) return (ancestor as HTMLElement).dataset.section ?? "unknown";
  const withId = el.closest("[id]");
  if (withId) return withId.id || "unknown";
  return "unknown";
}

export function trackWA(section: string, label = "whatsapp") {
  if (typeof gtag === "undefined") return;
  gtag("event", "whatsapp_click", {
    event_category: "conversion",
    event_label: label,
    section,
    device: isMobile() ? "mobile" : "desktop",
  });
}

export function trackCTA(section: string, label: string, destination = "") {
  if (typeof gtag === "undefined") return;
  gtag("event", "cta_click", {
    event_category: "engagement",
    event_label: label,
    section,
    destination,
    device: isMobile() ? "mobile" : "desktop",
  });
}

export function installWAClickTracker() {
  document.addEventListener("click", (e) => {
    const target = e.target as Element;
    const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
    if (!anchor) return;
    const href = anchor.getAttribute("href") ?? "";
    if (!href.includes("wa.me")) return;
    const section = getSectionFromElement(anchor);
    trackWA(section, anchor.textContent?.trim() || "whatsapp");
  });
}
