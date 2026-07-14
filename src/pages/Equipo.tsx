import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageHeroVideo from "@/components/PageHeroVideo";
import SmartImage from "@/components/SmartImage";
import { BadgeCheck, Calendar, UserRound } from "lucide-react";
import { ALGOS } from "@/config/algos.config";
import { DOCTORS, type Doctor as DoctorData } from "@/data/doctors";

const WA = ALGOS.contact.whatsappHref + "?text=Hola%2C%20quisiera%20agendar%20una%20consulta.";

type Doctor = DoctorData;
const DOCTORES: Doctor[] = DOCTORS;


function DoctorCard({ d, index }: { d: Doctor; index: number }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1"
      style={{
        background:
          "linear-gradient(160deg, #ffffff 0%, #fbf8f2 100%)",
        border: "1px solid rgba(26,74,85,0.10)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 18px 40px -24px rgba(26,74,85,0.22), 0 2px 6px rgba(26,74,85,0.05)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow =
          "0 1px 0 rgba(255,255,255,0.95) inset, 0 30px 60px -28px rgba(26,74,85,0.4), 0 4px 10px rgba(26,74,85,0.08)";
        e.currentTarget.style.borderColor = "rgba(61,139,150,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow =
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 18px 40px -24px rgba(26,74,85,0.22), 0 2px 6px rgba(26,74,85,0.05)";
        e.currentTarget.style.borderColor = "rgba(26,74,85,0.10)";
      }}
    >
      {/* Top accent bar */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] z-10"
        style={{
          background: d.isDirector
            ? "linear-gradient(90deg, #c69636 0%, #e8b95c 100%)"
            : "linear-gradient(90deg, #3d8b96 0%, #5eb0bd 100%)",
        }}
      />

      {/* Photo */}
      <div className="relative aspect-[4/5] bg-gradient-to-br from-[#f5f0e8] via-white to-[#e8eef0] overflow-hidden">
        {d.photo ? (
          <SmartImage
            picture={d.photo}
            alt={d.name}
            eager={false}
            className="absolute inset-0 w-full h-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            style={{ objectPosition: d.photoPosition ?? "center top" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6">
            <div className="w-20 h-20 rounded-full bg-[#1a4a55]/[0.06] flex items-center justify-center border border-dashed border-[#1a4a55]/25">
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

        {/* Index numeral */}
        <div
          className="absolute top-4 right-4 font-display font-semibold text-[#f5f0e8] text-[13px] tracking-[0.24em] z-10"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>


        {/* Bottom soft fade to card body */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/70 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-6 md:p-7 flex flex-col gap-4 flex-1 relative">
        <div className="flex items-start gap-2">
          <h3 className="font-display font-semibold text-[#1a4a55] text-[18px] leading-tight flex-1 tracking-[-0.01em]">
            {d.name}
          </h3>
          <BadgeCheck
            className="w-[18px] h-[18px] text-[#3d8b96] mt-0.5 flex-shrink-0"
            strokeWidth={2}
            fill="#3d8b96"
            stroke="#f5f0e8"
          />
        </div>

        <p className="font-sans text-[#3d8b96] text-[13px] leading-snug font-medium">
          {d.specialty}
        </p>

        {/* Schedule bar */}
        <div
          className="flex items-center gap-2.5 mt-1"
          style={{
            padding: "10px 12px",
            background: "rgba(26,74,85,0.05)",
            border: "1px solid rgba(26,74,85,0.08)",
          }}
        >
          <Calendar
            className="w-3.5 h-3.5 flex-shrink-0 text-[#c69636]"
            strokeWidth={2}
          />
          <span className="font-sans text-[12px] leading-tight text-[#1a4a55]/80">
            {d.schedule}
          </span>
        </div>

        {d.note && (
          <p className="font-sans text-[11px] text-[#1a4a55]/60 italic leading-snug -mt-1">
            {d.note}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2">
          <Link
            to={`/equipo/${d.slug}`}
            className="w-full inline-flex items-center justify-center gap-2 border border-[#1a4a55]/20 text-[#1a4a55] font-ui text-[11px] tracking-[0.2em] uppercase py-3 px-4 hover:bg-[#1a4a55]/5 transition-all"
          >
            Ver perfil
            <span aria-hidden="true">→</span>
          </Link>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 bg-[#1a4a55] text-[#f5f0e8] font-ui text-[11px] tracking-[0.2em] uppercase py-3.5 px-4 hover:bg-[#134F5C] hover:gap-3 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
            Agendar consulta
            <span aria-hidden="true">→</span>
          </a>
        </div>
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
          eyebrow=""
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
              {DOCTORES.map((d, i) => (
                <DoctorCard key={d.name} d={d} index={i} />
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
              className="w-full sm:w-auto block sm:inline-block text-center bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-10 py-5 transition-colors"
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
