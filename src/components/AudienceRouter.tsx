import { Link } from "react-router-dom";
import { useDrawSVG, useInViewOnce } from "@/lib/animations";

type Tone = "brand" | "deep" | "gold";

const toneColor: Record<Tone, string> = {
  brand: "#3d8b96",
  deep: "#1a4a55",
  gold: "#c69636",
};

type Row = {
  numeral: string;
  tone: Tone;
  eyebrow: string;
  headingStart: string;
  headingItalic: string;
  headingEnd: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  uduzNote?: string;
  uduzHref?: string;
};

const rows: Row[] = [
  {
    numeral: "01",
    tone: "brand",
    eyebrow: "PARA PACIENTES",
    headingStart: "Recupera ",
    headingItalic: "lo que el dolor",
    headingEnd: " te ha quitado.",
    body: "Nuestro equipo evalúa tu caso personalmente. Si eres candidato, el procedimiento se hace en la misma semana,\u00a0 todo es ambulatorio, sin hospitalización.",
    ctaLabel: "Agendar cita",
    ctaHref: "/pacientes/agendar",
    uduzNote: "¿Necesitas tomografía o ecografía antes de la consulta? UDUZ Paraíso — a metros de aquí — las tiene desde $25, disponible 24/7.",
    uduzHref: "https://www.instagram.com/uduz_maracaibo/reels/",
  },
  {
    numeral: "02",
    tone: "deep",
    eyebrow: "PARA MÉDICOS REFERENTES",
    headingStart: "Refiere con ",
    headingItalic: "respaldo clínico",
    headingEnd: " documentado.",
    body: "Recibe el reporte clínico en 48 horas. Su paciente vuelve a su consulta con protocolo documentado y seguimiento a nombre del equipo ALGOS.",
    ctaLabel: "Referir paciente",
    ctaHref: "/medicos/referir",
  },
  {
    numeral: "03",
    tone: "gold",
    eyebrow: "PARA INSTITUCIONES Y CONVENIOS",
    headingStart: "Servicios clínicos para ",
    headingItalic: "tu organización.",
    headingEnd: "",
    body: "Convenios para empresas, mutuales y clubes deportivos. Cuéntanos el volumen y el tipo de cobertura — preparamos una propuesta en menos de una semana.",
    ctaLabel: "Solicitar reunión",
    ctaHref: "/instituciones/reunion",
  },
];

export default function AudienceRouter() {
  const waveRef = useDrawSVG(2200, 0, 0.2);
  return (
    <section className="relative w-full bg-cream">
      <div
        className="mx-auto px-6 mdx:px-12"
        style={{ maxWidth: "1280px" }}
      >
        <div className="py-20 mdx:py-28">
          {/* Section header */}
          <div
            className="grid grid-cols-1 mdx:grid-cols-[1fr_2fr] gap-8"
            style={{
              borderBottom: "1px solid rgba(26,74,85,0.15)",
              paddingBottom: "40px",
              marginBottom: "80px",
            }}
          >
            <div>
              <p
                className="font-ui font-bold uppercase"
                style={{
                  color: "#c69636",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                }}
              >
                ELIGE TU CAMINO
              </p>
            </div>
            <div>
              <h2
                className="font-display font-bold text-deep-teal"
                style={{
                  fontSize: "clamp(44px, 5vw, 64px)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.025em",
                }}
              >
                Tres caminos.{" "}
                <span
                  className=""
                  style={{ color: "#c69636"}}
                >
                  Una misma señal.
                </span>
              </h2>
              <p
                className="font-ui text-steel-teal"
                style={{
                  marginTop: "24px",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  maxWidth: "38ch",
                }}
              >
                Tres audiencias distintas que necesitan al mismo equipo,\u00a0
                por razones distintas.
              </p>
            </div>
          </div>

          {/* Audience rows + signal wave */}
          <div className="audience-router-rows relative mdx:block">
            {/* Signal wave (decorative, desktop only) */}
            <svg
              ref={waveRef}
              aria-hidden="true"
              className="hidden mdx:block absolute pointer-events-none"
              viewBox="0 0 80 800"
              preserveAspectRatio="none"
              style={{
                left: "200px",
                top: 0,
                width: "80px",
                height: "100%",
              }}
            >
              <path
                d="M 40 0 C 40 80, 12 120, 40 200 C 68 280, 12 320, 40 400 C 68 480, 12 520, 40 600 C 68 680, 40 720, 40 800"
                stroke="rgba(26,74,85,0.22)"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>

            <div className="flex flex-col gap-14 mdx:gap-[88px] relative">
              {rows.map((row) => (
                <AudienceRow key={row.numeral} row={row} />
              ))}
            </div>
          </div>

          {/* Section footer */}
          <div
            className="flex flex-col mdx:flex-row mdx:items-center mdx:justify-between gap-6"
            style={{
              marginTop: "64px",
              borderTop: "1px solid rgba(26,74,85,0.15)",
              paddingTop: "32px",
            }}
          >
            <div>
              <p
                className="font-display font-semibold text-deep-teal"
                style={{ fontSize: "20px"}}
              >
                ¿No sabes cuál camino te corresponde?
              </p>
              <p
                className="font-ui text-steel-teal"
                style={{ fontSize: "15px", marginTop: "4px" }}
              >
                Escríbenos. Te orientamos.
              </p>
            </div>
            <FooterLink to="/contacto">Hablar con el equipo</FooterLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceRow({ row }: { row: Row }) {
  const color = toneColor[row.tone];
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.25);
  return (
    <div
      ref={ref}
      className={`audience-row grid items-start gap-6 mdx:gap-0 ${inView ? "in-view" : ""}`}
      style={{
        gridTemplateColumns: "96px 1fr",
      }}
    >
      {/* Mobile uses 2-col; desktop overrides via inline media-like style not possible — use class */}
      <div className="contents mdx:hidden">
        <div
          className="ar-numeral font-display"
          style={{
            color,
            fontSize: "80px",
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          {row.numeral}
        </div>
        <RowContent row={row} color={color} />
      </div>

      <div
        className="hidden mdx:grid col-span-2 items-start"
        style={{
          gridTemplateColumns: "200px 80px 1fr",
        }}
      >
        <div
          className="ar-numeral font-display"
          style={{
            color,
            fontSize: "144px",
            fontWeight: 400,
            lineHeight: 1,
          }}
        >
          {row.numeral}
        </div>
        <div className="relative h-full flex justify-center pt-10">
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "9999px",
              backgroundColor: color,
              boxShadow: "0 0 0 6px #f5f0e8",
              display: "block",
            }}
          />
        </div>
        <RowContent row={row} color={color} />
      </div>
    </div>
  );
}

function RowContent({ row, color }: { row: Row; color: string }) {
  return (
    <div className="ar-content pt-2">
      <p
        className="font-ui font-bold uppercase"
        style={{
          color,
          fontSize: "11px",
          letterSpacing: "0.22em",
        }}
      >
        {row.eyebrow}
      </p>
      <h3
        className="font-display text-deep-teal"
        style={{
          marginTop: "16px",
          fontSize: "clamp(26px, 3.4vw, 44px)",
          fontWeight: 700,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
        }}
      >
        {row.headingStart}
        <span
          className=""
          style={{ fontWeight: 400 }}
        >
          {row.headingItalic}
        </span>
        {row.headingEnd}
      </h3>
      <p
        className="font-ui text-steel-teal"
        style={{
          marginTop: "20px",
          fontSize: "17px",
          lineHeight: 1.6,
          maxWidth: "52ch",
        }}
      >
        {row.body}
      </p>
      {row.uduzNote && row.uduzHref && (
        <div
          style={{
            marginTop: 18,
            backgroundColor: "#fbfaf5",
            border: "1px solid rgba(110, 168, 46, 0.25)",
            borderLeft: "3px solid #6ea82e",
            borderRadius: 6,
            padding: "14px 16px",
            maxWidth: "52ch",
          }}
        >
          <p
            className="font-ui"
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#1a4a55",
              lineHeight: 1.6,
            }}
          >
            ¿Necesitas tomografía o ecografía antes de la consulta? <strong style={{ fontWeight: 700 }}>UDUZ Paraíso</strong> — a metros de aquí — las tiene desde <strong style={{ fontWeight: 700 }}>$25</strong>, disponible <strong style={{ fontWeight: 700 }}>24/7</strong>.{" "}
            <a
              href={row.uduzHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#c69636",
                fontWeight: 700,
                borderBottom: "1px solid #c69636",
                paddingBottom: 1,
                textDecoration: "none",
              }}
            >
              Agendar estudio →
            </a>
          </p>
        </div>
      )}

      <div style={{ marginTop: "28px" }}>
        <RowLink to={row.ctaHref} color={color}>
          {row.ctaLabel}
        </RowLink>
      </div>
    </div>
  );
}

function RowLink({
  to,
  color,
  children,
}: {
  to: string;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-3 font-ui font-bold uppercase pb-1.5 transition-colors"
      style={{
        color,
        fontSize: "13px",
        letterSpacing: "0.22em",
        borderBottom: `1.5px solid ${color}`,
        width: "fit-content",
      }}
    >
      <span>{children}</span>
      <span
        className="inline-block overflow-hidden transition-[width] duration-300 ease-out w-6 group-hover:w-10"
        aria-hidden
      >
        <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}

function FooterLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-3 font-ui font-bold uppercase pb-1.5 transition-colors text-deep-teal"
      style={{
        fontSize: "13px",
        letterSpacing: "0.22em",
        borderBottom: "1.5px solid #1a4a55",
        width: "fit-content",
      }}
    >
      <span>{children}</span>
      <span
        className="inline-block overflow-hidden transition-[width] duration-300 ease-out w-6 group-hover:w-10"
        aria-hidden
      >
        <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
