import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";

const WA = "https://wa.me/584246467944";

const ALGOS_STUDIES = [
  {
    name: "Electromiografía (EMG)",
    desc: "Evaluación eléctrica del músculo para identificar lesiones nerviosas, miopatías y síndrome del túnel carpiano. Realizada directamente por el equipo clínico de ALGOS.",
  },
  {
    name: "Electroencefalograma (EEG)",
    desc: "Registro de la actividad eléctrica cerebral. Indicado en cefaleas crónicas, episodios convulsivos y evaluación neurológica.",
  },
  {
    name: "Estudios de conducción nerviosa",
    desc: "Mide la velocidad y calidad de la conducción a lo largo de nervios periféricos. Complementario al EMG para diagnóstico de neuropatías.",
  },
];

const UDUZ_STUDIES = [
  "Tomografía computarizada",
  "Rayos X digital",
  "Rayos X portátil / a domicilio",
  "Mamografía 3D",
  "Ecografía",
  "Ecocardiograma",
  "Holter",
  "Electrocardiograma",
  "Laboratorio clínico completo",
  "Laboratorio a domicilio",
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

        {/* Bloque A — Estudios ALGOS */}
        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-3">
              ESTUDIOS PROPIOS DE ALGOS
            </p>
            <h2 className="font-display font-bold text-deep-teal text-[28px] md:text-[36px] leading-[1.15] mb-10">
              Realizados directamente por nuestro equipo clínico
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-deep-teal/10 mb-10">
              {ALGOS_STUDIES.map((s) => (
                <div key={s.name} className="bg-cream p-8 md:p-10">
                  <h3 className="font-display font-bold text-deep-teal text-[20px] leading-[1.2] mb-4">
                    {s.name}
                  </h3>
                  <p className="font-sans text-steel-teal text-[15px] leading-[1.65]">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>

            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[11px] tracking-[0.18em] rounded-none px-7 py-3 transition-colors"
            >
              Solicitar estudio por WhatsApp
            </a>
          </div>
        </section>

        {/* Bloque B — Estudios UDUZ */}
        <section className="bg-cream py-16 md:py-24 border-t border-deep-teal/10">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-[11px] tracking-[0.22em] mb-3" style={{ color: "#3d8b96" }}>
              ALIANZA DIAGNÓSTICA
            </p>
            <h2 className="font-display font-bold text-deep-teal text-[28px] md:text-[36px] leading-[1.15] mb-3">
              A través de nuestra alianza con UDUZ — Unidad de Diagnóstico del Zulia
            </h2>
            <p className="font-sans text-steel-teal text-[15px] leading-[1.65] max-w-[62ch] mb-10">
              Los siguientes estudios están disponibles a través de UDUZ, coordinados con el equipo de ALGOS para que su diagnóstico y su tratamiento ocurran en el mismo ecosistema clínico.
            </p>

            <div
              className="mb-10"
              style={{
                borderLeft: "3px solid #3d8b96",
                paddingLeft: 24,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "clamp(10px, 1.5vw, 16px)",
              }}
            >
              {UDUZ_STUDIES.map((name) => (
                <div
                  key={name}
                  className="bg-white"
                  style={{
                    border: "1px solid rgba(61,139,150,0.15)",
                    padding: "14px 18px",
                    fontFamily: "Manrope, system-ui, sans-serif",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1a4a55",
                  }}
                >
                  {name}
                </div>
              ))}
            </div>

            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-cream font-sans font-bold uppercase text-[11px] tracking-[0.18em] rounded-none px-7 py-3 transition-colors"
              style={{ backgroundColor: "#3d8b96" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4a9ca8")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3d8b96")}
            >
              Coordinar estudio UDUZ por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
