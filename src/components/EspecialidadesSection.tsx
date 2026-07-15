import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Bone,
  Brain,
  HeartHandshake,
  HeartPulse,
  Leaf,
  LucideIcon,
  Stethoscope,
} from "lucide-react";
import patientPain from "@/assets/tx-miofascial.jpg";
import { getDoctorsBySpecialty, type Doctor } from "@/data/doctors";
import { assertSpecialtySlug } from "@/data/validate";

const DEEP_TEAL = "#1a4a55";
const GOLD = "#c69636";
const CREAM = "#f5f0e8";

type CarePath = {
  pain: string;
  plain: string;
  specialty: string;
  specialtyHint: string;
  specialtySlug: Doctor["specialtySlug"];
  icon: LucideIcon;
  href?: string;
};

/**
 * Deriva el enlace desde el slug de especialidad y valida que exista en
 * SPECIALTIES. Evita que un href se desincronice con la data central.
 */
const specialtyHref = (slug: Doctor["specialtySlug"]) =>
  `/especialidades#${assertSpecialtySlug(slug)}`;

const CARE_PATHS: CarePath[] = [
  {
    pain: "Dolor de espalda o cuello",
    plain: "Cuando el dolor baja al brazo o la pierna, puede venir de la columna o de un nervio.",
    specialty: "Neurocirugía y cirugía de columna",
    specialtyHint: "columna y nervios",
    specialtySlug: "neurocirugia",
    icon: Brain,
  },
  {
    pain: "Rodilla, hombro o cadera",
    plain: "Si duele al caminar, subir escaleras o mover una articulación, revisamos el origen mecánico.",
    specialty: "Traumatología y Ortopedia",
    specialtyHint: "huesos y articulaciones",
    specialtySlug: "traumatologia",
    icon: Bone,
  },
  {
    pain: "Hormigueo o adormecimiento",
    plain: "Cuando siente corrientazos, ardor o pérdida de fuerza, el EMG mide exactamente qué nervio está afectado y en qué punto.",
    specialty: "EMG · EEG · Fisiatría",
    specialtyHint: "rehabilitación, nervios y músculos",
    specialtySlug: "fisiatria",
    icon: Activity,
    href: "/procedimientos/emg",
  },
  {
    pain: "Dolor con inflamación",
    plain: "Si hay rigidez, hinchazón o dolor en varias zonas, evaluamos si hay una causa inflamatoria.",
    specialty: "Reumatología",
    specialtyHint: "inflamación y articulaciones",
    specialtySlug: "reumatologia",
    icon: HeartPulse,
  },
  {
    pain: "Dolor persistente",
    plain: "Cuando el dolor no cede con tratamientos habituales, el algólogo evalúa cómo controlarlo con procedimientos seguros, guiados por imagen y sin cirugía mayor.",
    specialty: "Algología, anestesiología y cuidados paliativos",
    specialtyHint: "dolor crónico y procedimientos intervencionistas",
    specialtySlug: "cuidados-paliativos",
    icon: Stethoscope,
  },
  {
    pain: "Impacto emocional del dolor",
    plain: "El dolor crónico afecta el ánimo, el sueño y la manera en que se enfrenta el día a día.",
    specialty: "Psicología",
    specialtyHint: "salud mental y dolor crónico",
    specialtySlug: "psicologia",
    icon: HeartHandshake,
  },
  {
    pain: "Recuperación y hábitos",
    plain: "La alimentación, el peso y la inflamación también pueden influir en cómo evoluciona el dolor.",
    specialty: "Nutrición antiinflamatoria",
    specialtyHint: "soporte y recuperación",
    specialtySlug: "nutricion",
    icon: Leaf,
  },
];



export default function EspecialidadesSection() {
  const [activeSlug, setActiveSlug] = useState<Doctor["specialtySlug"] | "all">("all");
  const visible = activeSlug === "all"
    ? CARE_PATHS
    : CARE_PATHS.filter((p) => p.specialtySlug === activeSlug);

  return (
    <section
      data-surface="dark"
      style={{
        backgroundColor: DEEP_TEAL,
        paddingTop: "clamp(52px, 6vw, 76px)",
        paddingBottom: "clamp(80px, 10vw, 128px)",
        borderTop: `1px solid ${GOLD}44`,
        boxShadow: "inset 0 42px 80px -70px rgba(198,150,54,0.65)",
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
              PASO 02 · EQUIPO CLÍNICO
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
              Qué equipo puede ayudar según lo que siente.
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
            Esta parte no repite las dolencias: explica quién participa y por
            qué. Primero entendemos el síntoma; luego definimos el área que
            puede aportar más a su caso.
          </p>
        </div>

        {/* Specialty filter chips */}
        <div
          className="mt-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filtrar por especialidad"
        >
          {[{ slug: "all" as const, name: "Todas" }, ...CARE_PATHS.map((p) => ({ slug: p.specialtySlug, name: p.specialty }))].map((chip) => {
            const active = activeSlug === chip.slug;
            return (
              <button
                key={chip.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveSlug(chip.slug)}
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  padding: "8px 14px",
                  border: `1px solid ${active ? GOLD : "rgba(245,240,232,0.25)"}`,
                  backgroundColor: active ? "rgba(198,150,54,0.22)" : "transparent",
                  color: active ? CREAM : "rgba(245,240,232,0.75)",
                  cursor: "pointer",
                  transition: "background-color 180ms ease, border-color 180ms ease, color 180ms ease",
                }}
              >
                {chip.name}
              </button>
            );
          })}
        </div>

        <div
          className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]"
          style={{ alignItems: "stretch" }}
        >
          <div
            className="grid md:grid-cols-2"
            style={{
              borderTop: `1px solid ${GOLD}55`,
              borderLeft: `1px solid ${GOLD}55`,
            }}
          >
            {visible.map((item) => {
              const Icon = item.icon;
              const doctors = getDoctorsBySpecialty(item.specialtySlug).map((d) => d.name);
              return (
                <Link
                  key={item.pain}
                  to={item.href ?? specialtyHref(item.specialtySlug)}
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
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 10px",
                        backgroundColor: "rgba(198,150,54,0.16)",
                        border: `1px solid ${GOLD}88`,
                        color: CREAM,
                        margin: 0,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "999px",
                          backgroundColor: GOLD,
                          flexShrink: 0,
                        }}
                      />
                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: 12,
                          fontWeight: 850,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: CREAM,
                          margin: 0,
                        }}
                      >
                        {item.specialty}
                      </p>
                    </div>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: 14,
                        lineHeight: 1.45,
                        color: "rgba(245,240,232,0.82)",
                        marginTop: 10,
                        marginBottom: 0,
                      }}
                    >
                      {item.specialtyHint}
                    </p>
                    {doctors.length > 0 ? (
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: "12px 0 0",
                          display: "flex",
                          flexDirection: "column",
                          gap: 4,
                        }}
                      >
                        {doctors.map((doc) => (
                          <li
                            key={doc}
                            style={{
                              fontFamily: "Manrope, sans-serif",
                              fontSize: 13,
                              fontWeight: 600,
                              lineHeight: 1.4,
                              color: CREAM,
                            }}
                          >
                            {doc}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: 12,
                          fontStyle: "italic",
                          lineHeight: 1.4,
                          color: "rgba(245,240,232,0.6)",
                          marginTop: 12,
                          marginBottom: 0,
                        }}
                      >
                        Especialista en incorporación
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          <aside
            style={{
              minHeight: 360,
              padding: "clamp(28px, 4vw, 42px)",
              backgroundImage: `linear-gradient(145deg, rgba(198,150,54,0.95), rgba(198,150,54,0.74)), url(${patientPain})`,
              backgroundSize: "cover",
              backgroundPosition: "center right",
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
                Primero lo escuchamos, después lo orientamos.
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
                Cada persona llega con una historia diferente. Antes de
                cualquier decisión, entendemos el origen de su dolor y desde
                ahí definimos juntos si necesita un estudio, un procedimiento o
                el apoyo de otra especialidad.
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
