import { useEffect, useRef, useState, ReactNode } from "react";

/** Single-shot IntersectionObserver hook. */
export function useInViewOnce<T extends Element>(
  threshold: number | number[] = 0.25,
  rootMargin = "0px 0px -10% 0px"
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin, inView]);

  return { ref, inView } as const;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Draws SVG path strokes on scroll. duration in ms, stagger between paths. */
export function useDrawSVG(
  duration = 2000,
  stagger = 300,
  threshold = 0.3
) {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (prefersReducedMotion()) return;

    const paths = Array.from(svg.querySelectorAll<SVGPathElement>("path"));
    paths.forEach((p) => {
      const len =
        typeof p.getTotalLength === "function" ? p.getTotalLength() : 1000;
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.4,0,0.2,1)`;
    });

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            paths.forEach((p, i) => {
              p.style.transitionDelay = `${i * stagger}ms`;
              p.style.strokeDashoffset = "0";
            });
            obs.disconnect();
            break;
          }
        }
      },
      { threshold }
    );
    obs.observe(svg);
    return () => obs.disconnect();
  }, [duration, stagger, threshold]);
  return ref;
}

/** Like useDrawSVG but operates on any container; finds all <path> within. */
export function useDrawPathsWithin<T extends HTMLElement>(
  duration = 1500,
  stagger = 120,
  threshold = 0.3
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    const paths = Array.from(el.querySelectorAll<SVGPathElement>("path"));
    paths.forEach((p) => {
      const len =
        typeof p.getTotalLength === "function" ? p.getTotalLength() : 1000;
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
      p.style.transition = `stroke-dashoffset ${duration}ms cubic-bezier(0.4,0,0.2,1)`;
    });
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            paths.forEach((p, i) => {
              p.style.transitionDelay = `${i * stagger}ms`;
              p.style.strokeDashoffset = "0";
            });
            obs.disconnect();
            break;
          }
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [duration, stagger, threshold]);
  return ref;
}

/** Count-up animation, eases out cubic. */
export function useCountUp(target: number, durationMs: number, start: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (prefersReducedMotion()) {
      setVal(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, start]);
  return val;
}

/** Splits text into <span class="hw"> word spans with staggered delays.
 *  Wraps result in a host span. The PARENT element should toggle `.in-view`
 *  to trigger the animation. Use baseDelay (ms) to offset by chunk position.
 *  italic / color make a single emphasized run with slower stagger (120ms). */
type Chunk = {
  text: string;
  italic?: boolean;
  color?: string;
  staggerMs?: number; // override per-word stagger
};

export function HeadlineReveal({
  chunks,
  baseDelay = 0,
  className,
  as: Tag = "span",
  style,
}: {
  chunks: Chunk[];
  baseDelay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}) {
  let wordIdx = 0;
  let elapsed = baseDelay;
  const out: ReactNode[] = [];
  chunks.forEach((c, ci) => {
    const stagger = c.staggerMs ?? 80;
    const words = c.text.split(/(\s+)/); // keep whitespace
    words.forEach((w, wi) => {
      if (/^\s+$/.test(w)) {
        out.push(<span key={`${ci}-s-${wi}`}>{w}</span>);
        return;
      }
      if (w.length === 0) return;
      const delay = elapsed;
      elapsed += stagger;
      const inner = (
        <span
          className="hw-inner"
          style={{
            display: "inline-block",
            transitionDelay: `${delay}ms`,
          }}
        >
          {w}
        </span>
      );
      out.push(
        <span
          key={`${ci}-w-${wordIdx++}`}
          className="hw"
          style={{
            display: "inline-block",
            fontStyle: c.italic ? "italic" : undefined,
            color: c.color,
            fontWeight: c.italic ? 600 : undefined,
          }}
        >
          {inner}
        </span>
      );
    });
  });

  const Tg = Tag as any;
  return (
    <Tg className={className} style={style}>
      {out}
    </Tg>
  );
}

/** Self-contained animated headline (wraps HeadlineReveal + observer + .in-view). */
export function AnimatedHeadline({
  chunks,
  as = "h2",
  className,
  style,
  threshold = 0.25,
}: {
  chunks: Chunk[];
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
}) {
  const { ref, inView } = useInViewOnce<HTMLElement>(threshold);
  const Tg = as as any;
  return (
    <Tg
      ref={ref as any}
      className={`headline-stagger ${className ?? ""} ${inView ? "in-view" : ""}`.trim()}
      style={style}
    >
      <HeadlineReveal chunks={chunks} />
    </Tg>
  );
}

export function InViewToggle({
  children,
  className = "",
  threshold = 0.25,
  as: Tag = "div",
  style,
  id,
}: {
  children: ReactNode;
  className?: string;
  threshold?: number | number[];
  as?: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
  id?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(threshold);
  const Tg = Tag as any;
  return (
    <Tg
      ref={ref as any}
      id={id}
      className={`${className} ${inView ? "in-view" : ""}`.trim()}
      style={style}
    >
      {children}
    </Tg>
  );
}
