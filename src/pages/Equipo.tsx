import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import { BioModal } from "@/components/equipo/BioModal";
import { AnimatedHeadline, InViewToggle } from "@/lib/animations";
import TEAM, {
  getMembersByGroup,
  type ConfirmedMember,
  type AspirationalSlot,
  type TeamMember,
} from "@/data/team";

/* ------------------------------ Row components ----------------------------- */

function PersonRow({
  member,
  onOpen,
}: {
  member: ConfirmedMember;
  onOpen: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(member.slug)}
      className="group w-full text-left grid items-center gap-4 md:gap-8 py-8 md:py-12 border-b border-deep-teal/15 transition-all duration-300 hover:pl-4
 grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_280px_60px]"
    >
      {/* Photo / Index */}
      {member.photoUrl ? (
        <span className="block w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden bg-[#ECE4D4] ring-1 ring-deep-teal/10">
          <img
            src={member.photoUrl}
            alt={`${member.givenName} ${member.familyName}`}
            className="w-full h-full object-cover"
          />
        </span>
      ) : (
        <span className="font-display font-normal text-[36px] md:text-[56px] text-algos-gold leading-none tracking-[-0.03em]">
          {member.index}
        </span>
      )}

      {/* Name + role */}
      <div className="min-w-0">
        <h3 className="font-display font-bold text-deep-teal leading-tight tracking-[-0.02em] text-[26px] md:text-[44px]">
          {member.givenName} {member.familyName}
        </h3>
        <p className="mt-2.5 font-sans font-bold uppercase text-steel-teal text-[11px] md:text-[13px] tracking-[0.2em]">
          {member.role}
        </p>
        <p className="mt-1.5 font-sans text-[14px] text-deep-teal/80 leading-snug">
          {member.specialty}
        </p>

        {/* Mobile location */}
        <div className="md:hidden mt-4 text-left">
          <p className="font-display font-semibold text-[18px] text-deep-teal tracking-[-0.01em]">
            {member.city}
          </p>
          <p className="mt-1 font-sans font-bold uppercase text-steel-teal text-[11px] tracking-[0.22em]">
            {member.country}
          </p>
          {member.coords && (
            <p className="mt-1.5 font-mono text-[10px] text-steel-teal/60 tracking-[0.04em]">
              {member.coords}
            </p>
          )}
        </div>
      </div>

      {/* Location desktop */}
      <div className="hidden md:block text-right">
        <p className="font-display font-semibold text-[18px] text-deep-teal tracking-[-0.01em]">
          {member.city}
        </p>
        <p className="mt-1 font-sans font-bold uppercase text-steel-teal text-[11px] tracking-[0.22em]">
          {member.country}
        </p>
        {member.coords && (
          <p className="mt-1.5 font-mono text-[10px] text-steel-teal/60 tracking-[0.04em]">
            {member.coords}
          </p>
        )}
      </div>

      {/* Arrow */}
      <span
        aria-hidden
        className="hidden md:flex justify-end font-display text-[28px] text-deep-teal/40 transition-all duration-300 group-hover:text-algos-gold group-hover:opacity-100 group-hover:translate-x-2"
      >
        →
      </span>
    </button>
  );
}

function AspirationalSlotRow({ slot }: { slot: AspirationalSlot }) {
  return (
    <a
      href="/#solicitar"
      className="group w-full grid items-center gap-4 md:gap-8 py-8 md:py-12 border-b border-dashed border-deep-teal/25 transition-all duration-300 hover:pl-4
 grid-cols-[48px_1fr] md:grid-cols-[80px_1fr_280px_60px]"
    >
      {/* Index */}
      <span className="font-display font-normal text-[36px] md:text-[56px] text-steel-teal/50 leading-none tracking-[-0.03em]">
        —
      </span>

      {/* Role-as-name + profile */}
      <div className="min-w-0">
        <h3 className="font-display font-normal text-deep-teal/80 leading-tight tracking-[-0.02em] text-[26px] md:text-[44px]">
          {slot.roleAsName}
        </h3>
        <p className="mt-2.5 font-sans font-bold uppercase text-algos-gold text-[11px] md:text-[13px] tracking-[0.2em]">
          Buscando talento
        </p>
        <p className="mt-1.5 font-sans text-[14px] text-steel-teal/75 leading-snug">
          {slot.profileLine}
        </p>

        {/* Mobile location */}
        <div className="md:hidden mt-4 text-left">
          <p className="font-display font-semibold text-[18px] text-deep-teal/80 tracking-[-0.01em]">
            {slot.city}
          </p>
          <p className="mt-1 font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em]">
            Programa abierto
          </p>
        </div>
      </div>

      {/* Location desktop */}
      <div className="hidden md:block text-right">
        <p className="font-display font-semibold text-[18px] text-deep-teal/80 tracking-[-0.01em]">
          {slot.city}
        </p>
        <p className="mt-1 font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em]">
          Programa abierto
        </p>
      </div>

      {/* Arrow */}
      <span
        aria-hidden
        className="hidden md:flex justify-end font-display text-[28px] text-algos-gold/60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110"
      >
        ⊕
      </span>
    </a>
  );
}

/* ------------------------------ Group block ------------------------------- */

type GroupBlockProps = {
  eyebrow: string;
  headline: React.ReactNode;
  lede: string;
  members: TeamMember[];
  onOpenBio: (slug: string) => void;
};

function GroupBlock({ eyebrow, headline, lede, members, onOpenBio }: GroupBlockProps) {
  return (
    <section className="bg-cream border-t border-deep-teal/[0.18] py-20 md:py-[100px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.28em]">
          {eyebrow}
        </p>
        <h2 className="mt-4 font-display font-bold text-deep-teal leading-[1.05] tracking-[-0.025em] text-[32px] md:text-[48px] max-w-[24ch]">
          {headline}
        </h2>
        <p className="mt-5 font-sans text-steel-teal leading-[1.6] text-[14px] md:text-[15px] max-w-[56ch]">
          {lede}
        </p>

        <div className="mt-14">
          {members.map((m, i) => (
            <InViewToggle
              key={m.type === "confirmed" ? m.slug : m.slug}
              className="reveal-up"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {m.type === "confirmed" ? (
                <PersonRow member={m} onOpen={onOpenBio} />
              ) : (
                <AspirationalSlotRow slot={m} />
              )}
            </InViewToggle>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Page ---------------------------------- */

export default function EquipoPage() {
  const [openMemberSlug, setOpenMemberSlug] = useState<string | null>(null);

  const openBio = (slug: string) => setOpenMemberSlug(slug);
  const closeBio = () => setOpenMemberSlug(null);

  const openMember = openMemberSlug
    ? ((TEAM.find(
        (m) => m.type === "confirmed" && m.slug === openMemberSlug
      ) as ConfirmedMember | undefined) ?? null)
    : null;

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      <main>
        {/* PAGE HEADER */}
        <section className="bg-cream pt-20 pb-16 md:pt-[120px] md:pb-24">
          <div className="mx-auto max-w-[1080px] px-6 md:px-12">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em]">
              Equipo clínico ALGOS
            </p>

            <AnimatedHeadline
              as="h1"
              className="mt-6 font-display font-bold text-deep-teal leading-[1.02] tracking-[-0.028em] text-[44px] md:text-[88px] max-w-[18ch]"
              chunks={[
                { text: "Tres dimensiones. " },
                { text: "Un solo modelo", italic: true, color: "#c69636", staggerMs: 120 },
                { text: " de cuidado." },
              ]}
            />

            <p className="mt-8 font-sans text-steel-teal leading-[1.65] text-[16px] md:text-[18px] max-w-[56ch]">
              El dolor crónico no es solo físico. ALGOS integra especialidades
              intervencionistas, asesoría médica internacional y soporte
              clínico bajo el modelo biopsicosocial, con equipo de formación
              clínica internacional.
            </p>

            <p className="mt-6 font-mono text-steel-teal text-[11px] tracking-[0.04em]">
              Maracaibo
              <span className="text-algos-gold mx-1.5">·</span>
              Alemania
            </p>
          </div>
        </section>

        {/* GROUP BLOCKS */}
        <GroupBlock
          eyebrow="01 · Medicina intervencionista del dolor"
          headline={
            <>
              Procedimientos{" "}
              <span className="font-normal text-algos-gold">
                guiados por imagen.
              </span>
            </>
          }
          lede="El núcleo procedimental de ALGOS — bloqueos, infiltraciones y técnicas mínimamente invasivas guiadas por fluoroscopia y ultrasonido."
          members={getMembersByGroup("01")}
          onOpenBio={openBio}
        />

        <GroupBlock
          eyebrow="02 · Asesoría médica internacional"
          headline={
            <>
              Práctica clínica{" "}
              <span className="font-normal text-algos-gold">
                entre continentes.
              </span>
            </>
          }
          lede="Asesoría médica con formación europea. Especialistas con trayectoria clínica internacional que aportan al manejo de casos complejos."
          members={getMembersByGroup("02")}
          onOpenBio={openBio}
        />

        <GroupBlock
          eyebrow="03 · Soporte clínico integral"
          headline={
            <span className="font-normal text-algos-gold">
              El dolor crónico no es solo físico.
            </span>
          }
          lede="Nutrición, salud mental y rehabilitación física como parte del programa — no como referido externo."
          members={getMembersByGroup("03")}
          onOpenBio={openBio}
        />

        {/* CLOSING SECTION */}
        <section className="bg-deep-teal py-20 md:py-[120px]">
          <div className="mx-auto max-w-[760px] px-6 md:px-12 text-center">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.28em]">
              El modelo
            </p>

            <h2 className="mt-6 font-display font-bold text-cream leading-[1.05] text-[36px] md:text-[56px] max-w-[18ch] mx-auto">
              Cada caso, revisado{" "}
              <span className="font-normal text-algos-gold">
                en conjunto.
              </span>
            </h2>

            <p className="mt-7 font-sans text-cream/80 leading-[1.65] text-[16px] md:text-[17px] max-w-[56ch] mx-auto">
              Los casos complejos se discuten en sesiones clínicas conjuntas
              del equipo. La decisión final siempre corresponde al
              especialista tratante en Venezuela.
            </p>

            <div className="mt-12 flex flex-col items-center gap-4">
              <a
                href="/#solicitar"
                className="group inline-flex items-center gap-3 bg-[#3d8b96] hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[14px] tracking-[0.2em] rounded-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.35)] px-7 py-[18px] md:px-[42px] md:py-[22px]"
              >
                <span>Solicitar valoración</span>
                <span
                  aria-hidden
                  className="inline-block overflow-hidden transition-[width] duration-300 ease-out w-5 group-hover:w-9"
                >
                  <span className="block transition-transform duration-300 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </a>

              <a
                href="/"
                className="font-sans uppercase text-[12px] tracking-[0.22em] text-cream/80 hover:text-algos-gold border-b border-cream/30 hover:border-algos-gold pb-1 transition-colors"
              >
                ← Volver al inicio
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />

      <BioModal isOpen={openMember !== null} onClose={closeBio} member={openMember} />
    </div>
  );
}
