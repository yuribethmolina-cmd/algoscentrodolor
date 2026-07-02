import { useInViewOnce } from "@/lib/animations";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

const protagonistas = [
  "Dolor lumbar / dolor de cintura",
  "Ciática / «se me duerme la pierna»",
  "Hernia discal",
  "Neuropatía diabética",
  "Dolor persistente tras cirugía de espalda",
];

const condiciones = [
  "Dolor cervical",
  "Dolor facetario",
  "Dolor radicular",
  "Dolor sacroilíaco",
  "Estenosis de canal lumbar",
  "Dolor miofascial / puntos gatillo",
  "Neuralgia postherpética (culebrilla)",
  "Túnel carpiano",
  "Dolor articular — rodilla, cadera, hombro",
  "Cefaleas",
];

const segundoNivel = [
  "Neuralgia occipital",
  "Síndrome piriforme (pseudociática)",
  "Coccigodinia / dolor de rabadilla",
  "Síndrome doloroso regional complejo",
  "Dolor oncológico",
];

export default function ConditionsSection() {
  const { ref: listRef, inView: listIn } = useInViewOnce<HTMLDivElement>(0.08);
  const { ref: condRef, inView: condIn } = useInViewOnce<HTMLDivElement>(0.08);

  return (
    <section
      style={{
        backgroundColor: DEEP_TEAL,
        paddingTop: "clamp(80px, 10vw, 128px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1080,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: GOLD,
              marginBottom: 20,
            }}
          >
            CONDICIONES
          </p>
          <h2
            style={{
              fontFamily: "'Sora', serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.15,
              color: CREAM,
            }}
          >
            Condiciones que tratamos
          </h2>
        </div>

        {/* Protagonistas */}
        <div style={{ marginBottom: "clamp(48px, 6vw, 64px)" }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.65)",
              marginBottom: 20,
            }}
          >
            Más frecuentes
          </p>
          <div ref={listRef} className="flex flex-col" style={{ gap: 2 }}>
            {protagonistas.map((c, idx) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(12px, 2vw, 24px)",
                  borderBottom: "1px solid rgba(245,240,232,0.08)",
                  padding: "clamp(14px, 1.8vw, 20px) 0",
                  opacity: listIn ? 1 : 0,
                  transform: listIn ? "none" : "translateX(-16px)",
                  transition: `opacity 0.55s ease ${idx * 90}ms, transform 0.55s cubic-bezier(0.23,1,0.32,1) ${idx * 90}ms`,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: GOLD,
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                    paddingTop: 4,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  style={{
                    fontFamily: "'Sora', serif",
                    fontWeight: 500,
                    fontSize: "clamp(18px, 2.2vw, 26px)",
                    lineHeight: 1.25,
                    color: CREAM,
                  }}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Condiciones estándar */}
        <div style={{ marginBottom: "clamp(36px, 4vw, 52px)" }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.65)",
              marginBottom: 20,
            }}
          >
            También tratamos
          </p>
          <div
            ref={condRef}
            className="grid sm:grid-cols-2"
            style={{ gap: "clamp(8px, 1vw, 12px)" }}
          >
            {condiciones.map((c, idx) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "clamp(12px, 1.4vw, 16px) clamp(14px, 1.5vw, 18px)",
                  backgroundColor: "rgba(245,240,232,0.04)",
                  border: "1px solid rgba(245,240,232,0.09)",
                  borderRadius: 4,
                  opacity: condIn ? 1 : 0,
                  transform: condIn ? "none" : "translateY(12px)",
                  transition: `opacity 0.45s ease ${idx * 45}ms, transform 0.45s cubic-bezier(0.23,1,0.32,1) ${idx * 45}ms`,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    backgroundColor: TEAL,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "clamp(13px, 1.1vw, 15px)",
                    color: "rgba(245,240,232,0.92)",
                    lineHeight: 1.4,
                  }}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Segundo nivel */}
        <div
          style={{
            borderTop: "1px solid rgba(245,240,232,0.10)",
            paddingTop: "clamp(24px, 3vw, 36px)",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(245,240,232,0.60)",
              marginBottom: 16,
            }}
          >
            Otras condiciones
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {segundoNivel.map((c) => (
              <span
                key={c}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 12,
                  color: "rgba(245,240,232,0.82)",
                  backgroundColor: "rgba(245,240,232,0.04)",
                  border: "1px solid rgba(245,240,232,0.10)",
                  borderRadius: 3,
                  padding: "5px 12px",
                }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
