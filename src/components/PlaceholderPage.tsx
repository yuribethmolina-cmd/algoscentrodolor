import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

type Props = {
  eyebrow: string;
  headlineBefore: string;
  italicWord: string;
  headlineAfter: string;
  lede: string;
};

const DEEP_TEAL = "#1a4a55";
const STEEL_TEAL = "#2a6270";
const GOLD = "#c69636";
const BRAND_TEAL = "#3d8b96";
const BRAND_TEAL_HOVER = "#4a9ca8";
const CREAM = "#f5f0e8";

export default function PlaceholderPage({
  eyebrow,
  headlineBefore,
  italicWord,
  headlineAfter,
  lede,
}: Props) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main
        style={{
          backgroundColor: CREAM,
          minHeight: "80vh",
        }}
      >
        <div
          className="mx-auto text-center"
          style={{
            maxWidth: 760,
            padding: "160px 48px 120px",
          }}
        >
          <p
            className="font-ui font-bold uppercase"
            style={{
              fontSize: 11,
              letterSpacing: "0.28em",
              color: GOLD,
              margin: 0,
            }}
          >
            {eyebrow}
          </p>

          <h1
            className="mx-auto"
            style={{
              fontFamily: "'Sora', Georgia, serif",
              fontWeight: 700,
              fontSize: "clamp(40px, 6vw, 64px)",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: DEEP_TEAL,
              marginTop: 24,
              maxWidth: "18ch",
            }}
          >
            {headlineBefore}
            <span style={{ color: GOLD fontWeight: 400 }}>
              {italicWord}
            </span>
            {headlineAfter}
          </h1>

          <p
            className="mx-auto"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 17,
              lineHeight: 1.6,
              color: STEEL_TEAL,
              marginTop: 28,
              maxWidth: "56ch",
            }}
          >
            {lede}
          </p>

          <div
            className="flex items-center justify-center"
            style={{ gap: 12, marginTop: 56 }}
          >
            <span
              className="status-dot"
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: GOLD,
                display: "inline-block",
              }}
              aria-hidden="true"
            />
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.24em",
                color: STEEL_TEAL,
              }}
            >
              EN CONSTRUCCIÓN
            </span>
          </div>

          <div style={{ marginTop: 48 }}>
            <Link
              to="/#solicitar"
              className="inline-block transition-all duration-200"
              style={{
                backgroundColor: BRAND_TEAL,
                color: CREAM,
                padding: "18px 36px",
                borderRadius: 4,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = BRAND_TEAL_HOVER;
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 28px -10px rgba(26,74,85,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = BRAND_TEAL;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Solicitar valoración
            </Link>
          </div>

          <div style={{ marginTop: 16 }}>
            <Link
              to="/"
              style={{
                display: "inline-block",
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: DEEP_TEAL,
                borderBottom: `1px solid ${DEEP_TEAL}`,
                paddingBottom: 4,
                textDecoration: "none",
              }}
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            main > div {
              padding: 96px 24px 80px !important;
            }
          }
        `}</style>
      </main>
      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
