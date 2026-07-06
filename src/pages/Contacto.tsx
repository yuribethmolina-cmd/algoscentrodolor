import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, Mail, MessageCircle, Instagram, Star, ArrowUpRight, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import uduzScanner from "@/assets/uduz-scanner.jpg";
import examsXray from "@/assets/exams-xray.jpg";
import examsUltrasound from "@/assets/exams-ultrasound.jpg";

const WHATSAPP_NUMBER = "584146807886";

const AUDIENCE_CARDS = [
  {
    eyebrow: "PACIENTES",
    title: "¿Necesita evaluar su dolor?",
    description: "Agende una primera valoración con el equipo clínico.",
    cta: "Agendar valoración",
    to: "/pacientes/agendar",
    bg: "#3d8b96",
    btnBg: "#f5f0e8",
    btnText: "#1a4a55",
  },
  {
    eyebrow: "MÉDICOS",
    title: "¿Tiene un paciente para referir?",
    description: "Formulario clínico con seguimiento al referente.",
    cta: "Iniciar referencia",
    to: "/medicos/referir",
    bg: "#1a4a55",
    btnBg: "#c69636",
    btnText: "#1a4a55",
  },
  {
    eyebrow: "INSTITUCIONES",
    title: "¿Quiere un convenio clínico?",
    description: "Reuniones con prestadores y aseguradoras.",
    cta: "Solicitar reunión",
    to: "/instituciones/reunion",
    bg: "#2a6470",
    btnBg: "#f5f0e8",
    btnText: "#1a4a55",
  },
];

const INFO_CARDS = [
  {
    Icon: MapPin,
    label: "01 · UBICACIÓN",
    title: "Ubicación",
    lines: ["CC América, Local N° 4", "Av. 20 con Calle 65", "Sector Paraíso · Maracaibo"],
  },
  {
    Icon: Clock,
    label: "02 · HORARIO",
    title: "Horario",
    lines: [
      "Lun, Mar, Jue, Vie",
      "8:00 – 12:00 · 13:00 – 17:00",
      "Miércoles · 8:00 – 15:00",
    ],
  },
  {
    Icon: Phone,
    label: "03 · TELÉFONO",
    title: "Teléfono",
    lines: ["0414-680 7886", "0412-061 7410"],
  },
  {
    Icon: Mail,
    label: "04 · EMAIL",
    title: "Email",
    email: "algoscentrodedolor@gmail.com",
  },
];

const EXAM_TILES = [
  { title: "Tomografía", subtitle: "Alta resolución · mismo día", img: uduzScanner, span: "md:col-span-2 md:row-span-2" },
  { title: "Rayos X", subtitle: "Interpretación por el mismo equipo", img: examsXray, span: "md:col-span-2" },
  { title: "Ecografía", subtitle: "Doppler · obstétrica · musculoesquelética", img: examsUltrasound, span: "md:col-span-2" },
];

export default function Contacto() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const open = useCallback((i: number) => {
    setLightboxIndex(i);
    setZoomed(false);
  }, []);
  const close = useCallback(() => setLightboxIndex(null), []);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i + 1) % EXAM_TILES.length));
    setZoomed(false);
  }, []);
  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i - 1 + EXAM_TILES.length) % EXAM_TILES.length));
    setZoomed(false);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " ") {
        e.preventDefault();
        setZoomed((z) => !z);
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxIndex, close, next, prev]);

  const active = lightboxIndex !== null ? EXAM_TILES[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-cream">
      <SEOHead
        title="Contacto | ALGOS · Centro de Dolor Intervencionista"
        description="Contáctenos en Maracaibo. Pacientes, médicos referentes e instituciones tienen vías directas para conectar con ALGOS."
        canonical="https://algos.lovable.app/contacto"
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://algos.lovable.app" },
          { name: "Contacto", url: "https://algos.lovable.app/contacto" },
        ]}
      />
      <Navbar />
      <main>
        {/* HERO */}
        <section className="bg-cream pt-28 md:pt-32 pb-12 md:pb-16">
          <div className="container mx-auto max-w-4xl px-6 md:px-12 text-center">
            <p className="text-[#c69636] font-medium text-sm tracking-[0.25em] uppercase mb-6">
              HABLEMOS
            </p>
            <h1 className="font-display font-bold text-[#1a4a55] text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              ¿En qué podemos{" "}
              <span className="text-[#c69636] font-bold">ayudarle</span>?
            </h1>
            <p className="font-sans text-[#1a4a55]/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Cada consulta tiene un camino diferente. Elija el que mejor describe su necesidad y le conectamos con la persona correcta.
            </p>
          </div>
        </section>

        {/* AUDIENCE ROUTER */}
        <section className="bg-cream py-16 md:py-20">
          <div className="container mx-auto max-w-7xl px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-px bg-[#1a4a55]/10">
              {AUDIENCE_CARDS.map((c) => (
                <article
                  key={c.eyebrow}
                  className="rounded-none p-10 md:p-12 flex flex-col text-[#f5f0e8]"
                  style={{ backgroundColor: c.bg }}
                >
                  <p className="text-[#f5f0e8]/70 text-xs uppercase tracking-widest font-medium mb-4">
                    {c.eyebrow}
                  </p>
                  <h3 className="font-display font-semibold text-2xl md:text-[1.65rem] leading-snug mb-3">
                    {c.title}
                  </h3>
                  <p className="text-[#f5f0e8]/90 mb-8 leading-relaxed flex-1">
                    {c.description}
                  </p>
                  <Link
                    to={c.to}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 hover:gap-3 transition-all rounded-none font-ui font-bold uppercase px-6 py-4 text-sm tracking-[0.18em]"
                    style={{ backgroundColor: c.btnBg, color: c.btnText }}
                  >
                    <span>{c.cta}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACTO DIRECTO — BENTO */}
        <section className="bg-white py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-6 md:px-12">
            <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-[#c69636] font-medium text-xs tracking-[0.28em] uppercase mb-4">
                  CONTACTO DIRECTO
                </p>
                <h2 className="font-display font-bold text-[#1a4a55] text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-2xl">
                  Llámenos, escríbanos<br className="hidden md:block" /> o visítenos.
                </h2>
              </div>
              <div className="hidden md:block h-px flex-1 bg-[#1a4a55]/15 mx-8" />
              <p className="font-sans text-[#1a4a55]/70 text-sm max-w-xs">
                Cuatro vías directas. Sin formularios largos, sin intermediarios.
              </p>
            </div>

            {/* Bento grid — no rounded corners, hairline dividers */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1a4a55]/12 border border-[#1a4a55]/12">
              {INFO_CARDS.map(({ Icon, title, lines, email, label }) => (
                <div
                  key={title}
                  className="group relative bg-cream p-6 md:p-9 flex flex-col min-h-[200px] md:min-h-[240px] transition-colors hover:bg-[#f5f0e8]"
                >
                  <div className="flex items-start justify-between mb-8">
                    <span className="font-ui text-[10px] tracking-[0.22em] text-[#1a4a55]/45 font-medium">
                      {label}
                    </span>
                    <Icon className="w-4 h-4 text-[#c69636]" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-semibold text-[#1a4a55] text-xl mb-4">
                    {title}
                  </h3>
                  <div className="flex flex-col gap-1 flex-1">
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="font-sans text-[15px] text-[#1a4a55]/85 leading-snug hover:text-[#c69636] transition-colors break-all"
                      >
                        {email}
                      </a>
                    ) : (
                      lines?.map((l) => (
                        <p key={l} className="font-sans text-[15px] text-[#1a4a55]/85 leading-snug">
                          {l}
                        </p>
                      ))
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#c69636] transition-all duration-500 group-hover:w-full" />
                </div>
              ))}
            </div>

            <p className="text-center mt-12 font-sans text-[#1a4a55]/75 text-[15px] leading-relaxed">
              ¿Prefiere que lo llamemos?{" "}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustaría%20que%20me%20llamen%20para%20coordinar`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#3d8b96] hover:text-[#c69636] transition-colors underline underline-offset-2"
              >
                Escríbanos por WhatsApp y coordinamos.
              </a>
            </p>
          </div>
        </section>

        {/* UDUZ — BRANDED BENTO */}
        <section className="bg-[#0f3138] py-20 md:py-28 relative overflow-hidden">
          {/* Ambient gold glow */}
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-[0.08] blur-3xl"
            style={{ background: "radial-gradient(circle, #c69636 0%, transparent 70%)" }}
          />

          <div className="container mx-auto max-w-6xl px-6 md:px-12 relative">
            <div className="mb-10 md:mb-14 flex items-end justify-between gap-6">
              <div>
                <p className="text-[#c69636] font-medium text-xs tracking-[0.28em] uppercase mb-4">
                  IMAGEN Y LABORATORIO
                </p>
                <h2 className="font-display font-bold text-[#f5f0e8] text-3xl md:text-5xl leading-[1.05] tracking-tight max-w-2xl">
                  Diagnóstico integrado, en el mismo lugar.
                </h2>
              </div>
              <span className="hidden md:block font-ui text-[10px] tracking-[0.28em] text-[#f5f0e8]/40">
                ALIANZA ESTRATÉGICA
              </span>
            </div>

            {/* Bento: 6-col grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-px bg-[#f5f0e8]/10 border border-[#f5f0e8]/10">
              {/* UDUZ brand tile */}
              <div className="col-span-2 md:col-span-2 md:row-span-2 bg-[#c69636] p-9 md:p-10 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
                <div>
                  <p className="font-ui text-[10px] tracking-[0.28em] text-[#1a4a55]/70 font-semibold mb-6">
                    UNIDAD DE DIAGNÓSTICO<br />UNIVERSITARIA DEL ZULIA
                  </p>
                  <h3
                    className="font-display font-bold text-[#0f3138] leading-[0.85] tracking-[-0.04em]"
                    style={{ fontSize: "clamp(64px, 9vw, 112px)" }}
                  >
                    UDUZ
                  </h3>
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-[#0f3138] fill-[#0f3138]" strokeWidth={0} />
                    <span className="font-sans text-[#0f3138] text-sm font-semibold">4.8</span>
                    <span className="font-sans text-[#0f3138]/70 text-sm">· 246 reseñas en Google</span>
                  </div>
                  <p className="font-sans text-[#0f3138]/85 text-sm leading-relaxed max-w-[28ch]">
                    Tomografía · Rayos X · Mamografía 3D · Ecografía · Laboratorio
                  </p>
                </div>
              </div>

              {/* Cinematic scanner image */}
              <div className="col-span-2 md:col-span-4 md:row-span-2 relative overflow-hidden min-h-[320px] bg-black">
                <img
                  src={uduzScanner}
                  alt="Tomógrafo UDUZ"
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[1200ms] ease-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0f3138] via-[#0f3138]/40 to-transparent" />
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  <p className="font-ui text-[10px] tracking-[0.28em] text-[#c69636] mb-3">
                    TECNOLOGÍA
                  </p>
                  <h4 className="font-display font-semibold text-[#f5f0e8] text-2xl md:text-3xl leading-tight max-w-md">
                    Equipos de última generación, resultados el mismo día.
                  </h4>
                </div>
              </div>

              {/* Address */}
              <div className="md:col-span-2 bg-[#0f3138] p-8 md:p-9 min-h-[180px] flex flex-col justify-between border-t md:border-t-0 md:border-l border-[#f5f0e8]/8">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-ui text-[10px] tracking-[0.22em] text-[#f5f0e8]/45 font-medium">
                    01 · DIRECCIÓN
                  </span>
                  <MapPin className="w-4 h-4 text-[#c69636]" strokeWidth={1.75} />
                </div>
                <p className="font-sans text-[#f5f0e8] text-[15px] leading-snug">
                  Av. 4001, Maracaibo<br />
                  <span className="text-[#f5f0e8]/70">Sector Paraíso</span>
                </p>
              </div>

              {/* Phone */}
              <div className="md:col-span-2 bg-[#0f3138] p-8 md:p-9 min-h-[180px] flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-ui text-[10px] tracking-[0.22em] text-[#f5f0e8]/45 font-medium">
                    02 · CONTACTO
                  </span>
                  <Phone className="w-4 h-4 text-[#c69636]" strokeWidth={1.75} />
                </div>
                <div>
                  <a href="tel:+584126044124" className="font-display font-semibold text-[#f5f0e8] text-xl hover:text-[#c69636] transition-colors block">
                    +58 412-604-4124
                  </a>
                  <p className="font-sans text-[#f5f0e8]/60 text-xs mt-1 tracking-wide">Lun–Sáb · 6:30 – 19:00</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="md:col-span-2 bg-[#0f3138] p-8 md:p-9 min-h-[180px] flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-ui text-[10px] tracking-[0.22em] text-[#f5f0e8]/45 font-medium">
                    03 · REDES
                  </span>
                  <Instagram className="w-4 h-4 text-[#c69636]" strokeWidth={1.75} />
                </div>
                <a
                  href="https://instagram.com/uduz_maracaibo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-display font-semibold text-[#f5f0e8] text-xl hover:text-[#c69636] transition-colors"
                >
                  @uduz_maracaibo
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>

            {/* Cinematic exam gallery */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-6 gap-px bg-[#f5f0e8]/10 border border-[#f5f0e8]/10">
              {EXAM_TILES.map((tile, i) => (
                <button
                  key={tile.title}
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`Ampliar imagen: ${tile.title}`}
                  className={`group relative overflow-hidden bg-black min-h-[220px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c69636] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f3138] cursor-zoom-in ${tile.span}`}
                >
                  <img
                    src={tile.img}
                    alt={tile.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f3138] via-[#0f3138]/30 to-transparent" />
                  <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#0f3138]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-[#f5f0e8]" strokeWidth={1.75} />
                  </div>
                  <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end">
                    <p className="font-ui text-[10px] tracking-[0.28em] text-[#c69636] mb-2">
                      ESTUDIO
                    </p>
                    <h4 className="font-display font-semibold text-[#f5f0e8] text-xl md:text-2xl leading-tight">
                      {tile.title}
                    </h4>
                    <p className="font-sans text-[#f5f0e8]/70 text-sm mt-1">{tile.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* WHATSAPP CTA */}
        <section className="bg-cream py-20 md:py-24">
          <div className="container mx-auto max-w-3xl px-6 md:px-12 text-center">
            <h2 className="font-display font-semibold text-[#1a4a55] text-2xl md:text-3xl mb-6">
              ¿Prefiere una conversación rápida?
            </h2>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 transition-all bg-[#25d366] hover:bg-[#1fb859] text-white rounded-none font-ui font-bold uppercase px-10 py-[18px] text-[13px] tracking-[0.18em] shadow-[0_6px_24px_-4px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_32px_-4px_rgba(37,211,102,0.55)] hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" strokeWidth={1.75} />
              <span>Escríbanos por WhatsApp</span>
            </a>
          </div>
      </section>
      </main>
      <HomeFooter />

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20me%20gustar%C3%ADa%20m%C3%A1s%20informaci%C3%B3n`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear por WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 flex items-center justify-center bg-[#25d366] text-white shadow-[0_6px_24px_-4px_rgba(37,211,102,0.5)] hover:shadow-[0_10px_32px_-4px_rgba(37,211,102,0.6)] hover:-translate-y-0.5 transition-all duration-300"
      >
        <MessageCircle className="w-6 h-6" strokeWidth={1.75} />
      </a>

      {/* LIGHTBOX */}
      {active && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada: ${active.title}`}
          className="fixed inset-0 z-[100] bg-[#0a1f24]/95 backdrop-blur-sm animate-fade-in flex flex-col"
          onClick={close}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#f5f0e8]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <span className="font-ui text-[10px] tracking-[0.28em] text-[#c69636]">
                ESTUDIO {String(lightboxIndex + 1).padStart(2, "0")} / {String(EXAM_TILES.length).padStart(2, "0")}
              </span>
              <span className="hidden md:block h-px w-12 bg-[#f5f0e8]/20" />
              <h3 className="font-display font-semibold text-[#f5f0e8] text-lg">{active.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? "Alejar" : "Ampliar"}
                className="w-10 h-10 flex items-center justify-center border border-[#f5f0e8]/15 text-[#f5f0e8] hover:bg-[#f5f0e8]/10 transition-colors"
              >
                {zoomed ? <ZoomOut className="w-4 h-4" strokeWidth={1.75} /> : <ZoomIn className="w-4 h-4" strokeWidth={1.75} />}
              </button>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="w-10 h-10 flex items-center justify-center border border-[#f5f0e8]/15 text-[#f5f0e8] hover:bg-[#f5f0e8]/10 transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>

          {/* Stage */}
          <div className="relative flex-1 flex items-center justify-center overflow-auto px-4 md:px-16 py-6">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Imagen anterior"
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center border border-[#f5f0e8]/15 bg-[#0f3138]/60 text-[#f5f0e8] hover:bg-[#f5f0e8]/10 transition-colors z-10"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
            </button>

            <img
              key={active.img}
              src={active.img}
              alt={active.title}
              onClick={(e) => { e.stopPropagation(); setZoomed((z) => !z); }}
              className={`max-h-full max-w-full object-contain shadow-2xl transition-transform duration-500 ease-out animate-scale-in ${
                zoomed ? "scale-[1.6] cursor-zoom-out" : "scale-100 cursor-zoom-in"
              }`}
            />

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Imagen siguiente"
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 items-center justify-center border border-[#f5f0e8]/15 bg-[#0f3138]/60 text-[#f5f0e8] hover:bg-[#f5f0e8]/10 transition-colors z-10"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
            </button>
          </div>

          {/* Bottom bar */}
          <div
            className="px-6 md:px-10 py-5 border-t border-[#f5f0e8]/10 flex items-center justify-between gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-sans text-[#f5f0e8]/70 text-sm">{active.subtitle}</p>
            <div className="flex items-center gap-2">
              {EXAM_TILES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setLightboxIndex(i); setZoomed(false); }}
                  aria-label={`Ir a imagen ${i + 1}`}
                  className={`h-[2px] transition-all ${i === lightboxIndex ? "w-10 bg-[#c69636]" : "w-6 bg-[#f5f0e8]/25 hover:bg-[#f5f0e8]/50"}`}
                />
              ))}
            </div>
            <p className="hidden md:block font-ui text-[10px] tracking-[0.22em] text-[#f5f0e8]/40">
              ← → NAVEGAR · ESPACIO ZOOM · ESC CERRAR
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
