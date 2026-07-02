type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

export default function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section
      style={{
        position: "relative",
        backgroundColor: DEEP_TEAL,
        paddingTop: "clamp(100px, 13vw, 160px)",
        paddingBottom: "clamp(56px, 7vw, 96px)",
        overflow: "hidden",
      }}
    >
      {/* Dark gradient overlay so text is always legible */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(26,74,85,0.75) 0%, rgba(26,74,85,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 1080,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        {eyebrow && (
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </p>
        )}
        <h1
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(32px, 4.8vw, 68px)",
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
            color: CREAM,
            maxWidth: "20ch",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(16px, 1.8vw, 19px)",
              lineHeight: 1.65,
              color: "rgba(245,240,232,0.8)",
              maxWidth: "52ch",
              marginTop: 20,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
