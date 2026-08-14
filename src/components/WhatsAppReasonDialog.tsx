import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronRight } from "lucide-react";
import { ALGOS } from "@/config/algos.config";
import { WA_REASONS, buildReasonWhatsAppUrl, type WaReasonId } from "@/lib/waSource";
import { withHoursContext, useBusinessHours } from "@/lib/businessHours";
import { trackWA } from "@/lib/analytics";

/**
 * Intercepta los clics en los CTAs genéricos de WhatsApp y pide al paciente
 * que elija el motivo antes de abrir el chat. El código de seguimiento se
 * registra solo internamente: nunca aparece en el mensaje.
 */
export default function WhatsAppReasonDialog() {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState("unknown");
  const hours = useBusinessHours();
  const panelRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.button !== 0) return;
      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href.includes("wa.me")) return;
      if (anchor.dataset.waDirect !== undefined) return;
      const path = window.location.pathname;
      if (path.startsWith("/admin") || path.startsWith("/agendar")) return;

      e.preventDefault();
      e.stopPropagation();
      const host = anchor.closest("[data-section]") as HTMLElement | null;
      setSection(host?.dataset.section || "unknown");
      setOpen(true);
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  function pick(reason: WaReasonId) {
    const { url, code } = buildReasonWhatsAppUrl(reason, section);
    trackWA(section, `motivo:${reason}`, code);
    if (typeof (window as any).fbq === "function") (window as any).fbq("track", "Contact");
    close();
    window.open(withHoursContext(url), "_blank", "noopener,noreferrer");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Elija el motivo de su consulta"
    >
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={close}
        aria-hidden
      />
      <div
        ref={panelRef}
        className="relative w-full sm:max-w-[440px] max-h-[88vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
        style={{
          backgroundColor: ALGOS.palette.cream,
          paddingBottom: "max(env(safe-area-inset-bottom), 16px)",
        }}
      >
        <div
          className="sticky top-0 flex items-start justify-between gap-3 px-5 pt-5 pb-4"
          style={{ backgroundColor: ALGOS.palette.cream }}
        >
          <div>
            <h2
              className="font-display"
              style={{ color: ALGOS.palette.deepTeal, fontSize: 19, fontWeight: 700, lineHeight: 1.2 }}
            >
              ¿Sobre qué quiere que le orientemos?
            </h2>
            <p style={{ color: "rgba(26,74,85,0.72)", fontSize: 13.5, marginTop: 6 }}>
              Así lo atendemos más rápido.
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="shrink-0 p-2 -m-1 transition-opacity hover:opacity-70"
            style={{ color: ALGOS.palette.deepTeal }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pb-2 flex flex-col gap-2">
          {WA_REASONS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => pick(r.id)}
              className="w-full flex items-center justify-between gap-3 text-left transition-colors active:scale-[0.99]"
              style={{
                minHeight: 60,
                padding: "12px 16px",
                border: "1px solid rgba(26,74,85,0.16)",
                backgroundColor: "rgba(255,255,255,0.6)",
                color: ALGOS.palette.deepTeal,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(61,139,150,0.10)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.6)")}
            >
              <span className="flex flex-col gap-0.5">
                <span style={{ fontSize: 15, fontWeight: 700 }}>{r.label}</span>
                <span style={{ fontSize: 12.5, color: "rgba(26,74,85,0.68)" }}>{r.hint}</span>
              </span>
              <ChevronRight size={18} aria-hidden style={{ opacity: 0.6 }} />
            </button>
          ))}
        </div>

        <div
          className="flex items-center gap-2 px-5 pt-3 pb-4"
          style={{ fontSize: 12.5, color: "rgba(26,74,85,0.72)" }}
        >
          <span
            className="inline-block rounded-full"
            style={{ width: 7, height: 7, backgroundColor: hours.isOpen ? "#2f9e63" : "#c69636" }}
            aria-hidden
          />
          {hours.isOpen ? "Respondemos ahora" : "Respondemos al abrir"} · {hours.scheduleLabel}
        </div>
      </div>
    </div>
  );
}
