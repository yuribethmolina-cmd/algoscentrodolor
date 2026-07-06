import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  children: ReactNode;
}

/** Centered intro paragraph with reveal-on-scroll. */
export default function ProcedureIntro({ eyebrow, children }: Props) {
  return (
    <section className="bg-cream pt-24 md:pt-28 pb-4">
      <div className="mx-auto max-w-[860px] px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-algos-gold" />
            <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.24em]">
              {eyebrow}
            </p>
          </div>
          <p className="font-sans text-deep-teal text-[19px] md:text-[21px] leading-[1.65]">
            {children}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
