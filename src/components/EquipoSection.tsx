import photoAtilio from "@/assets/team-atilio.png";
import photoLuis from "@/assets/team-luis.png";
import photoDaniel from "@/assets/team-daniel.png";

const CREAM = "#f5f0e8";
const DEEP_TEAL = "#1a4a55";
const STEEL_TEAL = "#2a6270";
const GOLD = "#c69636";

type Member = {
  slug: string;
  index: string;
  nameItalic: string;
  nameBold: string;
  role: string;
  specialty: string;
  city: string;
  country: string;
  coords: string;
  photoUrl?: string;
};

const roster: Member[] = [
  {
    slug: "dr-atilio",
    index: "01",
    nameItalic: "Dr. Atilio J.",
    nameBold: "Rodríguez",
    role: "DIRECTOR MÉDICO",
    specialty: "Neurocirujano · Especialista en dolor intervencionista",
    city: "Maracaibo",
    country: "VENEZUELA",
    coords: "10°39′N · 71°36′W",
    photoUrl: photoAtilio,
  },
  {
    slug: "dr-luis-alberto",
    index: "02",
    nameItalic: "Dr. Luis Alberto",
    nameBold: "Rodríguez",
    role: "DIRECTOR · ESTRATEGIA INTERNACIONAL",
    specialty: "Neurochirurg · Formación clínica en Alemania",
    city: "Múnich",
    country: "ALEMANIA",
    coords: "",
    photoUrl: photoLuis,
  },
  {
    slug: "dra-aliseth",
    index: "03",
    nameItalic: "Dra. Aliseth",
    nameBold: "Rodríguez",
    role: "APOYO INTERNACIONAL",
    specialty: "Orthopädie · Práctica clínica en Krefeld",
    city: "Krefeld",
    country: "ALEMANIA",
    coords: "51°20′N · 6°34′E",
  },
  {
    slug: "lcdo-daniel",
    index: "04",
    nameItalic: "Lcdo. Daniel",
    nameBold: "Rodríguez",
    role: "DIRECTOR DE NUTRICIÓN",
    specialty: "Nutrición clínica · Acompañamiento del paciente intervencionista",
    city: "Maracaibo",
    country: "VENEZUELA",
    coords: "10°39′N · 71°36′W",
    photoUrl: photoDaniel,
  },
];

function NameRole({ m }: { m: Member }) {
  return (
    <div>
      <h3
        style={{
          fontFamily: "'Sora', serif",
          fontSize: "clamp(26px, 3.2vw, 44px)",
          letterSpacing: "-0.02em",
          color: DEEP_TEAL,
          lineHeight: 1.05,
          margin: 0,
          marginBottom: 10,
        }}
      >
        <span style={{ fontWeight: 400 }}>{m.nameItalic}</span>{" "}
        <span style={{ fontWeight: 700 }}>{m.nameBold}</span>
      </h3>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: STEEL_TEAL,
          margin: 0,
          marginBottom: 6,
        }}
      >
        {m.role}
      </p>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 14,
          color: DEEP_TEAL,
          opacity: 0.8,
          margin: 0,
        }}
      >
        {m.specialty}
      </p>
    </div>
  );
}

function Location({ m, align = "right" }: { m: Member; align?: "left" | "right" }) {
  return (
    <div style={{ textAlign: align }}>
      <p
        style={{
          fontFamily: "'Sora', serif"
          fontWeight: 600,
          fontSize: 18,
          color: DEEP_TEAL,
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {m.city}
      </p>
      <p
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: STEEL_TEAL,
          margin: 0,
          marginTop: 4,
        }}
      >
        {m.country}
      </p>
      {m.coords && (
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: STEEL_TEAL,
            opacity: 0.6,
            margin: 0,
            marginTop: 4,
            letterSpacing: "0.05em",
          }}
        >
          {m.coords}
        </p>
      )}
    </div>
  );
}

function RosterRow({ m }: { m: Member }) {
  return (
    <a
      href={`#${m.slug}`}
      className="group block transition-all duration-300 hover:pl-4"
      style={{
        paddingTop: 48,
        paddingBottom: 48,
        borderBottom: "1px solid rgba(26, 74, 85, 0.15)",
        color: DEEP_TEAL,
        textDecoration: "none",
      }}
    >
      {/* Desktop */}
      <div
        className="hidden mdx:grid items-center"
        style={{
          gridTemplateColumns: "80px 1fr 280px 60px",
          gap: 32,
        }}
      >
        {m.photoUrl ? (
          <span
            style={{
              display: "block",
              width: 80,
              height: 80,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#ECE4D4",
              boxShadow: "inset 0 0 0 1px rgba(26, 74, 85, 0.1)",
            }}
          >
            <img
              src={m.photoUrl}
              alt={`${m.nameItalic} ${m.nameBold}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </span>
        ) : (
          <span
            style={{
              fontFamily: "'Sora', serif"
              fontWeight: 400,
              fontSize: 56,
              color: GOLD,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {m.index}
          </span>
        )}
        <NameRole m={m} />
        <Location m={m} align="right" />
        <span
          className="justify-self-end transition-all duration-300 group-hover:text-[color:var(--gold-c)] group-hover:translate-x-2 group-hover:opacity-100"
          style={
            {
              fontFamily: "'Sora', serif",
              fontSize: 28,
              color: DEEP_TEAL,
              opacity: 0.4,
              ["--gold-c" as string]: GOLD,
              display: "inline-block",
            } as React.CSSProperties
          }
        >
          →
        </span>
      </div>

      {/* Mobile */}
      <div className="mdx:hidden">
        <div className="grid items-start gap-4" style={{ gridTemplateColumns: "48px 1fr" }}>
          {m.photoUrl ? (
            <span
              style={{
                display: "block",
                width: 48,
                height: 48,
                borderRadius: "50%",
                overflow: "hidden",
                backgroundColor: "#ECE4D4",
                boxShadow: "inset 0 0 0 1px rgba(26, 74, 85, 0.1)",
              }}
            >
              <img
                src={m.photoUrl}
                alt={`${m.nameItalic} ${m.nameBold}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </span>
          ) : (
            <span
              style={{
                fontFamily: "'Sora', serif"
                fontWeight: 400,
                fontSize: 36,
                color: GOLD,
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              {m.index}
            </span>
          )}
          <div>
            <NameRole m={m} />
            <div style={{ marginTop: 16 }}>
              <Location m={m} align="left" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export default function EquipoSection() {
  return (
    <section
      id="equipo"
      style={{
        backgroundColor: CREAM,
        color: DEEP_TEAL,
        paddingTop: "clamp(80px, 10vw, 140px)",
        paddingBottom: "clamp(80px, 9vw, 120px)",
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
            marginBottom: 96,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                color: GOLD,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              EQUIPO CLÍNICO
            </p>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                color: STEEL_TEAL,
                maxWidth: "34ch",
                lineHeight: 1.6,
              }}
            >
              Dos hermanos en Maracaibo, dos en Alemania. Cuatro especialidades distintas que convergen en el mismo expediente clínico.
            </p>
          </div>
          <div>
            <h2
              style={{
                fontFamily: "'Sora', serif",
                fontWeight: 700,
                fontSize: "clamp(44px, 6vw, 72px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: DEEP_TEAL,
                margin: 0,
              }}
            >
              Cuatro especialistas.{" "}
              <span style={{ fontWeight: 400, color: GOLD }}>
                Dos continentes.
              </span>
            </h2>
          </div>
        </div>

        {/* ROSTER */}
        <div>
          {roster.map((m) => (
            <RosterRow key={m.slug} m={m} />
          ))}
        </div>

        {/* FOOTER */}
        <div
          className="flex flex-col mdx:flex-row mdx:items-end mdx:justify-between gap-8"
          style={{ marginTop: 64 }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              color: STEEL_TEAL,
              maxWidth: "56ch",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Sora', serif"
                fontWeight: 600,
                color: DEEP_TEAL,
              }}
            >
              Cuatro de cuatro.
            </span>{" "}
            Cuando un caso lo requiere, los cuatro especialistas lo revisan. Así funciona cuando el equipo es familia.
          </p>
          <a
            href="/equipo"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: DEEP_TEAL,
              borderBottom: `1.5px solid ${DEEP_TEAL}`,
              paddingBottom: 4,
              alignSelf: "flex-start",
              whiteSpace: "nowrap",
            }}
          >
            Ver biografías completas →
          </a>
        </div>
      </div>
    </section>
  );
}
