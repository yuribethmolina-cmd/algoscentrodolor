import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


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
  /** Slug of a specialty defined in src/data/specialties.ts */
  slug: string;
  /** Custom line-art icon, drawn centered at (0,0) inside a 56x56 box */
  icon: JSX.Element;
};

const ICON_STROKE = { stroke: "currentColor", strokeWidth: 1.4, fill: "none" as const, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

const NODES: Node[] = [
  // Top center — Neurocirugía (spine)
  {
    label: "Neurocirugía\nIntervencionista",
    angle: 0,
    slug: "neurocirugia",
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
    slug: "traumatologia",
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
    slug: "reumatologia",
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
    slug: "radiologia-intervencionista",
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
    slug: "nutricion",
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
    slug: "fisiatria",
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

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function EspecialidadesSection() {
  const [activeAngle, setActiveAngle] = useState<number | null>(null);
  const [hoverAngle, setHoverAngle] = useState<number | null>(null);
  const navigate = useNavigate();
  const goToSpecialty = (angle: number, slug: string) => {
    setActiveAngle(angle);
    navigate(`/especialidades#${slug}`);
  };
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

        {/* Radial mural — desktop / tablet */}
        <div className="hidden md:block" style={{ width: "100%", marginBottom: 40 }}>
          <svg
            role="img"
            aria-label="Diagrama de especialidades ALGOS: Neurocirugía Intervencionista, Traumatología y Columna, Reumatología, Anestesiología del Dolor, Nutrición Antiinflamatoria y Electrodiagnóstico, alrededor del núcleo Tu dolor. Nuestro equipo."
            viewBox="0 0 900 620"
            preserveAspectRatio="xMidYMid meet"
            shapeRendering="geometricPrecision"
            style={{ width: "100%", height: "auto", display: "block", maxWidth: "100%" }}
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
              const isFocus = hoverAngle === n.angle || activeAngle === n.angle;
              return (
                <line
                  key={`line-${n.angle}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={GOLD}
                  strokeOpacity={isFocus ? 1 : 0.6}
                  strokeWidth={isFocus ? 1.75 : 1.25}
                  style={{ transition: "stroke-opacity 220ms ease, stroke-width 220ms ease" }}
                />
              );
            })}

            {/* Outer specialty circles */}
            {NODES.map((n) => {
              const p = polar(n.angle, R_ORBIT);
              const lines = n.label.split("\n");
              const isHover = hoverAngle === n.angle;
              const isActive = activeAngle === n.angle;
              const isFocus = isHover || isActive;
              const ariaLabel = `Ver ${lines.join(" ")} en especialidades`;
              return (
                <a
                  key={`node-${n.angle}`}
                  href={`/especialidades#${n.slug}`}
                  aria-label={ariaLabel}
                  role="link"
                  tabIndex={0}
                  onMouseEnter={() => setHoverAngle(n.angle)}
                  onMouseLeave={() => setHoverAngle(null)}
                  onFocus={() => setHoverAngle(n.angle)}
                  onBlur={() => setHoverAngle(null)}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSpecialty(n.angle, n.slug);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      goToSpecialty(n.angle, n.slug);
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    outline: "none",
                  }}
                >
                  <g
                    style={{
                      transformOrigin: `${p.x}px ${p.y}px`,
                      transform: isFocus ? "scale(1.06)" : "scale(1)",
                      transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {/* Focus/active halo */}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={R_NODE + 8}
                      fill="none"
                      stroke={GOLD}
                      strokeOpacity={isActive ? 0.9 : isHover ? 0.55 : 0}
                      strokeWidth={isActive ? 1.4 : 1}
                      strokeDasharray={isActive ? "0" : "3 5"}
                      style={{ transition: "stroke-opacity 240ms ease" }}
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={R_NODE}
                      fill={isActive ? GOLD : TEAL}
                      stroke={GOLD}
                      strokeWidth={isFocus ? 1.75 : 1.25}
                      style={{ transition: "fill 260ms ease, stroke-width 220ms ease" }}
                    />
                    {/* Icon */}
                    <g
                      transform={`translate(${p.x}, ${p.y - 28})`}
                      style={{
                        color: isActive ? DEEP_TEAL : GOLD,
                        transition: "color 240ms ease",
                      }}
                    >
                      {n.icon}
                    </g>
                    <text
                      x={p.x}
                      y={p.y + 22}
                      textAnchor="middle"
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 12.5,
                        fontWeight: isFocus ? 500 : 400,
                        fill: isActive ? DEEP_TEAL : CREAM,
                        letterSpacing: "0.01em",
                        transition: "fill 240ms ease",
                      }}
                    >
                      {lines.map((ln, i) => (
                        <tspan key={i} x={p.x} dy={i === 0 ? 0 : 15}>
                          {ln}
                        </tspan>
                      ))}
                    </text>
                  </g>
                </a>
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

        {/* Mobile — compact mural: center medallion + 2-col grid of specialties */}
        <div
          className="md:hidden"
          style={{
            width: "100%",
            marginBottom: 40,
            border: `1px solid ${GOLD}`,
            padding: 20,
          }}
        >
          {/* Center medallion */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "8px auto 24px",
              width: 180,
              height: 180,
              borderRadius: "50%",
              backgroundColor: GOLD,
              color: CREAM,
              textAlign: "center",
              padding: 12,
            }}
          >
            <svg
              viewBox="0 0 80 20"
              width={72}
              height={18}
              aria-hidden="true"
              style={{ display: "block", marginBottom: 6 }}
            >
              <path
                d="M2 12 L18 12 L26 4 L38 18 L48 4 L56 12 L78 12"
                stroke={CREAM}
                strokeWidth={1.6}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 15,
                fontWeight: 500,
                lineHeight: 1.25,
              }}
            >
              Tu dolor.
              <br />
              Nuestro equipo.
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              backgroundColor: GOLD,
              opacity: 0.55,
              margin: "0 -20px 20px",
            }}
          />

          {/* Grid of specialties */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {NODES.map((n) => {
              const isActive = activeAngle === n.angle;
              const slug = slugify(n.label.replace(/\n/g, " "));
              return (
                <li key={`m-${n.angle}`} style={{ display: "block" }}>
                  <a
                    href={`/especialidades#${slug}`}
                    aria-pressed={isActive}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveAngle(n.angle);
                    }}
                    style={{
                      backgroundColor: isActive ? GOLD : TEAL,
                      border: `1px solid ${GOLD}`,
                      padding: "14px 10px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      minHeight: 118,
                      color: isActive ? DEEP_TEAL : GOLD,
                      textDecoration: "none",
                      transition:
                        "background-color 220ms ease, color 220ms ease, transform 180ms ease",
                      transform: isActive ? "scale(0.98)" : "scale(1)",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <svg
                      viewBox="-28 -28 56 56"
                      width={40}
                      height={40}
                      aria-hidden="true"
                      style={{ display: "block", marginBottom: 8 }}
                      shapeRendering="geometricPrecision"
                    >
                      {n.icon}
                    </svg>
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 12,
                        lineHeight: 1.3,
                        color: isActive ? DEEP_TEAL : CREAM,
                      }}
                    >
                      {n.label.split("\n").map((ln, i) => (
                        <span key={i} style={{ display: "block" }}>
                          {ln}
                        </span>
                      ))}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11,
              color: GOLD,
              letterSpacing: "0.08em",
              textAlign: "center",
              marginTop: 20,
              marginBottom: 0,
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
