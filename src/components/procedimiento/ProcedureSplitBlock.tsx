import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Props {
  image: string;
  imageAlt: string;
  eyebrow: string;
  children: ReactNode;
  /** flip image to right column */
  reverse?: boolean;
  imageCaption?: string;
  /** On mobile, letterbox the full image (no crop) instead of aspect crop. */
  mobileContain?: boolean;
}

/**
 * Asymmetric cinematic split: image and text with parallax + reveal.
 * Image column is wider than the text column for editorial rhythm.
 */
export default function ProcedureSplitBlock({
  image,
  imageAlt,
  eyebrow,
  children,
  reverse = false,
  imageCaption,
  mobileContain = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div
          className={`grid md:grid-cols-12 gap-12 md:gap-16 items-center ${
            reverse ? "md:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Image column — 7/12 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7 relative"
          >
            {mobileContain && (
              <div className="md:hidden relative overflow-hidden bg-deep-teal/5">
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  className="block w-full h-auto object-contain"
                />
              </div>
            )}
            <div
              className={
                (mobileContain ? "hidden md:block " : "") +
                "relative overflow-hidden bg-deep-teal/5"
              }
              style={{ aspectRatio: "5/4" }}
            >
              <motion.img
                src={image}
                alt={imageAlt}
                loading="lazy"
                style={{ y }}
                className="absolute inset-0 w-full h-[115%] object-cover will-change-transform"
              />
              {/* subtle color wash */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(26,74,85,0) 60%, rgba(26,74,85,0.25) 100%)",
                }}
              />
            </div>
            {imageCaption && (
              <p className="font-sans text-steel-teal text-[12px] tracking-[0.18em] uppercase mt-4">
                {imageCaption}
              </p>
            )}
          </motion.div>

          {/* Text column — 5/12 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5"
          >
            <div className="border-l-2 border-algos-gold/70 pl-6 md:pl-8">
              <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.24em] mb-4 md:mb-5">
                {eyebrow}
              </p>
              <div className="font-sans text-deep-teal text-[16px] md:text-[17px] leading-[1.7] md:leading-[1.75] space-y-5 md:space-y-4">
                {children}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
