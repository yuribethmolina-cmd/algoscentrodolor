import { useRef, useState } from "react";
import { Play } from "lucide-react";

interface Props {
  src: string;
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function ProcedureVideoSection({ src, eyebrow, title, description }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="bg-deep-teal py-20 md:py-28">
      <div className="mx-auto max-w-[1080px] px-6 md:px-12">
        {eyebrow && (
          <p className="font-sans font-bold uppercase text-algos-gold text-[11px] tracking-[0.22em] mb-4">
            {eyebrow}
          </p>
        )}
        <h2 className="font-sans text-cream text-[24px] md:text-[32px] leading-[1.2] mb-4 max-w-[26ch]">
          {title}
        </h2>
        {description && (
          <p className="font-sans text-cream/70 text-[16px] leading-[1.7] mb-10 max-w-[60ch]">
            {description}
          </p>
        )}

        <div className="relative aspect-video overflow-hidden group">
          <video
            ref={videoRef}
            src={src}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
            controls={isPlaying}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />

          {!isPlaying && (
            <button
              type="button"
              aria-label="Reproducir video"
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-deep-teal/40 transition-colors hover:bg-deep-teal/30"
            >
              <span className="w-20 h-20 rounded-full bg-algos-gold/20 backdrop-blur-sm border border-algos-gold/50 flex items-center justify-center transition-all group-hover:scale-110 group-hover:bg-algos-gold/30">
                <Play className="w-8 h-8 text-cream ml-1" fill="currentColor" />
              </span>
            </button>
          )}

          {!isPlaying && (
            <div className="absolute bottom-4 left-4 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-deep-teal/80 backdrop-blur-sm border border-cream/10">
                <span className="w-2 h-2 rounded-full bg-algos-gold animate-pulse" />
                <span className="font-sans text-cream/80 text-[11px] font-bold tracking-[0.2em] uppercase">
                  Video del procedimiento
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
