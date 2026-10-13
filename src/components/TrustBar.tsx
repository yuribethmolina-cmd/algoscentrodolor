import hospitalClinicoLogo from "@/assets/logo-hospital-clinico.png.asset.json";
import cddMaracaiboLogo from "@/assets/logo-cdd-maracaibo.png.asset.json";

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const GOLD_DEEP = "#9a7320";

/**
 * Trust bar, surfaces institutional alliances directly under the hero
 * so visitors immediately see the diagnostic partner (UDUZ).
 */
export default function TrustBar() {
  return (
    <section
      aria-label="Alianzas institucionales"
      style={{
        backgroundColor: CREAM,
        borderTop: "1px solid rgba(26, 74, 85, 0.12)",
        borderBottom: "1px solid rgba(26, 74, 85, 0.12)",
        paddingTop: "clamp(18px, 3.5vw, 40px)",
        paddingBottom: "clamp(18px, 3.5vw, 40px)",
      }}
    >
      <div
        className="mx-auto flex flex-col items-center text-center"
        style={{
          maxWidth: 1280,
          paddingLeft: "clamp(20px, 4vw, 48px)",
          paddingRight: "clamp(20px, 4vw, 48px)",
          gap: 22,
        }}
      >
        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: GOLD_DEEP,
            margin: 0,
          }}
        >
          En alianza con
        </p>

        <div
          className="flex flex-wrap items-center justify-center"
          style={{ gap: "clamp(28px, 5vw, 64px)", rowGap: 24 }}
        >
          {/* UDUZ */}
          <a
            href="https://www.instagram.com/uduz_maracaibo/reels/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="UDUZ, Unidad de Diagnóstico Universitaria del Zulia"
            style={{
              display: "inline-flex",
              alignItems: "center",
              transition: "opacity 200ms ease",
              opacity: 0.92,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.92")}
          >
            <img
              src="/logos/uduz-logo.svg"
              alt="UDUZ, Unidad de Diagnóstico Universitaria del Zulia"
              width={180}
              height={48}
              style={{ height: "clamp(36px, 4.2vw, 48px)", width: "auto", display: "block" }}
            />
          </a>

          {/* Hospital Clínico de Maracaibo — próxima sede */}
          <img
            src={hospitalClinicoLogo.url}
            alt="Hospital Clínico de Maracaibo"
            width={48}
            height={48}
            style={{
              height: "clamp(36px, 4.2vw, 48px)",
              width: "auto",
              display: "block",
              borderRadius: 6,
            }}
          />

          {/* CDD Radioterapia Maracaibo — logo blanco, necesita fondo oscuro */}
          <span
            aria-label="CDD Radioterapia Maracaibo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              backgroundColor: DEEP_TEAL,
              borderRadius: 8,
              padding: "10px 16px",
            }}
          >
            <img
              src={cddMaracaiboLogo.url}
              alt="CDD Radioterapia Maracaibo"
              width={130}
              height={77}
              style={{ height: "clamp(28px, 3.2vw, 38px)", width: "auto", display: "block" }}
            />
          </span>

        </div>

        <p
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: GOLD_DEEP,
            margin: 0,
            textAlign: "center",
          }}
        >
          Próximamente · Nueva sede en el Hospital Clínico de Maracaibo · Av. 15 Delicias, Urb. La Trinidad
        </p>

      </div>
    </section>
  );
}
