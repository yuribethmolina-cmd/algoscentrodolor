import { Link } from "react-router-dom";
import {
  Activity,
  Bone,
  Brain,
  Leaf,
  Stethoscope,
  Zap,
} from "lucide-react";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

type Node = {
  label: string;
  Icon: typeof Brain;
  /** Angle in degrees, 0° = top, clockwise */
  angle: number;
};

const NODES: Node[] = [
  { label: "Neurocirugía\nIntervencionista", Icon: Brain, angle: 0 },
  { label: "Traumatología\ny Columna", Icon: Bone, angle: 60 },
  { label: "Reumatología", Icon: Activity, angle: 120 },
  { label: "Anestesiología\ndel Dolor", Icon: Stethoscope, angle: 180 },
  { label: "Nutrición\nAntiinflamatoria", Icon: Leaf, angle: 240 },
  { label: "Electrodiagnóstico", Icon: Zap, angle: 300 },
];

/** SVG viewBox is 800x600. Center at (400, 300). Orbit radius 230. */
const CX = 400;
const CY = 300;
const R_ORBIT = 230;
const R_NODE = 78;
const R_CENTER = 92;

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

        {/* Radial diagram */}
        <div
          style={{
            width: "100%",
            marginBottom: 40,
            border: `1px solid rgba(198,150,54,0.35)`,
            padding: "clamp(16px, 3vw, 32px)",
            backgroundColor: "rgba(0,0,0,0.12)",
          }}
        >
          <svg
            role="img"
            aria-label="Diagrama de especialidades ALGOS alrededor del núcleo Tu dolor. Nuestro equipo."
            viewBox="0 0 800 600"
            style={{ width: "100%", height: "auto", display: "block" }}
          >
            {/* Horizontal divider through the center, like the mural */}
            <line
              x1={40}
              y1={CY}
              x2={760}
              y2={CY}
              stroke={GOLD}
              strokeOpacity={0.35}
              strokeWidth={1}
            />

            {/* Radial connectors */}
            {NODES.map((n) => {
              const p = polar(n.angle, R_ORBIT);
              // Trim the line so it terminates at the edge of each circle.
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
                  strokeOpacity={0.55}
                  strokeWidth={1.25}
                />
              );
            })}

            {/* Outer circles */}
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
                    strokeWidth={1.5}
                  />
                  {/* Icon */}
                  <g transform={`translate(${p.x - 18}, ${p.y - 34})`}>
                    <n.Icon
                      width={36}
                      height={36}
                      stroke={GOLD}
                      strokeWidth={1.4}
                      fill="none"
                    />
                  </g>
                  {/* Label */}
                  <text
                    x={p.x}
                    y={p.y + 16}
                    textAnchor="middle"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 12,
                      fontWeight: 500,
                      fill: CREAM,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {lines.map((ln, i) => (
                      <tspan key={i} x={p.x} dy={i === 0 ? 0 : 14}>
                        {ln}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}

            {/* Center circle */}
            <circle
              cx={CX}
              cy={CY}
              r={R_CENTER}
              fill={GOLD}
              stroke={CREAM}
              strokeOpacity={0.15}
              strokeWidth={1}
            />
            {/* Subtle waveform mark above the center label */}
            <path
              d={`M ${CX - 34} ${CY - 34} L ${CX - 22} ${CY - 34} L ${CX - 14} ${CY - 46} L ${CX - 4} ${CY - 22} L ${CX + 6} ${CY - 46} L ${CX + 14} ${CY - 34} L ${CX + 34} ${CY - 34}`}
              stroke={CREAM}
              strokeWidth={1.4}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.9}
            />
            <text
              x={CX}
              y={CY - 4}
              textAnchor="middle"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 18,
                fontWeight: 600,
                fill: DEEP_TEAL,
                letterSpacing: "0.01em",
              }}
            >
              <tspan x={CX} dy={0}>Tu dolor.</tspan>
              <tspan x={CX} dy={22}>Nuestro</tspan>
              <tspan x={CX} dy={22}>equipo.</tspan>
            </text>
          </svg>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "rgba(245,240,232,0.7)",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Cada paciente recibe el especialista que su condición necesita.
          </p>
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
