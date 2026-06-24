const CREAM = "#f5f0e8";
const GOLD_DEEP = "#9a7320";

/**
 * Trust bar — surfaces institutional alliances directly under the hero
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
        paddingTop: "clamp(28px, 3.5vw, 40px)",
        paddingBottom: "clamp(28px, 3.5vw, 40px)",
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
            href="https://uduz.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="UDUZ — Unidad de Diagnóstico Universitaria del Zulia"
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
              alt="UDUZ — Unidad de Diagnóstico Universitaria del Zulia"
              style={{ height: "clamp(36px, 4.2vw, 48px)", width: "auto", display: "block" }}
            />
          </a>

        </div>
      </div>
    </section>
  );
}
