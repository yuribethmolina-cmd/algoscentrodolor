import { Link } from "react-router-dom";
import { Activity, Bone, Layers, CircleDot, Zap, type LucideIcon } from "lucide-react";
import type { Condition } from "@/data/treatments";

const ICON_MAP: Record<string, LucideIcon> = {
  "dolor-lumbar": Activity,
  "dolor-cervical": Bone,
  "dolor-facetario": Layers,
  "dolor-articular": CircleDot,
  "lesion-deportiva": Zap,
};

type Props = {
  condition: Condition;
  view: "paciente" | "clinica";
};

export default function ConditionCard({ condition, view }: Props) {
  const Icon = ICON_MAP[condition.slug] ?? Activity;

  return (
    <Link to={`/tratamientos/${condition.slug}`} className="group block">
      <article className="bg-white rounded-2xl border border-[#1a4a55]/10 p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#3d8b96]/30 h-full">
        <div className="w-8 h-8 mb-6 text-[#3d8b96]">
          <Icon className="w-8 h-8" strokeWidth={1.75} />
        </div>
        <h3 className="font-display font-semibold text-[#1a4a55] text-2xl md:text-3xl mb-3">
          {condition.name}
        </h3>
        <p className="font-sans text-[#1a4a55]/80 text-base leading-relaxed mb-6">
          {view === "paciente" ? condition.patientDescription : condition.clinicalDescription}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {condition.procedures.map((p) => (
            <span
              key={p.slug}
              className="bg-[#f5f0e8] border border-[#3d8b96]/30 rounded-full px-3 py-1 text-xs font-medium text-[#1a4a55]"
            >
              {p.label}
            </span>
          ))}
        </div>
        <div className="flex items-center text-[#c69636] font-semibold text-sm gap-2 group-hover:gap-3 transition-all">
          <span>Saber más</span>
          <span aria-hidden>→</span>
        </div>
      </article>
    </Link>
  );
}
