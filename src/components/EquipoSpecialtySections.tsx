import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { SPECIALTIES } from "@/data/specialties";
import { DOCTORS } from "@/data/doctors";

/**
 * Secciones SEO por especialidad: cada especialidad tiene su propio H2,
 * descripción y lista de especialistas con enlace a su perfil.
 * Se renderiza en /equipo y /pacientes/equipo.
 */
export default function EquipoSpecialtySections() {
  const specialties = SPECIALTIES.filter((s) =>
    DOCTORS.some((d) => d.specialtySlug === s.slug),
  );

  return (
    <section
      aria-label="Especialidades del equipo"
      className="bg-cream py-16 md:py-24"
    >
      <div className="container mx-auto max-w-5xl px-6 md:px-12">
        <p className="font-display text-[#c69636] text-[11px] font-bold tracking-[0.28em] uppercase mb-4">
          POR ESPECIALIDAD
        </p>
        <h2 className="font-display font-semibold text-[#1a4a55] text-2xl md:text-4xl leading-[1.15] mb-4 max-w-3xl">
          Qué especialistas atienden en ALGOS y qué evalúan.
        </h2>
        <p className="font-sans text-[#1a4a55]/75 text-base leading-relaxed max-w-2xl mb-14">
          Cada especialidad tiene un enfoque específico dentro del centro de
          dolor. Conozca al equipo por área y agende con quien mejor puede
          evaluar su caso.
        </p>

        <div className="flex flex-col gap-14 md:gap-16">
          {specialties.map((s) => {
            const specialists = DOCTORS.filter((d) => d.specialtySlug === s.slug);
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="scroll-mt-24"
              >
                <h3 className="font-display font-semibold text-[#1a4a55] text-xl md:text-2xl leading-tight mb-3">
                  {s.name}
                </h3>
                <p className="font-sans text-[#3d8b96] text-[13px] font-medium tracking-wide mb-4">
                  {s.tagline}
                </p>
                <p className="font-sans text-[#1a4a55]/80 text-[15px] leading-relaxed max-w-2xl mb-4">
                  {s.description}
                </p>

                <dl className="grid gap-3 md:grid-cols-3 mb-6 max-w-3xl">
                  {[
                    { label: "Evalúa", value: s.evalua },
                    { label: "Trata", value: s.trata },
                    { label: "Acompaña", value: s.acompana },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="border-l-2 border-[#c69636]/60 pl-3"
                    >
                      <dt className="font-sans text-[10px] font-bold tracking-[0.22em] uppercase text-[#c69636] mb-1">
                        {item.label}
                      </dt>
                      <dd className="font-sans text-[13px] leading-snug text-[#1a4a55]/80">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <h4 className="font-display font-semibold text-[#1a4a55] text-[13px] tracking-[0.16em] uppercase mb-3">
                  Especialistas
                </h4>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {specialists.map((d) => (
                    <li
                      key={d.slug}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-[#1a4a55]/10"
                    >
                      <div>
                        <Link
                          to={`/equipo/${d.slug}`}
                          className="font-display font-semibold text-[#1a4a55] text-[15px] hover:text-[#3d8b96] transition-colors"
                        >
                          {d.name}
                        </Link>
                        <p className="font-sans text-[12px] text-[#1a4a55]/70 flex items-center gap-1.5 mt-1">
                          <Calendar className="w-3 h-3 text-[#c69636]" strokeWidth={2} />
                          {d.schedule}
                        </p>
                      </div>
                      <Link
                        to={`/equipo/${d.slug}`}
                        className="font-ui text-[11px] tracking-[0.2em] uppercase text-[#3d8b96] hover:text-[#1a4a55] transition-colors self-start sm:self-auto"
                      >
                        Ver perfil →
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
