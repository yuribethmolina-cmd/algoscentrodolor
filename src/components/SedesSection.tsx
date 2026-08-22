import { MapPin, Phone } from "lucide-react";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";
const TEAL = "#3d8b96";

const SEDES = [
  {
    nombre: "Sede Sector Paraíso",
    direccion: "Av. 20 con Calle 65, N° 65-02",
    detalle: "C.C. América, Local 4 · Sector Paraíso · Maracaibo 4001, Edo. Zulia\nPunto de referencia: Frente a la maternidad Castillo Plaza",
    telefonos: [
      { label: "0414-680 7886", href: "tel:+584146807886" },
      { label: "0412-061 7410", href: "tel:+584120617410" },
    ],
    servicios: [
      "Consulta médica",
      "Dolor intervencionista",
      "Electromiografía (EMG)",
      "Electroencefalograma (EEG)",
    ],
    maps: "https://maps.google.com/?q=ALGOS+Centro+de+Dolor+Intervencionista,CC+America,Av+20+con+Calle+65,Sector+Paraiso,Maracaibo,Venezuela",
  },
  {
    nombre: "Sede Torre RAB",
    direccion: "Av. Sabaneta, Urbanización Urdaneta",
    detalle: "Torre de consultorios RAB · Detrás de la Clínica Zulia · Piso 1, Consultorio 3 · Maracaibo, Edo. Zulia",
    telefonos: [
      { label: "0424-646 7944", href: "tel:+584246467944" },
      { label: "0412-174 8249", href: "tel:+584121748249" },
      { label: "0261-800 0476", href: "tel:+582618000476" },
    ],
    servicios: [
      "Consulta médica",
      "Dolor intervencionista",
      "Atención por cita previa",
    ],
    maps: "https://maps.google.com/?q=Torre+consultorios+RAB,Urbanizacion+Urdaneta,Av+Sabaneta,Maracaibo,Zulia",
  },
];

export default function SedesSection() {
  return (
    <section
      style={{
        backgroundColor: CREAM,
        paddingTop: "clamp(80px, 10vw, 128px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1100,
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
            marginBottom: 20,
          }}
        >
          NUESTRAS SEDES
        </p>
        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.6vw, 44px)",
            lineHeight: 1.2,
            color: DEEP_TEAL,
            marginBottom: 40,
            maxWidth: 640,
          }}
        >
          Dos sedes en Maracaibo.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}
        >
          {SEDES.map((s) => (
            <div
              key={s.nombre}
              style={{
                backgroundColor: "#fff",
                padding: "32px 28px",
                border: "1px solid rgba(26,74,85,0.1)",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                <MapPin size={18} color={TEAL} style={{ flexShrink: 0, marginTop: 3 }} />
                <div>
                  <h3
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 20,
                      fontWeight: 600,
                      color: DEEP_TEAL,
                      marginBottom: 4,
                    }}
                  >
                    {s.nombre}
                  </h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: 14, color: "rgba(26,74,85,0.7)" }}>
                    {s.direccion}
                  </p>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      color: "rgba(26,74,85,0.5)",
                      marginTop: 4,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {s.detalle}
                  </p>
                </div>
              </div>

              {s.telefonos && (
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                  <Phone size={16} color={TEAL} style={{ flexShrink: 0, marginTop: 2 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {s.telefonos.map((t) => (
                      <a
                        key={t.label}
                        href={t.href}
                        style={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: 13,
                          color: DEEP_TEAL,
                          textDecoration: "none",
                        }}
                      >
                        {t.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ borderTop: "1px solid rgba(26,74,85,0.1)", margin: "18px 0", }} />

              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: TEAL,
                  marginBottom: 10,
                }}
              >
                Servicios disponibles
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 20 }}>
                {s.servicios.map((sv) => (
                  <li
                    key={sv}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      color: DEEP_TEAL,
                      padding: "5px 0",
                    }}
                  >
                    · {sv}
                  </li>
                ))}
              </ul>

              <a
                href={s.maps}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: GOLD,
                  textDecoration: "none",
                }}
              >
                Cómo llegar →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
