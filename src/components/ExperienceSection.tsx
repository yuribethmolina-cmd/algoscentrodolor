import suiteVip from "@/assets/suite-vip.jpg";
import recepcion from "@/assets/recepcion.jpg";
import salaProcedimientos from "@/assets/sala-procedimientos.jpg";
import suitePrep from "@/assets/suite-prep.jpg";
import consultorio from "@/assets/consultorio.jpg";
import suiteVipEmpty from "@/assets/suite-vip-empty.jpg";
import salaEspera from "@/assets/sala-espera.jpg";
import nutricionBar from "@/assets/nutricion-bar.jpg";

const gallery = [
  { src: suiteVip, label: "Suite VIP — Terapias Endovenosas" },
  { src: consultorio, label: "Consultorio — Dr. Atilio Rodríguez" },
  { src: recepcion, label: "Recepción ALGOS" },
  { src: salaProcedimientos, label: "Sala de Procedimientos" },
  { src: suiteVipEmpty, label: "Suite de Recuperación" },
  { src: salaEspera, label: "Sala de espera" },
  { src: suitePrep, label: "Preparación de terapias" },
  { src: nutricionBar, label: "ALGOS Nutrición Clínica" },
];

export default function ExperienceSection() {
  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="scroll-reveal text-center mb-16">
          <p className="text-secondary/80 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
            Experiencia
          </p>
          <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground leading-tight mb-6">
            Esto es diferente
            <br />
            <span className="font-light text-secondary">a lo que conoces</span>
          </h2>
          <p className="text-primary-foreground/60 font-light text-lg max-w-2xl mx-auto">
            Desde el primer contacto hasta tu recuperación, cada detalle está pensado
            para que te sientas seguro, cómodo y en las mejores manos.
          </p>
        </div>

        {/* Curated Grid — 4 columns, specific spans */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
          {/* Row 1-2: Large hero + 2 stacked */}
          <div className="scroll-reveal col-span-1 md:col-span-2 row-span-2 group relative rounded-2xl overflow-hidden">
            <img src={gallery[0].src} alt={gallery[0].label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <span className="text-primary-foreground/80 text-xs font-light tracking-wider uppercase">{gallery[0].label}</span>
            </div>
          </div>
          <div className="scroll-reveal scroll-reveal-delay-1 group relative rounded-2xl overflow-hidden">
            <img src={gallery[1].src} alt={gallery[1].label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <span className="text-primary-foreground/80 text-xs font-light tracking-wider uppercase">{gallery[1].label}</span>
            </div>
          </div>
          <div className="scroll-reveal scroll-reveal-delay-2 group relative rounded-2xl overflow-hidden">
            <img src={gallery[2].src} alt={gallery[2].label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <span className="text-primary-foreground/80 text-xs font-light tracking-wider uppercase">{gallery[2].label}</span>
            </div>
          </div>
          <div className="scroll-reveal scroll-reveal-delay-3 group relative rounded-2xl overflow-hidden">
            <img src={gallery[3].src} alt={gallery[3].label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <span className="text-primary-foreground/80 text-xs font-light tracking-wider uppercase">{gallery[3].label}</span>
            </div>
          </div>
          <div className="scroll-reveal scroll-reveal-delay-4 group relative rounded-2xl overflow-hidden">
            <img src={gallery[4].src} alt={gallery[4].label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <span className="text-primary-foreground/80 text-xs font-light tracking-wider uppercase">{gallery[4].label}</span>
            </div>
          </div>

          {/* Row 3-4: 2 tall + large hero */}
          <div className="scroll-reveal scroll-reveal-delay-1 row-span-2 group relative rounded-2xl overflow-hidden">
            <img src={gallery[5].src} alt={gallery[5].label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <span className="text-primary-foreground/80 text-xs font-light tracking-wider uppercase">{gallery[5].label}</span>
            </div>
          </div>
          <div className="scroll-reveal scroll-reveal-delay-2 row-span-2 group relative rounded-2xl overflow-hidden">
            <img src={gallery[6].src} alt={gallery[6].label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <span className="text-primary-foreground/80 text-xs font-light tracking-wider uppercase">{gallery[6].label}</span>
            </div>
          </div>
          <div className="scroll-reveal col-span-2 row-span-2 group relative rounded-2xl overflow-hidden">
            <img src={gallery[7].src} alt={gallery[7].label} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <span className="text-primary-foreground/80 text-xs font-light tracking-wider uppercase">{gallery[7].label}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
