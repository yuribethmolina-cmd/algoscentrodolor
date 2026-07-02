import { useEffect, useRef } from "react";
import type { ConfirmedMember } from "@/data/team";

export type BioModalProps = {
  isOpen: boolean;
  onClose: () => void;
  member: ConfirmedMember | null;
};

const BIO_FIELDS: Array<{ key: keyof ConfirmedMember["bio"]; label: string }> = [
  { key: "formacion", label: "Formación" },
  { key: "experiencia", label: "Experiencia" },
  { key: "investigacion", label: "Investigación" },
  { key: "idiomas", label: "Idiomas" },
];

export function BioModal({ isOpen, onClose, member }: BioModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll + focus close button + Esc handler
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Initial focus
    closeButtonRef.current?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !member) return null;

  const firstName = member.givenName.split(" ")[0];

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-50 bg-deep-teal/75 backdrop-blur-[4px]"
      />

      {/* Modal container */}
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bio-modal-name"
        className="fixed z-[51] bg-cream overflow-y-auto shadow-[0_24px_64px_rgba(0,0,0,0.25)]
 inset-0 max-h-screen p-8 rounded-none
 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
 md:w-[720px] md:max-w-[calc(100vw-48px)] md:max-h-[85vh] md:p-16 md:rounded-lg"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Cerrar biografía"
          className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center bg-transparent border-none cursor-pointer text-deep-teal hover:text-algos-gold transition-all duration-300 hover:rotate-90 focus-visible:outline-2 focus-visible:outline-algos-gold focus-visible:outline-offset-4"
          style={{ fontFamily: "'Sora', serif", fontSize: 32, lineHeight: 1 }}
        >
          ×
        </button>

        {/* Photo / fallback */}
        <div className="mx-auto mb-8 w-[200px] h-[200px] rounded-full overflow-hidden flex items-center justify-center bg-[#ECE4D4]">
          {member.photoUrl ? (
            <img
              src={member.photoUrl}
              alt={`${member.givenName} ${member.familyName}`}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <span
              className="font-display font-normal text-algos-gold leading-none"
              style={{ fontSize: 120 }}
            >
              {member.index}
            </span>
          )}
        </div>

        {/* Location eyebrow */}
        <p className="text-center font-sans font-bold uppercase text-steel-teal text-[11px] tracking-[0.28em]">
          {member.city.toUpperCase()} · {member.country.toUpperCase()}
        </p>

        {/* Name */}
        <h2
          id="bio-modal-name"
          className="mt-6 text-center font-display text-deep-teal leading-[1.05] tracking-[-0.025em] text-[40px] md:text-[56px]"
        >
          <span className="font-normal">{member.givenName}</span>{" "}
          <span className="font-bold">{member.familyName}</span>
        </h2>

        {/* Role */}
        <p className="mt-4 text-center font-sans font-bold uppercase text-algos-gold text-[13px] tracking-[0.22em]">
          {member.role}
        </p>

        {/* Specialty */}
        <p className="mt-3 mx-auto text-center font-sans text-steel-teal text-[17px] leading-[1.55] max-w-[56ch]">
          {member.specialty}
        </p>

        {/* Divider */}
        <div className="mt-10 h-px w-full bg-deep-teal/[0.18]" />

        {/* Bio sections */}
        <div className="mt-10 text-left">
          {BIO_FIELDS.map(({ key, label }, i) => {
            const value = member.bio[key];
            if (!value) return null;
            return (
              <div key={key} className={i === 0 ? "" : "mt-7"}>
                <p className="font-sans font-bold uppercase text-steel-teal text-[10px] tracking-[0.24em]">
                  {label}
                </p>
                <p className="mt-2 font-sans text-deep-teal text-[15px] leading-[1.6]">
                  {value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Coords */}
        {member.coords && (
          <p className="mt-8 text-center font-mono text-steel-teal/60 text-[10px] tracking-[0.04em]">
            {member.coords}
          </p>
        )}

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <a
            href={`/#solicitar?especialista=${member.slug}`}
            className="inline-flex items-center gap-3 bg-[#3d8b96] hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase text-[13px] tracking-[0.2em] rounded-none px-9 py-[18px] transition-all duration-200 hover:-translate-y-0.5"
          >
            Solicitar consulta con {firstName} {member.familyName} →
          </a>
        </div>
      </div>
    </>
  );
}

export default BioModal;
