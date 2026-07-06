import { Link } from "react-router-dom";
import type { Condition } from "@/data/treatments";
import { getConditionImage } from "@/data/conditionImages";

const CONDITION_ICONS: Record<string, React.ReactNode> = {
  "dolor-lumbar-ciatica": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="7" y="2" width="10" height="3.5" rx="0.75" />
      <rect x="6" y="7.5" width="12" height="3.5" rx="0.75" />
      <rect x="5" y="13" width="14" height="3.5" rx="0.75" />
      <path d="M19 14.5Q22 17 20 22" strokeWidth="1" />
      <circle cx="19.5" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  "dolor-cervical": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="8.5" y="3" width="7" height="2.5" rx="0.5" />
      <rect x="8" y="7" width="8" height="2.5" rx="0.5" />
      <rect x="7.5" y="11" width="9" height="2.5" rx="0.5" />
      <rect x="7" y="15" width="10" height="2.5" rx="0.5" />
      <rect x="6.5" y="19" width="11" height="2" rx="0.5" />
      <path d="M16.5 12.25Q20 11.5 21.5 15" strokeWidth="1" />
      <circle cx="17" cy="12.25" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  ),
  "dolor-facetario": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="4" y="4" width="16" height="4" rx="0.75" />
      <rect x="4" y="16" width="16" height="4" rx="0.75" />
      <line x1="8" y1="8" x2="8" y2="16" />
      <line x1="16" y1="8" x2="16" y2="16" />
      <circle cx="16" cy="12" r="2.5" />
      <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  "neuropatia": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="12" y1="2" x2="12" y2="10" />
      <path d="M12 10L7 16" />
      <path d="M12 10L17 16" />
      <path d="M7 16L5 21M7 16L9 21" />
      <path d="M17 16L15 21M17 16L19 21" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  "dolor-articular": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M7 2h10v6q0 3-5 3t-5-3V2z" />
      <path d="M7 22h10v-6q0-3-5-3t-5 3v6z" />
      <circle cx="17" cy="11" r="2.5" strokeWidth="1.25" />
      <circle cx="17" cy="11" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
};

type Props = {
  condition: Condition;
  view: "paciente" | "clinica";
  variant?: "standard" | "feature" | "tall";
};

export default function ConditionCard({ condition, view, variant = "standard" }: Props) {
  const icon = CONDITION_ICONS[condition.slug];
  const image = getConditionImage(condition.slug);
  const isFeature = variant === "feature";
  const isTall = variant === "tall";

  const imageAspect = isFeature
    ? "aspect-[16/9] md:aspect-[21/9]"
    : isTall
    ? "aspect-[4/3] md:aspect-[4/5]"
    : "aspect-[16/9]";

  return (
    <Link to={`/tratamientos/${condition.slug}`} className="group block h-full">
      <article className="bg-white rounded-none border border-[#1a4a55]/10 overflow-hidden transition-[transform,box-shadow,border-color] duration-300 md:hover:-translate-y-1 md:hover:shadow-lg md:hover:border-[#3d8b96]/30 active:scale-[0.98] h-full flex flex-col">
        <div className={`relative w-full ${imageAspect} overflow-hidden bg-[#1a4a55]/5`}>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04]"
          />
          {isFeature && (
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#1a4a55]/40 via-transparent to-transparent" />
          )}
        </div>
        <div className={`${isFeature ? "p-8 md:p-12" : "p-7 md:p-9"} flex-1 flex flex-col`}>
          {icon && (
            <div className="w-11 h-11 bg-[#3d8b96]/10 flex items-center justify-center text-[#3d8b96] mb-6">
              {icon}
            </div>
          )}
          <h3 className={`font-display font-semibold text-[#1a4a55] mb-3 ${isFeature ? "text-3xl md:text-4xl" : "text-2xl md:text-[26px]"}`}>
            {condition.name}
          </h3>
          <p className="font-sans text-[#1a4a55]/80 text-base leading-relaxed mb-6">
            {view === "paciente" ? condition.patientDescription : condition.clinicalDescription}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {condition.procedures.map((p) => (
              <span
                key={p.slug}
                className="bg-[#f5f0e8] border border-[#3d8b96]/30 rounded-none px-3 py-1 text-xs font-medium text-[#1a4a55]"
              >
                {p.label}
              </span>
            ))}
          </div>
          <div className="flex items-center text-[#c69636] font-semibold text-sm gap-2 group-hover:gap-3 transition-all mt-auto">
            <span>Saber más</span>
            <span aria-hidden>→</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
