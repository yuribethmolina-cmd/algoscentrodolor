import { useState, useRef } from "react";
import { Play, CheckCircle2 } from "lucide-react";

const benefits = [
  "Sin cirugía abierta ni hospitalización",
  "Guiado por imagen en tiempo real",
  "Recuperación en días, no meses",
];

export default function HerniaVideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Video Side */}
          <div className="scroll-reveal order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-secondary/20 to-accent/10 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative aspect-video rounded-2xl overflow-hidden border border-primary-foreground/10">
                <video
                  ref={videoRef}
                  src="/videos/hernia-discal.mp4"
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
                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer bg-primary/30"
                    onClick={handlePlay}
                  >
                    <div className="w-20 h-20 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}

                {!isPlaying && (
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/80 backdrop-blur-sm border border-primary-foreground/10">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse-gentle" />
                      <span className="text-primary-foreground/70 text-xs font-light tracking-wider uppercase">
                        Video del procedimiento
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <div className="scroll-reveal">
              <p className="text-secondary/80 text-sm tracking-[0.3em] uppercase mb-4 font-medium">
                Hernia Discal
              </p>
              <h2 className="text-3xl md:text-5xl font-extralight text-primary-foreground leading-tight mb-6">
                Tratamiento sin
                <br />
                <span className="font-light text-secondary">necesidad de cirugía</span>
              </h2>
              <p className="text-primary-foreground/60 font-light text-lg leading-relaxed mb-8">
                La hernia discal es una de las causas más frecuentes de dolor lumbar y ciático.
                Con técnicas intervencionistas guiadas por imagen, tratamos el disco afectado
                directamente — sin bisturí.
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className={`scroll-reveal scroll-reveal-delay-${idx + 1} flex items-center gap-3`}
                >
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-primary-foreground/80 font-light">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="scroll-reveal scroll-reveal-delay-4">
              <a
                href="https://wa.me/584246467944?text=Hola,%20quiero%20información%20sobre%20tratamiento%20de%20hernia%20discal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
              >
                Consultar sobre este tratamiento
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
