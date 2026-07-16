import PageLayout from "@/components/layouts/PageLayout";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";

const DEEP_TEAL = "#1a4a55";
const CREAM = "#f5f0e8";
const BODY_COLOR = "rgba(26,74,85,0.75)";

const sections = [
  {
    title: "Información que recopilamos",
    body: "Recopilamos información personal cuando usted agenda una cita, nos contacta o utiliza nuestros servicios. Esto puede incluir nombre, teléfono, correo electrónico y datos clínicos relevantes para su atención.",
  },
  {
    title: "Uso de la información",
    body: "Su información se utiliza exclusivamente para fines clínicos, comunicación relacionada con sus citas y mejora continua de nuestros servicios. No compartimos sus datos con terceros fuera del equipo de atención.",
  },
  {
    title: "Protección de datos",
    body: "Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, pérdida o divulgación indebida.",
  },
  {
    title: "Sus derechos",
    body: "Usted puede solicitar en cualquier momento acceso, corrección o eliminación de sus datos personales escribiéndonos a info@algoscentrodolor.com.",
  },
  {
    title: "Cookies y tecnologías de seguimiento",
    body: "Este sitio utiliza cookies de análisis (Google Analytics) y seguimiento publicitario (Google Ads) para mejorar la experiencia y medir el rendimiento. Puede consultar nuestra Política de Cookies para más detalles o gestionar sus preferencias desde el banner de cookies.",
  },
  {
    title: "Contacto",
    body: null,
    email: true,
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <SEOHead
        title="Política de Privacidad — ALGOS Centro de Dolor"
        description="Cómo ALGOS, Centro de Dolor Intervencionista, recopila, utiliza y protege su información personal."
        canonical="https://algoscentrodolor.com/privacidad"
      />
      <PageLayout>
        <PageHero
          eyebrow="INFORMACIÓN LEGAL"
          title="Política de Privacidad"
          subtitle="Nos comprometemos a proteger su información personal con el mismo rigor con el que cuidamos su salud."
        />

        <section style={{ backgroundColor: CREAM, padding: "clamp(64px, 8vw, 112px) 0" }}>
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              paddingLeft: "clamp(24px, 4vw, 48px)",
              paddingRight: "clamp(24px, 4vw, 48px)",
            }}
          >
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                lineHeight: 1.75,
                color: BODY_COLOR,
                marginBottom: 48,
              }}
            >
              ALGOS, Centro de Dolor Intervencionista, se compromete a proteger la privacidad de sus
              pacientes y usuarios. Esta política describe cómo recopilamos, utilizamos y protegemos
              su información personal.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {sections.map((s) => (
                <div key={s.title}>
                  <h2
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontWeight: 700,
                      fontSize: "clamp(17px, 1.8vw, 20px)",
                      color: DEEP_TEAL,
                      marginBottom: 10,
                    }}
                  >
                    {s.title}
                  </h2>
                  {s.email ? (
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.75, color: BODY_COLOR }}>
                      Para consultas sobre esta política escribanos a{" "}
                      <a
                        href="mailto:info@algoscentrodolor.com"
                        style={{ color: "#3d8b96", textDecoration: "underline" }}
                      >
                        info@algoscentrodolor.com
                      </a>
                    </p>
                  ) : (
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.75, color: BODY_COLOR }}>
                      {s.body}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
