import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  src: string;
  poster?: string;
  caption?: string;
}

/**
 * Full-bleed ambient video block, plays muted, looped, decorative.
 * Matches the cinematic language of ProcedureHeroImage.
 */
export default function ProcedureAmbientVideo({ src, poster, caption }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={ref} className="relative w-full bg-deep-teal overflow-hidden">
      <div className="relative w-full h-[52vh] md:h-[72vh] max-h-[720px] min-h-[360px]">
        <motion.div style={{ y }} className="absolute inset-0 will-change-transform">
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)",
          }}
        />
        {/* top fade to blend with hero */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24"
          style={{ background: "linear-gradient(to bottom, rgba(26,74,85,0.55), transparent)" }}
        />
        {/* bottom fade to cream */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to top, rgba(245,240,232,0.9), transparent)" }}
        />

        {caption && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 md:left-12 bottom-8 md:bottom-12 max-w-[420px]"
          >
            <div className="h-px w-10 bg-algos-gold mb-3" />
            <p className="font-sans text-cream text-[13px] md:text-[14px] leading-[1.5] tracking-wide">
              {caption}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
