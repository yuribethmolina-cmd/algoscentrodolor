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
    slug: 'dolor-lumbar-ciatica',
    name: 'Dolor lumbar y ciática',
    clinicalName: 'LUMBALGIA CRÓNICA · RADICULOPATÍA LUMBAR',
    patientDescription:
      'Dolor en la zona baja de la espalda, con o sin irradiación hacia la cadera, el glúteo o la pierna, que no cede con reposo ni medicamentos.',
    clinicalDescription:
      'Lumbalgia mecánica crónica · síndrome facetario lumbar · radiculopatía lumbar · hernia discal con compresión radicular',
    procedures: [
      {
        slug: 'bloqueo-radicular-lumbar',
        label: 'Bloqueo radicular',
        technicalName: 'Bloqueo radicular lumbar selectivo guiado por imagen',
        description:
          'Inyección de medicamento antiinflamatorio alrededor de la raíz nerviosa afectada para reducir la inflamación que genera el dolor. Se realiza bajo guía de fluoroscopia o tomografía y permite llegar con precisión al punto exacto de compresión.',
      },
      {
        slug: 'infiltracion-epidural-lumbar',
        label: 'Infiltración epidural',
        technicalName: 'Infiltración epidural lumbar guiada por imagen',
        description:
          'Aplicación de antiinflamatorio en el espacio epidural lumbar para reducir la irritación de varias raíces nerviosas a la vez. Indicada cuando el dolor es difuso o hay más de un nivel afectado.',
      },
      {
        slug: 'discolisis-con-ozono',
        label: 'Discólisis con ozono',
        technicalName: 'Discólisis intradiscal con ozono médico guiada por imagen',
        description:
          'Aplicación de ozono médico dentro del disco herniado para reducir su volumen y la inflamación que irrita el nervio. Solo se indica cuando la hernia discal está confirmada por imagen como causa del dolor y el paciente no ha respondido a tratamiento conservador.',
      },
      {
        slug: 'bloqueo-facetario-lumbar',
        label: 'Bloqueo facetario',
        technicalName: 'Bloqueo facetario lumbar diagnóstico y terapéutico',
        description:
          'Inyección en las articulaciones facetarias lumbares para confirmar si son la fuente del dolor y, al mismo tiempo, reducir la inflamación. Paso previo habitual antes de la radiofrecuencia facetaria.',
      },
    ],
    whatIs:
      'El dolor lumbar crónico es aquel que persiste más de tres meses en la zona baja de la espalda. Puede tener varias causas: desgaste de las articulaciones pequeñas de la columna (síndrome facetario), protrusión o hernia de un disco que comprime una raíz nerviosa, o contractura muscular sostenida por compensación.\n\nCuando la hernia discal irrita o comprime el nervio ciático — que recorre desde la zona lumbar hasta el pie — el dolor se irradia hacia abajo por la pierna, a veces acompañado de hormigueo o adormecimiento. A esto se le llama ciática o radiculopatía lumbar.\n\nCuando el dolor no cede con reposo, analgésicos ni fisioterapia, los procedimientos intervencionistas guiados por imagen permiten actuar directamente sobre el punto que genera el problema, con anestesia local y sin hospitalización.',
    symptoms: [
      'Dolor en la zona lumbar que puede irradiarse hacia la cadera, el glúteo o la pierna',
      'Hormigueo, adormecimiento o sensación eléctrica en el trayecto del nervio ciático',
      'Dolor que aumenta al estar sentado por largo tiempo, al toser o al hacer fuerza',
      'Limitación para inclinarse, cargar objetos o caminar distancias largas',
    ],
    whenToConsider: [
      'Si el dolor lleva más de tres meses y no ha respondido a reposo, medicamentos ni fisioterapia',
      'Si hay irradiación hacia la pierna con hormigueo o adormecimiento',
      'Si una imagen — resonancia magnética o tomografía — confirma hernia discal o compresión radicular',
      'Si el dolor limita actividades básicas como vestirse, trabajar o dormir',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación clínica y revisión de imágenes con el especialista · 20–30 min',
      'Procedimiento guiado por fluoroscopia o tomografía · 30–45 min',
      'Observación post-procedimiento · 30 min',
      'Alta el mismo día con indicaciones escritas',
    ],
    faq: [
      {
        q: '¿La infiltración cura la hernia discal?',
        a: 'No. El objetivo es reducir la inflamación que el disco genera alrededor del nervio, lo que alivia el dolor y permite recuperar la función. La hernia puede reducirse con el tiempo de forma natural; el procedimiento no la extrae quirúrgicamente.',
      },
      {
        q: '¿Cuántas sesiones necesito?',
        a: 'Depende del caso. Muchos pacientes obtienen alivio significativo con una sola sesión. En otros puede ser necesario repetir el procedimiento. El plan se define en consulta según la respuesta de cada paciente.',
      },
      {
        q: '¿Cuándo puedo volver a mis actividades normales?',
        a: 'La mayoría de los pacientes retoman actividades ligeras al día siguiente. Las indicaciones específicas se entregan en la consulta y varían según el procedimiento realizado.',
      },
      {
        q: '¿Tengo que operarme si esto no funciona?',
        a: 'No necesariamente. Si el procedimiento no alcanza el resultado esperado, se evalúan otras opciones antes de considerar cirugía. La decisión se toma siempre con información clara sobre lo que cada alternativa ofrece.',
      },
    ],
  },
  {
    slug: 'dolor-cervical',
    name: 'Dolor cervical',
    clinicalName: 'CERVICALGIA CRÓNICA · RADICULOPATÍA CERVICAL',
    patientDescription:
      'Dolor en el cuello, con o sin irradiación al hombro o al brazo, que limita el movimiento y la vida diaria.',
    clinicalDescription:
      'Cervicalgia mecánica · síndrome facetario cervical · radiculopatía cervical · hernia discal cervical',
    procedures: [
      {
        slug: 'bloqueo-radicular-cervical',
        label: 'Bloqueo radicular cervical',
        technicalName: 'Bloqueo radicular cervical selectivo guiado por imagen',
        description:
          'Inyección de antiinflamatorio alrededor de la raíz nerviosa cervical afectada para reducir la irritación que genera el dolor y la irradiación al brazo. Se realiza bajo guía de fluoroscopia o tomografía.',
      },
      {
        slug: 'infiltracion-facetaria-cervical',
        label: 'Infiltración facetaria cervical',
        technicalName: 'Infiltración facetaria cervical guiada por fluoroscopia',
        description:
          'Inyección en las articulaciones facetarias cervicales para tratar el dolor de origen articular en la columna del cuello. Paso diagnóstico y terapéutico previo a la radiofrecuencia.',
      },
      {
        slug: 'bloqueo-medial-branch-cervical',
        label: 'Bloqueo medial branch',
        technicalName: 'Bloqueo de rama medial cervical',
        description:
          'Bloqueo selectivo del nervio que inerva las articulaciones facetarias cervicales. Confirma el origen facetario del dolor antes de proceder con radiofrecuencia de mayor duración.',
      },
    ],
    whatIs:
      'La cervicalgia crónica es el dolor persistente en la región cervical — la parte de la columna que forma el cuello. Las vértebras cervicales son las más pequeñas y móviles de toda la columna, lo que las expone al desgaste con el tiempo.\n\nCuando el desgaste (espondilosis) o una hernia discal cervical comprimen una raíz nerviosa, el dolor se irradia hacia el hombro, el brazo o los dedos — a esto se le llama radiculopatía cervical. Si la fuente es la articulación facetaria, el dolor es más local y sordo, sin irradiación clara.\n\nLos procedimientos guiados por imagen permiten llegar con precisión al punto exacto de la columna cervical que genera el problema, con anestesia local y sin necesidad de cirugía.',
    symptoms: [
      'Dolor en el cuello que se irradia al hombro, el brazo o entre los omóplatos',
      'Rigidez con dificultad para rotar o inclinar la cabeza',
      'Hormigueo, adormecimiento o debilidad en los dedos de la mano',
      'Dolor de cabeza que comienza en la nuca',
    ],
    whenToConsider: [
      'Si el dolor cervical persiste más de tres meses con poco o ningún alivio con tratamiento conservador',
      'Si hay irradiación al brazo con hormigueo o pérdida de fuerza',
      'Si una imagen confirma patología radicular o facetaria cervical',
      'Si el dolor interfiere con el sueño o actividades básicas como conducir o trabajar frente a una pantalla',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación clínica y revisión de imágenes con el especialista · 20–30 min',
      'Procedimiento bajo guía de fluoroscopia o tomografía · 30–45 min',
      'Observación post-procedimiento · 30 min',
      'Alta el mismo día con indicaciones escritas',
    ],
    faq: [
      {
        q: '¿Es seguro hacer un procedimiento en el cuello?',
        a: 'Sí, cuando se realiza guiado por imagen. La fluoroscopia o la tomografía permiten al especialista visualizar en tiempo real exactamente dónde coloca la aguja, con precisión milimétrica. Ese estándar de guía por imagen es lo que distingue un procedimiento intervencionista de una infiltración a ciegas.',
      },
      {
        q: '¿Voy a perder movilidad después?',
        a: 'No. Los procedimientos en columna cervical no implican cortes ni alteran estructuras óseas o musculares. La movilidad se conserva y en muchos casos mejora al reducirse el dolor.',
      },
      {
        q: '¿Cuántas sesiones necesito?',
        a: 'Depende del diagnóstico. Un bloqueo diagnóstico puede bastar para confirmar el origen del dolor y definir si corresponde radiofrecuencia o infiltración. El plan completo se establece en consulta según cada caso.',
      },
      {
        q: '¿Funciona para la hernia cervical?',
        a: 'Sí, cuando la hernia genera compresión radicular confirmada por imagen. El bloqueo radicular cervical selectivo está específicamente indicado para esos casos y ha demostrado resultados favorables antes de considerar cirugía.',
      },
    ],
  },
  {
    slug: 'dolor-facetario',
    name: 'Dolor facetario',
    clinicalName: 'SÍNDROME FACETARIO',
    patientDescription:
      'Dolor profundo en la espalda o el cuello que empeora al estar de pie o caminar y mejora al sentarse o inclinarse hacia adelante.',
    clinicalDescription:
      'Síndrome facetario lumbar y cervical · bloqueo diagnóstico de rama medial · radiofrecuencia facetaria como tratamiento de elección',
    procedures: [
      {
        slug: 'rf-medial-branch',
        label: 'Radiofrecuencia medial branch',
        technicalName: 'Radiofrecuencia de rama medial facetaria',
        description:
          'Aplica calor controlado sobre el nervio que transmite el dolor desde la articulación facetaria. Al desensibilizar ese nervio, el dolor se reduce de forma duradera — entre 12 y 24 meses en la mayoría de los casos. Se realiza con anestesia local bajo guía de fluoroscopia.',
      },
      {
        slug: 'bloqueo-diagnostico-facetario',
        label: 'Bloqueo diagnóstico',
        technicalName: 'Bloqueo diagnóstico de rama medial facetaria',
        description:
          'Inyección de anestésico local en el nervio que inerva la articulación facetaria. Si el dolor se alivia significativamente, confirma que esa articulación es la fuente y valida la indicación de radiofrecuencia.',
      },
    ],
    whatIs:
      'Las articulaciones facetarias son las pequeñas articulaciones que conectan las vértebras entre sí, tanto en la columna lumbar como en la cervical. Con el envejecimiento o el desgaste, estas articulaciones desarrollan inflamación y generan dolor de forma similar a la artrosis en rodillas o caderas.\n\nEl dolor facetario es sordo y profundo — no irradia de la misma manera que la ciática, sino que se siente en la zona lumbar o cervical posterior, a veces con extensión a los glúteos o las caderas. Un patrón característico: empeora al estar parado o caminar y mejora al sentarse o inclinarse hacia adelante.\n\nEl diagnóstico se confirma con un bloqueo diagnóstico — una inyección de anestésico que, si alivia el dolor, señala que la articulación facetaria es la fuente. Una vez confirmado, la radiofrecuencia ofrece alivio duradero sin necesidad de cirugía.',
    symptoms: [
      'Dolor profundo en columna lumbar o cervical, sin irradiación clara hacia la pierna o el brazo',
      'El dolor empeora al estar parado mucho tiempo o al caminar y mejora al sentarse',
      'Rigidez matutina que mejora con el movimiento durante el día',
      'Sensibilidad a la presión a los lados de la columna vertebral',
    ],
    whenToConsider: [
      'Si el dolor columnar lleva más de tres meses y no responde a tratamiento conservador',
      'Si el patrón sugiere origen facetario: dolor que empeora al extender la columna hacia atrás',
      'Si un bloqueo diagnóstico previo confirmó que el dolor proviene de las articulaciones facetarias',
      'Si busca una alternativa con alivio duradero sin pasar por cirugía',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación clínica y revisión de imágenes con el especialista · 20 min',
      'Bloqueo diagnóstico bajo fluoroscopia (si aún no se realizó) · 20–30 min',
      'Radiofrecuencia de rama medial (cuando el bloqueo fue positivo) · 30–45 min',
      'Alta el mismo día con indicaciones escritas',
    ],
    faq: [
      {
        q: '¿Qué es la radiofrecuencia facetaria?',
        a: 'Es un procedimiento que aplica calor controlado sobre el nervio que transmite el dolor desde la articulación facetaria. Al desensibilizar ese nervio, el dolor se reduce de forma duradera. Se realiza con anestesia local bajo guía de fluoroscopia y es ambulatorio.',
      },
      {
        q: '¿Cuánto tiempo dura el alivio?',
        a: 'En la mayoría de los casos, entre 12 y 24 meses. Cuando el nervio se regenera naturalmente, el procedimiento puede repetirse con resultados similares.',
      },
      {
        q: '¿Es necesario el bloqueo diagnóstico primero?',
        a: 'Sí. El bloqueo diagnóstico confirma que el dolor proviene de las facetas antes de proceder con la radiofrecuencia. Es un paso que evita tratar un origen equivocado — lo que el especialista llama "tratar solo lo que hace falta".',
      },
      {
        q: '¿Qué pasa si no respondo a la radiofrecuencia?',
        a: 'Se evalúa si el bloqueo diagnóstico fue realmente positivo y si hay otras fuentes de dolor que considerar. En consulta se analiza el caso completo y se define el siguiente paso con información clara.',
      },
    ],
  },
  {
    slug: 'neuropatia',
    name: 'Neuropatía',
    clinicalName: 'NEUROPATÍA PERIFÉRICA · NEUROPATÍA DIABÉTICA',
    patientDescription:
      'Dolor, hormigueo o adormecimiento en manos, pies o piernas causado por daño en los nervios periféricos, frecuentemente asociado a diabetes.',
    clinicalDescription:
      'Neuropatía periférica · neuropatía diabética · diagnóstico por EMG · manejo intervencionista con bloqueo de nervio periférico',
    procedures: [
      {
        slug: 'emg',
        label: 'Electromiografía (EMG)',
        technicalName: 'Electromiografía y velocidades de conducción nerviosa',
        description:
          'Mide cómo viajan las señales eléctricas por los nervios y cómo responden los músculos. Confirma qué nervios están dañados, en qué grado y en qué punto exacto — información esencial antes de definir el tratamiento.',
      },
      {
        slug: 'bloqueo-nervio-periferico',
        label: 'Bloqueo de nervio periférico',
        technicalName: 'Bloqueo de nervio periférico guiado por ecografía',
        description:
          'Aplicación de medicamento directamente sobre el nervio afectado bajo guía de ecografía en tiempo real. Alivia el dolor neuropático cuando los medicamentos son insuficientes o generan efectos adversos.',
      },
    ],
    whatIs:
      'La neuropatía periférica es el daño a los nervios que conectan el cerebro y la médula espinal con el resto del cuerpo. Cuando esos nervios están dañados, las señales se distorsionan: el paciente siente dolor, quemazón o corrientazos donde no debería, o deja de sentir en zonas que deberían tener sensibilidad.\n\nLa causa más frecuente en Venezuela es la diabetes mal controlada o de larga evolución. El exceso de glucosa daña progresivamente los nervios, comenzando por los más largos — los de los pies y las piernas. A esto se le llama neuropatía diabética.\n\nEl primer paso es confirmar el diagnóstico con una electromiografía (EMG), que determina qué nervios están afectados y en qué punto. Con ese mapa, el especialista define si hay indicación para un procedimiento intervencionista que complemente el manejo médico.',
    symptoms: [
      'Hormigueo, corrientazos o quemazón en pies, manos o piernas, especialmente en la noche',
      'Adormecimiento o pérdida de sensibilidad, sobre todo en la planta del pie',
      'Dolor que empeora con el contacto de la ropa o las sábanas',
      'Debilidad muscular o dificultad para sostenerse sobre la punta de los pies',
    ],
    whenToConsider: [
      'Si tiene diabetes y presenta síntomas persistentes en pies o piernas sin otra explicación',
      'Si el dolor neuropático no responde a medicamentos o estos generan efectos adversos intolerables',
      'Si un EMG confirmó daño en nervios periféricos',
      'Si busca una opción intervencionista para complementar el tratamiento médico de base',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación clínica y revisión del EMG con el especialista · 20–30 min',
      'Procedimiento según indicación — bloqueo de nervio periférico u otro · 20–30 min',
      'Observación · 15 min',
      'Alta el mismo día con indicaciones y plan de seguimiento',
    ],
    faq: [
      {
        q: '¿Necesito un EMG antes de venir?',
        a: 'Si ya tiene uno, tráigalo a la consulta. Si no, el especialista evaluará si es necesario realizarlo — contamos con el servicio de electrodiagnóstico para ese fin. El EMG es fundamental para saber exactamente qué nervios están afectados antes de definir el tratamiento.',
      },
      {
        q: '¿El tratamiento cura la neuropatía diabética?',
        a: 'No existe cura para la neuropatía ya establecida, pero los procedimientos intervencionistas pueden reducir significativamente el dolor y mejorar la calidad de vida. El manejo completo incluye también el control de la diabetes de base.',
      },
      {
        q: '¿Cuánto tiempo tarda en notarse la mejoría?',
        a: 'Varía según el procedimiento y el grado de daño nervioso. Algunos pacientes notan mejoría en días; en otros, el efecto se consolida en semanas. El seguimiento es parte del plan desde la primera consulta.',
      },
      {
        q: '¿Deben estar involucrados mi internista o endocrinólogo?',
        a: 'Es recomendable. Con su autorización, le hacemos llegar un informe de la evaluación al especialista que maneja su diabetes, para que el tratamiento esté coordinado.',
      },
    ],
  },
  {
    slug: 'dolor-articular',
    name: 'Dolor articular',
    clinicalName: 'DOLOR ARTICULAR PERIFÉRICO · ARTROSIS',
    patientDescription:
      'Dolor en rodilla, cadera u hombro que limita el movimiento y la actividad diaria, generalmente por artrosis o desgaste articular.',
    clinicalDescription:
      'Dolor articular periférico · artrosis de rodilla, cadera y hombro · infiltración guiada por ecografía · viscosuplementación',
    procedures: [
      {
        slug: 'infiltracion-intra-articular',
        label: 'Infiltración intra-articular',
        technicalName: 'Infiltración intra-articular guiada por ecografía',
        description:
          'Inyección de medicamento antiinflamatorio dentro de la articulación bajo guía ecográfica en tiempo real. La imagen permite llegar con precisión al sitio exacto de la articulación, a diferencia de las infiltraciones a ciegas.',
      },
      {
        slug: 'viscosuplementacion',
        label: 'Viscosuplementación',
        technicalName: 'Viscosuplementación con ácido hialurónico guiada por ecografía',
        description:
          'Aplicación de ácido hialurónico dentro de la articulación para restaurar la lubricación perdida por el desgaste del cartílago. Indicada principalmente en artrosis de rodilla y cadera.',
      },
      {
        slug: 'ozono-articular',
        label: 'Ozono articular',
        technicalName: 'Infiltración articular de ozono médico guiada por ecografía',
        description:
          'Aplicación de mezcla de ozono-oxígeno dentro de la articulación para efecto antiinflamatorio. Se indica en artrosis de rodilla cuando hay inflamación activa y la imagen lo confirma.',
      },
    ],
    whatIs:
      'La artrosis es el desgaste progresivo del cartílago que recubre las superficies articulares. Sin ese cartílago, el hueso roza contra el hueso, generando dolor, inflamación y rigidez que aumentan con el tiempo. Rodilla, cadera y hombro son las articulaciones más frecuentemente afectadas.\n\nEl dolor articular crónico suele comenzar con molestia al inicio del movimiento — "el arranque" — y progresa hasta afectar actividades como caminar, subir escaleras o levantar el brazo. La inflamación recurrente dentro de la articulación acelera el deterioro.\n\nLos procedimientos guiados por ecografía permiten actuar directamente dentro de la articulación con precisión milimétrica, reducir la inflamación, mejorar la lubricación y retrasar la progresión — sin cirugía y de forma ambulatoria.',
    symptoms: [
      'Dolor en rodilla, cadera u hombro al caminar, subir escaleras o levantar el brazo',
      'Rigidez matutina o tras estar sentado por tiempo prolongado',
      'Crujidos o sensación de roce al mover la articulación',
      'Inflamación visible o sensación de calor en la zona articular',
    ],
    whenToConsider: [
      'Si tiene diagnóstico de artrosis o desgaste articular confirmado por imagen',
      'Si el dolor limita actividades diarias y no responde suficientemente a analgésicos ni fisioterapia',
      'Si quiere retrasar o evitar una cirugía de reemplazo articular',
      'Si ha tenido infiltraciones previas a ciegas con resultado parcial y busca mayor precisión',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación clínica y ecografía dirigida · 20 min',
      'Infiltración guiada por ecografía en tiempo real · 20–30 min',
      'Observación · 15 min',
      'Alta el mismo día con indicaciones escritas',
    ],
    faq: [
      {
        q: '¿Cuántas infiltraciones necesito?',
        a: 'Depende del tipo de procedimiento y del grado de artrosis. Algunos protocolos incluyen una serie de aplicaciones espaciadas. En consulta se le explica el plan completo y qué puede esperar de cada sesión.',
      },
      {
        q: '¿Cuánto tiempo dura el efecto?',
        a: 'Varía según el procedimiento y el caso: entre 3 y 12 meses en la mayoría de los pacientes. El objetivo es reducir el dolor y mejorar la función lo suficiente para mantener una vida activa.',
      },
      {
        q: '¿Funciona para cualquier articulación?',
        a: 'En ALGOS atendemos principalmente rodilla, cadera y hombro. El especialista evalúa si su articulación específica es candidata al procedimiento en la primera consulta.',
      },
      {
        q: '¿Es una alternativa a la cirugía?',
        a: 'En muchos casos sí, especialmente cuando la artrosis no es severa. El objetivo no es reemplazar una cirugía verdaderamente necesaria, sino agotar las opciones menos invasivas primero — y tomar esa decisión con información clara.',
      },
    ],
  },
];

export const PROCEDURES: Procedure[] = [
  {
    slug: 'bloqueo-radicular-lumbar',
    name: 'Bloqueo radicular lumbar',
    technicalName: 'Bloqueo radicular lumbar selectivo guiado por imagen',
    description:
      'Inyección de antiinflamatorio alrededor de la raíz nerviosa lumbar afectada para reducir la inflamación que genera el dolor ciático. Se realiza bajo guía de fluoroscopia o tomografía.',
    usedFor: ['dolor-lumbar-ciatica'],
  },
  {
    slug: 'infiltracion-epidural',
    name: 'Infiltración epidural',
    technicalName: 'Infiltración epidural guiada por imagen',
    description:
      'Aplicación de medicación antiinflamatoria en el espacio epidural para reducir el dolor radicular de origen lumbar o cervical.',
    usedFor: ['dolor-lumbar-ciatica', 'dolor-cervical'],
  },
  {
    slug: 'discolisis-con-ozono',
    name: 'Discólisis con ozono',
    technicalName: 'Discólisis intradiscal con ozono médico guiada por imagen',
    description:
      'Aplicación de ozono médico dentro del disco herniado para reducir su volumen y la inflamación radicular. Indicada solo cuando la hernia discal está confirmada por imagen como causa del dolor.',
    usedFor: ['dolor-lumbar-ciatica'],
  },
  {
    slug: 'bloqueo-radicular-cervical',
    name: 'Bloqueo radicular cervical',
    technicalName: 'Bloqueo radicular cervical selectivo guiado por imagen',
    description:
      'Inyección de antiinflamatorio alrededor de la raíz nerviosa cervical afectada para reducir el dolor y la irradiación al brazo.',
    usedFor: ['dolor-cervical'],
  },
  {
    slug: 'rf-facetaria',
    name: 'Radiofrecuencia facetaria',
    technicalName: 'Radiofrecuencia de rama medial facetaria',
    description:
      'Aplica calor controlado sobre el nervio que transmite el dolor desde las articulaciones facetarias. Ofrece alivio duradero (12–24 meses) en síndrome facetario confirmado por bloqueo diagnóstico.',
    usedFor: ['dolor-lumbar-ciatica', 'dolor-cervical', 'dolor-facetario'],
  },
  {
    slug: 'bloqueo-diagnostico-facetario',
    name: 'Bloqueo diagnóstico facetario',
    technicalName: 'Bloqueo diagnóstico de rama medial facetaria',
    description:
      'Inyección de anestésico local para confirmar que la articulación facetaria es la fuente del dolor antes de proceder con radiofrecuencia.',
    usedFor: ['dolor-lumbar-ciatica', 'dolor-cervical', 'dolor-facetario'],
  },
  {
    slug: 'emg',
    name: 'Electromiografía (EMG)',
    technicalName: 'Electromiografía y velocidades de conducción nerviosa',
    description:
      'Mide cómo viajan las señales eléctricas por los nervios periféricos. Confirma qué nervios están dañados, en qué grado y en qué punto exacto. Paso diagnóstico esencial en neuropatía.',
    usedFor: ['neuropatia'],
  },
  {
    slug: 'bloqueo-nervio-periferico',
    name: 'Bloqueo de nervio periférico',
    technicalName: 'Bloqueo de nervio periférico guiado por ecografía',
    description:
      'Aplicación de medicamento directamente sobre el nervio periférico afectado bajo guía ecográfica, para aliviar el dolor neuropático.',
    usedFor: ['neuropatia'],
  },
  {
    slug: 'infiltracion-intra-articular',
    name: 'Infiltración intra-articular',
    technicalName: 'Infiltración intra-articular guiada por ecografía',
    description:
      'Inyección de medicamento dentro de la articulación bajo guía ecográfica en tiempo real para precisión milimétrica.',
    usedFor: ['dolor-articular'],
  },
  {
    slug: 'viscosuplementacion',
    name: 'Viscosuplementación',
    technicalName: 'Viscosuplementación con ácido hialurónico guiada por ecografía',
    description:
      'Infiltración de ácido hialurónico en articulaciones para restaurar la lubricación perdida por el desgaste del cartílago.',
    usedFor: ['dolor-articular'],
  },
  {
    slug: 'ozono-articular',
    name: 'Ozono articular',
    technicalName: 'Infiltración articular de ozono médico guiada por ecografía',
    description:
      'Aplicación de ozono-oxígeno dentro de la articulación para efecto antiinflamatorio en artrosis activa.',
    usedFor: ['dolor-articular'],
  },
];
