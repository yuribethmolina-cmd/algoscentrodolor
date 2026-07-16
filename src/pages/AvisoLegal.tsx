import PageLayout from "@/components/layouts/PageLayout";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";

const DEEP_TEAL = "#1a4a55";
const CREAM = "#f5f0e8";
const BODY_COLOR = "rgba(26,74,85,0.75)";

const sections = [
  {
    title: "Propósito informativo",
    body: "El contenido de este sitio web tiene carácter exclusivamente informativo y no constituye consejo médico. Consulte siempre con un profesional de salud calificado ante cualquier condición clínica.",
  },
  {
    title: "Propiedad intelectual",
    body: "Todo el contenido, diseño, imágenes y textos publicados en este sitio son propiedad de ALGOS, Centro de Dolor Intervencionista, y están protegidos por las leyes de propiedad intelectual aplicables en Venezuela.",
  },
  {
    title: "Limitación de responsabilidad",
    body: "ALGOS no se hace responsable por el uso que los usuarios hagan de la información publicada en este sitio web, ni por las decisiones tomadas a partir de dicho contenido sin consulta médica previa.",
  },
  {
    title: "Datos personales",
    body: "El tratamiento de información personal se rige por nuestra Política de Privacidad, disponible en este mismo sitio.",
  },
  {
    title: "Modificaciones",
    body: "ALGOS se reserva el derecho de actualizar este aviso legal en cualquier momento. La versión vigente siempre estará disponible en esta página.",
  },
  {
    title: "Contacto",
    body: null,
    email: true,
  },
];

export default function AvisoLegalPage() {
  return (
    <>
      <SEOHead
        title="Aviso Legal — ALGOS Centro de Dolor"
        description="Términos de uso, propiedad intelectual y limitación de responsabilidad del sitio web de ALGOS, Centro de Dolor Intervencionista."
        canonical="https://algoscentrodolor.com/aviso-legal"
      />
      <PageLayout>
        <PageHero
          eyebrow="INFORMACIÓN LEGAL"
          title="Aviso Legal"
          subtitle="Condiciones de uso y responsabilidad del sitio web de ALGOS, Centro de Dolor Intervencionista."
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
              Este sitio web es propiedad de ALGOS, Centro de Dolor Intervencionista, con sede en
              Maracaibo, Venezuela. Al acceder y navegar en este sitio, usted acepta las condiciones
              descritas a continuación.
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
                      Para consultas legales escribanos a{" "}
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
