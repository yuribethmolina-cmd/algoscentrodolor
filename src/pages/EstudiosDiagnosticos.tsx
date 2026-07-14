import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import SEOHead from "@/components/SEOHead";
import StudyBento, { type StudyItem } from "@/components/StudyBento";
import { DIAGNOSTICS, DIAGNOSTIC_GROUPS } from "@/data/diagnostics";
import {
  Brain,
  Bone,
  Baby,
  HeartPulse,
  Activity,
  Waves,
  Zap,
  TestTube,
  type LucideIcon,
} from "lucide-react";

// Reuse the cinematic imagery from Contacto so the pages feel like one story.
import uduzScannerPic from "@/assets/uduz-scanner.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import uduzScannerLqip from "@/assets/uduz-scanner.jpg?w=32&blur=6&format=webp&url";
import examsXrayPic from "@/assets/exams-xray.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import examsXrayLqip from "@/assets/exams-xray.jpg?w=32&blur=6&format=webp&url";
import examsUltrasoundPic from "@/assets/exams-ultrasound.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import examsUltrasoundLqip from "@/assets/exams-ultrasound.jpg?w=32&blur=6&format=webp&url";

const GROUP_ORDER: Array<keyof typeof DIAGNOSTIC_GROUPS> = [
  "imagen",
  "cardiologia",
  "neurofisiologia",
  "laboratorio",
];

const ICON_BY_SLUG: Record<string, LucideIcon> = {
  tomografia: Brain,
  "rayos-x": Bone,
  "mamografia-3d": Baby,
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
  "mamografia-3d": { pic: examsUltrasoundPic, lqip: examsUltrasoundLqip },
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
        title="Estudios diagnósticos en Maracaibo, Tomografía, EMG, Holter | ALGOS"
        description="Estudios diagnósticos en Maracaibo: tomografía, rayos X, mamografía 3D, electrocardiograma, Holter, electroencefalograma (EEG), electromiografía (EMG) y laboratorio."
        canonical="https://algoscentrodolor.com/estudios-diagnosticos"
      />
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
              Tomografía, EMG, Holter y más, en Maracaibo.
            </h1>
            <p className="font-sans text-[#f5f0e8]/80 text-base md:text-lg leading-relaxed max-w-2xl">
              Imagen, cardiología, neurofisiología y laboratorio. En sede o a
              domicilio, con y sin consulta previa.
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
              return (
                <StudyBento
                  key={groupKey}
                  eyebrow={group.label}
                  title={group.description}
                  items={items}
                />
              );
            })}

            {/* UDUZ WhatsApp CTA */}
            <div className="text-center pt-4">
              <p className="text-[#8DC63F] font-medium text-xs tracking-[0.28em] uppercase mb-4">
                COORDINAR ESTUDIO
              </p>
              <h3 className="font-display font-semibold text-[#f5f0e8] text-2xl md:text-3xl leading-tight max-w-xl mx-auto mb-6">
                Escríbanos a UDUZ referido desde ALGOS.
              </h3>
              <a
                href={`https://wa.me/584126044124?text=${encodeURIComponent("Hola, me refieren desde ALGOS Centro de Dolor. Quisiera coordinar un estudio diagnóstico.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#1B6B78] hover:bg-[#8DC63F] hover:text-[#1B6B78] text-[#f5f0e8] font-sans font-bold uppercase text-[13px] tracking-[0.18em] px-8 py-4 transition-colors"
              >
                <Activity className="w-4 h-4" strokeWidth={2} />
                Escribir por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
