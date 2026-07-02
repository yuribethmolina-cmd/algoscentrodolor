import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getConditionImage } from "@/data/conditionImages";
import imgSala from "@/assets/sala-procedimientos.jpg";
import imgTech from "@/assets/experience-tech.jpg";
import imgConsult from "@/assets/experience-consult.jpg";

type Slide = { src: string; caption: string };

export default function ConditionGallery({
  slug,
  conditionName,
  heroSrc,
}: {
  slug?: string;
  conditionName: string;
  heroSrc?: string;
}) {
  const hero = heroSrc ?? (slug ? getConditionImage(slug) : imgConsult);
  const slides: Slide[] = [
    { src: hero, caption: `Referencia visual · ${conditionName.toLowerCase()}` },
    { src: imgConsult, caption: "Consulta y valoración con el especialista" },
    { src: imgTech, caption: "Guía por imagen: fluoroscopia y ecografía" },
    { src: imgSala, caption: "Sala de procedimientos ambulatorios ALGOS" },
  ];

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="w-full"
      >
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={i}>
              <figure className="group relative w-full aspect-[16/9] overflow-hidden bg-[#1a4a55]/5">
                <img
                  src={s.src}
                  alt={s.caption}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.02]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a4a55]/85 via-[#1a4a55]/40 to-transparent px-6 py-5 md:px-8 md:py-6">
                  <p className="font-sans text-[#f5f0e8] text-sm md:text-base leading-snug">
                    {s.caption}
                  </p>
                </figcaption>
              </figure>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3 md:left-4 bg-[#f5f0e8]/95 border-[#1a4a55]/15 text-[#1a4a55] hover:bg-white" />
        <CarouselNext className="right-3 md:right-4 bg-[#f5f0e8]/95 border-[#1a4a55]/15 text-[#1a4a55] hover:bg-white" />
      </Carousel>

      <div className="flex items-center justify-center gap-2 mt-5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir a imagen ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={`h-1.5 rounded-full transition-all ${
              current === i
                ? "w-8 bg-[#c69636]"
                : "w-3 bg-[#1a4a55]/25 hover:bg-[#1a4a55]/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
