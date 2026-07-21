export type Diagnostic = {
  slug: string;
  name: string;
  short: string;
  quees: string;
  paraque: string;
  comose: string;
  disponibilidad: string;
  grupo: "imagen" | "cardiologia" | "neurofisiologia" | "laboratorio";
};

export const DIAGNOSTIC_GROUPS = {
  imagen: { label: "Imagen", description: "Estudios de imagen para el diagnóstico del dolor.", provider: "uduz" as const },
  cardiologia: { label: "Cardiología", description: "Estudios cardiológicos ambulatorios.", provider: "uduz" as const },
  neurofisiologia: { label: "Neurofisiología", description: "Estudios de nervios y actividad cerebral.", provider: "algos" as const },
  laboratorio: { label: "Laboratorio", description: "Análisis clínicos, en sede o a domicilio.", provider: "uduz" as const },
} as const;

export const DIAGNOSTICS: Diagnostic[] = [
  {
    slug: "tomografia",
    name: "Tomografía computarizada",
    short: "Cortes detallados del cuerpo en alta resolución.",
    quees: "Estudio de imagen que obtiene cortes del cuerpo con gran detalle.",
    paraque: "Indicado para estudio de columna, tórax, abdomen, cráneo y planificación de procedimientos guiados por imagen.",
    comose: "El paciente se recuesta en la camilla del tomógrafo. El estudio dura pocos minutos y es indoloro.",
    disponibilidad: "Sede Zona Sur y Castillo Plaza · Cita previa",
    grupo: "imagen",
  },
  {
    slug: "rayos-x",
    name: "Rayos X (convencional y portátil)",
    short: "Radiografía en sede o a domicilio.",
    quees: "Estudio de imagen convencional del sistema óseo y del tórax.",
    paraque: "Útil para evaluar fracturas, columna, tórax y control post-procedimiento.",
    comose: "El estudio es rápido e indoloro. También disponible como servicio a domicilio.",
    disponibilidad: "Sede Zona Sur, Castillo Plaza y a domicilio",
    grupo: "imagen",
  },
  {
    slug: "mamografia-3d",
    name: "Mamografía 3D",
    short: "Estudio mamográfico de última generación.",
    quees: "Estudio de imagen mamaria tridimensional con mayor detalle que la mamografía convencional.",
    paraque: "Tamizaje y evaluación diagnóstica de patología mamaria.",
    comose: "El estudio dura pocos minutos. La compresión es menor que en la mamografía convencional.",
    disponibilidad: "Próximamente · En habilitación",
    grupo: "imagen",
  },
  {
    slug: "electrocardiograma",
    name: "Electrocardiograma (ECG)",
    short: "Registro eléctrico del corazón en reposo.",
    quees: "Estudio que registra la actividad eléctrica del corazón mediante electrodos en el pecho.",
    paraque: "Evaluación cardiológica de rutina, valoración preoperatoria y control cardiológico.",
    comose: "Se colocan electrodos adhesivos. El estudio dura pocos minutos y es indoloro.",
    disponibilidad: "Cita previa",
    grupo: "cardiologia",
  },
  {
    slug: "holter",
    name: "Holter",
    short: "Monitoreo cardíaco de 24 horas.",
    quees: "Registro continuo de la actividad eléctrica del corazón durante 24 horas.",
    paraque: "Estudio de palpitaciones, arritmias, mareos y control cardiológico ambulatorio.",
    comose: "Se coloca el equipo en el pecho y el paciente realiza su día normalmente. Se retira al día siguiente.",
    disponibilidad: "Cita previa",
    grupo: "cardiologia",
  },
  {
    slug: "eeg",
    name: "Electroencefalograma (EEG)",
    short: "Registro de la actividad cerebral.",
    quees: "Estudio que registra la actividad eléctrica del cerebro mediante electrodos en el cuero cabelludo.",
    paraque: "Indicado en episodios convulsivos, alteraciones de conciencia y evaluación neurológica.",
    comose: "Se colocan electrodos con gel conductor. El estudio es indoloro y dura entre 30 y 45 minutos.",
    disponibilidad: "En ALGOS · Miércoles por la tarde · Cita previa",
    grupo: "neurofisiologia",
  },
  {
    slug: "emg",
    name: "Electromiografía (EMG)",
    short: "Estudio de nervios y músculos.",
    quees: "Estudio que mide cómo viajan las señales por los nervios y cómo responden los músculos.",
    paraque: "Indicado cuando el dolor viene con hormigueo o debilidad. Detecta si un nervio está comprimido, irritado o dañado, y en qué punto.",
    comose: "Se usan pequeños estímulos eléctricos y, en algunos casos, una aguja fina. Es un estudio breve.",
    disponibilidad: "En ALGOS · Miércoles por la tarde · Dra. Carolina Rodríguez",
    grupo: "neurofisiologia",
  },
  {
    slug: "laboratorio",
    name: "Laboratorio clínico",
    short: "Análisis completos, en sede o a domicilio.",
    quees: "Toma de muestras para análisis de sangre, orina y otros estudios clínicos.",
    paraque: "Evaluación general, control de tratamientos y estudios preoperatorios.",
    comose: "Puede realizarse en sede o solicitarse a domicilio.",
    disponibilidad: "Sede y a domicilio",
    grupo: "laboratorio",
  },
];
