import { motion, useReducedMotion } from "framer-motion";

/**
 * AmbientSVG, capa decorativa fija con SVG animados sutiles.
 * Se renderiza sobre el fondo de cada sección con opacidad muy baja
 * y sin interceptar eventos (pointer-events-none).
 * Respeta prefers-reduced-motion.
 */
export default function AmbientSVG() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden z-[5]"
    >
      {/* Blob teal difuso, respiración lenta arriba-izquierda */}
      <motion.svg
        className="absolute -top-40 -left-40 w-[560px] h-[560px] opacity-[0.09]"
        viewBox="0 0 200 200"
        initial={{ scale: 0.95, rotate: 0 }}
        animate={
          reduce
            ? undefined
            : { scale: [0.95, 1.05, 0.95], rotate: [0, 8, 0] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id="ambient-teal" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3D8B96" stopOpacity="1" />
            <stop offset="100%" stopColor="#3D8B96" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#ambient-teal)" />
      </motion.svg>

      {/* Blob gold difuso, deriva lenta abajo-derecha */}
      <motion.svg
        className="absolute -bottom-52 -right-40 w-[620px] h-[620px] opacity-[0.07]"
        viewBox="0 0 200 200"
        initial={{ x: 0, y: 0 }}
        animate={reduce ? undefined : { x: [0, -20, 0], y: [0, -14, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <radialGradient id="ambient-gold" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C69636" stopOpacity="1" />
            <stop offset="100%" stopColor="#C69636" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="90" fill="url(#ambient-gold)" />
      </motion.svg>

      {/* Anillo delgado que rota, centro-derecha */}
      <motion.svg
        className="absolute top-[18%] right-[6%] w-[280px] h-[280px] opacity-[0.10]"
        viewBox="0 0 200 200"
        initial={{ rotate: 0 }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx="100"
          cy="100"
          r="86"
          fill="none"
          stroke="#1A4A55"
          strokeWidth="0.6"
          strokeDasharray="2 6"
        />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="#C69636"
          strokeWidth="0.4"
        />
      </motion.svg>

      {/* Curva tipo columna vertebral, dibujo lento */}
      <motion.svg
        className="absolute top-[30%] left-[8%] w-[200px] h-[380px] opacity-[0.12]"
        viewBox="0 0 100 200"
        fill="none"
      >
        <motion.path
          d="M50 5 C 30 30, 70 55, 50 80 C 30 105, 70 130, 50 155 C 40 175, 60 190, 50 200"
          stroke="#1A4A55"
          strokeWidth="0.8"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }
          }
          transition={{
            duration: 6,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
        {/* pequeños trazos horizontales a lo largo de la curva */}
        {[20, 45, 70, 95, 120, 145, 170].map((y, i) => (
          <motion.line
            key={y}
            x1="42"
            x2="58"
            y1={y}
            y2={y}
            stroke="#C69636"
            strokeWidth="0.6"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1] }}
            transition={{
              duration: 1.4,
              delay: 1 + i * 0.18,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.svg>

      {/* Grid de puntos flotante, abajo-izquierda */}
      <motion.svg
        className="absolute bottom-[8%] left-[4%] w-[220px] h-[140px] opacity-[0.14]"
        viewBox="0 0 220 140"
        initial={{ y: 0 }}
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        {Array.from({ length: 8 }).map((_, col) =>
          Array.from({ length: 5 }).map((_, row) => (
            <circle
              key={`${col}-${row}`}
              cx={12 + col * 26}
              cy={12 + row * 26}
              r="1.2"
              fill="#1A4A55"
            />
          )),
        )}
      </motion.svg>

      {/* Línea diagonal fina que pulsa */}
      <motion.svg
        className="absolute top-[62%] right-[16%] w-[240px] h-[160px] opacity-[0.10]"
        viewBox="0 0 240 160"
      >
        <motion.line
          x1="10"
          y1="150"
          x2="230"
          y2="10"
          stroke="#C69636"
          strokeWidth="0.7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.4, 0.7, 1],
          }}
        />
      </motion.svg>
    </div>
  );
}
