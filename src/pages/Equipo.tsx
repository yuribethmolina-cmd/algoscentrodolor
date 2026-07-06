import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";
import { BadgeCheck, Calendar, Stethoscope, UserRound } from "lucide-react";
import drAtilio from "@/assets/dr-atilio-full.png";
import teamDaniel from "@/assets/team-daniel.png";

const WA =
  "https://wa.me/584146807886?text=Hola%2C%20quisiera%20agendar%20una%20consulta.";

type Doctor = {
  name: string;
  specialty: string;
  schedule: string;
  note?: string;
  photo?: string;
  photoPosition?: string;
  isDirector?: boolean;
};

const DOCTORES: Doctor[] = [
  {
    name: "Dr. Atilio Rodríguez",
    specialty: "Neurocirugía Intervencionista · Director Médico",
    schedule: "Lun, Mar, Jue y Vie · 1:00 PM – 4:00 PM",
    photo: drAtilio,
    photoPosition: "center top",
    isDirector: true,
  },
  {
    name: "Dr. Daniel Rodríguez",
    specialty: "Nutrición Clínica Antiinflamatoria",
    schedule: "Lun, Mar, Jue y Vie · 1:00 PM – 4:00 PM",
    photo: teamDaniel,
    photoPosition: "center 20%",
    isDirector: true,
  },
  {
    name: "Dr. Antulio Parra",
    specialty: "Traumatología y Columna",
    schedule: "Martes y jueves · 8:00 AM – 11:00 AM",
  },
  {
    name: "Dr. Miguel Guevara",
    specialty: "Radiología Intervencionista",
    schedule: "Lunes · 8:00 AM – 10:00 AM",
  },
  {
    name: "Dr. Tomás Iragorry",
    specialty: "Anestesiología del Dolor",
    schedule: "Lun, Mar y Mié · 8:00 AM – 12:00 PM",
  },
  {
    name: "Dra. Carolina Rodríguez",
    specialty: "Electrodiagnóstico (EEG · EMG)",
    schedule: "Miércoles por la tarde",
    note: "Los estudios EEG se realizan en UDUZ",
  },
  {
    name: "Dra. Doris Meneses",
    specialty: "Neurocirugía · Columna vertebral",
    schedule: "Viernes · 8:00 AM – 12:00 PM",
  },
  {
    name: "Dra. Gilda Gómez",
    specialty: "Reumatología",
    schedule: "Miércoles · 9:00 AM – 12:00 PM",
  },
  {
    name: "Dra. Leslie Ramírez",
    specialty: "Fisiatría",
    schedule: "Jueves · 2:00 PM",
  },
];

function DoctorCard({ d }: { d: Doctor }) {
  return (
    <article className="group bg-white border border-[#1a4a55]/10 flex flex-col overflow-hidden transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgba(26,74,85,0.35)]">
      {/* Photo */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-[#f5f0e8] via-white to-[#e8eef0] overflow-hidden">
        {d.photo ? (
          <img
            src={d.photo}
            alt={d.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            style={{ objectPosition: d.photoPosition ?? "center top" }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
            <div className="w-20 h-20 rounded-full bg-[#1a4a55]/[0.06] flex items-center justify-center border border-dashed border-[#1a4a55]/20">
              <UserRound
                className="w-9 h-9 text-[#1a4a55]/40"
                strokeWidth={1.25}
              />
            </div>
            <p className="font-ui text-[10px] tracking-[0.28em] uppercase text-[#1a4a55]/50">
              Fotografía próximamente
            </p>
          </div>
        )}

        {/* Meta chips */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center gap-2">
          {d.isDirector && (
            <span className="inline-flex items-center gap-1.5 bg-[#134F5C] text-[#f5f0e8] px-2.5 py-1 text-[10px] font-ui tracking-[0.18em] uppercase">
              <Stethoscope className="w-3 h-3" strokeWidth={2} />
              Dirección
            </span>
          )}
          {d.note && (
            <span className="inline-flex items-center bg-[#8DC63F] text-[#134F5C] px-2.5 py-1 text-[10px] font-ui font-semibold tracking-[0.16em] uppercase">
              UDUZ
            </span>
          )}
        </div>

        {/* Bottom soft fade */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/60 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-5 md:p-6 flex flex-col gap-4 flex-1">
        <div className="flex items-start gap-2">
          <h3 className="font-display font-semibold text-[#1a4a55] text-[17px] leading-tight flex-1">
            {d.name}
          </h3>
          <BadgeCheck
            className="w-4 h-4 text-[#3d8b96] mt-1 flex-shrink-0"
            strokeWidth={2}
            fill="#3d8b96"
            stroke="#f5f0e8"
          />
        </div>

        <p className="font-sans text-[#3d8b96] text-[13px] leading-snug font-medium">
          {d.specialty}
        </p>

        <div className="flex items-center gap-2 text-[#1a4a55]/60">
          <Calendar className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={1.75} />
          <span className="font-sans text-xs leading-tight">{d.schedule}</span>
        </div>

        {d.note && (
          <p className="font-sans text-[11px] text-[#1a4a55]/55 italic leading-snug">
            {d.note}
          </p>
        )}

        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 bg-[#1a4a55] text-[#f5f0e8] font-ui text-[11px] tracking-[0.2em] uppercase py-3 px-4 hover:bg-[#134F5C] transition-colors"
        >
          <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
          Agendar consulta
        </a>
      </div>
    </article>
  );
}

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

        <section className="bg-cream py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-6 md:px-12">
            <p className="font-display text-[#c69636] text-[11px] font-bold tracking-[0.28em] uppercase mb-5">
              ESPECIALIDADES
            </p>
            <h2 className="font-display font-semibold text-[#1a4a55] text-3xl md:text-5xl leading-[1.15] mb-5 max-w-3xl">
              Un equipo multidisciplinario para cada tipo de dolor.
            </h2>
            <p className="font-sans text-[#1a4a55]/75 text-base md:text-[17px] leading-relaxed max-w-2xl mb-14 md:mb-20">
              Nuestro equipo evalúa el origen de su dolor, ejecuta el
              tratamiento guiado por imagen y acompaña su recuperación — todo
              con el mismo criterio clínico informado de su caso.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {DOCTORES.map((d) => (
                <DoctorCard key={d.name} d={d} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-deep-teal py-20 md:py-28">
          <div className="mx-auto max-w-[720px] px-6 md:px-12 text-center">
            <p className="font-sans text-cream/80 text-[18px] leading-[1.65] mb-10 max-w-[46ch] mx-auto">
              "La neurocirugía en ALGOS no es la puerta al quirófano — es el
              criterio que sabe cuándo la cirugía todavía no hace falta."
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
