import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle, CalendarDays } from "lucide-react";
import { ALGOS } from "@/config/algos.config";
import { trackCTA } from "@/lib/analytics";
import { useBusinessHours, withHoursContext } from "@/lib/businessHours";


/**
 * Mobile-only sticky conversion bar. Appears after the user scrolls past the
 * hero so the two primary actions (WhatsApp + Agendar) are always one tap away.
 */
export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const hours = useBusinessHours();
  const waHref = withHoursContext(
    ALGOS.contact.whatsappHref,
    "Hola, quisiera agendar una consulta en ALGOS."
  );

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden =
    location.pathname.startsWith("/admin") || location.pathname === "/agendar";
  if (hidden) return null;

  return (
    <div
      data-section="sticky_mobile_cta"
      className="md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        paddingBottom: "env(safe-area-inset-bottom)",
        backgroundColor: "rgba(26,74,85,0.97)",
        boxShadow: "0 -8px 24px -12px rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Contact'); }}
          className="flex-1 inline-flex flex-col items-center justify-center gap-0.5 active:scale-[0.97] transition-transform"
          style={{
            minHeight: 48,
            backgroundColor: ALGOS.palette.brandTeal,
            color: ALGOS.palette.cream,
            fontFamily: "Manrope, system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span className="inline-flex items-center gap-2">
            <MessageCircle size={17} aria-hidden />
            WhatsApp
          </span>
          <span
            className="inline-flex items-center gap-1"
            style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.02em", textTransform: "none", opacity: 0.95 }}
          >
            <span
              className="inline-block rounded-full"
              style={{ width: 6, height: 6, backgroundColor: hours.isOpen ? "#7ee2a8" : "#f0c14b" }}
              aria-hidden
            />
            {hours.statusLabel}
          </span>
        </a>

        <Link
          to="/agendar"
          onClick={() => trackCTA("sticky_mobile_cta", "agendar")}
          className="flex-1 inline-flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
          style={{
            minHeight: 48,
            backgroundColor: ALGOS.palette.gold,
            color: "#1A4A55",
            fontFamily: "Manrope, system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <CalendarDays size={17} aria-hidden />
          Agendar
        </Link>
      </div>
    </div>
  );
}
