import hospitalClinicoLogo from "@/assets/logo-hospital-clinico.png.asset.json";
import cddMaracaiboLogo from "@/assets/logo-cdd-maracaibo.png.asset.json";

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const GOLD_DEEP = "#9a7320";

const CARD: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fff",
  border: "1px solid rgba(26, 74, 85, 0.08)",
  borderRadius: 12,
  height: "clamp(56px, 6.4vw, 68px)",
  padding: "0 clamp(18px, 2.6vw, 28px)",
  boxShadow: "0 1px 3px rgba(26, 74, 85, 0.05)",
};

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
          gap: 20,
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
          style={{ gap: "clamp(14px, 2.4vw, 24px)", rowGap: 14 }}
        >
          {/* UDUZ */}
          <a
            href="https://www.instagram.com/uduz_maracaibo/reels/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="UDUZ, Unidad de Diagnóstico Universitaria del Zulia"
            style={CARD}
          >
            <img
              src="/logos/uduz-logo.svg"
              alt="UDUZ, Unidad de Diagnóstico Universitaria del Zulia"
              width={170}
              height={45}
              style={{ height: "clamp(32px, 3.6vw, 40px)", width: "auto", display: "block" }}
            />
          </a>

          {/* Hospital Clínico de Maracaibo — próxima sede */}
          <div style={CARD}>
            <img
              src={hospitalClinicoLogo.url}
              alt="Hospital Clínico de Maracaibo"
              width={48}
              height={48}
              style={{
                height: "clamp(38px, 4.2vw, 46px)",
                width: "auto",
                display: "block",
                borderRadius: 6,
              }}
            />
          </div>

          {/* CDD Radioterapia Maracaibo — logo blanco sobre bloque teal */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: DEEP_TEAL,
              borderRadius: 12,
              height: "clamp(56px, 6.4vw, 68px)",
              padding: "0 clamp(18px, 2.6vw, 28px)",
              boxShadow: "0 1px 3px rgba(26, 74, 85, 0.15)",
            }}
          >
            <img
              src={cddMaracaiboLogo.url}
              alt="CDD Radioterapia Maracaibo"
              width={120}
              height={71}
              style={{ height: "clamp(24px, 2.8vw, 32px)", width: "auto", display: "block" }}
            />
          </div>
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
