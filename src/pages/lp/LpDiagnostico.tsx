import SEOHead from "@/components/SEOHead";
import { OptimizedPicture } from "@/components/OptimizedPicture";
import LpHeader from "./LpHeader";
import algosLogoDark from "@/assets/algos-logo-v2.png";
import {
  Brain, Bone, Baby, HeartPulse, Activity, Waves, Zap, TestTube, ExternalLink, Instagram,
} from "lucide-react";

import uduzScannerPic from "@/assets/uduz-scanner.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import uduzScannerLqip from "@/assets/uduz-scanner.jpg?w=32&blur=6&format=webp&url";
import ecografiaRealAsset from "@/assets/ecografia-real.png.asset.json";
import experienceTechPic from "@/assets/experience-tech.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import experienceTechLqip from "@/assets/experience-tech.jpg?w=32&blur=6&format=webp&url";

const WA_UDUZ = `https://wa.me/584146807886?text=${encodeURIComponent(
  "Hola, me contacto desde algoscentrodolor.com. Quisiera coordinar un estudio diagnóstico."
)}`;
const WA_ALGOS = `https://wa.me/584146807886?text=${encodeURIComponent(
  "Hola, me contacto desde algoscentrodolor.com. Quisiera agendar un electromiograma (EMG) o electrocardiograma (ECG)."
)}`;

const UDUZ_STUDIES = [
  { slug: "tomografia", name: "Tomografía computarizada", short: "Cortes detallados del cuerpo en alta resolución.", icon: Brain },
  { slug: "rayos-x", name: "Rayos X", short: "Radiografía en sede o a domicilio.", icon: Bone },
  { slug: "mamografia-3d", name: "Mamografía 3D", short: "Estudio mamográfico de última generación.", icon: Baby },
  { slug: "holter", name: "Holter", short: "Monitoreo cardíaco continuo de 24 horas.", icon: Activity },
  { slug: "eeg", name: "Electroencefalograma (EEG)", short: "Registro de la actividad eléctrica cerebral.", icon: Waves },
  { slug: "laboratorio", name: "Laboratorio clínico", short: "Análisis de sangre, orina y más. En sede o a domicilio.", icon: TestTube },
];

const ALGOS_STUDIES = [
  { slug: "emg", name: "Electromiografía (EMG)", short: "Mide cómo viajan las señales por nervios y músculos. Detecta compresión o daño nervioso.", icon: Zap },
  { slug: "ecg", name: "Electrocardiograma (ECG)", short: "Registro eléctrico del corazón en reposo. Indoloro y rápido.", icon: HeartPulse },
];

export default function LpDiagnostico() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <SEOHead
        title="Estudios diagnósticos en Maracaibo | Tomografía, EMG, Holter, Laboratorio"
        description="Tomografía, rayos X, mamografía 3D, Holter, EEG, EMG, ECG y laboratorio en Maracaibo. Por alianza ALGOS + UDUZ. Sin consulta previa para la mayoría de estudios."
        canonical="https://algoscentrodolor.com/lp/diagnostico"
      >
        <meta name="robots" content="noindex, nofollow" />
      </SEOHead>

      <LpHeader waHref={WA_UDUZ} waLabel="Coordinar estudio" />

      <main className="pt-24">
        {/* Hero — split layout */}
        <section className="bg-[#f5f0e8]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

            {/* Text */}
            <div className="flex flex-col justify-center px-6 md:px-12 py-16 md:py-24">
              <p className="text-[#3d8b96] font-medium text-xs tracking-[0.28em] uppercase mb-5">
                ESTUDIOS DIAGNÓSTICOS · MARACAIBO
              </p>
              <h1 className="font-display font-bold text-[#1a4a55] text-4xl md:text-5xl leading-[1.08] tracking-tight mb-6">
                Tomografía, Rayos X 24/7<br />
                Laboratorio Clinico y más ,&nbsp;en Maracaibo.
              </h1>
              <p className="font-sans text-[#1a4a55]/70 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                A través de nuestra alianza con UDUZ ofrecemos imagen, cardiología y laboratorio. La mayoría de estudios no requieren consulta previa.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={WA_UDUZ}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap bg-[#3d8b96] hover:bg-[#1a4a55] text-white font-sans font-bold uppercase text-[13px] tracking-[0.16em] px-8 py-4 transition-colors"
                >
                  Coordinar en UDUZ
                </a>
                <a
                  href={WA_ALGOS}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center whitespace-nowrap bg-[#c69636] hover:bg-[#1a4a55] text-white font-sans font-bold uppercase text-[13px] tracking-[0.16em] px-8 py-4 transition-colors"
                >
                  Agendar EMG / ECG
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative min-h-[300px] lg:min-h-0 overflow-hidden">
              <OptimizedPicture
                picture={uduzScannerPic}
                placeholder={uduzScannerLqip}
                alt="Escáner diagnóstico UDUZ Maracaibo"
                className="absolute inset-0 w-full h-full"
                imgClassName="w-full h-full object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                eager
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5f0e8]/60 via-transparent to-transparent lg:from-transparent" />
            </div>
          </div>
        </section>

        {/* Quiénes somos — logos grandes + links prominentes */}
        <section className="bg-white px-6 py-12 md:py-16 border-b border-[#1a4a55]/8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ALGOS — entidad principal */}
            <div className="flex flex-col gap-5 border-l-[3px] border-[#1a4a55] pl-6 bg-[#1a4a55]/[0.03] py-5 pr-5">
              <p className="font-sans text-[#1a4a55] text-[10px] font-bold uppercase tracking-[0.22em]">
                Centro sede
              </p>
              <img src={algosLogoDark} alt="ALGOS Centro de Dolor" className="h-20 w-auto object-contain object-left" />
              <p className="font-sans text-[#1a4a55]/70 text-sm leading-relaxed">
                Centro de Dolor Intervencionista. Primer centro especializado en dolor del estado Zulia, con procedimientos guiados por imagen.
              </p>
              <a
                href="https://algoscentrodolor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 bg-[#1a4a55] hover:bg-[#3d8b96] text-white font-sans font-semibold text-[12px] tracking-[0.12em] uppercase px-5 py-3 transition-colors w-fit"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Ver sitio web completo
              </a>
            </div>

            {/* UDUZ — partner diagnóstico */}
            <div className="flex flex-col gap-5 border-l border-[#3d8b96]/30 pl-6 py-5">
              <p className="font-sans text-[#3d8b96] text-[10px] font-bold uppercase tracking-[0.22em]">
                Aliado diagnóstico
              </p>
              <img src="/logos/uduz-logo.svg" alt="UDUZ" className="h-12 w-auto object-contain object-left" />
              <p className="font-sans text-[#1a4a55]/70 text-sm leading-relaxed">
                Centro de diagnóstico por imagen en Maracaibo. Aliado estratégico de ALGOS para estudios de imagen, cardiología y laboratorio.
              </p>
              <a
                href="https://www.instagram.com/uduz_maracaibo"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 border border-[#3d8b96] text-[#3d8b96] hover:bg-[#3d8b96] hover:text-white font-sans font-semibold text-[12px] tracking-[0.12em] uppercase px-5 py-3 transition-colors w-fit"
              >
                <Instagram className="w-3.5 h-3.5" />
                @uduz_maracaibo en Instagram
              </a>
            </div>
          </div>
        </section>

        {/* Imagen intermedia — equipo técnico */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <OptimizedPicture
            picture={experienceTechPic}
            placeholder={experienceTechLqip}
            alt="Equipos diagnósticos ALGOS"
            className="absolute inset-0 w-full h-full"
            imgClassName="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#1a4a55]/55" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-display font-bold text-[#f5f0e8] text-2xl md:text-3xl tracking-tight text-center px-6">
              Diagnóstico de <span className="italic text-[#c69636]">precisión</span> en Maracaibo
            </p>
          </div>
        </div>

        {/* Estudios */}
        <section className="bg-[#f5f0e8] px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto space-y-16">

            {/* UDUZ */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-1 h-6 bg-[#3d8b96] block rounded-full" />
                <p className="font-sans font-semibold text-[#1a4a55] text-xs uppercase tracking-widest">
                  Disponibles en UDUZ
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {UDUZ_STUDIES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.slug} className="border border-[#1a4a55]/10 bg-white p-5">
                      <Icon className="w-5 h-5 text-[#3d8b96] mb-3" strokeWidth={1.5} />
                      <p className="font-sans font-semibold text-[#1a4a55] text-sm mb-1">{s.name}</p>
                      <p className="font-sans text-[#1a4a55]/55 text-xs leading-relaxed">{s.short}</p>
                    </div>
                  );
                })}
              </div>
              <a
                href={WA_UDUZ}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#3d8b96] hover:bg-[#1a4a55] text-white font-sans font-bold uppercase text-[12px] tracking-[0.16em] px-6 py-3 transition-colors"
              >
                Escribir a UDUZ por WhatsApp
              </a>
            </div>

            {/* Imagen ecografía */}
            <div className="relative h-52 md:h-64 overflow-hidden rounded-none">
              <OptimizedPicture
                picture={examsUltrasoundPic}
                placeholder={examsUltrasoundLqip}
                alt="Estudio de ecografía UDUZ Maracaibo"
                className="absolute inset-0 w-full h-full"
                imgClassName="w-full h-full object-cover object-[15%_50%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a4a55]/40 via-transparent to-transparent" />
            </div>

            {/* ALGOS */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-1 h-6 bg-[#c69636] block rounded-full" />
                <p className="font-sans font-semibold text-[#1a4a55] text-xs uppercase tracking-widest">
                  Disponibles en ALGOS
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {ALGOS_STUDIES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.slug} className="border border-[#c69636]/25 bg-white p-5">
                      <Icon className="w-5 h-5 text-[#c69636] mb-3" strokeWidth={1.5} />
                      <p className="font-sans font-semibold text-[#1a4a55] text-sm mb-1">{s.name}</p>
                      <p className="font-sans text-[#1a4a55]/55 text-xs leading-relaxed">{s.short}</p>
                    </div>
                  );
                })}
              </div>
              <a
                href={WA_ALGOS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#c69636] hover:bg-[#1a4a55] text-white font-sans font-bold uppercase text-[12px] tracking-[0.16em] px-6 py-3 transition-colors"
              >
                Escribir a ALGOS por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="bg-[#1a4a55] px-6 py-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-sans font-bold text-[#f5f0e8] text-sm mb-1">Sin consulta previa</p>
              <p className="font-sans text-[#f5f0e8]/55 text-xs">La mayoría de estudios se coordinan directamente por WhatsApp</p>
            </div>
            <div>
              <p className="font-sans font-bold text-[#f5f0e8] text-sm mb-1">Resultados el mismo día</p>
              <p className="font-sans text-[#f5f0e8]/55 text-xs">Imagen y laboratorio con entrega rápida</p>
            </div>
            <div>
              <p className="font-sans font-bold text-[#f5f0e8] text-sm mb-1">Equipo médico familiar</p>
              <p className="font-sans text-[#f5f0e8]/55 text-xs">Atención personalizada en Maracaibo</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer mínimo */}
      <footer className="bg-[#f5f0e8] border-t-2 border-[#1a4a55]/15 px-6 py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={algosLogoDark} alt="ALGOS Centro de Dolor" className="h-12 opacity-90" />
          <p className="font-sans text-[#1a4a55]/65 text-sm text-center">
            ALGOS Centro de Dolor Intervencionista · Maracaibo, Venezuela
          </p>
          <a
            href="https://algoscentrodolor.com"
            className="font-sans text-[#1a4a55]/60 hover:text-[#1a4a55] text-sm font-medium transition-colors"
          >
            algoscentrodolor.com
          </a>
        </div>
      </footer>
    </div>
  );
}
