import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import StudyBento, { type StudyItem } from "@/components/StudyBento";
import { DIAGNOSTICS, DIAGNOSTIC_GROUPS } from "@/data/diagnostics";
import {
  Brain,
  Bone,
  HeartPulse,
  Activity,
  Waves,
  Zap,
  TestTube,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import uduzScannerPic from "@/assets/uduz-scanner.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import uduzScannerLqip from "@/assets/uduz-scanner.jpg?w=32&blur=6&format=webp&url";
import examsXrayPic from "@/assets/exams-xray.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import examsXrayLqip from "@/assets/exams-xray.jpg?w=32&blur=6&format=webp&url";

const GROUP_ORDER: Array<keyof typeof DIAGNOSTIC_GROUPS> = [
  "neurofisiologia",
  "imagen",
  "cardiologia",
  "laboratorio",
];

const ICON_BY_SLUG: Record<string, LucideIcon> = {
  tomografia: Brain,
  "rayos-x": Bone,
  electrocardiograma: HeartPulse,
  holter: Activity,
  eeg: Waves,
  emg: Zap,
  laboratorio: TestTube,
};

const IMAGE_BY_SLUG: Record<
  string,
  { pic: typeof uduzScannerPic; lqip: string }
> = {
  tomografia: { pic: uduzScannerPic, lqip: uduzScannerLqip },
  "rayos-x": { pic: examsXrayPic, lqip: examsXrayLqip },
};

function toStudyItem(d: (typeof DIAGNOSTICS)[number]): StudyItem {
  return {
    id: d.slug,
    label: d.name,
    icon: ICON_BY_SLUG[d.slug] ?? Activity,
    short: d.short,
    description: d.quees,
    availability: d.disponibilidad,
    details: [
      { label: "Para qué sirve", value: d.paraque },
      { label: "Cómo se hace", value: d.comose },
    ],
    image: IMAGE_BY_SLUG[d.slug],
  };
}

export default function EstudiosDiagnosticos() {
  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="Electromiografía, Electroencefalograma y estudios diagnósticos en Maracaibo | ALGOS"
        description="Estudios diagnósticos en Maracaibo: electromiografía (EMG) y electroencefalograma (EEG) en ALGOS, y tomografía, rayos X, electrocardiograma, Holter y laboratorio vía UDUZ."
        canonical="https://algoscentrodolor.com/estudios-diagnosticos"
      >
        <meta name="keywords" content="electromiografía Maracaibo, EMG Maracaibo, electroencefalograma Maracaibo, EEG Maracaibo, tomografía Maracaibo, Holter Maracaibo, electrocardiograma Maracaibo, estudios diagnósticos Zulia, neurofisiología Maracaibo, laboratorio Maracaibo" />
      </SEOHead>
      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="bg-[#134F5C] pt-24 md:pt-32 pb-16 md:pb-24 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-[0.08] blur-3xl"
            style={{
              background: "radial-gradient(circle, #8DC63F 0%, transparent 70%)",
            }}
          />
          <div className="container mx-auto max-w-6xl px-6 md:px-12 relative">
            <p className="text-[#8DC63F] font-medium text-xs tracking-[0.28em] uppercase mb-5">
              ESTUDIOS DIAGNÓSTICOS
            </p>
            <h1 className="font-display font-bold text-[#f5f0e8] text-4xl md:text-6xl leading-[1.05] tracking-tight max-w-3xl mb-6">
              Electromiografía, tomografía, Holter y más en Maracaibo.
            </h1>
            <p className="font-sans text-[#f5f0e8]/80 text-base md:text-lg leading-relaxed max-w-2xl">
              EMG y EEG se realizan aquí en ALGOS. Imagen, cardiología y
              laboratorio los coordinamos directamente con UDUZ.
            </p>
          </div>
        </section>

        {/* Groups, cinematic UDUZ-style bento tabs */}
        <section className="bg-[#134F5C] pb-20 md:pb-28">
          <div className="container mx-auto max-w-6xl px-6 md:px-12 flex flex-col gap-16 md:gap-24">
            {GROUP_ORDER.map((groupKey) => {
              const group = DIAGNOSTIC_GROUPS[groupKey];
              const items = DIAGNOSTICS.filter((d) => d.grupo === groupKey).map(
                toStudyItem,
              );
              if (items.length === 0) return null;
              const isAlgos = group.provider === "algos";
              return (
                <div key={groupKey}>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin
                      className="w-3.5 h-3.5"
                      strokeWidth={2.5}
                      style={{ color: isAlgos ? "#c69636" : "#8DC63F" }}
                    />
                    <span
                      className="text-xs font-bold uppercase tracking-[0.22em]"
                      style={{ color: isAlgos ? "#c69636" : "#8DC63F" }}
                    >
                      {isAlgos ? "En ALGOS" : "Vía UDUZ"}
                    </span>
                  </div>
                  <StudyBento
                    eyebrow={group.label}
                    title={group.description}
                    items={items}
                  />
                </div>
              );
            })}

            {/* CTA doble: ALGOS (EMG/EEG) + UDUZ (imagen, cardio, lab) */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              {/* CTA ALGOS */}
              <div className="bg-[#1B6B78] p-8 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#c69636]" strokeWidth={2.5} />
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#c69636]">
                    En ALGOS
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[#f5f0e8] text-xl leading-snug">
                  EMG y EEG se realizan aquí, con nuestra Dra. Carolina.
                </h3>
                <a
                  href={`https://wa.me/584146807886?text=${encodeURIComponent("Hola ALGOS, me interesa agendar un estudio EMG o EEG con la Dra. Carolina Rodríguez.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 self-start bg-[#c69636] hover:bg-[#f5f0e8] hover:text-[#1a4a55] text-[#1a4a55] font-sans font-bold uppercase text-[12px] tracking-[0.18em] px-6 py-3.5 transition-colors"
                >
                  <Activity className="w-3.5 h-3.5" strokeWidth={2} />
                  Agendar en ALGOS
                </a>
              </div>

              {/* CTA UDUZ */}
              <div className="bg-[#1B6B78] p-8 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#8DC63F]" strokeWidth={2.5} />
                  <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8DC63F]">
                    Vía UDUZ
                  </span>
                </div>
                <h3 className="font-display font-semibold text-[#f5f0e8] text-xl leading-snug">
                  Imagen, cardiología y laboratorio los coordinamos con UDUZ.
                </h3>
                <a
                  href={`https://wa.me/584146807886?text=${encodeURIComponent("Hola, me refieren desde ALGOS Centro de Dolor. Quisiera coordinar un estudio diagnóstico con UDUZ.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 self-start bg-[#8DC63F] hover:bg-[#f5f0e8] hover:text-[#1a4a55] text-[#1a4a55] font-sans font-bold uppercase text-[12px] tracking-[0.18em] px-6 py-3.5 transition-colors"
                >
                  <Activity className="w-3.5 h-3.5" strokeWidth={2} />
                  Coordinar con UDUZ
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
