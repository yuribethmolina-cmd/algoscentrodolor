export type Diagnostic = {
  slug: string;
  name: string;
  short: string;
  quees: string;
  paraque: string;
  comose: string;
  disponibilidad: string;
  grupo: "neurofisiologia";
};

export const DIAGNOSTIC_GROUPS = {
  neurofisiologia: { label: "Neurofisiología", description: "Estudios de nervios y actividad cerebral.", provider: "algos" as const },
} as const;

export const DIAGNOSTICS: Diagnostic[] = [
  {
    slug: "eeg",
    name: "Electroencefalograma (EEG)",
    short: "Registro de la actividad cerebral.",
    quees: "Estudio que registra la actividad eléctrica del cerebro mediante electrodos en el cuero cabelludo.",
    paraque: "Indicado en episodios convulsivos, alteraciones de conciencia y evaluación neurológica.",
    comose: "Se colocan electrodos con gel conductor. El estudio es indoloro y dura entre 30 y 45 minutos.",
    disponibilidad: "En ALGOS · Cita previa",
    grupo: "neurofisiologia",
  },
  {
    slug: "emg",
    name: "Electromiografía (EMG)",
    short: "Estudio de nervios y músculos.",
    quees: "Estudio que mide cómo viajan las señales por los nervios y cómo responden los músculos.",
    paraque: "Indicado cuando el dolor viene con hormigueo o debilidad. Detecta si un nervio está comprimido, irritado o dañado, y en qué punto.",
    comose: "Se usan pequeños estímulos eléctricos y, en algunos casos, una aguja fina. Es un estudio breve.",
    disponibilidad: "En ALGOS · Cita previa",
    grupo: "neurofisiologia",
  },
];
