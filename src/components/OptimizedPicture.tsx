import { useEffect, useRef, useState } from "react";

type Picture = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

interface OptimizedPictureProps {
  picture: Picture;
  placeholder?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  eager?: boolean;
  fetchPriority?: "high" | "low" | "auto";
}

/**
 * Cinematic <picture> with AVIF + WebP + JPEG srcsets, a blurred LQIP
 * placeholder, and IntersectionObserver-driven lazy decoding for smooth
 * fade-ins on low-bandwidth connections.
 */
export function OptimizedPicture({
  picture,
  placeholder,
  alt,
  className = "",
  imgClassName = "",
  sizes = "(min-width: 768px) 50vw, 100vw",
  eager = false,
  fetchPriority = "auto",
}: OptimizedPictureProps) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(eager);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (eager || inView) return;
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [eager, inView]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className}`}
      style={
        placeholder
          ? {
              backgroundImage: `url(${placeholder})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Blur veil while decoding */}
      {placeholder && !loaded && (
        <div
          aria-hidden
          className="absolute inset-0 backdrop-blur-xl"
          style={{ backgroundColor: "rgba(15,49,56,0.15)" }}
        />
      )}
      {inView && (
        <picture>
          {picture.sources.avif && (
            <source type="image/avif" srcSet={picture.sources.avif} sizes={sizes} />
          )}
          {picture.sources.webp && (
            <source type="image/webp" srcSet={picture.sources.webp} sizes={sizes} />
          )}
          <img
            src={picture.img.src}
            width={picture.img.w}
            height={picture.img.h}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            // @ts-expect-error - fetchpriority is valid HTML but not typed in React yet
            fetchpriority={fetchPriority}
            onLoad={() => setLoaded(true)}
            className={`${imgClassName} transition-opacity duration-700 ease-out ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
      )}
    </div>
  );
}

export default OptimizedPicture;
