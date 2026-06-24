import algosLogo from "@/assets/algos-logo-dark.png";

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const STEEL_TEAL = "#2a6270";
const GOLD = "#c69636";
const BODY = "#4a4a4a";

const benefits = [
  {
    number: "01",
    title: "DIAGNÓSTICO INTEGRADO",
    body: "Tomografía y ecografía disponibles en la misma red. El Dr. Atilio recibe los resultados antes de tu próxima consulta.",
  },
  {
    number: "02",
    title: "UN SOLO EXPEDIENTE",
    body: "Tu historia clínica viaja entre ALGOS y UDUZ sin que tengas que repetirla. Llegas con los estudios; el equipo ya los conoce.",
  },
  {
    number: "03",
    title: "SALA DE PROCEDIMIENTOS",
    body: "Los procedimientos se realizan en instalaciones de UDUZ — con fluoroscopio y sala equipada — mientras el Local 4 termina su adecuación.",
  },
];

export default function AllianceSection() {
  return (
    <section
      id="alianza"
      style={{
        backgroundColor: CREAM,
        color: DEEP_TEAL,
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 9vw, 120px)",
        borderTop: "1px solid rgba(26, 74, 85, 0.12)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1280,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        {/* HEADER */}
        <div
          className="grid grid-cols-1 mdx:grid-cols-[1fr_1.3fr] gap-10 mdx:gap-16"
          style={{
            borderBottom: "1px solid rgba(26, 74, 85, 0.18)",
            paddingBottom: 48,
            marginBottom: 72,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: STEEL_TEAL,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              ALIANZA ESTRATÉGICA · MARACAIBO
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: STEEL_TEAL,
                maxWidth: "36ch",
                lineHeight: 1.7,
              }}
            >
              ALGOS opera en alianza institucional con UDUZ — Unidad de Diagnóstico Universitaria del Zulia. Tu evaluación, tu imagen diagnóstica y tu procedimiento ocurren en el mismo ecosistema, con el mismo equipo informado de tu caso.
            </p>
          </div>

          <div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "clamp(40px, 5.5vw, 68px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: DEEP_TEAL,
                margin: 0,
              }}
            >
              Un ecosistema clínico completo.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 400, color: GOLD }}>
                Sin traslados.
              </em>
            </h2>
          </div>
        </div>

        {/* LOGOS */}
        <div
          className="flex items-center justify-center gap-8 mdx:gap-12"
          style={{ marginBottom: 72 }}
        >
          <img
            src={algosLogo}
            alt="ALGOS — Centro de Dolor Intervencionista"
            style={{ height: 48, width: "auto" }}
          />
          <div
            style={{
              width: 1,
              height: 48,
              backgroundColor: "rgba(26, 74, 85, 0.25)",
              flexShrink: 0,
            }}
          />
          <img
            src="/logos/uduz-logo.svg"
            alt="UDUZ — Unidad de Diagnóstico Universitaria del Zulia"
            style={{ height: 40, width: "auto" }}
          />
        </div>

        {/* BENEFIT BLOCKS */}
        <div
          className="grid grid-cols-1 mdx:grid-cols-3 gap-10 mdx:gap-8"
          style={{
            borderTop: "1px solid rgba(26, 74, 85, 0.12)",
            paddingTop: 56,
            marginBottom: 64,
          }}
        >
          {benefits.map((b) => (
            <div key={b.number}>
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 36,
                  color: GOLD,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: 20,
                }}
              >
                {b.number}
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: DEEP_TEAL,
                  marginBottom: 12,
                }}
              >
                {b.title}
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14,
                  color: BODY,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {b.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div>
          <a
            href="https://uduz.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: DEEP_TEAL,
              borderBottom: `1.5px solid ${DEEP_TEAL}`,
              paddingBottom: 4,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Conoce UDUZ →
          </a>
        </div>
      </div>
    </section>
  );
}
