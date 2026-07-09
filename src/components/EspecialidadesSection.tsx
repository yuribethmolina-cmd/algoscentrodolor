import { Link } from "react-router-dom";
import { Activity, ArrowRight, Bone, Brain, HeartPulse, Leaf, Stethoscope } from "lucide-react";

const DEEP_TEAL = "#1a4a55";
const TEAL = "#3d8b96";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

type CarePath = {
  pain: string;
  plain: string;
  specialty: string;
  specialtyHint: string;
  href: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
};

const CARE_PATHS: CarePath[] = [
  {
    pain: "Dolor de espalda o cuello",
    plain: "Cuando el dolor baja al brazo o la pierna, puede venir de la columna o de un nervio.",
    specialty: "Neurocirugía",
    specialtyHint: "columna y nervios",
    href: "/especialidades#neurocirugia",
    icon: Brain,
  },
  {
    pain: "Rodilla, hombro o cadera",
    plain: "Si duele al caminar, subir escaleras o mover una articulación, revisamos el origen mecánico.",
    specialty: "Traumatología",
    specialtyHint: "huesos y articulaciones",
    href: "/especialidades#traumatologia",
    icon: Bone,
  },
  {
    pain: "Hormigueo o adormecimiento",
    plain: "Cuando siente corrientazos, ardor o pérdida de fuerza, puede hacer falta medir el nervio.",
    specialty: "Electrodiagnóstico",
    specialtyHint: "nervios y músculos",
    href: "/especialidades#fisiatria",
    icon: Activity,
  },
  {
    pain: "Dolor con inflamación",
    plain: "Si hay rigidez, hinchazón o dolor en varias zonas, evaluamos si hay una causa inflamatoria.",
    specialty: "Reumatología",
    specialtyHint: "inflamación y articulaciones",
    href: "/especialidades#reumatologia",
    icon: HeartPulse,
  },
  {
    pain: "Dolor persistente",
    plain: "Cuando el dolor no cede, buscamos opciones intervencionistas para controlarlo con precisión.",
    specialty: "Algología",
    specialtyHint: "manejo del dolor",
    href: "/especialidades#radiologia-intervencionista",
    icon: Stethoscope,
  },
  {
    pain: "Recuperación y hábitos",
    plain: "La alimentación, el peso y la inflamación también pueden influir en cómo evoluciona el dolor.",
    specialty: "Nutrición antiinflamatoria",
    specialtyHint: "soporte y recuperación",
    href: "/especialidades#nutricion",
    icon: Leaf,
  },
];

export default function EspecialidadesSection() {
  return (
    <section
      data-surface="dark"
      style={{
        backgroundColor: DEEP_TEAL,
        paddingTop: "clamp(80px, 10vw, 128px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1120,
          paddingLeft: "clamp(24px, 4vw, 48px)",
          paddingRight: "clamp(24px, 4vw, 48px)",
        }}
      >
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: GOLD,
                marginBottom: 20,
              }}
            >
              ESPECIALIDADES
            </p>

            <h2
              style={{
                fontFamily: "'Sora', sans-serif",
                fontWeight: 650,
                fontSize: "clamp(34px, 4.3vw, 58px)",
                lineHeight: 1.08,
                color: CREAM,
                letterSpacing: "-0.035em",
                maxWidth: 620,
              }}
            >
              Usted nos dice qué siente. Nosotros lo conectamos con el equipo.
            </h2>
          </div>

          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "clamp(16px, 1.4vw, 18px)",
              lineHeight: 1.65,
              color: "rgba(245,240,232,0.78)",
              maxWidth: 560,
              margin: 0,
            }}
          >
            No tiene que saber qué especialista necesita. En ALGOS partimos de
            su dolor, identificamos el posible origen y orientamos su caso al
            área adecuada.
          </p>
        </div>

        <div
          className="mt-12 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]"
          style={{ alignItems: "stretch" }}
        >
          <div
            className="grid md:grid-cols-2"
            style={{
              borderTop: `1px solid ${GOLD}55`,
              borderLeft: `1px solid ${GOLD}55`,
            }}
          >
            {CARE_PATHS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.pain}
                  to={item.href}
                  className="group"
                  style={{
                    display: "grid",
                    gridTemplateRows: "auto 1fr auto",
                    gap: 18,
                    minHeight: 238,
                    padding: "clamp(22px, 3vw, 30px)",
                    borderRight: `1px solid ${GOLD}55`,
                    borderBottom: `1px solid ${GOLD}55`,
                    backgroundColor: "rgba(61,139,150,0.20)",
                    color: CREAM,
                    textDecoration: "none",
                    transition:
                      "background-color 220ms ease, transform 180ms cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  <div className="flex items-start justify-between gap-5">
                    <span
                      style={{
                        display: "inline-flex",
                        width: 42,
                        height: 42,
                        alignItems: "center",
                        justifyContent: "center",
                        border: `1px solid ${GOLD}`,
                        color: GOLD,
                      }}
                    >
                      <Icon size={21} strokeWidth={1.6} />
                    </span>
                    <ArrowRight
                      size={18}
                      strokeWidth={1.6}
                      style={{ color: GOLD, transition: "transform 180ms ease" }}
                      className="group-hover:translate-x-1"
                    />
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: "clamp(20px, 2vw, 25px)",
                        lineHeight: 1.18,
                        color: CREAM,
                        letterSpacing: "-0.025em",
                        marginBottom: 12,
                      }}
                    >
                      {item.pain}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 14,
                        lineHeight: 1.58,
                        color: "rgba(245,240,232,0.76)",
                        margin: 0,
                      }}
                    >
                      {item.plain}
                    </p>
                  </div>

                  <div
                    style={{
                      paddingTop: 18,
                      borderTop: "1px solid rgba(245,240,232,0.14)",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: GOLD,
                        margin: 0,
                      }}
                    >
                      Lo revisa {item.specialty}
                    </p>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 13,
                        color: "rgba(245,240,232,0.72)",
                        marginTop: 6,
                        marginBottom: 0,
                      }}
                    >
                      {item.specialtyHint}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <aside
            style={{
              minHeight: 360,
              padding: "clamp(28px, 4vw, 42px)",
              background:
                "linear-gradient(145deg, rgba(198,150,54,0.95), rgba(198,150,54,0.78))",
              color: DEEP_TEAL,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <svg
                viewBox="0 0 96 28"
                width={96}
                height={28}
                aria-hidden="true"
                style={{ display: "block", marginBottom: 28 }}
              >
                <path
                  d="M2 16 L22 16 L31 5 L45 25 L58 5 L68 16 L94 16"
                  stroke={CREAM}
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: "clamp(28px, 3vw, 38px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                  color: DEEP_TEAL,
                  margin: 0,
                }}
              >
                Su dolor primero. El especialista después.
              </h3>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: "rgba(26,74,85,0.88)",
                  marginTop: 22,
                  marginBottom: 0,
                }}
              >
                Así evitamos que el paciente tenga que adivinar. Una primera
                evaluación ordena el caso y define qué área debe intervenir.
              </p>
            </div>

            <Link
              to="/equipo"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                alignSelf: "flex-start",
                marginTop: 36,
                backgroundColor: DEEP_TEAL,
                color: CREAM,
                fontFamily: "Manrope, sans-serif",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "15px 22px",
              }}
            >
              Conocer el equipo
              <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
