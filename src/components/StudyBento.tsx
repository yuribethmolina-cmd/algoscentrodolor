import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import OptimizedPicture from "@/components/OptimizedPicture";

type Picture = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

export type StudyItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  short: string;
  description: string;
  duration?: string;
  availability: string;
  details: { label: string; value: string }[];
  image?: { pic: Picture; lqip?: string };
};

interface StudyBentoProps {
  eyebrow: string;
  title: string;
  items: StudyItem[];
}

/**
 * UDUZ-inspired cinematic tabs: dark teal shell, verde-amarillo accents,
 * bento tabs across the top, and a two-column detail below (image or
 * gradient icon tile + clinical info).
 */
export default function StudyBento({ eyebrow, title, items }: StudyBentoProps) {
  const [active, setActive] = useState(items[0]?.id);
  const current = items.find((s) => s.id === active) ?? items[0];
  if (!current) return null;
  const Icon = current.icon;

  return (
    <div>
      <div className="mb-8 md:mb-10">
        <p className="text-[#8DC63F] font-medium text-xs tracking-[0.28em] uppercase mb-4">
          {eyebrow}
        </p>
        <h2 className="font-display font-bold text-[#f5f0e8] text-2xl md:text-4xl leading-[1.05] tracking-tight max-w-2xl">
          {title}
        </h2>
      </div>

      <div className="border border-[#E0F4F7]/10 bg-[#0F5964]">
        {/* Tab bar */}
        <div className="flex overflow-x-auto border-b border-[#E0F4F7]/10 no-scrollbar">
          {items.map((s) => {
            const TabIcon = s.icon;
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-5 md:px-7 py-4 md:py-5 font-ui text-[11px] md:text-xs tracking-[0.18em] uppercase transition-colors border-r border-[#E0F4F7]/10 last:border-r-0 ${
                  isActive
                    ? "bg-[#E0F4F7]/[0.06] text-[#8DC63F]"
                    : "text-[#f5f0e8]/50 hover:text-[#f5f0e8]/80 hover:bg-[#E0F4F7]/[0.03]"
                }`}
              >
                <TabIcon className="w-4 h-4" strokeWidth={1.5} />
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          {/* Image / icon panel */}
          <div className="md:col-span-2 relative overflow-hidden min-h-[320px] md:min-h-[380px] bg-black">
            {current.image ? (
              <OptimizedPicture
                picture={current.image.pic}
                placeholder={current.image.lqip}
                alt={current.label}
                className="absolute inset-0 w-full h-full"
                imgClassName="absolute inset-0 w-full h-full object-cover opacity-75"
                sizes="(min-width: 768px) 40vw, 100vw"
              />
            ) : (
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 40%, rgba(141,198,63,0.22) 0%, transparent 55%), linear-gradient(135deg, #0F5964 0%, #0a3d47 100%)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center pb-24 md:pb-28">
                  <Icon
                    className="w-20 h-20 md:w-32 md:h-32 text-[#8DC63F]/40"
                    strokeWidth={1}
                  />
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-[#134F5C]/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-[#8DC63F]" strokeWidth={1.5} />
                <span className="font-ui text-[10px] tracking-[0.28em] text-[#8DC63F] uppercase font-semibold">
                  {current.label}
                </span>
              </div>
              <p className="font-ui text-[10px] tracking-[0.22em] text-[#f5f0e8] uppercase font-medium">
                {current.duration ? `Duración estimada: ${current.duration}` : current.short}
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-3 p-6 md:p-10 flex flex-col gap-8">
            <p className="font-sans text-[#f5f0e8] text-[15px] md:text-base leading-relaxed font-medium">
              {current.description}
            </p>

            <div className="border-t border-[#E0F4F7]/20 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {current.details.map((row) => (
                <div key={row.label}>
                  <p className="font-ui text-[10px] tracking-[0.28em] text-[#8DC63F] uppercase mb-2 font-semibold">
                    {row.label}
                  </p>
                  <p className="font-sans text-[#f5f0e8] text-sm leading-relaxed font-medium">
                    {row.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E0F4F7]/20 pt-6 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span className="font-ui text-[11px] tracking-[0.22em] text-[#f5f0e8] uppercase font-semibold">
                {current.availability}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
