import React, { useState } from "react";

export type PictureImport = {
  sources: Record<string, string>;
  img: { src: string; w: number; h: number };
};

interface PictureProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  picture: PictureImport;
  sizes?: string;
  eager?: boolean;
  /** When true (default) fades from 0 → 1 opacity on load. */
  fadeIn?: boolean;
  /** Optional wrapper class (applied to <picture>). */
  wrapperClassName?: string;
}

/**
 * Consistent AVIF/WebP/JPG delivery for any bundled image imported via
 * vite-imagetools with `?as=picture`. Passes through all standard <img>
 * attributes (className, style, alt, sizes, etc.) so it's a drop-in
 * replacement for a plain <img>.
 */
export default function Picture({
  picture,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  eager = false,
  fadeIn = true,
  wrapperClassName,
  className,
  style,
  alt,
  onLoad,
  ...rest
}: PictureProps) {
  const [loaded, setLoaded] = useState(false);
  const mergedStyle: React.CSSProperties = fadeIn
    ? {
        opacity: loaded ? 1 : 0,
        transition: "opacity 500ms ease",
        ...style,
      }
    : (style ?? {});

  return (
    <picture className={wrapperClassName}>
      {Object.entries(picture.sources).map(([format, srcset]) => (
        <source key={format} type={`image/${format}`} srcSet={srcset} sizes={sizes} />
      ))}
      <img
        {...rest}
        src={picture.img.src}
        width={picture.img.w}
        height={picture.img.h}
        alt={alt ?? ""}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
        className={className}
        style={mergedStyle}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
      />
    </picture>
  );
}
