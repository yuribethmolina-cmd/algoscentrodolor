/**
 * Atmospheric background image. Sits absolutely behind content,
 * heavily desaturated and faded so typography stays the hero.
 * Decorative — always aria-hidden.
 *
 * If the URL fails to load, the <img> hides itself so layout never breaks.
 */
type Props = {
  src: string;
  /** 0–1 visual opacity. */
  opacity: number;
  /** CSS filter. */
  filter: string;
  /** Optional CSS blend mode against the parent background color. */
  blendMode?: React.CSSProperties["mixBlendMode"];
  /** Optional CSS object-position. */
  objectPosition?: string;
  /** z-index (default 0). */
  zIndex?: number;
};

export default function BackdropImage({
  src,
  opacity,
  filter,
  blendMode,
  objectPosition = "center",
  zIndex = 0,
}: Props) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition,
        opacity,
        filter,
        mixBlendMode: blendMode,
        zIndex,
        pointerEvents: "none",
        userSelect: "none",
      }}
    />
  );
}
