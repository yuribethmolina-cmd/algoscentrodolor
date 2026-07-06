import { useDrawSVG, AnimatedHeadline } from "@/lib/animations";
import BackdropImage from "@/components/atmosphere/BackdropImage";
import algosSignalIcon from "@/assets/algos-signal-icon.png";

// Unsplash · "warm window light, calm interior" — atmospheric, no people
const FINAL_BG =
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=2400&q=70";

const DEEP_TEAL = "#1a4a55";
const CREAM = "#f5f0e8";
const GOLD = "#c69636";
const BRAND_TEAL = "#3d8b96";
const BRAND_TEAL_HOVER = "#4a9ca8";

const WHATSAPP_HREF = "https://wa.me/584146807886";

type ContactOption = {
  label: string;
  value: string;
  href: string;
};

const contactOptions: ContactOption[] = [
  { label: "WHATSAPP DIRECTO", value: "0414-680 7886", href: WHATSAPP_HREF },
  { label: "TELÉFONO 1", value: "0414-680 7886", href: "tel:+584146807886" },
  { label: "TELÉFONO 2", value: "0412-061 7410", href: "tel:+584120617410" },
  { label: "CORREO ELECTRÓNICO", value: "info@algoscentrodolor.com", href: "mailto:info@algoscentrodolor.com" },
];

export default function FinalCTA() {
  const svgRef = useDrawSVG(2000, 300, 0.3);
  return (
    <section
      id="solicitar"
      className="relative overflow-hidden"
      style={{
        backgroundColor: DEEP_TEAL,
        color: CREAM,
        paddingTop: "clamp(96px, 12vw, 160px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
      }}
    >
      <BackdropImage
        src={FINAL_BG}
        opacity={0.1}
        filter="grayscale(100%) brightness(0.85)"
        blendMode="overlay"
      />
      {/* Brand signal mark — centered watermark */}
      <img
        src={algosSignalIcon}
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] max-w-[560px] pointer-events-none select-none"
        style={{ opacity: 0.07, filter: "grayscale(100%) brightness(10)" }}
      />
      {/* Signal wave background — terminal */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1280 700"
        preserveAspectRatio="none"
        style={{ opacity: 0.7 }}
      >
        <path
          d="M -40 100 Q 320 60, 540 220 T 1040 380 Q 1180 460, 1340 420"
          stroke="rgba(245,240,232,0.12)"
          strokeWidth={1.5}
          fill="none"
        />
        <path
          d="M -40 240 Q 360 180, 580 360 T 1080 520 Q 1220 580, 1380 560"
          stroke="rgba(198,150,54,0.10)"
          strokeWidth={1}
          fill="none"
        />
      </svg>

      <div
        className="relative mx-auto text-center"
        style={{
          maxWidth: 1080,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
          zIndex: 10,
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            color: GOLD,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          EL SIGUIENTE PASO
        </p>

        <AnimatedHeadline
          as="h2"
          threshold={0.3}
          style={{
            fontFamily: "'Sora', serif",
            fontWeight: 700,
            fontSize: "clamp(48px, 8vw, 96px)",
            lineHeight: 0.98,
            letterSpacing: "-0.028em",
            color: CREAM,
            margin: 0,
          }}
          chunks={[
            { text: "El primer paso es saber qué lo está causando.", color: GOLD, staggerMs: 120 },
          ]}
        />

        <p
          className="mx-auto"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(16px, 1.4vw, 19px)",
            lineHeight: 1.55,
            color: "rgba(245, 240, 232, 0.8)",
            maxWidth: "50ch",
            marginTop: 32,
            marginBottom: 56,
          }}
        >
          Agendamos su consulta, evaluamos su caso y le explicamos exactamente
          qué tiene y qué opciones existen. Sin rodeos.
        </p>

        {/* Primary CTA */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center"
          style={{ marginTop: 56, gap: 16 }}
        >
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 transition-all duration-200"
            style={{
              backgroundColor: BRAND_TEAL,
              color: CREAM,
              padding: "clamp(18px, 1.8vw, 22px) clamp(28px, 3.5vw, 42px)",
              borderRadius: 0,
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = BRAND_TEAL_HOVER;
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.25)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = BRAND_TEAL;
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            AGENDAR CONSULTA →
          </a>
          <a
            href="/especialidades"
            className="group inline-flex items-center gap-3 transition-all duration-200"
            style={{
              color: CREAM,
              padding: "clamp(18px, 1.8vw, 22px) clamp(28px, 3.5vw, 42px)",
              borderRadius: 0,
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textDecoration: "none",
              border: `1.5px solid ${CREAM}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = CREAM;
              e.currentTarget.style.color = DEEP_TEAL;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = CREAM;
            }}
          >
            Ver qué tratamos
          </a>
        </div>

        {/* Secondary options */}
        <div
          className="flex flex-col mdx:flex-row mdx:justify-center mdx:items-center"
          style={{
            marginTop: 56,
            borderTop: "1px solid rgba(245, 240, 232, 0.18)",
            paddingTop: 36,
            gap: 20,
          }}
        >
          {contactOptions.map((opt, i) => {
            const isFirst = i === 0;
            return (
            <a
              key={opt.label}
              href={opt.href}
              className={`flex flex-col group items-center mdx:items-start ${
                !isFirst ? "border-t mdx:border-t-0 mdx:border-l border-cream/10 pt-5 mdx:pt-0" : ""
              }`}
              style={{
                gap: 6,
                paddingLeft: 36,
                paddingRight: 36,
                textDecoration: "none",
                minHeight: 44,
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  color: "rgba(245, 240, 232, 0.55)",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                {opt.label}
              </span>
              <span
                className="transition-colors duration-200"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  color: CREAM,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = CREAM)}
              >
                {opt.value}
              </span>
            </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
