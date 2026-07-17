import algosLogo from "@/assets/algos-logo-full.png.asset.json";

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const STEEL_TEAL = "#2a6270";
const GOLD = "#c69636";

type Link = { label: string; href: string };

const condiciones: Link[] = [
  { label: "Ciática", href: "/condiciones/ciatica" },
  { label: "Hernia discal", href: "/condiciones/hernia-discal" },
  { label: "Dolor lumbar", href: "/condiciones/dolor-lumbar" },
  { label: "Dolor cervical", href: "/condiciones/dolor-cervical" },
  { label: "Ver todas →", href: "/condiciones" },
];

const procedimientos: Link[] = [
  { label: "Infiltraciones y bloqueos", href: "/procedimientos/infiltraciones-y-bloqueos" },
  { label: "Ozono para hernia discal", href: "/procedimientos/ozono-hernia-discal" },
  { label: "EMG", href: "/procedimientos/emg" },
  { label: "EEG", href: "/procedimientos/eeg" },
];

const algos: Link[] = [
  { label: "Estudios y laboratorio", href: "/estudios-laboratorio" },
  { label: "Equipo", href: "/equipo" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
  { label: "Contacto", href: "/contacto" },
];

const legal: Link[] = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/politica-cookies" },
];

const eyebrow: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  color: GOLD,
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  marginBottom: 18,
  display: "block",
};

const listLink: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  color: DEEP_TEAL,
  textDecoration: "none",
  transition: "color 200ms",
};

const blockLabel: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: STEEL_TEAL,
  margin: 0,
  marginBottom: 6,
};

const blockValue: React.CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontSize: 14,
  color: DEEP_TEAL,
  margin: 0,
  lineHeight: 1.5,
};

function Hover({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      style={listLink}
      onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
      onMouseLeave={(e) => (e.currentTarget.style.color = DEEP_TEAL)}
    >
      {children}
    </a>
  );
}

function ColumnList({ title, links }: { title: string; links: Link[] }) {
  return (
    <div>
      <h4 style={eyebrow}>{title}</h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {links.map((l) => (
          <li key={l.label} style={{ marginBottom: 10 }}>
            <Hover href={l.href}>{l.label}</Hover>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function HomeFooter() {
  return (
    <footer
      style={{
        backgroundColor: CREAM,
        color: DEEP_TEAL,
        paddingTop: "clamp(56px, 7vw, 88px)",
        paddingBottom: "clamp(24px, 3vw, 32px)",
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
        {/* Main grid */}
        <div
          className="grid grid-cols-2 mdx:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]"
          style={{
            gap: "clamp(32px, 4vw, 48px)",
            borderBottom: "1px solid rgba(26, 74, 85, 0.18)",
            paddingBottom: 64,
          }}
        >
          {/* Brand */}
          <div className="col-span-2 mdx:col-span-1">
            <img
              src={algosLogo.url}
              alt="ALGOS, Centro de Dolor Intervencionista"
              width={220}
              height={112}
              className="h-16 mdx:h-28 w-auto block mb-4"
            />

          </div>

          <ColumnList title="CONDICIONES" links={condiciones} />
          <ColumnList title="PROCEDIMIENTOS" links={procedimientos} />
          <ColumnList title="ALGOS" links={algos} />

          {/* Consultorio */}
          <div className="col-span-2 mdx:col-span-1">
            <h4 style={eyebrow}>CONSULTORIO</h4>
            <div style={{ marginBottom: 16 }}>
              <p style={blockLabel}>DIRECCIÓN</p>
              <p style={blockValue}>
                Av. 20 con Calle 65, N° 65-02
                <br />
                C.C. América, Local 4
                <br />
                Sector Paraíso · Maracaibo 4005
                <br />
                Estado Zulia, Venezuela
              </p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={blockLabel}>TELÉFONOS</p>
              <a href="tel:+584146807886" style={{ ...blockValue, textDecoration: "none", display: "block" }}>
                0414-680 7886 · Solo mensajes
              </a>
              <a href="tel:+584120617410" style={{ ...blockValue, textDecoration: "none", display: "block" }}>
                0412-061 7410 · Solo llamadas
              </a>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={blockLabel}>RED DIAGNÓSTICA</p>
              <a
                href="https://www.instagram.com/uduz_maracaibo/reels/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...blockValue, color: STEEL_TEAL, textDecoration: "none", display: "block" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = STEEL_TEAL)}
              >
                <strong style={{ fontWeight: 700 }}>UDUZ Paraíso</strong> · misma zona
                <br />
                Tomografía 24/7 · desde $8

              </a>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={blockLabel}>HORARIO</p>
              <p style={blockValue}>
                Lunes a viernes · 7:00 AM - 4:00 PM
              </p>
            </div>
            <div>
              <p style={blockLabel}>CITA</p>
              <a
                href="mailto:info@algoscentrodolor.com"
                style={{
                  ...blockValue,
                  borderBottom: "1px solid rgba(26, 74, 85, 0.3)",
                  paddingBottom: 2,
                  textDecoration: "none",
                  display: "inline-block",
                  transition: "color 200ms, border-color 200ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = GOLD;
                  e.currentTarget.style.borderColor = GOLD;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = DEEP_TEAL;
                  e.currentTarget.style.borderColor = "rgba(26, 74, 85, 0.3)";
                }}
              >
                info@algoscentrodolor.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom strip */}
        <div
          className="flex flex-wrap items-center justify-between"
          style={{ paddingTop: 28, gap: 32 }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: STEEL_TEAL,
              margin: 0,
            }}
          >
            © 2026 ALGOS · Centro de Dolor Intervencionista · Todos los derechos reservados.
          </p>

          <div className="flex items-center" style={{ gap: 24 }}>
            {legal.map((l) => (
              <a
                key={l.label}
                href={l.href}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 11,
                  color: STEEL_TEAL,
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  transition: "color 200ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = STEEL_TEAL)}
              >
                {l.label}
              </a>
            ))}
          </div>

          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: STEEL_TEAL,
              opacity: 0.7,
              margin: 0,
              letterSpacing: "0.05em",
            }}
          >
            10°39′N · 71°36′W
          </p>
        </div>
      </div>
    </footer>
  );
}
