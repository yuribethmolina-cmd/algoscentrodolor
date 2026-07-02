import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  src: string;
  alt: string;
  caption?: string;
  /** On mobile, letterbox the full image (no crop) instead of cover crop. */
  mobileContain?: boolean;
}

/**
 * Cinematic full-bleed hero image for procedure pages.
 * - True full-bleed (edge to edge)
 * - Ken Burns slow zoom on mount
 * - Parallax on scroll
 * - Vignette + top-fade for editorial feel
 */
export default function ProcedureHeroImage({ src, alt, caption, mobileContain = false }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  return (
    <div
      ref={ref}
      className={
        "relative w-full overflow-hidden " +
        (mobileContain ? "bg-cream md:bg-deep-teal" : "bg-deep-teal")
      }
    >
      <div
        className={
          mobileContain
            ? "relative w-full h-auto md:h-[72vh] md:max-h-[720px] md:min-h-[360px]"
            : "relative w-full h-[52vh] md:h-[72vh] max-h-[720px] min-h-[360px]"
        }
      >
        {mobileContain && (
          <img
            src={src}
            alt={alt}
            className="block md:hidden w-full h-auto object-contain"
            loading="eager"
          />
        )}
        <motion.div
          style={{ y, scale }}
          className={
            mobileContain
              ? "hidden md:block absolute inset-0 will-change-transform"
              : "absolute inset-0 will-change-transform"
          }
        >
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>
        {/* vignette — softened on mobile-contain to avoid darkening letterbox bars */}
        <div
          className={
            (mobileContain ? "hidden md:block " : "") +
            "pointer-events-none absolute inset-0"
          }
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
          }}
        />
        {/* top fade to blend with hero — desktop/cover only */}
        <div
          className={
            (mobileContain ? "hidden md:block " : "") +
            "pointer-events-none absolute inset-x-0 top-0 h-24"
          }
          style={{ background: "linear-gradient(to bottom, rgba(26,74,85,0.55), transparent)" }}
        />
        {/* bottom fade to cream — desktop/cover only (avoid washing contained image) */}
        <div
          className={
            (mobileContain ? "hidden md:block " : "") +
            "pointer-events-none absolute inset-x-0 bottom-0 h-32"
          }
          style={{ background: "linear-gradient(to top, rgba(245,240,232,0.9), transparent)" }}
        />
        {/* Mobile-contain: legibility scrim only behind the caption zone */}
        {mobileContain && caption && (
          <div
            className="md:hidden pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{
              background:
                "linear-gradient(to top, rgba(26,74,85,0.72) 0%, rgba(26,74,85,0.35) 55%, rgba(26,74,85,0) 100%)",
            }}
          />
        )}

        {caption && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 md:left-12 bottom-6 md:bottom-12 max-w-[420px]"
          >
            <div className="h-px w-10 bg-algos-gold mb-3" />
            <p
              className="font-sans text-cream text-[13px] md:text-[14px] leading-[1.5] tracking-wide"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.45)" }}
            >
              {caption}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
