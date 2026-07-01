import { Link } from "react-router-dom";
import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";

const WHATSAPP_NUMBER = "584246467944";

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
    title: "Ubicación",
    lines: ["CC América, Local N° 4", "Av. 20 con Calle 65", "Sector Paraíso · Maracaibo"],
  },
  {
    Icon: Clock,
    title: "Horario",
    lines: ["Lunes a viernes", "8:00 – 18:00", "Sábados · cita previa"],
  },
  {
    Icon: Phone,
    title: "Teléfono",
    lines: ["0414-680 7886", "0412-061 7410"],
  },
  {
    Icon: Mail,
    title: "Email",
    email: "info@algoscentrodolor.com",
  },
];

export default function Contacto() {
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
        <section className="bg-cream pt-32 md:pt-40 pb-12 md:pb-16">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {AUDIENCE_CARDS.map((c) => (
                <article
                  key={c.eyebrow}
                  className="rounded-2xl p-10 md:p-12 flex flex-col text-[#f5f0e8]"
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
                    className="inline-flex items-center gap-2 hover:gap-3 transition-all rounded-full px-6 py-3 font-semibold text-sm self-start"
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

        {/* CONTACTO DIRECTO */}
        <section className="bg-white py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-6 md:px-12">
            <div className="text-center mb-12 md:mb-16">
              <p className="text-[#c69636] font-medium text-sm tracking-[0.25em] uppercase mb-4">
                CONTACTO DIRECTO
              </p>
              <h2 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl">
                Llámenos, escríbanos o visítenos.
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {INFO_CARDS.map(({ Icon, title, lines, email }) => (
                <div
                  key={title}
                  className="bg-cream rounded-2xl p-8 border border-[#1a4a55]/10 flex flex-col items-center text-center hover:border-[#c69636]/40 transition-colors min-h-[220px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#c69636]/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-[#c69636]" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-semibold text-[#1a4a55] text-base mb-3">
                    {title}
                  </h3>
                  <div className="flex flex-col gap-1 flex-1 justify-center">
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="font-sans text-sm text-[#1a4a55]/85 leading-snug hover:text-[#c69636] transition-colors break-all"
                      >
                        {email}
                      </a>
                    ) : (
                      lines?.map((l) => (
                        <p key={l} className="font-sans text-sm text-[#1a4a55]/85 leading-snug">
                          {l}
                        </p>
                      ))
                    )}
                  </div>
                </div>
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
              className="inline-flex items-center gap-2 hover:gap-3 transition-all bg-[#1a4a55] text-[#f5f0e8] rounded-full px-7 py-3.5 font-semibold text-sm"
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.75} />
              <span>Escríbanos por WhatsApp</span>
            </a>
          </div>
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}
