import { Link } from "react-router-dom";
import { AnimatedHeadline } from "@/lib/animations";
import type { useBusinessHours } from "@/lib/businessHours";

type Hours = ReturnType<typeof useBusinessHours>;

interface Props {
  waHref: string;
  hours: Hours;
  posterUrl: string;
  onWhatsAppClick: () => void;
  masSolicitados: ReadonlyArray<{ label: string; to: string }>;
}

/**
 * Variante B del hero móvil (test A/B): el CTA de WhatsApp sube justo debajo
 * del titular para quedar visible sin scroll. El párrafo empático pasa abajo.
 */
export default function HeroMobileVariantB({
  waHref,
  hours,
  posterUrl,
  onWhatsAppClick,
  masSolicitados,
}: Props) {
  return (
    <section className="sm:hidden bg-[#f5f0e8] flex flex-col w-full" data-ab-variant="b">
      <div className="px-6 pt-24 pb-8">
        <p
          className="font-ui font-bold uppercase mb-4"
          style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#3d8b96" }}
        >
          MARACAIBO · FRENTE A LA FACULTAD DE MEDICINA
        </p>

        <AnimatedHeadline
          as="h1"
          className="font-display font-bold"
          style={{
            fontSize: "clamp(30px, 8.4vw, 40px)",
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
            maxWidth: "18ch",
            color: "#1a4a55",
          }}
          chunks={[
            { text: "El dolor tiene causa. " },
            { text: "Nosotros la tratamos.", color: "#c69636", staggerMs: 120 },
          ]}
        />

        {/* CTA por encima del pliegue */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex" style={{ width: 8, height: 8 }} aria-hidden>
              <span
                className="absolute inline-flex w-full h-full rounded-full opacity-70 animate-ping"
                style={{ backgroundColor: hours.isOpen ? "#3d8b96" : "#c69636" }}
              />
              <span
                className="relative inline-flex rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  backgroundColor: hours.isOpen ? "#3d8b96" : "#c69636",
                }}
              />
            </span>
            <span
              className="font-ui font-semibold"
              style={{ fontSize: "11.5px", color: "rgba(26,74,85,0.8)" }}
            >
              {hours.statusLabel}
            </span>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onWhatsAppClick}
            className="flex items-center justify-center gap-2.5 w-full bg-[#3d8b96] text-[#f5f0e8] font-ui font-semibold active:scale-[0.97] transition-transform"
            style={{ fontSize: "15.5px", letterSpacing: "0.01em", paddingTop: 16, paddingBottom: 16 }}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {hours.ctaLabel}
          </a>

          <p
            className="font-ui text-center mt-3"
            style={{ fontSize: "12.5px", lineHeight: 1.45, color: "rgba(26,74,85,0.62)" }}
          >
            {hours.helperText}
          </p>
        </div>

        {/* Mensaje empático debajo del CTA */}
        <p
          className="font-ui mt-8"
          style={{ fontSize: "15.5px", lineHeight: 1.55, color: "rgba(26,74,85,0.78)", maxWidth: "36ch" }}
        >
          Sabemos lo que es vivir con dolor todos los días. Aquí lo escuchamos,
          buscamos la causa y le decimos con claridad qué se puede hacer. No
          necesita orden médica.
        </p>

        <Link
          to="/especialidades"
          className="inline-flex items-center justify-center border font-ui font-semibold w-full mt-4 active:scale-[0.97]"
          style={{
            fontSize: "13px",
            letterSpacing: "0.01em",
            borderColor: "rgba(26,74,85,0.28)",
            color: "rgba(26,74,85,0.8)",
            paddingTop: 14,
            paddingBottom: 14,
          }}
        >
          Ver especialidades
        </Link>

        <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(26,74,85,0.12)" }}>
          <p
            className="font-ui font-bold uppercase mb-3"
            style={{ fontSize: "10px", letterSpacing: "0.28em", color: "#c69636" }}
          >
            Más solicitados
          </p>
          <div className="flex flex-col gap-2.5">
            {masSolicitados.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-between px-3.5 py-3"
                style={{
                  backgroundColor: "rgba(255,255,255,0.55)",
                  border: "1px solid rgba(26,74,85,0.08)",
                  color: "#1a4a55",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <span>{label}</span>
                <span aria-hidden style={{ color: "#3d8b96", opacity: 0.7 }}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <img
        src={posterUrl}
        alt="Persona sujetándose la zona lumbar por dolor de espalda"
        className="w-full object-cover"
        style={{ height: "260px", objectPosition: "center center" }}
        loading="eager"
      />
    </section>
  );
}
