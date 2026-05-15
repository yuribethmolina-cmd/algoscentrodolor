export type ProcedureChip = {
  slug: string;
  label: string;
  technicalName: string;
  description: string;
};

export type Condition = {
  slug: string;
  name: string;
  clinicalName: string;
  patientDescription: string;
  clinicalDescription: string;
  procedures: ProcedureChip[];
  whatIs: string;
  symptoms: string[];
  whenToConsider: string[];
  whatToExpect: string[];
  faq: { q: string; a: string }[];
};

export type Procedure = {
  slug: string;
  name: string;
  technicalName: string;
  description: string;
  usedFor: string[];
};

export const CONDITIONS: Condition[] = [
  {
    slug: 'dolor-lumbar',
    name: 'Dolor lumbar',
    clinicalName: 'LUMBALGIA CRÓNICA',
    patientDescription: 'Dolor en la zona baja de la espalda que limita movimientos básicos.',
    clinicalDescription: 'Lumbalgia mecánica crónica · evaluación etiológica + manejo intervencionista por imagen',
    procedures: [
      { slug: 'rf-facetaria-lumbar', label: 'RF facetaria lumbar', technicalName: 'Radiofrecuencia facetaria lumbar', description: '[ Descripción pendiente revisión Atilio ]' },
      { slug: 'infiltracion-epidural-lumbar', label: 'Infiltración epidural', technicalName: 'Infiltración epidural lumbar guiada por imagen', description: '[ Descripción pendiente revisión Atilio ]' },
      { slug: 'bloqueo-diagnostico-lumbar', label: 'Bloqueo diagnóstico', technicalName: 'Bloqueo diagnóstico facetario lumbar', description: '[ Descripción pendiente revisión Atilio ]' },
    ],
    whatIs: '[ Pendiente revisión Atilio: explicación paciente sobre qué es el dolor lumbar crónico, causas comunes (degeneración discal, síndrome facetario, contractura), y cuándo deja de ser temporal. 2-3 párrafos en lenguaje plano. ]',
    symptoms: [
      'Dolor que persiste más de 3 meses',
      'Rigidez al levantarse en la mañana',
      'Dolor que empeora al estar mucho tiempo sentado o de pie',
      'Limitación para inclinarse o cargar peso',
    ],
    whenToConsider: [
      'Si llevas más de 3 meses con dolor y no responde a tratamiento conservador',
      'Si el dolor te despierta en la noche',
      'Si limita actividades básicas como caminar o vestirte',
      'Si has tenido evaluación previa que confirma origen mecánico lumbar',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación clínica con el especialista · 20 min',
      'Procedimiento bajo guía de imagen · 30-45 min',
      'Observación post-procedimiento · 30 min',
      'Alta el mismo día con instrucciones',
    ],
    faq: [
      { q: '¿Duele el procedimiento?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Cuánto tiempo dura el alivio?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Necesito reposo después?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Cuándo puedo volver a trabajar?', a: '[ Pendiente revisión Atilio ]' },
    ],
  },
  {
    slug: 'dolor-cervical',
    name: 'Dolor cervical',
    clinicalName: 'CERVICALGIA CRÓNICA',
    patientDescription: 'Dolor en cuello u hombros con o sin irradiación al brazo.',
    clinicalDescription: 'Cervicalgia mecánica · síndromes facetarios y radiculares cervicales',
    procedures: [
      { slug: 'rf-cervical', label: 'RF cervical', technicalName: 'Radiofrecuencia cervical', description: '[ Descripción pendiente revisión Atilio ]' },
      { slug: 'infiltracion-facetaria-cervical', label: 'Infiltración facetaria cervical', technicalName: 'Infiltración facetaria cervical guiada por fluoroscopia', description: '[ Descripción pendiente revisión Atilio ]' },
      { slug: 'bloqueo-medial-branch-cervical', label: 'Bloqueo medial branch', technicalName: 'Bloqueo de rama medial cervical', description: '[ Descripción pendiente revisión Atilio ]' },
    ],
    whatIs: '[ Pendiente revisión Atilio: explicación paciente sobre dolor cervical crónico. ]',
    symptoms: [
      'Dolor en cuello que se irradia al hombro o brazo',
      'Rigidez y limitación de movimiento',
      'Dolor de cabeza asociado',
      'Hormigueo o adormecimiento en brazos o manos',
    ],
    whenToConsider: [
      'Si el dolor cervical persiste más de 3 meses',
      'Si hay irradiación al brazo con hormigueo',
      'Si has tenido tratamiento conservador sin respuesta',
      'Si imágenes confirman patología facetaria o radicular',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación clínica · 20 min',
      'Procedimiento bajo fluoroscopia · 30-45 min',
      'Observación · 30 min',
      'Alta el mismo día',
    ],
    faq: [
      { q: '¿Es seguro hacer un procedimiento en el cuello?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Cuántas sesiones necesito?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Voy a perder movilidad?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Es efectivo para hernia cervical?', a: '[ Pendiente revisión Atilio ]' },
    ],
  },
  {
    slug: 'dolor-facetario',
    name: 'Dolor facetario',
    clinicalName: 'SÍNDROME FACETARIO',
    patientDescription: 'Dolor profundo en la espalda que empeora al estar parado o caminar.',
    clinicalDescription: 'Síndrome facetario lumbar/cervical · RF medial branch como tratamiento de elección post bloqueo diagnóstico positivo',
    procedures: [
      { slug: 'rf-medial-branch', label: 'RF medial branch', technicalName: 'Radiofrecuencia de rama medial', description: '[ Descripción pendiente revisión Atilio ]' },
      { slug: 'bloqueo-diagnostico-facetario', label: 'Bloqueo diagnóstico', technicalName: 'Bloqueo diagnóstico facetario', description: '[ Descripción pendiente revisión Atilio ]' },
    ],
    whatIs: '[ Pendiente revisión Atilio: explicación paciente sobre dolor facetario. ]',
    symptoms: [
      'Dolor profundo en columna que aumenta al pararse o caminar',
      'Mejoría al sentarse o inclinarse hacia adelante',
      'Rigidez matutina',
      'Dolor en zona lumbar baja o cervical posterior',
    ],
    whenToConsider: [
      'Si hay diagnóstico de síndrome facetario por imágenes',
      'Si has tenido bloqueo diagnóstico positivo',
      'Si el dolor responde temporalmente a infiltraciones',
      'Si buscas alivio duradero sin cirugía',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación previa · 20 min',
      'Radiofrecuencia bajo fluoroscopia · 45-60 min',
      'Observación · 30 min',
      'Alta el mismo día',
    ],
    faq: [
      { q: '¿Cuánto dura el alivio con radiofrecuencia?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Es necesario el bloqueo diagnóstico primero?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Se puede repetir el procedimiento?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Qué pasa si no funciona?', a: '[ Pendiente revisión Atilio ]' },
    ],
  },
  {
    slug: 'dolor-articular',
    name: 'Dolor articular',
    clinicalName: 'DOLOR ARTICULAR PERIFÉRICO',
    patientDescription: 'Dolor en rodilla, hombro o cadera que limita la actividad diaria.',
    clinicalDescription: 'Dolor articular periférico · infiltración guiada por ecografía · viscosuplementación',
    procedures: [
      { slug: 'infiltracion-intra-articular', label: 'Infiltración intra-articular', technicalName: 'Infiltración intra-articular guiada por ecografía', description: '[ Descripción pendiente revisión Atilio ]' },
      { slug: 'viscosuplementacion', label: 'Viscosuplementación', technicalName: 'Viscosuplementación con ácido hialurónico', description: '[ Descripción pendiente revisión Atilio ]' },
      { slug: 'ozonoterapia-guiada', label: 'Ozonoterapia guiada', technicalName: 'Ozonoterapia articular guiada por ecografía', description: '[ Descripción pendiente revisión Atilio ]' },
    ],
    whatIs: '[ Pendiente revisión Atilio: explicación paciente sobre dolor articular crónico. ]',
    symptoms: [
      'Dolor en rodilla, hombro o cadera al caminar o moverse',
      'Rigidez matutina',
      'Crujidos articulares',
      'Limitación funcional progresiva',
    ],
    whenToConsider: [
      'Si tienes diagnóstico de artrosis o desgaste articular',
      'Si el dolor limita actividades diarias',
      'Si quieres evitar o postponer cirugía de reemplazo',
      'Si has probado fisioterapia sin resultado suficiente',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación + ecografía dirigida · 20 min',
      'Infiltración guiada · 20-30 min',
      'Observación · 15 min',
      'Alta el mismo día',
    ],
    faq: [
      { q: '¿Cuántas infiltraciones necesito?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Cuánto dura el efecto?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Sirve para cualquier articulación?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Es alternativa a la cirugía?', a: '[ Pendiente revisión Atilio ]' },
    ],
  },
  {
    slug: 'lesion-deportiva',
    name: 'Lesión deportiva',
    clinicalName: 'DOLOR POSTRAUMÁTICO PERSISTENTE',
    patientDescription: 'Dolor crónico tras una lesión que no termina de sanar.',
    clinicalDescription: 'Dolor postraumático persistente · evaluación y manejo intervencionista en atletas',
    procedures: [
      { slug: 'infiltracion-guiada-ecografia', label: 'Infiltración guiada por ecografía', technicalName: 'Infiltración guiada por ecografía', description: '[ Descripción pendiente revisión Atilio ]' },
      { slug: 'prp-guiado', label: 'PRP guiado', technicalName: 'Plasma rico en plaquetas guiado por imagen', description: '[ Descripción pendiente revisión Atilio ]' },
      { slug: 'bloqueo-nervio-periferico', label: 'Bloqueo de nervio periférico', technicalName: 'Bloqueo de nervio periférico guiado por ecografía', description: '[ Descripción pendiente revisión Atilio ]' },
    ],
    whatIs: '[ Pendiente revisión Atilio: explicación paciente sobre dolor postraumático deportivo. ]',
    symptoms: [
      'Dolor que persiste más allá del tiempo esperado de recuperación',
      'Limitación funcional al volver al deporte',
      'Inflamación crónica',
      'Sensación de inestabilidad o debilidad',
    ],
    whenToConsider: [
      'Si llevas más de 3 meses sin mejoría tras la lesión',
      'Si quieres regresar al deporte sin cirugía',
      'Si has agotado fisioterapia y tratamiento conservador',
      'Si la imagen muestra lesión persistente o inflamación crónica',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación + ecografía · 20 min',
      'Procedimiento guiado · 20-30 min',
      'Observación · 15 min',
      'Alta el mismo día con plan de retorno deportivo',
    ],
    faq: [
      { q: '¿Cuándo puedo regresar al deporte?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿El PRP es efectivo?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Esto reemplaza la fisioterapia?', a: '[ Pendiente revisión Atilio ]' },
      { q: '¿Funciona para tendinitis crónica?', a: '[ Pendiente revisión Atilio ]' },
    ],
  },
];

export const PROCEDURES: Procedure[] = [
  {
    slug: 'rf-facetaria',
    name: 'Radiofrecuencia facetaria',
    technicalName: 'Radiofrecuencia de rama medial facetaria',
    description: 'Procedimiento que utiliza ondas de radiofrecuencia para desensibilizar los nervios que transmiten dolor desde las articulaciones facetarias de la columna.',
    usedFor: ['dolor-lumbar', 'dolor-cervical', 'dolor-facetario'],
  },
  {
    slug: 'rf-cervical',
    name: 'Radiofrecuencia cervical',
    technicalName: 'Radiofrecuencia de rama medial cervical',
    description: 'Aplicación selectiva de radiofrecuencia en nervios cervicales para tratar dolor crónico de columna cervical.',
    usedFor: ['dolor-cervical', 'dolor-facetario'],
  },
  {
    slug: 'infiltracion-epidural',
    name: 'Infiltración epidural',
    technicalName: 'Infiltración epidural lumbar o cervical guiada por fluoroscopia',
    description: 'Inyección de medicación antiinflamatoria en el espacio epidural para reducir dolor radicular.',
    usedFor: ['dolor-lumbar', 'dolor-cervical'],
  },
  {
    slug: 'bloqueo-diagnostico-facetario',
    name: 'Bloqueo diagnóstico facetario',
    technicalName: 'Bloqueo diagnóstico facetario lumbar/cervical',
    description: 'Inyección diagnóstica con anestésico para confirmar el origen facetario del dolor antes de proceder con radiofrecuencia.',
    usedFor: ['dolor-lumbar', 'dolor-cervical', 'dolor-facetario'],
  },
  {
    slug: 'bloqueo-medial-branch',
    name: 'Bloqueo medial branch',
    technicalName: 'Bloqueo de rama medial',
    description: 'Bloqueo selectivo del nervio que inerva las articulaciones facetarias, usado como diagnóstico previo a radiofrecuencia.',
    usedFor: ['dolor-cervical', 'dolor-facetario'],
  },
  {
    slug: 'infiltracion-intra-articular',
    name: 'Infiltración intra-articular',
    technicalName: 'Infiltración intra-articular guiada por ecografía',
    description: 'Inyección de medicación dentro de la articulación bajo guía ecográfica para precisión milimétrica.',
    usedFor: ['dolor-articular', 'lesion-deportiva'],
  },
  {
    slug: 'viscosuplementacion',
    name: 'Viscosuplementación',
    technicalName: 'Viscosuplementación con ácido hialurónico',
    description: 'Infiltración de ácido hialurónico en articulaciones para mejorar lubricación y reducir dolor por artrosis.',
    usedFor: ['dolor-articular'],
  },
  {
    slug: 'prp-guiado',
    name: 'PRP guiado',
    technicalName: 'Plasma rico en plaquetas guiado por imagen',
    description: 'Infiltración de plasma autólogo concentrado en plaquetas para estimular regeneración tisular en lesiones crónicas.',
    usedFor: ['lesion-deportiva', 'dolor-articular'],
  },
  {
    slug: 'ozonoterapia-guiada',
    name: 'Ozonoterapia guiada',
    technicalName: 'Ozonoterapia articular guiada por ecografía',
    description: 'Aplicación de mezcla ozono-oxígeno en articulaciones para efecto antiinflamatorio y regenerativo.',
    usedFor: ['dolor-articular'],
  },
  {
    slug: 'bloqueo-nervio-periferico',
    name: 'Bloqueo de nervio periférico',
    technicalName: 'Bloqueo de nervio periférico guiado por ecografía',
    description: 'Bloqueo anestésico selectivo de nervios periféricos para diagnóstico o tratamiento de dolor neuropático.',
    usedFor: ['lesion-deportiva'],
  },
];
