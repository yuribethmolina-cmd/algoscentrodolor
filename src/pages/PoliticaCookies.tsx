import PageLayout from "@/components/layouts/PageLayout";
import PageHero from "@/components/PageHero";
import SEOHead from "@/components/SEOHead";

const DEEP_TEAL = "#1a4a55";
const CREAM = "#f5f0e8";
const GOLD = "#c69636";
const BODY_COLOR = "rgba(26,74,85,0.75)";

const cookies = [
  {
    name: "Google Analytics (_ga, _gid, _gat)",
    type: "Análisis",
    purpose: "Miden el tráfico y el comportamiento de los visitantes en el sitio para mejorar la experiencia. Los datos son anónimos y no permiten identificar a una persona.",
    duration: "Hasta 2 años",
  },
  {
    name: "Google Ads (gclid, _gcl_au)",
    type: "Publicidad",
    purpose: "Rastrean conversiones de campañas publicitarias para medir la efectividad de los anuncios de ALGOS. No almacenan datos clínicos ni información sensible.",
    duration: "90 días",
  },
];

const sections = [
  {
    title: "¿Qué son las cookies?",
    body: "Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo cuando los visita. Permiten que el sitio recuerde sus preferencias y aportan información sobre cómo se usa el sitio.",
  },
  {
    title: "Cookies que utilizamos",
    table: true,
  },
  {
    title: "Cookies estrictamente necesarias",
    body: "Este sitio no requiere cookies de sesión para funcionar. No existen formularios de login ni áreas restringidas que generen cookies de autenticación.",
  },
  {
    title: "Gestión de cookies",
    body: "Puede aceptar o rechazar las cookies no esenciales desde el banner que aparece en su primera visita. También puede controlar y eliminar cookies desde la configuración de su navegador. Tenga en cuenta que desactivar ciertas cookies puede afectar la funcionalidad del sitio.",
  },
  {
    title: "Actualizaciones",
    body: "Esta política puede actualizarse para reflejar cambios en las herramientas que utilizamos. La versión vigente siempre estará disponible en esta página.",
  },
  {
    title: "Contacto",
    body: null,
    email: true,
  },
];

export default function PoliticaCookiesPage() {
  return (
    <>
      <SEOHead
        title="Política de Cookies — ALGOS Centro de Dolor"
        description="Qué cookies utiliza el sitio web de ALGOS Centro de Dolor Intervencionista, para qué sirven y cómo gestionarlas."
        canonical="https://algoscentrodolor.com/politica-cookies"
      />
      <PageLayout>
        <PageHero
          eyebrow="INFORMACIÓN LEGAL"
          title="Política de Cookies"
          subtitle="Explicamos de forma clara qué cookies usamos, por qué y cómo puede controlarlas."
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

                  {s.table ? (
                    <div style={{ overflowX: "auto" }}>
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          fontFamily: "Inter, sans-serif",
                          fontSize: "clamp(13px, 1.4vw, 15px)",
                        }}
                      >
                        <thead>
                          <tr style={{ backgroundColor: DEEP_TEAL }}>
                            {["Cookie", "Tipo", "Finalidad", "Duración"].map((h) => (
                              <th
                                key={h}
                                style={{
                                  color: CREAM,
                                  fontWeight: 600,
                                  padding: "10px 14px",
                                  textAlign: "left",
                                  letterSpacing: "0.04em",
                                }}
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {cookies.map((c, i) => (
                            <tr
                              key={c.name}
                              style={{ backgroundColor: i % 2 === 0 ? "rgba(26,74,85,0.04)" : "transparent" }}
                            >
                              <td style={{ padding: "12px 14px", color: DEEP_TEAL, fontWeight: 600, verticalAlign: "top" }}>
                                {c.name}
                              </td>
                              <td style={{ padding: "12px 14px", color: GOLD, fontWeight: 600, verticalAlign: "top", whiteSpace: "nowrap" }}>
                                {c.type}
                              </td>
                              <td style={{ padding: "12px 14px", color: BODY_COLOR, lineHeight: 1.65, verticalAlign: "top" }}>
                                {c.purpose}
                              </td>
                              <td style={{ padding: "12px 14px", color: BODY_COLOR, verticalAlign: "top", whiteSpace: "nowrap" }}>
                                {c.duration}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : s.email ? (
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(15px, 1.6vw, 17px)", lineHeight: 1.75, color: BODY_COLOR }}>
                      Para consultas sobre cookies o privacidad escribanos a{" "}
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
