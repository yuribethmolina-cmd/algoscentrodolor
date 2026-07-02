import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20agendar%20una%20consulta.";

const GROUPS = [
  {
    role: "Evalúan y diagnostican el origen del dolor",
    specialties: [
      { name: "Neurocirugía", focus: "Columna y nervios" },
      { name: "Traumatología", focus: "Musculoesquelético" },
      { name: "Reumatología", focus: "Articular e inflamatorio" },
      { name: "Fisiatría", focus: "Funcional" },
    ],
  },
  {
    role: "Ejecutan el tratamiento intervencionista guiado por imagen",
    specialties: [
      { name: "Algología / Anestesiología del dolor", focus: "" },
      { name: "Neurocirugía", focus: "" },
      { name: "Traumatología", focus: "" },
    ],
  },
  {
    role: "Acompañan la recuperación",
    specialties: [
      { name: "Fisiatría", focus: "Rehabilitación" },
      { name: "Nutrición", focus: "Apoyo clínico al dolor crónico, la artrosis y la neuropatía" },
    ],
  },
];

export default function Equipo() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        <section className="bg-deep-teal pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <h1 className="mt-2 font-display font-bold text-cream leading-[1.05] tracking-[-0.025em] text-[38px] md:text-[64px] max-w-[20ch]">
              El equipo
            </h1>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <p className="font-sans text-deep-teal text-[18px] leading-[1.75] max-w-[62ch] mb-16">
              En ALGOS su caso no lo ve un solo médico: lo ve la especialidad que le corresponde. El equipo reúne neurocirugía, traumatología, algología, reumatología, fisiatría y apoyo nutricional, trabajando sobre una misma historia clínica y una misma ruta.
            </p>

            <div className="flex flex-col gap-12">
              {GROUPS.map((g, gi) => (
                <div key={gi} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16 pt-10 border-t border-deep-teal/10">
                  <div>
                    <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-3">
                      {String(gi + 1).padStart(2, "0")}
                    </p>
                    <p className="font-sans text-deep-teal text-[17px] leading-[1.5] font-semibold">
                      {g.role}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    {g.specialties.map((s) => (
                      <div key={s.name} className="flex items-baseline gap-3">
                        <span className="font-sans font-semibold text-deep-teal text-[15px]">
                          {s.name}
                        </span>
                        {s.focus && (
                          <span className="font-sans text-steel-teal text-[13px]">
                            {s.focus}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-10 border-t border-deep-teal/10">
              <p className="font-sans text-steel-teal text-[14px] leading-[1.65] max-w-[60ch]">
                La información de los médicos que conforman el equipo se publicará próximamente. Si tiene preguntas sobre qué especialista corresponde a su caso, escríbanos.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[46ch] mx-auto">
              Cuéntenos su caso y le indicamos qué especialidad le corresponde y cuál es el siguiente paso.
            </p>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors"
            >
              Escríbanos por WhatsApp
            </a>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
