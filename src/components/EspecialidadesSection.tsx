import { Link } from "react-router-dom";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

/** SVG viewBox is 900x620. Center at (450, 310). Orbit radius 250. */
const CX = 450;
const CY = 310;
const R_ORBIT = 250;
const R_NODE = 82;
const R_CENTER = 96;

type Node = {
  label: string;
  /** Angle in degrees, 0° = top, clockwise */
  angle: number;
  /** Custom line-art icon, drawn centered at (0,0) inside a 56x56 box */
  icon: JSX.Element;
};

const ICON_STROKE = { stroke: GOLD, strokeWidth: 1.4, fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const NODES: Node[] = [
  // Top center — Neurocirugía (spine)
  {
    label: "Neurocirugía\nIntervencionista",
    angle: 0,
    icon: (
      <g {...ICON_STROKE}>
        {[-18, -8, 2, 12].map((y, i) => (
          <g key={i}>
            <path d={`M -10 ${y} Q 0 ${y - 4} 10 ${y}`} />
            <path d={`M -12 ${y + 2} L -6 ${y + 2}`} />
            <path d={`M 12 ${y + 2} L 6 ${y + 2}`} />
          </g>
        ))}
      </g>
    ),
  },
  // Upper right — Traumatología (knee joint)
  {
    label: "Traumatología\ny Columna",
    angle: 60,
    icon: (
      <g {...ICON_STROKE}>
        <path d="M -14 -18 L -4 -6 Q 0 -2 4 -6 L 14 -18" />
        <path d="M -14 18 L -4 6 Q 0 2 4 6 L 14 18" />
        <path d="M -8 0 L 8 0" />
        <path d="M -3 -3 L 3 3" stroke="#d97a4a" />
        <path d="M 3 -3 L -3 3" stroke="#d97a4a" />
      </g>
    ),
  },
  // Lower right — Reumatología (inflamed joint)
  {
    label: "Reumatología",
    angle: 120,
    icon: (
      <g {...ICON_STROKE}>
        <path d="M -10 -16 L -2 -4 Q 0 0 2 -4 L 10 -16" />
        <path d="M -10 16 L -2 4 Q 0 0 2 4 L 10 16" />
        <circle cx="0" cy="0" r="4" />
        {[0, 60, 120, 180, 240, 300].map((a) => {
          const rad = (a * Math.PI) / 180;
          return (
            <line
              key={a}
              x1={Math.cos(rad) * 8}
              y1={Math.sin(rad) * 8}
              x2={Math.cos(rad) * 13}
              y2={Math.sin(rad) * 13}
              stroke="#d97a4a"
            />
          );
        })}
      </g>
    ),
  },
  // Bottom center — Anestesiología (two anesthesia bulbs)
  {
    label: "Anestesiología\ndel Dolor",
    angle: 180,
    icon: (
      <g {...ICON_STROKE}>
        <path d="M -8 -16 Q -8 -20 -4 -20 Q 0 -20 0 -16 L 0 -4 Q 0 4 -4 4 Q -8 4 -8 -4 Z" />
        <path d="M 8 -12 Q 8 -16 4 -16 Q 0 -16 0 -12 L 0 -2 Q 0 6 4 6 Q 8 6 8 -2 Z" />
        <path d="M -4 4 L -4 18" />
        <path d="M 4 6 L 4 18" />
      </g>
    ),
  },
  // Lower left — Nutrición (leaf)
  {
    label: "Nutrición\nAntiinflamatoria",
    angle: 240,
    icon: (
      <g {...ICON_STROKE}>
        <circle cx="0" cy="0" r="20" />
        <path d="M -10 8 Q -4 -12 12 -8 Q 8 8 -10 8 Z" />
        <path d="M -8 6 Q 0 -2 10 -6" />
      </g>
    ),
  },
  // Upper left — Electrodiagnóstico (brain + wave)
  {
    label: "Electrodiagnóstico",
    angle: 300,
    icon: (
      <g {...ICON_STROKE}>
        <path d="M -14 -4 Q -14 -14 -6 -14 Q -2 -18 4 -14 Q 12 -14 12 -4 Q 16 0 12 6 Q 12 14 4 14 Q -2 16 -6 12 Q -14 12 -14 4 Q -18 0 -14 -4 Z" />
        <path d="M -6 0 L -2 0 L 0 -6 L 4 6 L 6 0 L 10 0" />
      </g>
    ),
  },
];

function polar(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

export default function EspecialidadesSection() {
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
          maxWidth: 1100,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
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
          NUESTRAS ESPECIALIDADES
        </p>

        <h2
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px, 3.6vw, 48px)",
            lineHeight: 1.15,
            color: CREAM,
            marginBottom: 16,
            maxWidth: 720,
          }}
        >
          Un equipo multidisciplinario para cada tipo de dolor.
        </h2>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(15px, 1.3vw, 17px)",
            lineHeight: 1.7,
            color: "rgba(245,240,232,0.75)",
            maxWidth: 640,
            marginBottom: 48,
          }}
        >
          Cada caso se evalúa por la especialidad correcta, se interviene con
          seguridad y se acompaña en el tiempo.
        </p>

        {/* Radial mural */}
        <div style={{ width: "100%", marginBottom: 40 }}>
          <svg
            role="img"
            aria-label="Diagrama de especialidades ALGOS: Neurocirugía Intervencionista, Traumatología y Columna, Reumatología, Anestesiología del Dolor, Nutrición Antiinflamatoria y Electrodiagnóstico, alrededor del núcleo Tu dolor. Nuestro equipo."
            viewBox="0 0 900 620"
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            {/* Gold panel frame */}
            <rect
              x={6}
              y={6}
              width={888}
              height={608}
              fill="none"
              stroke={GOLD}
              strokeOpacity={0.75}
              strokeWidth={2}
            />

            {/* Horizontal divider through the center — mural signature */}
            <line
              x1={20}
              y1={CY}
              x2={880}
              y2={CY}
              stroke={GOLD}
              strokeOpacity={0.55}
              strokeWidth={1}
            />

            {/* Radial connectors */}
            {NODES.map((n) => {
              const p = polar(n.angle, R_ORBIT);
              const dx = p.x - CX;
              const dy = p.y - CY;
              const dist = Math.hypot(dx, dy);
              const ux = dx / dist;
              const uy = dy / dist;
              const x1 = CX + ux * R_CENTER;
              const y1 = CY + uy * R_CENTER;
              const x2 = p.x - ux * R_NODE;
              const y2 = p.y - uy * R_NODE;
              return (
                <line
                  key={`line-${n.angle}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={GOLD}
                  strokeOpacity={0.6}
                  strokeWidth={1.25}
                />
              );
            })}

            {/* Outer specialty circles */}
            {NODES.map((n) => {
              const p = polar(n.angle, R_ORBIT);
              const lines = n.label.split("\n");
              return (
                <g key={`node-${n.angle}`}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={R_NODE}
                    fill={TEAL}
                    stroke={GOLD}
                    strokeWidth={1.25}
                  />
                  {/* Icon — drawn at (0,0), translated into the top half */}
                  <g transform={`translate(${p.x}, ${p.y - 28})`}>{n.icon}</g>
                  {/* Label — thin white, below the icon */}
                  <text
                    x={p.x}
                    y={p.y + 22}
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12.5,
                      fontWeight: 400,
                      fill: CREAM,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {lines.map((ln, i) => (
                      <tspan key={i} x={p.x} dy={i === 0 ? 0 : 15}>
                        {ln}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}

            {/* Center gold circle — sits on top of the divider */}
            <circle
              cx={CX}
              cy={CY}
              r={R_CENTER}
              fill={GOLD}
              stroke={CREAM}
              strokeOpacity={0.18}
              strokeWidth={1}
            />
            {/* Waveform mark above the center label */}
            <path
              d={`M ${CX - 34} ${CY - 40} L ${CX - 22} ${CY - 40} L ${CX - 14} ${CY - 52} L ${CX - 4} ${CY - 28} L ${CX + 6} ${CY - 52} L ${CX + 14} ${CY - 40} L ${CX + 34} ${CY - 40}`}
              stroke={CREAM}
              strokeWidth={1.4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.95}
            />
            <text
              x={CX}
              y={CY - 6}
              textAnchor="middle"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 18,
                fontWeight: 500,
                fill: CREAM,
                letterSpacing: "0.01em",
              }}
            >
              <tspan x={CX} dy={0}>Tu dolor.</tspan>
              <tspan x={CX} dy={22}>Nuestro</tspan>
              <tspan x={CX} dy={22}>equipo.</tspan>
            </text>

            {/* Caption inside the frame — gold, thin, centered */}
            <text
              x={CX}
              y={588}
              textAnchor="middle"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 400,
                fill: GOLD,
                letterSpacing: "0.08em",
              }}
            >
              Cada paciente recibe el especialista que su condición necesita.
            </text>
          </svg>
        </div>

        <Link
          to="/especialidades"
          style={{
            display: "inline-block",
            backgroundColor: GOLD,
            color: DEEP_TEAL,
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            textDecoration: "none",
            padding: "14px 24px",
          }}
        >
          Ver todas las especialidades →
        </Link>
      </div>
    </section>
  );
}
