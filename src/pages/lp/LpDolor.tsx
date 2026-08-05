import SEOHead from "@/components/SEOHead";
import { OptimizedPicture } from "@/components/OptimizedPicture";
import LpHeader from "./LpHeader";
import algosLogoDark from "@/assets/algos-logo-v2.png";
import { Zap, Radio, Droplets, Activity, ExternalLink, Brain, Waves } from "lucide-react";

import dolorLumbarPic from "@/assets/lp-dolor-lumbar.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import dolorLumbarLqip from "@/assets/lp-dolor-lumbar.jpg?w=32&blur=6&format=webp&url";
import algosFacadeAsset from "@/assets/algos-facade.webp.asset.json";

import aboutProcedurePic from "@/assets/about-procedure.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import aboutProcedureLqip from "@/assets/about-procedure.jpg?w=32&blur=6&format=webp&url";
import drAtilioPortraitAsset from "@/assets/Atilio_foto_cortada.png.asset.json";
const drAtilioPortrait = drAtilioPortraitAsset.url;

const WA_ALGOS = `https://wa.me/584146807886?text=${encodeURIComponent(
  "Hola, me contacto desde algoscentrodolor.com. Quisiera agendar una consulta por dolor crónico."
)}`;

const WA_DIAGNOSTICOS = `https://wa.me/584146807886?text=${encodeURIComponent(
  "Hola, me contacto desde algoscentrodolor.com. Quisiera agendar un estudio diagnóstico (EMG o EEG) en ALGOS."
)}`;

const DIAGNOSTICOS = [
  {
    icon: Zap,
    slug: "emg",
    name: "Electromiografía (EMG)",
    precio: "$100",
    quees: "Mide cómo viajan las señales eléctricas por los nervios y cómo responden los músculos.",
    paraque: "Indicada cuando el dolor viene con hormigueo, adormecimiento o debilidad. Detecta si un nervio está comprimido, irritado o dañado.",
  },
  {
    icon: Waves,
    slug: "eeg",
    name: "Electroencefalograma (EEG)",
    precio: "$70",
    quees: "Registra la actividad eléctrica del cerebro mediante electrodos en el cuero cabelludo. Indoloro, dura 30–45 min.",
    paraque: "Indicado en episodios convulsivos, mareos frecuentes, alteraciones de conciencia y evaluación neurológica.",
  },
];

const PROCEDURES = [
  {
    icon: Zap,
    name: "Infiltraciones y bloqueos",
    short: "Medicamento guiado por imagen directamente en el origen del dolor. Efecto en horas.",
  },
  {
    icon: Radio,
    name: "Radiofrecuencia",
    short: "Interrumpe la señal nerviosa que transmite el dolor. Efecto duradero sin cirugía.",
  },
  {
    icon: Droplets,
    name: "Ozono para hernia discal",
    short: "Reduce la hernia discal con gas medicinal. Alternativa minimamente invasiva a la cirugía.",
  },
  {
    icon: Activity,
    name: "Electromiografía diagnóstica",
    short: "Identifica exactamente qué nervio está comprimido y en qué punto. Diagnóstico de precisión.",
  },
];

const CONDITIONS = [
  "Dolor lumbar crónico",
  "Hernia discal",
  "Ciática",
  "Dolor cervical",
  "Neuropatía diabética",
  "Dolor tras cirugía de columna",
  "Cefaleas de origen cervical",
];

export default function LpDolor() {
  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <SEOHead
        title="Especialista en dolor crónico en Maracaibo | Sin cirugía | ALGOS"
        description="ALGOS Centro de Dolor Intervencionista en Maracaibo. Tratamos dolor lumbar, hernia discal, ciática y neuropatía con procedimientos guiados por imagen. Consulta disponible."
        canonical="https://algoscentrodolor.com/lp/dolor"
      >
        <meta name="robots" content="noindex, nofollow" />
      </SEOHead>

      <LpHeader waHref={WA_ALGOS} waLabel="Agendar consulta" />

      <main className="pt-24">
        {/* Hero — split layout */}
        <section className="bg-[#f5f0e8]">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

            {/* Text */}
            <div className="flex flex-col justify-center px-6 md:px-12 py-16 md:py-24 order-1">
              <p className="text-[#3d8b96] font-medium text-xs tracking-[0.28em] uppercase mb-5">
                DOLOR INTERVENCIONISTA · MARACAIBO
              </p>
              <h1 className="font-display font-bold text-[#1a4a55] text-4xl md:text-5xl leading-[1.08] tracking-tight mb-6">
                El dolor no tiene que <span className="italic">aguantarse.</span><br />
                Estamos aquí para ayudarle.
              </h1>
              <p className="font-sans text-[#1a4a55]/70 text-base md:text-lg leading-relaxed mb-10 max-w-md">
                En ALGOS tratamos el origen del dolor con procedimientos guiados por imagen. Sin cirugía, sin hospitalización. Primer centro intervencionista del estado Zulia.
              </p>
              <a
                href={WA_ALGOS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#1a4a55] hover:bg-[#3d8b96] text-white font-sans font-bold uppercase text-[13px] tracking-[0.16em] px-10 py-4 transition-colors w-fit"
              >
                Agendar consulta
              </a>
            </div>

            {/* Imagen dolor + card Dr. Atilio */}
            <div className="relative min-h-[380px] lg:min-h-0 overflow-hidden order-2 bg-[#1a4a55]">
              <OptimizedPicture
                picture={dolorLumbarPic}
                placeholder={dolorLumbarLqip}
                alt="Dolor lumbar crónico — ALGOS Centro de Dolor Maracaibo"
                className="absolute inset-0 w-full h-full"
                imgClassName="w-full h-full object-cover object-center"
                sizes="(min-width: 1024px) 50vw, 100vw"
                eager
                fetchPriority="high"
              />
              {/* Gradiente inferior para que el card destaque */}
              <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#1a4a55]/90 to-transparent" />

              {/* Card Dr. Atilio */}
              <div className="absolute bottom-5 left-5 right-5">
                <div
                  className="flex items-center gap-4 px-5 py-4"
                  style={{ backgroundColor: "#1a4a55", borderLeft: "3px solid #c69636" }}
                >
                  <img
                    src={drAtilioPortrait}
                    alt="Dr. Atilio Rodríguez"
                    className="w-14 h-14 object-cover object-top rounded-full shrink-0"
                    style={{ border: "2px solid #c69636" }}
                  />
                  <div>
                    <p className="font-sans font-bold text-[#f5f0e8] text-sm leading-tight">
                      Dr. Atilio Rodríguez
                    </p>
                    <p className="font-sans text-[#c69636] text-xs tracking-wide mt-0.5">
                      Neurocirujano
                    </p>
                    <p className="font-sans text-[#f5f0e8]/55 text-xs mt-0.5">
                      ALGOS Centro de Dolor · Maracaibo
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Quiénes somos — logo grande + link prominente */}
        <section className="bg-white px-6 py-12 md:py-16 border-b border-[#1a4a55]/8">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start gap-8 border-l-[3px] border-[#1a4a55] pl-6 bg-[#1a4a55]/[0.03] py-6 pr-6">
            <img
              src={algosLogoDark}
              alt="ALGOS Centro de Dolor"
              className="h-20 w-auto object-contain object-left shrink-0"
            />
            <div className="flex flex-col gap-4 flex-1">
              <p className="font-sans text-[#1a4a55]/70 text-sm leading-relaxed max-w-xl">
                Primer centro de dolor intervencionista del estado Zulia. Atendido por el Dr. Atilio Rodríguez, neurocirujano especializado en dolor, con sede en Maracaibo. Parte de una red clínica familiar con presencia en seis espacios activos en el estado.
              </p>
              <a
                href="https://algoscentrodolor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1a4a55] hover:bg-[#3d8b96] text-white font-sans font-semibold text-[12px] tracking-[0.12em] uppercase px-5 py-3 transition-colors w-fit"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Ver sitio web completo
              </a>
            </div>
          </div>
        </section>

        {/* Condiciones */}
        <section className="bg-[#f5f0e8] px-6 py-14">
          <div className="max-w-4xl mx-auto">
            <p className="font-sans font-semibold text-[#1a4a55] text-xs uppercase tracking-widest mb-6 text-center">
              Tratamos estas condiciones
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {CONDITIONS.map((c) => (
                <span key={c} className="font-sans text-[#1a4a55] text-sm border border-[#1a4a55]/20 bg-white px-4 py-2">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Procedimientos con imagen */}
        <section className="bg-white px-6 py-16 md:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-1 h-6 bg-[#c69636] block rounded-full" />
              <p className="font-sans font-semibold text-[#1a4a55] text-xs uppercase tracking-widest">
                Nuestros procedimientos
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROCEDURES.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.name} className="border border-[#1a4a55]/10 bg-[#f5f0e8]/60 p-5">
                      <Icon className="w-5 h-5 text-[#c69636] mb-3" strokeWidth={1.5} />
                      <p className="font-sans font-semibold text-[#1a4a55] text-sm mb-2">{p.name}</p>
                      <p className="font-sans text-[#1a4a55]/55 text-xs leading-relaxed">{p.short}</p>
                    </div>
                  );
                })}
                <div className="sm:col-span-2">
                  <a
                    href={WA_ALGOS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center bg-[#1a4a55] hover:bg-[#3d8b96] text-white font-sans font-bold uppercase text-[13px] tracking-[0.16em] px-10 py-4 transition-colors"
                  >
                    Agendar consulta
                  </a>
                </div>
              </div>

              {/* Fachada ALGOS */}
              <div className="relative h-72 lg:h-full min-h-[280px] overflow-hidden">
                <img
                  src={algosFacadeAsset.url}
                  alt="Fachada de ALGOS Centro de Dolor Intervencionista en Maracaibo"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a4a55]/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-sans text-white/90 text-xs">Sede ALGOS Centro de Dolor · Maracaibo</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Estudios diagnósticos ALGOS — EMG + EEG */}
        <section className="bg-[#f5f0e8] px-6 py-16 md:py-20 border-t border-[#1a4a55]/10">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1 h-6 bg-[#c69636] block rounded-full" />
              <p className="font-sans font-semibold text-[#1a4a55] text-xs uppercase tracking-widest">
                Estudios diagnósticos · Solo en ALGOS
              </p>
            </div>
            <p className="font-display font-bold text-[#1a4a55] text-2xl md:text-3xl leading-tight mb-2 ml-4">
              ¿Tu médico te pidió un estudio de nervios?
            </p>
            <p className="font-sans text-[#1a4a55]/65 text-sm md:text-base leading-relaxed mb-10 ml-4 max-w-xl">
              Realizamos electromiografía y electroencefalograma en ALGOS, con cita previa.
              Sin necesidad de ir a un hospital.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {DIAGNOSTICOS.map((d) => {
                const Icon = d.icon;
                return (
                  <div
                    key={d.slug}
                    className="bg-white border border-[#c69636]/30 p-6 flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#1a4a55] flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4 text-[#c69636]" strokeWidth={1.5} />
                        </div>
                        <p className="font-sans font-bold text-[#1a4a55] text-base leading-tight">
                          {d.name}
                        </p>
                      </div>
                      <span className="font-display font-bold text-[#c69636] text-xl shrink-0">
                        {d.precio}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p className="font-sans text-[#1a4a55]/70 text-sm leading-relaxed">
                        <span className="font-semibold text-[#1a4a55]">Qué es: </span>
                        {d.quees}
                      </p>
                      <p className="font-sans text-[#1a4a55]/70 text-sm leading-relaxed">
                        <span className="font-semibold text-[#1a4a55]">Para qué: </span>
                        {d.paraque}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href={WA_DIAGNOSTICOS}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#c69636] hover:bg-[#1a4a55] text-white font-sans font-bold uppercase text-[13px] tracking-[0.16em] px-10 py-4 transition-colors"
            >
              Consultar precio y agendar estudio
            </a>
          </div>
        </section>

        {/* Imagen cinemática — procedimiento */}
        <div className="relative h-52 md:h-64 overflow-hidden">
          <OptimizedPicture
            picture={aboutProcedurePic}
            placeholder={aboutProcedureLqip}
            alt="Procedimiento guiado por imagen ALGOS"
            className="absolute inset-0 w-full h-full"
            imgClassName="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#1a4a55]/60" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <p className="font-display font-bold text-[#f5f0e8] text-2xl md:text-3xl tracking-tight text-center">
              Guiado por imagen. <span className="italic text-[#c69636]">Sin cirugía.</span>
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <section className="bg-[#1a4a55] px-6 py-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="font-sans font-bold text-[#f5f0e8] text-sm mb-1">Dr. Atilio Rodríguez</p>
              <p className="font-sans text-[#f5f0e8]/55 text-xs">Neurocirujano · Maracaibo</p>
            </div>
            <div>
              <p className="font-sans font-bold text-[#f5f0e8] text-sm mb-1">Guiado por imagen</p>
              <p className="font-sans text-[#f5f0e8]/55 text-xs">Todos los procedimientos con control por ultrasonido o fluoroscopía</p>
            </div>
            <div>
              <p className="font-sans font-bold text-[#f5f0e8] text-sm mb-1">Primer centro en Zulia</p>
              <p className="font-sans text-[#f5f0e8]/55 text-xs">Especialización en dolor intervencionista en el estado</p>
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
