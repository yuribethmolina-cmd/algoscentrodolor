import { useState } from "react";

type PictureImport = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

interface SmartImageProps {
  picture: PictureImport;
  placeholder?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  eager?: boolean;
}

/**
 * Optimized image with AVIF/WebP <picture>, native lazy-loading, async decoding
 * and an LQIP blur placeholder that fades out once the main image is decoded.
 */
export default function SmartImage({
  picture,
  placeholder,
  alt,
  className,
  style,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  eager = false,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#e8eef0",
        backgroundImage: placeholder ? `url(${placeholder})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...style,
      }}
    >
      <picture>
        {Object.entries(picture.sources).map(([format, srcset]) => (
          <source key={format} type={`image/${format}`} srcSet={srcset} sizes={sizes} />
        ))}
        <img
          src={picture.img.src}
          width={picture.img.w}
          height={picture.img.h}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          onLoad={() => setLoaded(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: style?.objectPosition ?? "center top",
            opacity: loaded ? 1 : 0,
            transition: "opacity 500ms ease",
          }}
        />
      </picture>
    </div>
  );
}
