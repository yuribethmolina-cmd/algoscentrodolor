import { Instagram } from "lucide-react";
import { ALGOS } from "@/config/algos.config";

const CREAM = ALGOS.palette.cream;
const DEEP_TEAL = ALGOS.palette.deepTeal;
const GOLD = ALGOS.palette.gold;
const STEEL = ALGOS.palette.steel;

const INSTAGRAM_URL = "https://instagram.com/algoscentrodolor";
const HANDLE = "@algoscentrodolor";

export default function InstagramSection() {
  return (
    <section
      aria-label="Síguenos en Instagram"
      style={{
        backgroundColor: CREAM,
        color: DEEP_TEAL,
        paddingTop: "clamp(64px, 8vw, 96px)",
        paddingBottom: "clamp(64px, 8vw, 96px)",
      }}
    >
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: 720,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
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
            marginBottom: 20,
          }}
        >
          Síguenos en Instagram
        </p>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 transition-all duration-200"
          style={{
            border: `1.5px solid ${DEEP_TEAL}`,
            color: DEEP_TEAL,
            padding: "clamp(16px, 1.6vw, 20px) clamp(28px, 3.2vw, 40px)",
            textDecoration: "none",
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = DEEP_TEAL;
            e.currentTarget.style.color = CREAM;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = DEEP_TEAL;
          }}
        >
          <Instagram size={20} strokeWidth={2} aria-hidden="true" />
          {HANDLE}
        </a>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(15px, 1.2vw, 17px)",
            lineHeight: 1.6,
            color: STEEL,
            marginTop: 24,
            marginBottom: 0,
          }}
        >
          Contenido sobre dolor, procedimientos mínimamente invasivos y lo que pasa
          dentro de ALGOS. Entérese primero por aquí.
        </p>
      </div>
    </section>
  );
}
