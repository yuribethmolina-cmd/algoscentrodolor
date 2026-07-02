import { getConditionImage } from "@/data/conditionImages";

export default function ConditionGallery({
  slug,
  conditionName,
  heroSrc,
}: {
  slug?: string;
  conditionName: string;
  heroSrc?: string;
}) {
  const hero = heroSrc ?? (slug ? getConditionImage(slug) : undefined);
  if (!hero) return null;

  return (
    <div className="w-full">
      <figure className="group relative w-full aspect-[16/9] overflow-hidden bg-[#1a4a55]/5">
        <img
          src={hero}
          alt={`Referencia visual · ${conditionName.toLowerCase()}`}
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1a4a55]/85 via-[#1a4a55]/30 to-transparent px-6 py-5 md:px-8 md:py-6">
          <p className="font-sans text-[#f5f0e8] text-sm md:text-base leading-snug">
            Referencia visual · {conditionName.toLowerCase()}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
