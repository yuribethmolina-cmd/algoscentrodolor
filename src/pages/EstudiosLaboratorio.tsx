import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";

const WA_BASE = "https://wa.me/584146807886?text=Hola%2C%20quiero%20agendar%20";

const STUDIES = [
  {
    name: "Tomografía",
    desc: "Tomografía computarizada (TAC) para columna, abdomen, tórax y otras estructuras. Necesaria para confirmar hernias discales, evaluar fracturas y planificar procedimientos guiados por imagen.",
    msg: "una%20TOMOGRAF%C3%8DA",
  },
  {
    name: "Ecografía",
    desc: "Ecografía musculoesquelética, abdominal y de partes blandas. También disponible como guía de imagen para procedimientos.",
    msg: "una%20ECOGRAF%C3%8DA",
  },
  {
    name: "Rayos X",
    desc: "Radiografía simple de columna, extremidades, tórax y otras estructuras. Punto de partida frecuente para evaluar alineación y cambios degenerativos.",
    msg: "RAYOS%20X",
  },
  {
    name: "Rayos X portátil (a domicilio)",
    desc: "Radiografía a domicilio para pacientes con movilidad reducida o que no pueden desplazarse al centro.",
    msg: "RAYOS%20X%20PORT%C3%81TIL%20A%20DOMICILIO",
  },
  {
    name: "Electrocardiograma y Holter",
    desc: "Electrocardiograma en reposo y monitoreo Holter de 24 horas para evaluación cardiovascular.",
    msg: "un%20ELECTROCARDIOGRAMA%20%2F%20HOLTER",
  },
  {
    name: "Laboratorio clínico",
    desc: "Análisis de sangre, orina y otros estudios de laboratorio. Disponibles para seguimiento, diagnóstico y evaluación preoperatoria.",
    msg: "LABORATORIO%20CL%C3%8DNICO",
  },
];

export default function EstudiosLaboratorio() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        <PageHeroVideo
          eyebrow="Red UDUZ"
          title="Estudios y laboratorio"
          subtitle="Los estudios de diagnóstico y el laboratorio de la red UDUZ están disponibles aquí: puede solicitarlos directamente, con o sin consulta en ALGOS."
          video="pacientes"
        />

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-deep-teal/10">
              {STUDIES.map((s) => (
                <div key={s.name} className="bg-cream p-8 md:p-10">
                  <h2 className="font-display font-bold text-deep-teal text-[22px] md:text-[26px] leading-[1.1] mb-4">
                    {s.name}
                  </h2>
                  <p className="font-sans text-steel-teal text-[15px] leading-[1.65] mb-7">
                    {s.desc}
                  </p>
                  <a
                    href={`${WA_BASE}${s.msg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[11px] tracking-[0.18em] rounded-none px-7 py-3 transition-colors"
                  >
                    Solicitar por WhatsApp
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-10 border-t border-deep-teal/10">
              <p className="font-sans text-steel-teal text-[14px] leading-[1.65] max-w-[60ch]">
                Los estudios de la red UDUZ se coordinan con ALGOS Centro de Dolor Intervencionista. Al escribirnos, le indicamos disponibilidad, preparación necesaria y costo antes de su cita.
              </p>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
