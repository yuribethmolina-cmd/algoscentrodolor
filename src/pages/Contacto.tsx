import { MapPin, Clock, Phone, Mail, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbSchema } from "@/components/StructuredData";

import { ALGOS } from "@/config/algos.config";


const WHATSAPP_NUMBER = ALGOS.contact.whatsappNumber;


const INFO_CARDS = [
  {
    Icon: MapPin,
    label: "01 · UBICACIÓN",
    title: "Ubicación",
    lines: ["Av. 15 Delicias", "Edif. Hospital Clínico · Urb. La Trinidad", "Maracaibo, Estado Zulia"],
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

export default function Contacto() {

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

    </div>
  );
}
