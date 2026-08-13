export type StudyFaq = { question: string; answer: string };

export const EMG_FAQ: StudyFaq[] = [
  {
    question: "¿Duele la electromiografía?",
    answer:
      "Los estímulos eléctricos son breves e incómodos, pero no dolorosos. La aguja fina puede causar una molestia leve en cada músculo evaluado. La mayoría de los pacientes lo tolera bien.",
  },
  {
    question: "¿Cuánto dura y puedo irme solo?",
    answer:
      "Entre 30 y 60 minutos. Es ambulatorio, no se usa sedación ni anestesia, así que puede manejar y retomar sus actividades enseguida.",
  },
  {
    question: "¿Necesito ayuno o preparación especial?",
    answer:
      "No requiere ayuno. Acuda con la piel limpia, sin cremas ni aceites en brazos y piernas, y traiga estudios previos e informes si los tiene.",
  },
  {
    question: "¿Puedo hacérmela si tomo anticoagulantes o tengo marcapasos?",
    answer:
      "Avísenos antes de agendar. En esos casos el especialista evalúa su situación y ajusta el estudio o indica precauciones específicas.",
  },
  {
    question: "¿Cuándo entregan el resultado?",
    answer:
      "El informe con la interpretación del especialista se entrega en pocos días y le avisamos apenas esté listo.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El costo y la disponibilidad se los confirmamos directamente por WhatsApp, ya que dependen de la indicación médica y de los nervios o músculos a estudiar.",
  },
];

export const EEG_FAQ: StudyFaq[] = [
  {
    question: "¿Duele el electroencefalograma?",
    answer:
      "No. Los electrodos solo registran la actividad del cerebro, no envían corriente. Solo sentirá el contacto de la pasta sobre el cuero cabelludo.",
  },
  {
    question: "¿Cómo debo preparar el cabello?",
    answer:
      "Lave el cabello el día del estudio y acuda sin gel, spray, aceites ni acondicionador. Eso mejora el contacto de los electrodos y la calidad del registro.",
  },
  {
    question: "¿Debo dormir menos la noche anterior?",
    answer:
      "Solo si el especialista se lo indicó. La privación de sueño ayuda a que el registro sea más completo en algunos casos, pero no se hace de rutina.",
  },
  {
    question: "¿Puedo tomar mis medicamentos?",
    answer:
      "Sí, salvo indicación distinta del médico que ordenó el estudio. Nunca suspenda un anticonvulsivante por su cuenta.",
  },
  {
    question: "¿Cuánto dura y puedo irme enseguida?",
    answer:
      "Entre 30 y 45 minutos. Es ambulatorio: al terminar retiramos los electrodos y puede irse y lavarse el cabello en casa.",
  },
  {
    question: "¿Cuánto cuesta?",
    answer:
      "El costo se lo indicamos por WhatsApp al coordinar su cita.",
  },
];

export const EEG_SEDACION_FAQ: StudyFaq[] = [
  {
    question: "¿Cuándo se indica el estudio con sedación?",
    answer:
      "Cuando el paciente no puede permanecer quieto durante el registro: niños pequeños, personas con condiciones del neurodesarrollo o casos especiales indicados por el especialista.",
  },
  {
    question: "¿Requiere ayuno?",
    answer:
      "Sí. Este estudio requiere horas de ayuno; al agendar por WhatsApp le indicamos cuántas según la edad y el caso.",
  },
  {
    question: "¿Debe ir acompañado?",
    answer:
      "Siempre. Es obligatorio asistir con un acompañante adulto responsable, que permanecerá durante y después del estudio.",
  },
  {
    question: "¿Es seguro sedar a un niño para este estudio?",
    answer:
      "La sedación es ligera, supervisada y se realiza solo cuando está indicada. El equipo monitorea al paciente durante todo el registro y hasta que despierte por completo.",
  },
  {
    question: "¿Cuánto tiempo hay que quedarse después?",
    answer:
      "Se permanece en observación hasta que el paciente esté despierto y estable. Planifique tiempo adicional respecto a un EEG convencional y no conduzca de regreso si el sedado es usted.",
  },
  {
    question: "¿Se agenda igual que los demás estudios?",
    answer:
      "No. Requiere previa cita coordinada por WhatsApp, porque debemos confirmar disponibilidad del equipo y darle las indicaciones de ayuno y acompañante.",
  },
];

export const STUDY_FAQ_GROUPS = [
  { id: "emg", label: "Electromiografía (EMG)", faqs: EMG_FAQ },
  { id: "eeg", label: "Electroencefalograma (EEG)", faqs: EEG_FAQ },
  { id: "eeg-sedacion", label: "EEG con sedación", faqs: EEG_SEDACION_FAQ },
] as const;
