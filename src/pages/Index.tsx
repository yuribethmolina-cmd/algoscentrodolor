import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import WhatsAppButton from "@/components/WhatsAppButton";
import { AnimatedHeadline, InViewToggle, useInViewOnce } from "@/lib/animations";

import heroPoster from "@/assets/hero-poster.jpg.asset.json";
import heroDesktop from "@/assets/hero-desktop.mp4.asset.json";
import heroMobile from "@/assets/hero-mobile.mp4.asset.json";

import imgLumbar from "@/assets/tx-01-lumbar.jpg";
import imgCervical from "@/assets/tx-02-cervical.jpg";
import imgHernia from "@/assets/tx-hernia-discal.jpg";
import imgCirugia from "@/assets/tx-cirugia-fallida.jpg";
import imgNeuro from "@/assets/tx-03-perif.jpg";
import imgConsultorio from "@/assets/experience-consult.jpg";
import imgSala from "@/assets/sala-procedimientos.jpg";

const WA = "https://wa.me/584146807886?text=Hola%2C%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios.";

/* ─── Lazy video loader ─────────────────────────────── */
function pickVideoSrc(desktop: string, mobile: string): string | null {
  if (typeof window === "undefined") return null;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return null;
  const conn = (navigator as any).connection;
  if (conn?.saveData) return null;
  if (["slow-2g", "2g", "3g"].includes(conn?.effectiveType ?? "")) return null;
  return window.innerWidth < 768 ? mobile : desktop;
}

/* ─── Bento condition cards ─────────────────────────── */
const CONDITIONS = [
  { title: "Ciática", desc: "Un dolor que baja de la espalda por la pierna, a veces como un corrientazo.", href: "/condiciones/ciatica", img: imgLumbar },
  { title: "Hernia discal", desc: "Le diagnosticaron una hernia de disco y le dijeron que quizás haya que operar.", href: "/condiciones/hernia-discal", img: imgHernia, tall: true },
  { title: "Dolor lumbar", desc: "Dolor de cintura que no cede con reposo ni calmantes.", href: "/condiciones/dolor-lumbar", img: imgLumbar },
  { title: "Dolor cervical", desc: "Dolor de cuello que se extiende al hombro o al brazo.", href: "/condiciones/dolor-cervical", img: imgCervical, tall: true },
  { title: "Neuropatía diabética", desc: "Es diabético y siente hormigueo, ardor o adormecimiento en los pies.", href: "/condiciones/neuropatia-diabetica", img: imgNeuro },
  { title: "Dolor tras cirugía", desc: "Se operó de la columna y el dolor sigue ahí.", href: "/condiciones/dolor-tras-cirugia", img: imgCirugia },
];

/* ─── WHY points ────────────────────────────────────── */
const WHY = [
  { n: "01", text: "Del diagnóstico al tratamiento en una sola ruta, sin peregrinar entre centros." },
  { n: "02", text: "La misma imagen que localiza el problema guía el procedimiento: fluoroscopia, tomografía y ecografía, según lo que su caso necesita." },
  { n: "03", text: "Lo mínimamente invasivo antes que la cirugía: agotar las opciones intermedias es parte del método." },
  { n: "04", text: "Se trata solo lo que hace falta. Ni un estudio ni un procedimiento de más." },
];

/* ─── Home FAQ ──────────────────────────────────────── */
const HOME_FAQS = [
  { q: "¿Duele el procedimiento?", a: "La mayoría se realizan con anestesia local. Se percibe presión o una molestia leve, no dolor intenso. Antes de comenzar le explicamos qué sensación tendrá en cada paso." },
  { q: "¿Es ambulatorio?", a: "Sí. En su mayoría el paciente regresa a casa el mismo día, sin hospitalización." },
  { q: "¿Necesito referencia médica?", a: "No es necesaria. Puede agendar su consulta de forma directa." },
];

function FAQItem({ q, a, light }: { q: string; a: string; light?: boolean }) {
  const [open, setOpen] = useState(false);
  const border = light ? "border-cream/20" : "border-deep-teal/10";
  const qColor = light ? "text-cream" : "text-deep-teal";
  const aColor = light ? "text-cream/65" : "text-steel-teal";
  return (
    <div className={`border-b ${border}`}>
      <button className="w-full flex items-start justify-between gap-4 py-5 text-left" onClick={() => setOpen(!open)}>
        <span className={`font-sans font-semibold ${qColor} text-[16px] leading-[1.4]`}>{q}</span>
        <ChevronDown size={18} className="text-algos-gold shrink-0 mt-[2px] transition-transform duration-200" style={{ transform: open ? "rotate(180deg)" : "none" }} />
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? "300px" : "0", opacity: open ? 1 : 0 }}>
        <p className={`font-sans ${aColor} text-[15px] leading-[1.7] pb-5 max-w-[64ch]`}>{a}</p>
      </div>
    </div>
  );
}

/* ─── Animated spine SVG for Block 3 ───────────────── */
function SpineIllustration() {
  const { ref, inView } = useInViewOnce<SVGSVGElement>(0.4);
  return (
    <svg
      ref={ref}
      viewBox="0 0 120 320"
      fill="none"
      aria-hidden="true"
      className={`spine-svg ${inView ? "in-view" : ""}`}
      style={{ width: "100%", maxWidth: 80, display: "block" }}
    >
      {/* Vertebrae */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = 20 + i * 42;
        return (
          <g key={i}>
            <rect x="30" y={y} width="60" height="28" rx="4"
              stroke="#c69636" strokeWidth="1.4"
              style={{
                strokeDasharray: 200, strokeDashoffset: inView ? 0 : 200,
                transition: `stroke-dashoffset 800ms cubic-bezier(0.4,0,0.2,1) ${i * 80}ms`,
              }}
            />
            {i < 6 && (
              <line x1="60" y1={y + 28} x2="60" y2={y + 42} stroke="#c69636" strokeWidth="1.4" strokeOpacity="0.45"
                style={{
                  strokeDasharray: 20, strokeDashoffset: inView ? 0 : 20,
                  transition: `stroke-dashoffset 400ms ease ${i * 80 + 600}ms`,
                }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Imaging guides mini-SVG ───────────────────────── */
function GuideIcon({ type }: { type: "fluoro" | "tac" | "eco" }) {
  if (type === "fluoro") return (
    <svg viewBox="0 0 48 56" fill="none" className="w-10 h-10" aria-hidden>
      <rect x="10" y="2" width="28" height="10" rx="2" stroke="#c69636" strokeWidth="1.4" />
      <rect x="16" y="12" width="16" height="4" rx="1" stroke="#c69636" strokeWidth="1.2" />
      {[-14,-8,0,8,14].map((dx,i)=><line key={i} x1="24" y1="16" x2={24+dx} y2="50" stroke="#c69636" strokeWidth={dx===0?1.4:0.8} strokeOpacity={dx===0?0.9:0.35}/>)}
      <line x1="10" y1="50" x2="38" y2="50" stroke="#c69636" strokeWidth="1.4"/>
    </svg>
  );
  if (type === "tac") return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
      <circle cx="24" cy="24" r="20" stroke="#c69636" strokeWidth="1.4"/>
      <circle cx="24" cy="24" r="10" stroke="#c69636" strokeWidth="1" strokeOpacity="0.5"/>
      <line x1="4" y1="24" x2="44" y2="24" stroke="#c69636" strokeWidth="0.9" strokeOpacity="0.4"/>
      <line x1="24" y1="4" x2="24" y2="44" stroke="#c69636" strokeWidth="0.9" strokeOpacity="0.4"/>
      <circle cx="24" cy="24" r="3.5" fill="#c69636" fillOpacity="0.7"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" aria-hidden>
      <ellipse cx="24" cy="24" rx="18" ry="10" stroke="#c69636" strokeWidth="1.4"/>
      <path d="M8 24 Q14 10 24 8 Q34 6 40 24" stroke="#c69636" strokeWidth="0.9" strokeOpacity="0.45" fill="none"/>
      <circle cx="24" cy="20" r="4" stroke="#c69636" strokeWidth="1.2"/>
      <line x1="6" y1="24" x2="42" y2="24" stroke="#c69636" strokeWidth="1" strokeOpacity="0.3"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════ */
export default function Index() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const load = () => setVideoSrc(pickVideoSrc(heroDesktop.url, heroMobile.url));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) { load(); io.disconnect(); }
      }, { rootMargin: "200px" });
      io.observe(node);
      return () => io.disconnect();
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />

      {/* ── BLOCK 1 · HERO ── */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden"
        style={{ minHeight: "100dvh" }}
      >
        {/* Video / poster background */}
        <video
          key={videoSrc ?? "poster"}
          ref={(el) => {
            if (el) {
              el.muted = true;
              el.defaultMuted = true;
              const p = el.play();
              if (p?.catch) p.catch(() => {});
            }
          }}
          className="absolute inset-0 w-full h-full object-cover object-center"
          poster={heroPoster.url}
          autoPlay muted loop playsInline
          disableRemotePlayback
          preload="metadata"
          aria-hidden="true"
        >
          {videoSrc && (
            <>
              <source src={videoSrc.replace(".mp4", ".webm")} type="video/webm" />
              <source src={videoSrc} type="video/mp4" />
            </>
          )}
        </video>

        {/* Gradient overlays */}
        <div aria-hidden className="absolute inset-0 pointer-events-none
          bg-gradient-to-b from-[#f5f0e8]/95 via-[#f5f0e8]/88 to-[#f5f0e8]/78
          md:bg-gradient-to-r md:from-[#f5f0e8]/96 md:via-[#f5f0e8]/72 md:to-[#f5f0e8]/18" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none bg-gradient-to-t from-cream to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full mx-auto max-w-7xl px-6 md:px-12 lg:px-16
                        flex items-center pt-24 pb-16 md:pt-0 md:min-h-[100dvh]">
          <div className="max-w-[640px] md:max-w-[720px]">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.32em] mb-6">
              Maracaibo · Centro de Dolor Intervencionista
            </p>

            <AnimatedHeadline
              as="h1"
              className="font-display font-bold text-deep-teal"
              style={{
                fontSize: "clamp(38px, 5.6vw, 78px)",
                lineHeight: 1.04,
                letterSpacing: "-0.028em",
                maxWidth: "18ch",
              }}
              chunks={[
                { text: "El dolor tiene causa. " },
                { text: "Nosotros la tratamos.", italic: true, color: "#9a7320", staggerMs: 120 },
              ]}
            />

            <p className="font-sans mt-7 text-deep-teal/75"
              style={{ fontSize: "clamp(16px, 2vw, 19px)", lineHeight: 1.65, maxWidth: "52ch" }}>
              En ALGOS identificamos la causa de su dolor y lo tratamos con procedimientos
              mínimamente invasivos, antes de llegar a una operación.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-brand-teal hover:bg-[#4a9ca8] text-cream font-sans font-bold uppercase transition-[background-color,transform] duration-300 md:hover:-translate-y-0.5 active:scale-[0.97] px-8 py-[16px]"
                style={{ fontSize: "13px", letterSpacing: "0.22em" }}
              >
                <span>Escríbanos por WhatsApp</span>
                <span className="inline-block overflow-hidden transition-[width] duration-300 w-4 group-hover:w-8" aria-hidden>
                  <span className="block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </a>
              <Link
                to="/condiciones"
                className="inline-flex items-center justify-center border-[1.5px] border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-cream font-sans font-bold uppercase transition-[background-color,color] duration-300 active:scale-[0.97] px-8 py-[16px]"
                style={{ fontSize: "13px", letterSpacing: "0.22em" }}
              >
                Ver condiciones
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOCK 2 · CONDICIONES (BENTO) ── */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <InViewToggle className="reveal-up mb-12 md:mb-16">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.28em] mb-4">
              Condiciones que tratamos
            </p>
            <h2 className="font-display font-bold text-deep-teal"
              style={{ fontSize: "clamp(28px, 3.6vw, 50px)", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "26ch" }}>
              ¿Se reconoce en alguno de estos dolores?
            </h2>
          </InViewToggle>

          {/* Bento grid — 2 col mobile, 3 col desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {CONDITIONS.map((c, i) => (
              <Link
                key={c.href}
                to={c.href}
                className={`group relative overflow-hidden bg-deep-teal/5 hover:bg-deep-teal/8 transition-all duration-300 md:hover:-translate-y-1 active:scale-[0.98] ${c.tall ? "row-span-2" : ""}`}
              >
                {/* Photo */}
                <div className={`relative overflow-hidden ${c.tall ? "h-[220px] md:h-[280px]" : "h-[160px] md:h-[180px]"}`}>
                  <img
                    src={c.img}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading={i > 2 ? "lazy" : "eager"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/80 via-deep-teal/20 to-transparent" />
                </div>
                {/* Text */}
                <div className="p-4 md:p-5">
                  <p className="font-sans font-bold text-deep-teal group-hover:text-algos-gold transition-colors text-[14px] md:text-[15px] leading-[1.3] mb-1">
                    {c.title} <span className="text-algos-gold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </p>
                  <p className="font-sans text-steel-teal text-[12px] md:text-[13px] leading-[1.55] hidden sm:block">
                    {c.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <InViewToggle className="reveal-up mt-8">
            <p className="font-sans text-steel-teal text-[15px] leading-[1.6]">
              Tratamos también otras condiciones de dolor.{" "}
              <Link to="/condiciones" className="text-brand-teal hover:text-algos-gold underline underline-offset-2 transition-colors">
                Vea la lista completa.
              </Link>
            </p>
          </InViewToggle>
        </div>
      </section>

      {/* ── BLOCK 3 · CÓMO TRABAJAMOS ── */}
      <section className="bg-deep-teal py-20 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2.4fr] gap-12 md:gap-20 items-start">
            {/* Left — spine illustration */}
            <div className="hidden md:flex flex-col items-center pt-4">
              <SpineIllustration />
            </div>

            {/* Right — steps */}
            <div>
              <InViewToggle className="reveal-up mb-12">
                <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.28em] mb-4">
                  Metodología
                </p>
                <h2 className="font-display font-bold text-cream"
                  style={{ fontSize: "clamp(28px, 3.6vw, 50px)", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "26ch" }}>
                  Primero la causa, después el tratamiento.
                </h2>
              </InViewToggle>

              <div className="flex flex-col gap-0">
                {[
                  { n: "01", title: "Consulta", desc: "Un especialista escucha su caso y lo examina. Si hacen falta estudios, se indican solo los necesarios." },
                  { n: "02", title: "Diagnóstico", desc: "Imagen, electromiografía y laboratorio, disponibles en la misma red, confirman de dónde viene el dolor." },
                  { n: "03", title: "Tratamiento", desc: "Desde medicamentos hasta procedimientos mínimamente invasivos guiados por imagen. Solo lo que de verdad hace falta." },
                ].map((s, i) => (
                  <InViewToggle
                    key={s.n}
                    className={`reveal-up flex items-start gap-6 py-8 border-b border-cream/10 scroll-reveal-delay-${i + 1}`}
                  >
                    <span className="font-display font-bold text-algos-gold/40 text-[48px] md:text-[64px] leading-[1] shrink-0 mt-[-4px]">
                      {s.n}
                    </span>
                    <div>
                      <p className="font-sans font-bold text-cream text-[17px] md:text-[18px] mb-2">{s.title}</p>
                      <p className="font-sans text-cream/65 text-[15px] leading-[1.65]">{s.desc}</p>
                    </div>
                  </InViewToggle>
                ))}
              </div>

              <InViewToggle className="reveal-up mt-10">
                <p className="font-sans text-cream/60 text-[15px] leading-[1.75] max-w-[56ch]">
                  Y el tratamiento no termina cuando termina el procedimiento: seguimos su evolución
                  y le acompañamos en el tiempo, porque el dolor crónico se maneja, no se abandona.
                </p>
              </InViewToggle>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOCK 4 · POR QUÉ ALGOS ── */}
      <section className="bg-cream py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <InViewToggle className="reveal-up mb-14">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.28em] mb-4">
              Método
            </p>
            <h2 className="font-display font-bold text-deep-teal"
              style={{ fontSize: "clamp(28px, 3.6vw, 50px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Por qué ALGOS
            </h2>
          </InViewToggle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-deep-teal/8">
            {WHY.map((w, i) => (
              <InViewToggle
                key={w.n}
                className={`reveal-up bg-cream p-8 md:p-10 scroll-reveal-delay-${(i % 2) + 1}`}
              >
                <p className="font-display font-bold text-algos-gold/35 text-[52px] leading-[1] mb-5 select-none">{w.n}</p>
                <p className="font-sans text-deep-teal text-[16px] md:text-[17px] leading-[1.7]">{w.text}</p>
              </InViewToggle>
            ))}
          </div>

          {/* Guides strip */}
          <InViewToggle className="reveal-up mt-12 pt-10 border-t border-deep-teal/10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16">
              <p className="font-sans text-steel-teal text-[14px] leading-[1.6] max-w-[36ch]">
                Disponemos de las tres modalidades de guía por imagen y usamos la que cada caso necesita.
              </p>
              <div className="flex items-center gap-10 md:gap-14">
                {([
                  { type: "fluoro" as const, label: "Fluoroscopia" },
                  { type: "tac" as const, label: "Tomografía" },
                  { type: "eco" as const, label: "Ecografía" },
                ] as const).map((g) => (
                  <div key={g.type} className="flex flex-col items-center gap-2 text-center">
                    <GuideIcon type={g.type} />
                    <p className="font-sans text-steel-teal text-[11px] uppercase tracking-[0.15em]">{g.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </InViewToggle>
        </div>
      </section>

      {/* ── BLOCK 5 · EQUIPO ── */}
      <section className="relative overflow-hidden bg-[#142e36] py-20 md:py-28">
        <img
          src={imgConsultorio}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <InViewToggle className="reveal-up max-w-[60ch]">
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.28em] mb-5">
              Equipo
            </p>
            <p className="font-sans text-cream text-[18px] md:text-[20px] leading-[1.75]">
              ALGOS reúne un equipo de varias especialidades — neurocirugía, traumatología, algología,
              reumatología, fisiatría y apoyo nutricional — que evalúa cada caso desde el ángulo que
              le corresponde.
            </p>
            <div className="mt-8">
              <Link
                to="/equipo"
                className="inline-flex items-center gap-2 font-sans font-bold uppercase text-algos-gold hover:text-cream text-[12px] tracking-[0.2em] transition-colors duration-200"
              >
                Conozca al equipo <span>→</span>
              </Link>
            </div>
          </InViewToggle>
        </div>
      </section>

      {/* ── BLOCK 6 · UDUZ ── */}
      <section className="bg-cream py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Photo */}
            <InViewToggle className="reveal-up order-2 md:order-1">
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={imgSala}
                  alt="Sala de procedimientos ALGOS"
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </InViewToggle>
            {/* Text */}
            <InViewToggle className="reveal-up order-1 md:order-2">
              <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.28em] mb-5">
                Red UDUZ
              </p>
              <h2 className="font-display font-bold text-deep-teal mb-6"
                style={{ fontSize: "clamp(24px, 2.8vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.02em", maxWidth: "22ch" }}>
                ¿Necesita una tomografía, una ecografía o estudios de laboratorio?
              </h2>
              <p className="font-sans text-steel-teal text-[16px] leading-[1.7] mb-8 max-w-[46ch]">
                Los estudios de la red UDUZ también se agendan aquí. Con o sin consulta previa en ALGOS.
              </p>
              <Link
                to="/estudios-laboratorio"
                className="inline-flex items-center gap-2 border-[1.5px] border-deep-teal text-deep-teal hover:bg-deep-teal hover:text-cream font-sans font-bold uppercase text-[12px] tracking-[0.18em] px-8 py-4 transition-[background-color,color] duration-300"
              >
                Ver estudios disponibles <span>→</span>
              </Link>
            </InViewToggle>
          </div>
        </div>
      </section>

      {/* ── BLOCK 7 · FAQ ── */}
      <section className="bg-deep-teal py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
            <InViewToggle className="reveal-up">
              <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.28em] mb-5">
                Antes de su cita
              </p>
              <h2 className="font-display font-bold text-cream"
                style={{ fontSize: "clamp(24px, 2.8vw, 38px)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                Preguntas frecuentes
              </h2>
              <div className="mt-8">
                <Link
                  to="/preguntas-frecuentes"
                  className="inline-flex items-center gap-2 font-sans font-bold uppercase text-algos-gold hover:text-cream text-[12px] tracking-[0.18em] transition-colors"
                >
                  Ver todas las preguntas <span>→</span>
                </Link>
              </div>
            </InViewToggle>
            <InViewToggle className="reveal-up">
              <div>
                {HOME_FAQS.map((f) => <FAQItem key={f.q} q={f.q} a={f.a} light />)}
              </div>
            </InViewToggle>
          </div>
        </div>
      </section>

      {/* ── BLOCK 8 · CIERRE ── */}
      <section className="bg-cream py-24 md:py-36">
        <div className="mx-auto max-w-3xl px-6 md:px-12 text-center">
          <InViewToggle className="reveal-up">
            <h2 className="font-display font-bold text-deep-teal mb-6"
              style={{ fontSize: "clamp(32px, 4.5vw, 64px)", lineHeight: 1.08, letterSpacing: "-0.025em" }}>
              Cuéntenos qué le duele.
            </h2>
            <p className="font-sans text-steel-teal text-[17px] md:text-[19px] leading-[1.65] mb-10 max-w-[46ch] mx-auto">
              Un miembro de nuestro equipo le orientará sobre el paso siguiente. Sin compromiso.
            </p>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 bg-deep-teal hover:bg-[#2a6270] text-cream font-sans font-bold uppercase transition-[background-color,transform] duration-300 md:hover:-translate-y-0.5 active:scale-[0.97] px-10 py-5"
              style={{ fontSize: "13px", letterSpacing: "0.22em" }}
            >
              Escríbanos por WhatsApp
              <span className="inline-block overflow-hidden transition-[width] duration-300 w-4 group-hover:w-8" aria-hidden>
                <span className="block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </a>
          </InViewToggle>
        </div>
      </section>

      <HomeFooter />
      <WhatsAppButton />
    </div>
  );
}
