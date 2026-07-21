import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, Mail, MessageCircle, Instagram, Star, ArrowUpRight, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Brain, Bone, Baby, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";
import OptimizedPicture from "@/components/OptimizedPicture";

// Responsive AVIF/WebP/JPEG srcsets + tiny blurred LQIP + full-res original
// for the lightbox. Generated at build time by vite-imagetools.
import tomografiaRealAsset from "@/assets/tomografia-real.png.asset.json";
import uduzScannerPic from "@/assets/uduz-scanner.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import uduzScannerLqip from "@/assets/uduz-scanner.jpg?w=32&blur=6&format=webp&url";
import uduzScannerFull from "@/assets/uduz-scanner.jpg?w=1920&format=webp&url";
import examsXrayPic from "@/assets/exams-xray.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import examsXrayLqip from "@/assets/exams-xray.jpg?w=32&blur=6&format=webp&url";
import examsXrayFull from "@/assets/exams-xray.jpg?w=1920&format=webp&url";
import examsUltrasoundPic from "@/assets/exams-ultrasound.jpg?w=640;1024;1600&format=avif;webp;jpg&as=picture";
import examsUltrasoundLqip from "@/assets/exams-ultrasound.jpg?w=32&blur=6&format=webp&url";
import examsUltrasoundFull from "@/assets/exams-ultrasound.jpg?w=1920&format=webp&url";
import { ALGOS } from "@/config/algos.config";


const WHATSAPP_NUMBER = ALGOS.contact.whatsappNumber;


const INFO_CARDS = [
  {
    Icon: MapPin,
    label: "01 · UBICACIÓN",
    title: "Ubicación",
    lines: ["Av. 20 con Calle 65, N° 65-02", "C.C. América, Local 4 · Sector Paraíso", "Maracaibo 4005"],
  },
  {
    Icon: Clock,
    label: "02 · HORARIO",
    title: "Horario",
    lines: ["Lunes a viernes · 7:00 AM - 4:00 PM"],
  },
  {
    Icon: Phone,
    label: "03 · TELÉFONO",
    title: "Teléfono",
    lines: ["0414-680 7886 · Solo mensajes", "0412-061 7410 · Solo llamadas"],
  },
  {
    Icon: Mail,
    label: "04 · EMAIL",
    title: "Email",
    email: "info@algoscentrodolor.com",
  },
];

const IMG_TOMO = { pic: uduzScannerPic, lqip: uduzScannerLqip, full: uduzScannerFull };
const IMG_XRAY = { pic: examsXrayPic, lqip: examsXrayLqip, full: examsXrayFull };
const IMG_ECO  = { pic: examsUltrasoundPic, lqip: examsUltrasoundLqip, full: examsUltrasoundFull };

const EXAM_TILES = [
  { title: "Tomografía", subtitle: "Alta resolución · mismo día", image: IMG_TOMO, span: "col-span-2 row-span-2 md:col-span-2 md:row-span-2" },
  { title: "Rayos X", subtitle: "Interpretación por el mismo equipo", image: IMG_XRAY, span: "col-span-1 md:col-span-2" },
  { title: "Ecografía", subtitle: "Doppler · obstétrica · musculoesquelética", image: IMG_ECO, span: "col-span-1 md:col-span-2" },
];

const STUDY_TYPES = [
  {
    id: "tomografia",
    label: "Tomografía",
    icon: Brain,
    description: "Estudios de Tomografía Computarizada (TC) con tecnología multicorte que genera imágenes detalladas de órganos, tejidos blandos y estructuras óseas en cortes milimétricos.",
    indications: [
      "Evaluación de patologías en columna vertebral y médula espinal",
      "Detección de tumores, fracturas y alteraciones óseas",
      "Estudio de vasos sanguíneos (AngioTC) sin cateterismo",
      "Planificación prequirúrgica y seguimiento postoperatorio",
    ],
    preparation: "Ayuno de 4 horas si requiere contraste. Informar alergias previas. Retirar objetos metálicos.",
    duration: "10 - 20 minutos",
    image: IMG_TOMO,
  },
  {
    id: "rayos-x",
    label: "Rayos X",
    icon: Bone,
    description: "Radiografía digital de alta resolución con dosis mínima de radiación. Ideal para diagnóstico inicial y seguimiento de condiciones traumatológicas y degenerativas.",
    indications: [
      "Fracturas, luxaciones y lesiones traumáticas",
      "Artrosis y enfermedades degenerativas articulares",
      "Escoliosis y alteraciones de la curvatura espinal",
      "Control de consolidación ósea postquirúrgica",
    ],
    preparation: "No requiere preparación especial. Retirar joyería y objetos metálicos de la zona a estudiar.",
    duration: "5 - 10 minutos",
    image: IMG_XRAY,
  },
  {
    id: "ecografia",
    label: "Ecografía",
    icon: Activity,
    description: "Ultrasonido médico en tiempo real con doppler para evaluar fl sanguíneo, tejidos blandos, articulaciones y estructuras superficiales sin radiación ionizante.",
    indications: [
      "Ecografía musculoesquelética: tendones, ligamentos, músculos",
      "Doppler vascular: evaluación de circulación arterial y venosa",
      "Ecografía obstétrica y ginecológica",
      "Guía ecográfica para procedimientos intervencionistas",
    ],
    preparation: "Según región: ayuno (abdominal) o vejiga llena (ginecológica). Indicaciones específicas al agendar.",
    duration: "20 - 40 minutos",
    image: IMG_ECO,
  },
  {
    id: "mamografia",
    label: "Mamografía 3D",
    icon: Baby,
    description: "Tomosíntesis digital que captura múltiples imágenes del tejido mamario en arcos de 15°, reconstruyendo una vista tridimensional para mayor precisión diagnóstica.",
    indications: [
      "Detección temprana de cáncer de mama, incluso en tejido denso",
      "Evaluación de microcalcificaciones y masas sospechosas",
      "Estudios de tamización en mujeres mayores de 40 años",
      "Seguimiento de pacientes con antecedentes familiares",
    ],
    preparation: "No usar desodorante, talco ni loción en axilas o mamas el día del estudio. Programar en la primera mitad del ciclo menstrual.",
    duration: "15 - 20 minutos",
    image: IMG_TOMO,
  },
];


function StudyTabs() {
  const [active, setActive] = useState(STUDY_TYPES[0].id);
  const current = STUDY_TYPES.find((s) => s.id === active)!;
  const Icon = current.icon;

  return (
    <div className="border border-[#f5f0e8]/10 bg-[#0f3138]">
      {/* Tab bar */}
      <div className="flex overflow-x-auto border-b border-[#f5f0e8]/10 no-scrollbar">
        {STUDY_TYPES.map((s) => {
          const TabIcon = s.icon;
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s.id)}
              className={`flex-shrink-0 flex items-center gap-2.5 px-5 md:px-8 py-4 md:py-5 font-ui text-[11px] md:text-xs tracking-[0.18em] uppercase transition-colors border-r border-[#f5f0e8]/10 last:border-r-0 ${
                isActive
                  ? "bg-[#f5f0e8]/[0.06] text-[#c69636]"
                  : "text-[#f5f0e8]/50 hover:text-[#f5f0e8]/80 hover:bg-[#f5f0e8]/[0.03]"
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
        {/* Image */}
        <div className="md:col-span-2 relative overflow-hidden min-h-[240px] md:min-h-[380px] bg-black">
          <OptimizedPicture
            picture={current.image.pic}
            placeholder={current.image.lqip}
            alt={current.label}
            className="absolute inset-0 w-full h-full"
            imgClassName="absolute inset-0 w-full h-full object-cover opacity-75"
            sizes="(min-width: 768px) 40vw, 100vw"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0f3138]/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <div className="flex items-center gap-2 mb-2">
              <Icon className="w-4 h-4 text-[#c69636]" strokeWidth={1.5} />
              <span className="font-ui text-[10px] tracking-[0.28em] text-[#c69636] uppercase">
                {current.label}
              </span>
            </div>
            <p className="font-ui text-[10px] tracking-[0.22em] text-[#f5f0e8]/50 uppercase">
              Duración estimada: {current.duration}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="md:col-span-3 p-6 md:p-10 flex flex-col gap-8">
          <div>
            <p className="font-sans text-[#f5f0e8]/85 text-[15px] md:text-base leading-relaxed">
              {current.description}
            </p>
          </div>

          <div className="border-t border-[#f5f0e8]/10 pt-8">
            <p className="font-ui text-[10px] tracking-[0.28em] text-[#c69636] uppercase mb-5">
              Indicaciones principales
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.indications.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-[#c69636] mt-2 flex-shrink-0" />
                  <span className="font-sans text-[#f5f0e8]/70 text-sm leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[#f5f0e8]/10 pt-8">
            <p className="font-ui text-[10px] tracking-[0.28em] text-[#c69636] uppercase mb-3">
              Preparación del paciente
            </p>
            <p className="font-sans text-[#f5f0e8]/70 text-sm leading-relaxed">
              {current.preparation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        canonical="https://algoscentrodolor.com/contacto"
      />
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: "https://algoscentrodolor.com" },
          { name: "Contacto", url: "https://algoscentrodolor.com/contacto" },
        ]}
      />
      <Navbar />
      <main>
        {/* HERO */}
        <section className="bg-cream pt-28 md:pt-32 pb-12 md:pb-16">
          <div className="container mx-auto max-w-4xl px-6 md:px-12 text-center">
            <p className="text-[#1a4a55] font-medium text-sm tracking-[0.25em] uppercase mb-6">
              HABLEMOS
            </p>
            <h1 className="font-display font-bold text-[#1a4a55] text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-6">
              ¿En qué podemos{" "}
              <span className="text-[#9a7320] font-bold">ayudarle</span>?
            </h1>
            <p className="font-sans text-[#1a4a55]/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              Cada consulta tiene un camino diferente. Elija el que mejor describe su necesidad y le conectamos con la persona correcta.
            </p>
          </div>
        </section>


        {/* CONTACTO DIRECTO, BENTO */}
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

            {/* Bento grid, no rounded corners, hairline dividers */}
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
                Escríbanos por WhatsApp y coordinamos una llamada.
              </a>
            </p>
          </div>
        </section>

        {/* UDUZ, BRANDED BENTO */}
        <section className="bg-[#134F5C] py-20 md:py-28 relative overflow-hidden">
          {/* Ambient gold glow */}
          <div
            aria-hidden
            className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full opacity-[0.08] blur-3xl"
            style={{ background: "radial-gradient(circle, #8DC63F 0%, transparent 70%)" }}
          />

          <div className="container mx-auto max-w-6xl px-6 md:px-12 relative">
            <div className="mb-10 md:mb-14 flex items-end justify-between gap-6">
              <div>
                <p className="text-[#8DC63F] font-medium text-xs tracking-[0.28em] uppercase mb-4">
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
              <div className="col-span-2 md:col-span-2 md:row-span-2 bg-white p-9 md:p-10 flex flex-col justify-between min-h-[320px] relative overflow-hidden">
                <div>
                  <p className="font-ui text-[10px] tracking-[0.28em] text-[#134F5C]/70 font-semibold mb-6">
                    UNIDAD DE DIAGNÓSTICO<br />UNIVERSITARIA DEL ZULIA
                  </p>
                  <div className="flex flex-col gap-5">
                    {/* UDUZ dot mark: 2 verde-amarillo arriba, 2 teal abajo */}
                    <div className="grid grid-cols-2 gap-[6px] shrink-0" style={{ width: "clamp(44px, 5vw, 60px)" }}>
                      <span className="aspect-square rounded-full bg-[#8DC63F]" />
                      <span className="aspect-square rounded-full bg-[#8DC63F]" />
                      <span className="aspect-square rounded-full bg-[#1B6B78]" />
                      <span className="aspect-square rounded-full bg-[#1B6B78]" />
                    </div>
                    <h3
                      className="font-display font-medium text-[#1B6B78] leading-[0.85] tracking-[0.04em]"
                      style={{ fontSize: "clamp(52px, 7vw, 88px)" }}
                    >
                      UDUZ
                    </h3>
                  </div>

                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-[#1B6B78] fill-[#1B6B78]" strokeWidth={0} />
                    <span className="font-sans text-[#1B6B78] text-sm font-semibold">4.8</span>
                    <span className="font-sans text-[#1B6B78]/70 text-sm">· 246 reseñas en Google</span>
                  </div>
                  <p className="font-sans text-[#1B6B78]/85 text-sm leading-relaxed max-w-[28ch]">
                    Tomografía · Rayos X · Mamografía 3D · Ecografía · Laboratorio
                  </p>
                </div>
              </div>

              {/* Cinematic scanner image */}
              <div className="col-span-2 md:col-span-4 md:row-span-2 relative overflow-hidden min-h-[320px] bg-black group">
                <OptimizedPicture
                  picture={uduzScannerPic}
                  placeholder={uduzScannerLqip}
                  alt="Tomógrafo UDUZ"
                  className="absolute inset-0 w-full h-full"
                  imgClassName="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  sizes="(min-width: 768px) 65vw, 100vw"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-[#134F5C] via-[#134F5C]/40 to-transparent" />
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
                  <p className="font-ui text-[10px] tracking-[0.28em] text-[#8DC63F] mb-3">
                    TECNOLOGÍA
                  </p>
                  <h4 className="font-display font-semibold text-[#f5f0e8] text-2xl md:text-3xl leading-tight max-w-md">
                    Equipos de última generación, resultados el mismo día.
                  </h4>
                </div>
              </div>

              {/* Address */}
              <div className="col-span-1 md:col-span-2 bg-[#0F5964] p-6 md:p-9 min-h-[160px] md:min-h-[180px] flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-ui text-[10px] tracking-[0.22em] text-[#f5f0e8]/45 font-medium">
                    01 · DIRECCIÓN
                  </span>
                  <MapPin className="w-4 h-4 text-[#8DC63F]" strokeWidth={1.75} />
                </div>
                <p className="font-sans text-[#f5f0e8] text-[15px] leading-snug">
                  Av. 4001, Maracaibo<br />
                  <span className="text-[#f5f0e8]/70">Sector Paraíso</span>
                </p>
              </div>

              {/* Phone */}
              <div className="col-span-1 md:col-span-2 bg-[#0F5964] p-6 md:p-9 min-h-[160px] md:min-h-[180px] flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-ui text-[10px] tracking-[0.22em] text-[#f5f0e8]/45 font-medium">
                    02 · CONTACTO
                  </span>
                  <Phone className="w-4 h-4 text-[#8DC63F]" strokeWidth={1.75} />
                </div>
                <div>
                  <a href="tel:+584120617410" className="font-display font-semibold text-[#f5f0e8] text-xl hover:text-[#8DC63F] transition-colors block">
                    +58 412-061 7410
                  </a>
                  <a
                    href={`https://wa.me/584146807886?text=${encodeURIComponent("Hola, me refieren desde ALGOS Centro de Dolor. Quisiera coordinar un estudio diagnóstico.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 font-sans text-[#8DC63F] hover:text-[#f5f0e8] transition-colors text-sm font-medium"
                  >
                    <MessageCircle className="w-3.5 h-3.5" strokeWidth={2} />
                    Escribir por WhatsApp
                  </a>
                  <p className="font-sans text-[#f5f0e8]/60 text-xs mt-1 tracking-wide">Lun-Sáb · 6:30 - 19:00</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="col-span-2 md:col-span-2 bg-[#0F5964] p-6 md:p-9 min-h-[160px] md:min-h-[180px] flex flex-col justify-between">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-ui text-[10px] tracking-[0.22em] text-[#f5f0e8]/45 font-medium">
                    03 · REDES
                  </span>
                  <Instagram className="w-4 h-4 text-[#8DC63F]" strokeWidth={1.75} />
                </div>
                <a
                  href="https://instagram.com/uduz_maracaibo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 font-display font-semibold text-[#f5f0e8] text-xl hover:text-[#8DC63F] transition-colors"
                >
                  @uduz_maracaibo
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>

            {/* Cinematic exam gallery */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-6 gap-px bg-[#f5f0e8]/10 border border-[#f5f0e8]/10">
              {EXAM_TILES.map((tile, i) => (
                <button
                  key={tile.title}
                  type="button"
                  onClick={() => open(i)}
                  aria-label={`Ampliar imagen: ${tile.title}`}
                  className={`group relative overflow-hidden bg-black min-h-[220px] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#134F5C] cursor-zoom-in ${tile.span}`}
                >
                  <OptimizedPicture
                    picture={tile.image.pic}
                    placeholder={tile.image.lqip}
                    alt={tile.title}
                    className="absolute inset-0 w-full h-full"
                    imgClassName="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                    sizes="(min-width: 768px) 33vw, 50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#134F5C] via-[#134F5C]/30 to-transparent" />
                  <div className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[#134F5C]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-[#f5f0e8]" strokeWidth={1.75} />
                  </div>
                  <div className="absolute inset-0 p-6 md:p-7 flex flex-col justify-end">
                    <p className="font-ui text-[10px] tracking-[0.28em] text-[#8DC63F] mb-2">
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

            {/* TIPOS DE ESTUDIOS, TABS */}
            <div className="mt-16">
              <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <p className="text-[#8DC63F] font-medium text-xs tracking-[0.28em] uppercase mb-4">
                    INFORMACIÓN CLÍNICA
                  </p>
                  <h3 className="font-display font-bold text-[#f5f0e8] text-2xl md:text-4xl leading-[1.05] tracking-tight">
                    Tipos de estudios
                  </h3>
                </div>
              </div>

              <StudyTabs />
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
              <span>Escribir por WhatsApp</span>
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
        aria-label="Escribir por WhatsApp"
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
              key={active.image.full}
              src={active.image.full}
              alt={active.title}
              decoding="async"
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
