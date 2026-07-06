import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";
import { Clock } from "lucide-react";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20agendar%20una%20consulta.";

const DOCTORES = [
  {
    name: "Dr. Antulio Parra",
    specialty: "Traumatología y Columna",
    schedule: "Martes y jueves · 8:00 AM – 11:00 AM",
    note: "",
  },
  {
    name: "Dr. Atilio Rodríguez",
    specialty: "Neurocirugía Intervencionista · Director Médico",
    schedule: "Lunes, martes, jueves y viernes · 1:00 PM – 4:00 PM",
    note: "",
  },
  {
    name: "Dr. Daniel Rodríguez",
    specialty: "Nutrición Clínica Antiinflamatoria",
    schedule: "Lunes, martes, jueves y viernes · 1:00 PM – 4:00 PM",
    note: "",
  },
  {
    name: "Dr. Miguel Guevara",
    specialty: "Radiología Intervencionista",
    schedule: "Lunes · 8:00 AM – 10:00 AM",
    note: "",
  },
  {
    name: "Dr. Tomás Iragorry",
    specialty: "Anestesiología del Dolor",
    schedule: "Lunes, martes y miércoles · 8:00 AM – 12:00 PM",
    note: "",
  },
  {
    name: "Dra. Carolina Rodríguez",
    specialty: "Electrodiagnóstico (EEG · EMG)",
    schedule: "Miércoles tarde",
    note: "Los estudios EEG se realizan en UDUZ",
  },
  {
    name: "Dra. Doris Meneses",
    specialty: "Neurocirugía · Columna vertebral",
    schedule: "Viernes · 8:00 AM – 12:00 PM",
    note: "",
  },
  {
    name: "Dra. Gilda Gómez",
    specialty: "Reumatología",
    schedule: "Miércoles · 9:00 AM – 12:00 PM",
    note: "",
  },
  {
    name: "Dra. Leslie Ramírez",
    specialty: "Fisiatría",
    schedule: "Jueves · 2:00 PM",
    note: "",
  },
];

export default function Equipo() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        <PageHeroVideo
          eyebrow="None"
          title="Especialidades y equipo"
          video="medicos"
        />

        <section
          style={{
            backgroundColor: "#f5f0e8",
            paddingTop: "clamp(80px, 10vw, 128px)",
            paddingBottom: "clamp(80px, 10vw, 128px)",
          }}
        >
          <div
            className="mx-auto"
            style={{
              maxWidth: 1080,
              paddingLeft: "clamp(24px, 4vw, 48px)",
              paddingRight: "clamp(24px, 4vw, 48px)",
            }}
          >
            <p
              style={{
                fontFamily: "'Sora', serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#c69636",
                marginBottom: 20,
              }}
            >
              ESPECIALIDADES
            </p>
            <h2
              style={{
                fontFamily: "'Sora', serif",
                fontWeight: 600,
                fontSize: "clamp(28px, 3.5vw, 48px)",
                lineHeight: 1.15,
                color: "#1a4a55",
                marginBottom: "clamp(16px, 2vw, 24px)",
              }}
            >
              Un equipo multidisciplinario para cada tipo de dolor.
            </h2>
            <p
              style={{
                fontFamily: "Manrope, system-ui, sans-serif",
                fontSize: "clamp(15px, 1.6vw, 17px)",
                lineHeight: 1.7,
                color: "rgba(26,74,85,0.75)",
                maxWidth: 720,
                marginBottom: "clamp(48px, 6vw, 72px)",
              }}
            >
              Nuestro equipo evalúa el origen de su dolor, ejecuta el tratamiento guiado por imagen y acompaña su recuperación — todo con el mismo criterio clínico informado de su caso.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "clamp(12px, 2vw, 20px)",
              }}
            >
              {DOCTORES.map((d) => (
                <div
                  key={d.name}
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid rgba(26,74,85,0.1)",
                    padding: "28px 24px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Sora', serif",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#1a4a55",
                      letterSpacing: "0.01em",
                      marginBottom: 8,
                    }}
                  >
                    {d.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "Manrope, system-ui, sans-serif",
                      fontSize: 13,
                      fontWeight: 500,
                      color: "#3d8b96",
                      marginBottom: 12,
                    }}
                  >
                    {d.specialty}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontFamily: "Manrope, system-ui, sans-serif",
                      fontSize: 12,
                      color: "rgba(26,74,85,0.6)",
                    }}
                  >
                    <Clock size={13} style={{ color: "#3d8b96" }} />
                    <span>{d.schedule}</span>
                  </div>
                  {d.note && (
                    <p
                      style={{
                        fontFamily: "Manrope, system-ui, sans-serif",
                        fontSize: 12,
                        color: "rgba(26,74,85,0.55)",
                        marginTop: 10,
                        fontStyle: "italic",
                      }}
                    >
                      {d.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[46ch] mx-auto">
              "La neurocirugía en ALGOS no es la puerta al quirófano — es el criterio que sabe cuándo la cirugía todavía no hace falta."
            </p>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors"
            >
              Agendar consulta con el especialista →
            </a>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
