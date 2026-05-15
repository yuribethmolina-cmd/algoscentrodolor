import algosLogo from "@/assets/algos-logo-dark.png";

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const STEEL_TEAL = "#2a6270";
const GOLD = "#c69636";

type Link = { label: string; href: string };

const tratamientos: Link[] = [
  { label: "Bloqueo facetario lumbar", href: "#" },
  { label: "Bloqueo radicular cervical", href: "#" },
  { label: "Nervio periférico", href: "#" },
  { label: "Infiltración guiada por eco", href: "#" },
  { label: "Ver todos →", href: "#" },
];

const audiencias: Link[] = [
  { label: "Para pacientes", href: "/pacientes" },
  { label: "Para médicos", href: "/medicos" },
  { label: "Para instituciones", href: "/instituciones" },
  { label: "Convenios y mutuales", href: "#" },
];

const algos: Link[] = [
  { label: "Equipo clínico", href: "#equipo" },
  
  { label: "Tecnología", href: "#" },
  { label: "Casos y testimonios", href: "#" },
  { label: "Contacto", href: "#solicitar" },
];

const legal: Link[] = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "#" },
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
              src={algosLogo}
              alt="ALGOS — Centro de Dolor Intervencionista"
              style={{ height: 36, width: "auto", display: "block", marginBottom: 18 }}
            />

          </div>

          <ColumnList title="TRATAMIENTOS" links={tratamientos} />
          <ColumnList title="AUDIENCIAS" links={audiencias} />
          <ColumnList title="ALGOS" links={algos} />

          {/* Consultorio */}
          <div className="col-span-2 mdx:col-span-1">
            <h4 style={eyebrow}>CONSULTORIO</h4>
            <div style={{ marginBottom: 16 }}>
              <p style={blockLabel}>DIRECCIÓN</p>
              <p style={blockValue}>
                Sector Paraíso
                <br />
                Maracaibo, Edo. Zulia
                <br />
                Venezuela
              </p>
            </div>
            <div style={{ marginBottom: 16 }}>
              <p style={blockLabel}>HORARIO</p>
              <p style={blockValue}>
                Lunes a viernes · 8:00 – 18:00
                <br />
                Sábados · cita previa
              </p>
            </div>
            <div>
              <p style={blockLabel}>CITA</p>
              <a
                href="mailto:consulta@algos.lovable.app"
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
                consulta@algos.lovable.app
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
