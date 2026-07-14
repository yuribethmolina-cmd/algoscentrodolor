export type Specialty = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  evalua: string;
  trata: string;
  acompana: string;
  /** Especialidad aún sin especialista asignado. La validación no exige médicos. */
  aspirational?: boolean;
};

export const SPECIALTIES: Specialty[] = [
  {
    slug: "neurocirugia",
    name: "Neurocirugía y cirugía de columna",
    tagline: "Columna, nervios y sistema nervioso",
    description:
      "Evaluación quirúrgica y manejo intervencionista del dolor de origen espinal y neurológico.",
    evalua: "Hernia discal, ciática, estenosis, dolor tras cirugía de columna.",
    trata: "Procedimientos guiados por imagen y cirugía de columna cuando está indicada.",
    acompana: "Seguimiento a largo plazo, ajuste de tratamiento y prevención de recaídas.",
  },
  {
    slug: "traumatologia",
    name: "Traumatología y Ortopedia",
    tagline: "Huesos, articulaciones y lesiones",
    description:
      "Diagnóstico y tratamiento de lesiones osteomusculares, con foco en cadera, rodilla y hombro.",
    evalua: "Artrosis, lesiones deportivas, dolor articular, secuelas de trauma.",
    trata: "Infiltraciones articulares, viscosuplementación, indicación quirúrgica.",
    acompana: "Rehabilitación coordinada con fisiatría y control de evolución.",
  },
  {
    slug: "reumatologia",
    name: "Reumatología",
    tagline: "Enfermedades articulares y autoinmunes",
    description:
      "Diagnóstico y control de enfermedades reumáticas que cursan con dolor crónico.",
    evalua: "Artritis reumatoide, fibromialgia, espondiloartritis, gota.",
    trata: "Manejo farmacológico y coordinación con procedimientos intervencionistas.",
    acompana: "Control periódico y ajuste de terapia según evolución.",
  },
  {
    slug: "fisiatria",
    name: "Fisiatría",
    tagline: "Medicina física y rehabilitación",
    description:
      "Recuperación funcional y manejo conservador del dolor musculoesquelético.",
    evalua: "Dolor lumbar, cervical, tendinopatías, dolor postquirúrgico.",
    trata: "Fisioterapia, terapia manual, infiltraciones ecoguiadas, ejercicio terapéutico.",
    acompana: "Programa de rehabilitación individualizado y retorno progresivo a la actividad.",
  },
  {
    slug: "cuidados-paliativos",
    name: "Algología, anestesiología y cuidados paliativos",
    tagline: "Manejo integral del dolor complejo",
    description:
      "Acompañamiento clínico del paciente con dolor de difícil control o enfermedad avanzada.",
    evalua: "Dolor oncológico, dolor neuropático severo, comorbilidades múltiples.",
    trata: "Manejo farmacológico avanzado y procedimientos intervencionistas paliativos.",
    acompana: "Atención centrada en el paciente y su familia, con seguimiento continuo.",
  },
  {
    slug: "psicologia",
    name: "Psicología",
    tagline: "Salud mental y dolor crónico",
    description:
      "El dolor crónico impacta el ánimo y el sueño. La psicología es parte del tratamiento.",
    evalua: "Depresión y ansiedad asociadas al dolor, insomnio, dolor con componente central.",
    trata: "Terapia cognitivo-conductual y educación en neurociencia del dolor.",
    acompana: "Acompañamiento continuo durante el proceso de recuperación.",
  },
  {
    slug: "nutricion",
    name: "Nutrición",
    tagline: "Nutrición antiinflamatoria y metabólica",
    description:
      "El estado nutricional influye directamente en la inflamación y en la recuperación.",
    evalua: "Composición corporal, marcadores metabólicos, hábitos alimentarios.",
    trata: "Plan nutricional individualizado con enfoque antiinflamatorio.",
    acompana: "Seguimiento con controles periódicos y ajustes al plan.",
  },
];
