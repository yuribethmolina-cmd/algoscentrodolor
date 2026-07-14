import Picture from "@/components/Picture";
import suiteVip from "@/assets/suite-vip.jpg?w=480;800;1200&format=avif;webp;jpg&as=picture";
import recepcion from "@/assets/recepcion.jpg?w=320;480;720&format=avif;webp;jpg&as=picture";
import salaProcedimientos from "@/assets/sala-procedimientos.jpg?w=320;480;720&format=avif;webp;jpg&as=picture";
import suitePrep from "@/assets/suite-prep.jpg?w=320;480;720&format=avif;webp;jpg&as=picture";
import consultorio from "@/assets/consultorio.jpg?w=320;480;720&format=avif;webp;jpg&as=picture";
import suiteVipEmpty from "@/assets/suite-vip-empty.jpg?w=320;480;720&format=avif;webp;jpg&as=picture";
import salaEspera from "@/assets/sala-espera.jpg?w=320;480;720&format=avif;webp;jpg&as=picture";
import nutricionBar from "@/assets/nutricion-bar.jpg?w=480;800;1200&format=avif;webp;jpg&as=picture";

const gallery = [
  { pic: suiteVip, label: "Suite VIP, Terapias Endovenosas" },
  { pic: consultorio, label: "Consultorio, Dr. Atilio Rodríguez" },
  { pic: recepcion, label: "Recepción ALGOS" },
  { pic: salaProcedimientos, label: "Sala de Procedimientos" },
  { pic: suiteVipEmpty, label: "Suite de Recuperación" },
  { pic: salaEspera, label: "Sala de espera" },
  { pic: suitePrep, label: "Preparación de terapias" },
  { pic: nutricionBar, label: "ALGOS Nutrición Clínica" },
];

const imgCls =
  "absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105";

function GalleryCell({
  index,
  wrapperCls,
  sizes,
}: {
  index: number;
  wrapperCls: string;
  sizes: string;
}) {
  const { pic, label } = gallery[index];
  return (
    <div className={wrapperCls}>
      <Picture picture={pic} alt={label} sizes={sizes} className={imgCls} fadeIn={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
        <span className="text-primary-foreground/80 text-xs font-light tracking-wider uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
          <GalleryCell
            index={0}
            wrapperCls="scroll-reveal col-span-1 md:col-span-2 row-span-2 group relative rounded-2xl overflow-hidden"
            sizes="(max-width: 768px) 50vw, 50vw"
          />
          <GalleryCell
            index={1}
            wrapperCls="scroll-reveal scroll-reveal-delay-1 group relative rounded-2xl overflow-hidden"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <GalleryCell
            index={2}
            wrapperCls="scroll-reveal scroll-reveal-delay-2 group relative rounded-2xl overflow-hidden"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <GalleryCell
            index={3}
            wrapperCls="scroll-reveal scroll-reveal-delay-3 group relative rounded-2xl overflow-hidden"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <GalleryCell
            index={4}
            wrapperCls="scroll-reveal scroll-reveal-delay-4 group relative rounded-2xl overflow-hidden"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <GalleryCell
            index={5}
            wrapperCls="scroll-reveal scroll-reveal-delay-1 row-span-2 group relative rounded-2xl overflow-hidden"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <GalleryCell
            index={6}
            wrapperCls="scroll-reveal scroll-reveal-delay-2 row-span-2 group relative rounded-2xl overflow-hidden"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <GalleryCell
            index={7}
            wrapperCls="scroll-reveal col-span-2 row-span-2 group relative rounded-2xl overflow-hidden"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
