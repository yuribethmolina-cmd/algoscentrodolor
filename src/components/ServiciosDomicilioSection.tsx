const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const TEAL = "#3d8b96";
const WA = "https://wa.me/584146807886?text=Hola,%20quisiera%20solicitar%20un%20servicio%20a%20domicilio";

const ITEMS = [
  {
    label: "Laboratorio a domicilio",
    desc: "Toma de muestras en su casa, con la misma calidad que en sede.",
  },
  {
    label: "Rayos X a domicilio",
    desc: "Equipo portátil para pacientes con movilidad reducida u hospitalizados en casa.",
  },
];

export default function ServiciosDomicilioSection() {
  return (
    <section
      style={{
        backgroundColor: "#f0eadc",
        paddingTop: "clamp(64px, 8vw, 96px)",
        paddingBottom: "clamp(64px, 8vw, 96px)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1000,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: GOLD,
            marginBottom: 16,
          }}
        >
          SERVICIOS A DOMICILIO
        </p>

        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(26px, 3.2vw, 40px)",
            lineHeight: 1.2,
            color: DEEP_TEAL,
            marginBottom: 32,
            maxWidth: 640,
          }}
        >
          También vamos hasta su casa.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 32,
          }}
        >
          {ITEMS.map((it) => (
            <div
              key={it.label}
              style={{
                backgroundColor: CREAM,
                padding: "24px 22px",
                borderLeft: `3px solid ${TEAL}`,
              }}
            >
              <h3
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: DEEP_TEAL,
                  marginBottom: 8,
                }}
              >
                {it.label}
              </h3>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "rgba(26,74,85,0.75)",
                }}
              >
                {it.desc}
              </p>
            </div>
          ))}
        </div>

        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            color: DEEP_TEAL,
            borderBottom: `1.5px solid ${GOLD}`,
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.02em",
            textDecoration: "none",
            paddingBottom: 2,
          }}
        >
          Solicitar servicio a domicilio por WhatsApp →
        </a>
      </div>
    </section>
  );
}
