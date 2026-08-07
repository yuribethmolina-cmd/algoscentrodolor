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
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => { if (typeof (window as any).fbq === 'function') (window as any).fbq('track', 'Contact'); }}
          className="flex-1 inline-flex items-center justify-center gap-2 active:scale-[0.97] transition-transform"
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
          <MessageCircle size={17} aria-hidden />
          WhatsApp
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
