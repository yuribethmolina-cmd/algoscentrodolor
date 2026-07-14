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
      'El dolor lumbar crónico es aquel que persiste más de tres meses en la zona baja de la espalda. Puede tener varias causas: desgaste de las articulaciones pequeñas de la columna (síndrome facetario), protrusión o hernia de un disco que comprime una raíz nerviosa, o contractura muscular sostenida por compensación.\n\nCuando la hernia discal irrita o comprime el nervio ciático, que recorre desde la zona lumbar hasta el pie, el dolor se irradia hacia abajo por la pierna, a veces acompañado de hormigueo o adormecimiento. A esto se le llama ciática o radiculopatía lumbar.\n\nCuando el dolor no cede con reposo, analgésicos ni fisioterapia, los procedimientos intervencionistas guiados por imagen permiten actuar directamente sobre el punto que genera el problema, con anestesia local y sin hospitalización.',
    symptoms: [
      'Dolor en la zona lumbar que puede irradiarse hacia la cadera, el glúteo o la pierna',
      'Hormigueo, adormecimiento o sensación eléctrica en el trayecto del nervio ciático',
      'Dolor que aumenta al estar sentado por largo tiempo, al toser o al hacer fuerza',
      'Limitación para inclinarse, cargar objetos o caminar distancias largas',
    ],
    whenToConsider: [
      'Si el dolor lleva más de tres meses y no ha respondido a reposo, medicamentos ni fisioterapia',
      'Si hay irradiación hacia la pierna con hormigueo o adormecimiento',
      'Si una imagen, resonancia magnética o tomografía, confirma hernia discal o compresión radicular',
      'Si el dolor limita actividades básicas como vestirse, trabajar o dormir',
    ],
    whatToExpect: [
      'Llegada y registro · 15 min',
      'Evaluación clínica y revisión de imágenes con el especialista · 20-30 min',
      'Procedimiento guiado por fluoroscopia o tomografía · 30-45 min',
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
      'La cervicalgia crónica es el dolor persistente en la región cervical, la parte de la columna que forma el cuello. Las vértebras cervicales son las más pequeñas y móviles de toda la columna, lo que las expone al desgaste con el tiempo.\n\nCuando el desgaste (espondilosis) o una hernia discal cervical comprimen una raíz nerviosa, el dolor se irradia hacia el hombro, el brazo o los dedos, a esto se le llama radiculopatía cervical. Si la fuente es la articulación facetaria, el dolor es más local y sordo, sin irradiación clara.\n\nLos procedimientos guiados por imagen permiten llegar con precisión al punto exacto de la columna cervical que genera el problema, con anestesia local y sin necesidad de cirugía.',
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
      'Evaluación clínica y revisión de imágenes con el especialista · 20-30 min',
      'Procedimiento bajo guía de fluoroscopia o tomografía · 30-45 min',
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
          'Aplica calor controlado sobre el nervio que transmite el dolor desde la articulación facetaria. Al desensibilizar ese nervio, el dolor se reduce de forma duradera, entre 12 y 24 meses en la mayoría de los casos. Se realiza con anestesia local bajo guía de fluoroscopia.',
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
      'Las articulaciones facetarias son las pequeñas articulaciones que conectan las vértebras entre sí, tanto en la columna lumbar como en la cervical. Con el envejecimiento o el desgaste, estas articulaciones desarrollan inflamación y generan dolor de forma similar a la artrosis en rodillas o caderas.\n\nEl dolor facetario es sordo y profundo, no irradia de la misma manera que la ciática, sino que se siente en la zona lumbar o cervical posterior, a veces con extensión a los glúteos o las caderas. Un patrón característico: empeora al estar parado o caminar y mejora al sentarse o inclinarse hacia adelante.\n\nEl diagnóstico se confirma con un bloqueo diagnóstico, una inyección de anestésico que, si alivia el dolor, señala que la articulación facetaria es la fuente. Una vez confirmado, la radiofrecuencia ofrece alivio duradero sin necesidad de cirugía.',
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
      'Bloqueo diagnóstico bajo fluoroscopia (si aún no se realizó) · 20-30 min',
      'Radiofrecuencia de rama medial (cuando el bloqueo fue positivo) · 30-45 min',
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
        a: 'Sí. El bloqueo diagnóstico confirma que el dolor proviene de las facetas antes de proceder con la radiofrecuencia. Es un paso que evita tratar un origen equivocado, lo que el especialista llama "tratar solo lo que hace falta".',
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
          'Mide cómo viajan las señales eléctricas por los nervios y cómo responden los músculos. Confirma qué nervios están dañados, en qué grado y en qué punto exacto, información esencial antes de definir el tratamiento.',
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
      'La neuropatía periférica es el daño a los nervios que conectan el cerebro y la médula espinal con el resto del cuerpo. Cuando esos nervios están dañados, las señales se distorsionan: el paciente siente dolor, quemazón o corrientazos donde no debería, o deja de sentir en zonas que deberían tener sensibilidad.\n\nLa causa más frecuente en Venezuela es la diabetes mal controlada o de larga evolución. El exceso de glucosa daña progresivamente los nervios, comenzando por los más largos, los de los pies y las piernas. A esto se le llama neuropatía diabética.\n\nEl primer paso es confirmar el diagnóstico con una electromiografía (EMG), que determina qué nervios están afectados y en qué punto. Con ese mapa, el especialista define si hay indicación para un procedimiento intervencionista que complemente el manejo médico.',
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
      'Evaluación clínica y revisión del EMG con el especialista · 20-30 min',
      'Procedimiento según indicación, bloqueo de nervio periférico u otro · 20-30 min',
      'Observación · 15 min',
      'Alta el mismo día con indicaciones y plan de seguimiento',
    ],
    faq: [
      {
        q: '¿Necesito un EMG antes de venir?',
        a: 'Si ya tiene uno, tráigalo a la consulta. Si no, el especialista evaluará si es necesario realizarlo, contamos con el servicio de electrodiagnóstico para ese fin. El EMG es fundamental para saber exactamente qué nervios están afectados antes de definir el tratamiento.',
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
      'La artrosis es el desgaste progresivo del cartílago que recubre las superficies articulares. Sin ese cartílago, el hueso roza contra el hueso, generando dolor, inflamación y rigidez que aumentan con el tiempo. Rodilla, cadera y hombro son las articulaciones más frecuentemente afectadas.\n\nEl dolor articular crónico suele comenzar con molestia al inicio del movimiento, "el arranque", y progresa hasta afectar actividades como caminar, subir escaleras o levantar el brazo. La inflamación recurrente dentro de la articulación acelera el deterioro.\n\nLos procedimientos guiados por ecografía permiten actuar directamente dentro de la articulación con precisión milimétrica, reducir la inflamación, mejorar la lubricación y retrasar la progresión, sin cirugía y de forma ambulatoria.',
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
      'Infiltración guiada por ecografía en tiempo real · 20-30 min',
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
        a: 'En muchos casos sí, especialmente cuando la artrosis no es severa. El objetivo no es reemplazar una cirugía verdaderamente necesaria, sino agotar las opciones menos invasivas primero, y tomar esa decisión con información clara.',
      },
    ],
  },
  {
    slug: 'hernia-discal',
    name: 'Hernia discal',
    clinicalName: 'HERNIA DE DISCO LUMBAR · PROTRUSIÓN DISCAL',
    patientDescription:
      'Cuando el núcleo del disco intervertebral sale de su posición y comprime una raíz nerviosa, generando dolor en la espalda baja con irradiación al glúteo o la pierna.',
    clinicalDescription:
      'Hernia discal lumbar con compromiso radicular · protrusión discal · síndrome de compresión radicular L4-S1',
    procedures: [
      {
        slug: 'discolisis-con-ozono',
        label: 'Discólisis con ozono',
        technicalName: 'Discólisis con ozono médico guiada por imagen',
        description:
          'Aplicación de ozono médico en el disco, guiada por fluoroscopia o tomografía, para reducir el volumen de la hernia y la inflamación que comprime la raíz nerviosa.',
      },
      {
        slug: 'bloqueo-radicular-lumbar',
        label: 'Bloqueo radicular',
        technicalName: 'Bloqueo radicular lumbar selectivo guiado por imagen',
        description:
          'Inyección de antiinflamatorio alrededor de la raíz nerviosa afectada para reducir la inflamación que genera el dolor irradiado.',
      },
      {
        slug: 'infiltracion-epidural-lumbar',
        label: 'Infiltración epidural',
        technicalName: 'Infiltración epidural lumbar guiada por fluoroscopia',
        description:
          'Inyección de corticoide en el espacio epidural para reducir la inflamación general que rodea la hernia.',
      },
    ],
    whatIs:
      'Los discos intervertebrales actúan como amortiguadores entre las vértebras. Cuando el núcleo gelatinoso de un disco se desplaza hacia el canal espinal, puede comprimir las raíces nerviosas que salen de la columna, generando dolor local y dolor irradiado hacia la pierna, lo que se conoce como ciática.\n\nLa hernia discal lumbar es una de las causas más frecuentes de dolor de espalda con irradiación. En la mayoría de los casos no requiere cirugía: los procedimientos mínimamente invasivos guiados por imagen pueden reducir la inflamación que genera el dolor y permitir que el nervio se recupere.',
    symptoms: [
      'Dolor en la zona lumbar que se irradia hacia el glúteo, el muslo o la pierna',
      'Hormigueo, adormecimiento o corrientazos en la pierna o el pie',
      'Debilidad en la pierna o dificultad para levantar el pie',
      'Dolor que empeora al sentarse o al toser y mejora al caminar',
    ],
    whenToConsider: [
      'Cuando el dolor irradiado no cede con reposo ni medicamentos orales',
      'Cuando la imagen (resonancia o tomografía) confirma hernia con compromiso de raíz',
      'Cuando se quiere explorar opciones antes de plantearse la cirugía',
    ],
    whatToExpect: [
      'Evaluación clínica y revisión de imágenes diagnósticas previas',
      'Procedimiento ambulatorio guiado por imagen con anestesia local',
      'Alta el mismo día · indicaciones escritas al salir',
    ],
    faq: [
      {
        q: '¿La discólisis con ozono cura la hernia?',
        a: 'El objetivo no es "curar" la hernia en el sentido de hacerla desaparecer, sino reducir la inflamación que genera el dolor y permitir que el nervio funcione mejor. En muchos pacientes se logra mejoría significativa sin necesidad de cirugía.',
      },
      {
        q: '¿Puedo evitar la operación?',
        a: 'En una proporción importante de casos, sí. Los procedimientos mínimamente invasivos están indicados precisamente para agotar las opciones antes de la cirugía. El especialista evaluará su caso específico.',
      },
    ],
  },
  {
    slug: 'cirugia-fallida-espalda',
    name: 'Cirugía fallida de espalda',
    clinicalName: 'SÍNDROME DE CIRUGÍA FALLIDA DE COLUMNA · FBSS',
    patientDescription:
      'Dolor persistente o recurrente en la columna después de una cirugía de espalda que no produjo el alivio esperado.',
    clinicalDescription:
      'Failed back surgery syndrome (FBSS) · dolor postquirúrgico de columna · fibrosis epidural · aracnoiditis postoperatoria',
    procedures: [
      {
        slug: 'bloqueo-radicular-lumbar',
        label: 'Bloqueo radicular',
        technicalName: 'Bloqueo radicular lumbar selectivo guiado por imagen',
        description:
          'Inyección de antiinflamatorio alrededor de la raíz nerviosa para reducir la inflamación residual posterior a la cirugía.',
      },
      {
        slug: 'infiltracion-epidural-lumbar',
        label: 'Infiltración epidural',
        technicalName: 'Infiltración epidural lumbar guiada por fluoroscopia',
        description:
          'Inyección en el espacio epidural para tratar la inflamación que persiste tras la intervención quirúrgica.',
      },
      {
        slug: 'emg',
        label: 'EMG diagnóstico',
        technicalName: 'Electromiografía diagnóstica',
        description:
          'Estudio neurofisiológico para evaluar el estado de los nervios y confirmar si hay compromiso radicular persistente.',
      },
    ],
    whatIs:
      'El síndrome de cirugía fallida de columna describe la situación en la que una persona continúa con dolor después de una operación de espalda, ya sea porque el dolor no mejoró, porque volvió después de un período de alivio, o porque apareció dolor en una localización diferente.\n\nLas causas son variadas: fibrosis epidural (tejido cicatricial), recidiva de la hernia, inestabilidad segmentaria, o simplemente que el dolor tenía un origen que la cirugía no resolvió. El abordaje intervencionista puede ofrecer alternativas de manejo sin necesidad de nuevas intervenciones quirúrgicas.',
    symptoms: [
      'Dolor lumbar persistente igual o similar al previo a la cirugía',
      'Dolor irradiado a la pierna que reaparece o no desapareció',
      'Adormecimiento o debilidad que persiste tras la operación',
      'Dolor que empeora con la actividad y mejora con el reposo',
    ],
    whenToConsider: [
      'Cuando han pasado al menos 3-6 meses desde la cirugía y el dolor persiste',
      'Cuando se quiere evaluar alternativas antes de una segunda cirugía',
      'Cuando el dolor postoperatorio afecta la calidad de vida y la funcionalidad',
    ],
    whatToExpect: [
      'Revisión detallada de historial quirúrgico e imágenes previas y actuales',
      'Evaluación neurofisiológica si está indicada',
      'Plan individualizado de manejo intervencionista según el origen del dolor',
    ],
    faq: [
      {
        q: '¿Pueden hacerme algo después de que ya me operaron?',
        a: 'Sí. El hecho de haber tenido una cirugía no impide los procedimientos intervencionistas. En muchos casos son precisamente los pacientes postquirúrgicos quienes más se benefician de este enfoque.',
      },
      {
        q: '¿Necesito operarme de nuevo?',
        a: 'No necesariamente. El objetivo de la evaluación es determinar si el origen del dolor puede tratarse con opciones menos invasivas. La indicación de una nueva cirugía se toma con criterio clínico estricto.',
      },
    ],
  },
  {
    slug: 'dolor-radicular',
    name: 'Dolor radicular',
    clinicalName: 'RADICULOPATÍA · SÍNDROME RADICULAR LUMBAR O CERVICAL',
    patientDescription:
      'Dolor que sigue el trayecto de un nervio desde la columna hacia el brazo o la pierna, con frecuencia acompañado de hormigueo o adormecimiento.',
    clinicalDescription:
      'Radiculopatía lumbar o cervical por compresión de raíz nerviosa · síndrome radicular agudo o crónico',
    procedures: [
      {
        slug: 'bloqueo-radicular-lumbar',
        label: 'Bloqueo radicular lumbar',
        technicalName: 'Bloqueo radicular lumbar selectivo guiado por imagen',
        description:
          'Inyección de antiinflamatorio alrededor de la raíz nerviosa lumbar afectada.',
      },
      {
        slug: 'bloqueo-radicular-cervical',
        label: 'Bloqueo radicular cervical',
        technicalName: 'Bloqueo radicular cervical selectivo guiado por imagen',
        description:
          'Inyección perirradicular en la columna cervical para tratar el dolor que irradia hacia el hombro o el brazo.',
      },
    ],
    whatIs:
      'El dolor radicular ocurre cuando una raíz nerviosa que sale de la columna vertebral se comprime o irrita, por una hernia discal, artrosis, estenosis u otras causas. El dolor "viaja" por el trayecto del nervio afectado: desde la columna lumbar hacia la pierna (ciática), o desde la columna cervical hacia el hombro y el brazo.\n\nA diferencia del dolor muscular, el dolor radicular tiene un patrón específico que sigue el territorio del nervio comprimido. Puede acompañarse de hormigueo, adormecimiento o pérdida de fuerza en la zona afectada.',
    symptoms: [
      'Dolor que irradia desde la columna hacia la pierna (lumbar) o el brazo (cervical)',
      'Hormigueo o corrientazos en la extremidad afectada',
      'Adormecimiento en el trayecto del nervio',
      'Debilidad muscular en casos más severos',
    ],
    whenToConsider: [
      'Cuando el dolor irradiado persiste más de 4-6 semanas con tratamiento conservador',
      'Cuando la imagen confirma compresión de raíz nerviosa',
      'Cuando el dolor limita la movilidad o las actividades diarias',
    ],
    whatToExpect: [
      'Evaluación clínica y revisión de imágenes diagnósticas',
      'Procedimiento ambulatorio guiado por fluoroscopia o tomografía',
      'Alivio del componente inflamatorio que genera el dolor irradiado',
    ],
    faq: [
      {
        q: '¿Es lo mismo que la ciática?',
        a: 'La ciática es un tipo de dolor radicular: la irritación del nervio ciático que genera dolor desde la zona lumbar hacia la pierna. El término radicular es más amplio e incluye también las raíces del cuello que irradian hacia el brazo.',
      },
    ],
  },
  {
    slug: 'dolor-sacroiliaco',
    name: 'Dolor sacroilíaco',
    clinicalName: 'DISFUNCIÓN DE LA ARTICULACIÓN SACROILÍACA',
    patientDescription:
      'Dolor en la parte baja de la espalda o la nalga, a veces irradiado al muslo, originado en la articulación que une la columna con la pelvis.',
    clinicalDescription:
      'Síndrome de la articulación sacroilíaca · sacroileítis · disfunción sacroilíaca crónica',
    procedures: [
      {
        slug: 'bloqueo-sacroiliaco',
        label: 'Bloqueo sacroilíaco',
        technicalName: 'Infiltración de la articulación sacroilíaca guiada por imagen',
        description:
          'Inyección de antiinflamatorio dentro de la articulación sacroilíaca bajo guía de fluoroscopia o ecografía para reducir la inflamación y el dolor.',
      },
    ],
    whatIs:
      'La articulación sacroilíaca conecta la columna lumbar con la pelvis a través del sacro. Cuando esta articulación se inflama o pierde su movilidad normal, genera dolor en la región lumboglútea que puede confundirse con una hernia discal o ciática.\n\nEl dolor sacroilíaco es frecuente tras embarazos, traumatismos pelvianos, o como consecuencia de patologías inflamatorias. La guía por imagen permite confirmar que el dolor proviene de esta articulación y actuar directamente sobre ella.',
    symptoms: [
      'Dolor sordo en la zona lumbar baja o la nalga, generalmente unilateral',
      'Dolor que empeora al estar de pie prolongado o al subir escaleras',
      'Molestia al girar en la cama o al cruzar las piernas',
      'Irradiación ocasional al muslo posterior',
    ],
    whenToConsider: [
      'Cuando el dolor lumboglúteo persiste sin mejora con el tratamiento habitual',
      'Cuando los estudios de imagen de la columna no explican el dolor',
      'Cuando hay antecedente de embarazo reciente o traumatismo pelviano',
    ],
    whatToExpect: [
      'Evaluación clínica con pruebas específicas de provocación de la articulación',
      'Procedimiento ambulatorio guiado por imagen · anestesia local',
      'Alta el mismo día',
    ],
    faq: [
      {
        q: '¿Cómo saben que el dolor viene de esa articulación?',
        a: 'Se realiza una evaluación clínica con maniobras específicas de provocación y, en muchos casos, un bloqueo diagnóstico: si la inyección alivia el dolor de forma significativa, confirma que esa articulación es la fuente.',
      },
    ],
  },
  {
    slug: 'estenosis-canal-lumbar',
    name: 'Estenosis de canal lumbar',
    clinicalName: 'ESTENOSIS DEL CANAL ESPINAL LUMBAR',
    patientDescription:
      'Estrechamiento del canal por donde pasan los nervios de la columna, que genera dolor o cansancio en las piernas al caminar.',
    clinicalDescription:
      'Estenosis espinal lumbar degenerativa · claudicación neurógena · síndrome del canal estrecho',
    procedures: [
      {
        slug: 'infiltracion-epidural-lumbar',
        label: 'Infiltración epidural',
        technicalName: 'Infiltración epidural lumbar guiada por fluoroscopia',
        description:
          'Inyección de antiinflamatorio en el espacio epidural para reducir la inflamación que agrava la compresión nerviosa.',
      },
      {
        slug: 'bloqueo-radicular-lumbar',
        label: 'Bloqueo radicular',
        technicalName: 'Bloqueo radicular lumbar selectivo guiado por imagen',
        description:
          'Inyección dirigida a la raíz nerviosa más afectada para mejorar la tolerancia al dolor y a la marcha.',
      },
    ],
    whatIs:
      'La estenosis del canal lumbar es el estrechamiento del espacio por donde pasan los nervios que van hacia las piernas. Con el envejecimiento o el desgaste de la columna, ligamentos, discos y hueso pueden reducir ese espacio, comprimiendo las raíces nerviosas.\n\nEl síntoma característico es la claudicación neurógena: dificultad para caminar distancias largas por cansancio o dolor en las piernas que cede al sentarse o inclinarse hacia adelante. Las opciones intervencionistas pueden mejorar la función sin necesidad de cirugía.',
    symptoms: [
      'Dolor o cansancio en las piernas al caminar que obliga a detenerse',
      'Mejoría al sentarse o inclinarse hacia adelante',
      'Adormecimiento u hormigueo en los muslos o las piernas',
      'Dolor lumbar de fondo, variable',
    ],
    whenToConsider: [
      'Cuando la limitación para caminar afecta la calidad de vida',
      'Cuando la imagen confirma estenosis espinal significativa',
      'Cuando se quiere una alternativa menos invasiva antes de plantearse la descompresión quirúrgica',
    ],
    whatToExpect: [
      'Revisión de resonancia magnética o tomografía de columna lumbar',
      'Procedimiento ambulatorio guiado por imagen · anestesia local',
      'Seguimiento de la respuesta funcional y el plan de manejo',
    ],
    faq: [
      {
        q: '¿Con estos procedimientos se ensancha el canal?',
        a: 'No. Los procedimientos no corrigen la estructura del canal, sino que reducen la inflamación que agrava la compresión y mejoran la tolerancia al dolor. En muchos pacientes eso es suficiente para recuperar funcionalidad significativa.',
      },
    ],
  },
  {
    slug: 'dolor-miofascial',
    name: 'Dolor miofascial',
    clinicalName: 'SÍNDROME DE DOLOR MIOFASCIAL · PUNTOS GATILLO',
    patientDescription:
      'Dolor muscular crónico localizado en un músculo o grupo muscular, con puntos muy sensibles al tacto que generan dolor local e irradiado.',
    clinicalDescription:
      'Síndrome miofascial · puntos gatillo activos (trigger points) · mialgia regional crónica',
    procedures: [
      {
        slug: 'bloqueo-nervio-periferico',
        label: 'Infiltración de punto gatillo',
        technicalName: 'Infiltración de punto gatillo guiada por ecografía',
        description:
          'Inyección dirigida en el punto de máxima tensión muscular para desactivar el foco de dolor e inflamación local.',
      },
    ],
    whatIs:
      'El síndrome miofascial se caracteriza por la presencia de puntos gatillo: zonas de hiperirritabilidad dentro del músculo que, al comprimirse, generan un dolor referido en un patrón reconocible. Son frecuentes en el trapecio, el cuadrado lumbar, el glúteo y los músculos del cuello.\n\nEste tipo de dolor suele interpretarse como tensión muscular simple, pero puede ser persistente y limitante cuando los puntos gatillo están activos. La infiltración guiada por ecografía permite llegar con precisión al punto exacto.',
    symptoms: [
      'Dolor muscular sordo y persistente en una región específica',
      'Presencia de nódulos o bandas tensas palpables en el músculo',
      'Dolor que se irradia en un patrón reconocible al presionar el punto sensible',
      'Rigidez y limitación de movimiento en la zona afectada',
    ],
    whenToConsider: [
      'Cuando el dolor muscular persiste a pesar de fisioterapia y medicamentos',
      'Cuando hay puntos gatillo activos identificables en la exploración clínica',
      'Cuando el dolor limita el sueño, el trabajo o las actividades habituales',
    ],
    whatToExpect: [
      'Identificación clínica y por imagen de los puntos gatillo activos',
      'Procedimiento ambulatorio · anestesia local · ecografía en tiempo real',
      'Alta inmediata con indicaciones de movilización progresiva',
    ],
    faq: [
      {
        q: '¿Es lo mismo que la fibromialgia?',
        a: 'No. La fibromialgia es un síndrome de sensibilización central con dolor generalizado. El síndrome miofascial es dolor localizado por puntos gatillo en músculos específicos. Pueden coexistir, pero son condiciones diferentes.',
      },
    ],
  },
  {
    slug: 'neuralgia-posherpetica',
    name: 'Neuralgia postherpética',
    clinicalName: 'NEURALGIA POSTHERPÉTICA · DOLOR POR HERPES ZÓSTER',
    patientDescription:
      'Dolor persistente en la zona donde aparecieron las ampollas del herpes zóster (culebrilla), que continúa semanas o meses después de que las lesiones de la piel cicatrizaron.',
    clinicalDescription:
      'Neuralgia postherpética · dolor neuropático por varicella-zoster · alodinia postherpética',
    procedures: [
      {
        slug: 'bloqueo-nervio-periferico',
        label: 'Bloqueo nervioso',
        technicalName: 'Bloqueo del nervio afectado guiado por ecografía',
        description:
          'Infiltración anestésica y antiinflamatoria alrededor del nervio dañado por el herpes para reducir la señal de dolor.',
      },
    ],
    whatIs:
      'El herpes zóster (culebrilla) es la reactivación del virus varicela-zóster, que permanece dormido en los ganglios nerviosos tras haber tenido varicela. Cuando se reactiva, produce una erupción con ampollas dolorosas que sigue el trayecto de un nervio.\n\nEn algunas personas, especialmente mayores de 60 años, el dolor persiste después de que las lesiones de la piel han cicatrizado. Ese dolor residual, la neuralgia postherpética, puede ser intenso, continuo o eléctrico, y responde de forma limitada a los analgésicos convencionales. El bloqueo nervioso es una opción para modular ese dolor.',
    symptoms: [
      'Dolor urente, punzante o eléctrico en la zona donde estuvo el sarpullido',
      'Hipersensibilidad al tacto: incluso la ropa puede generar dolor (alodinia)',
      'Picazón persistente o sensación de corrientazos',
      'El dolor sigue el trayecto del nervio afectado, habitualmente en un solo lado',
    ],
    whenToConsider: [
      'Cuando el dolor persiste más de 3 meses después de que cicatrizaron las lesiones',
      'Cuando la medicación oral no controla el dolor de forma adecuada',
      'Cuando el dolor afecta el sueño o la calidad de vida de forma significativa',
    ],
    whatToExpect: [
      'Evaluación clínica del patrón de dolor y zona afectada',
      'Procedimiento ambulatorio guiado por ecografía · anestesia local',
      'Plan de seguimiento para evaluar respuesta y ajustar el manejo',
    ],
    faq: [
      {
        q: '¿Es tarde si ya pasaron varios meses desde la culebrilla?',
        a: 'No necesariamente. Aunque los mejores resultados se obtienen en fases tempranas, los bloqueos nerviosos pueden ser útiles incluso en neuralgias de larga evolución. La evaluación clínica determinará qué opciones son apropiadas para su caso.',
      },
    ],
  },
  {
    slug: 'tunel-carpiano',
    name: 'Túnel carpiano',
    clinicalName: 'SÍNDROME DEL TÚNEL CARPIANO',
    patientDescription:
      'Hormigueo, adormecimiento o dolor en la mano y los dedos causado por la compresión del nervio mediano en la muñeca.',
    clinicalDescription:
      'Síndrome del túnel carpiano · neuropatía del nervio mediano · compresión del nervio mediano en el ligamento transverso del carpo',
    procedures: [
      {
        slug: 'emg',
        label: 'EMG diagnóstico',
        technicalName: 'Electromiografía, estudio de conducción nerviosa',
        description:
          'Estudio neurofisiológico que mide la velocidad de conducción del nervio mediano y confirma la gravedad de la compresión.',
      },
      {
        slug: 'bloqueo-nervio-periferico',
        label: 'Infiltración del túnel carpiano',
        technicalName: 'Infiltración del túnel carpiano guiada por ecografía',
        description:
          'Inyección de antiinflamatorio en el túnel carpiano bajo guía ecográfica en tiempo real para reducir la inflamación que comprime el nervio.',
      },
    ],
    whatIs:
      'El nervio mediano pasa por el túnel carpiano, un canal estrecho en la muñeca formado por huesos y un ligamento. Cuando ese túnel se estrecha o sus contenidos se inflaman, el nervio se comprime y genera síntomas en la mano: hormigueo, adormecimiento y dolor, especialmente de noche.\n\nEl diagnóstico se confirma con electromiografía (EMG). En casos moderados, la infiltración guiada por ecografía puede reducir la inflamación y aliviar los síntomas sin necesidad de cirugía.',
    symptoms: [
      'Hormigueo o adormecimiento en los dedos pulgar, índice, medio y la mitad del anular',
      'Dolor en la mano o la muñeca que empeora por la noche',
      'Sensación de que la mano está "dormida" al despertar',
      'Debilidad para agarrar objetos en casos avanzados',
    ],
    whenToConsider: [
      'Cuando los síntomas persisten y afectan el sueño o el trabajo',
      'Cuando el EMG confirma compresión del nervio mediano',
      'Cuando se quiere una opción antes de plantearse la cirugía de descompresión',
    ],
    whatToExpect: [
      'EMG para confirmar diagnóstico y graduar la severidad',
      'Infiltración ambulatoria guiada por ecografía · anestesia local',
      'Alta el mismo día · indicaciones de actividad',
    ],
    faq: [
      {
        q: '¿Tengo que operarme del túnel carpiano?',
        a: 'No en todos los casos. En formas leves a moderadas, la infiltración puede ofrecer alivio sostenido. En formas severas con daño nervioso establecido, la cirugía es la opción indicada. El EMG y la evaluación clínica orientan esa decisión.',
      },
    ],
  },
  {
    slug: 'cefaleas',
    name: 'Cefaleas',
    clinicalName: 'CEFALEA CERVICOGÉNICA · NEURALGIA OCCIPITAL',
    patientDescription:
      'Dolor de cabeza recurrente que no cede con analgésicos comunes. En ALGOS tratamos las cefaleas con un componente mecánico o nervioso identificable —cervicogénica, neuralgia occipital y cefalea facetaria alta— mediante bloqueos guiados por imagen.',
    clinicalDescription:
      'Cefalea cervicogénica · neuralgia occipital mayor y menor · cefalea por disfunción facetaria cervical alta (C1-C3)',
    procedures: [
      {
        slug: 'bloqueo-radicular-cervical',
        label: 'Bloqueo del nervio occipital',
        technicalName: 'Bloqueo del nervio occipital mayor y menor guiado por ecografía',
        description:
          'Inyección perineural de anestésico y corticoide sobre los nervios occipitales en la base del cráneo. Interrumpe la señal de dolor que llega al cuero cabelludo y la región retroauricular. Efecto diagnóstico y terapéutico en la misma sesión.',
      },
      {
        slug: 'bloqueo-facetario-cervical',
        label: 'Bloqueo facetario cervical alto',
        technicalName: 'Bloqueo de la rama medial C2-C3 guiado por fluoroscopia',
        description:
          'Infiltración selectiva de las articulaciones facetarias cervicales altas, causa frecuente de cefalea cervicogénica. Confirma el origen facetario del dolor y puede seguirse de radiofrecuencia si la respuesta es favorable.',
      },
    ],
    whatIs:
      'Una cefalea no es una sola enfermedad. La migraña, la cefalea tensional y la cefalea en racimos son cuadros neurológicos con mecanismos propios que se manejan farmacológicamente. En ALGOS abordamos un grupo distinto: las cefaleas con un origen anatómico identificable en el cuello o en los nervios craneocervicales, donde un bloqueo dirigido puede aliviar el dolor.\n\nLa cefalea cervicogénica nace de las articulaciones facetarias cervicales altas (C1-C2-C3) o de los discos cervicales superiores. El dolor se percibe en la cabeza porque estas estructuras comparten inervación con el nervio trigémino.\n\nLa neuralgia occipital se debe a irritación o atrapamiento de los nervios occipitales mayor y menor a su paso por la musculatura suboccipital. Produce un dolor eléctrico, punzante, que recorre la nuca y sube hasta el cuero cabelludo.',
    symptoms: [
      'Dolor que empieza en la nuca o la base del cráneo y sube hacia la frente, la sien o detrás del ojo',
      'Ataques punzantes, eléctricos, sobre un lado de la cabeza (neuralgia occipital)',
      'Dolor que empeora al girar, extender o mantener el cuello en una postura',
      'Sensibilidad del cuero cabelludo al peinarse o apoyar la cabeza en la almohada',
      'Náusea o intolerancia leve a la luz, sin el aura ni la intensidad típica de la migraña',
      'Falta de respuesta a analgésicos comunes y antimigrañosos',
    ],
    whenToConsider: [
      'Cefaleas de más de tres meses con componente cervical claro',
      'Diagnóstico previo de migraña que no responde al tratamiento neurológico habitual',
      'Neuralgia occipital confirmada clínicamente o por bloqueo diagnóstico',
      'Cefalea postraumática tras latigazo cervical (whiplash)',
      'Necesidad de reducir el uso crónico de analgésicos o triptanes',
    ],
    whatToExpect: [
      'Evaluación clínica dirigida para diferenciar el tipo de cefalea y localizar el generador del dolor',
      'Bloqueo diagnóstico-terapéutico ambulatorio guiado por ecografía o fluoroscopia, con anestesia local',
      'Alivio evaluable en las primeras 24-48 horas, que orienta el plan de seguimiento',
      'Radiofrecuencia como paso siguiente cuando el bloqueo confirma el origen facetario u occipital',
    ],
    faq: [
      {
        q: '¿Es lo mismo que la migraña?',
        a: 'No. La migraña es una enfermedad neurológica con mecanismos vasculares y de sensibilización central. La cefalea cervicogénica y la neuralgia occipital tienen un origen mecánico o nervioso en el cuello y en los nervios craneocervicales, por eso responden a bloqueos guiados por imagen que no tienen efecto sobre la migraña.',
      },
      {
        q: '¿Cómo saben si mi dolor de cabeza viene del cuello?',
        a: 'Por la historia clínica (dónde empieza el dolor, qué lo desencadena, qué medicación probó) y por la exploración física dirigida. Cuando existe duda, un bloqueo diagnóstico del nervio occipital o de la rama medial cervical alta permite confirmarlo: si el dolor cede tras el bloqueo, el origen está en esa estructura.',
      },
      {
        q: '¿Cuánto dura el alivio de un bloqueo occipital?',
        a: 'Es variable. En muchos pacientes el alivio se prolonga entre semanas y varios meses. Cuando el bloqueo funciona pero el efecto es limitado en el tiempo, se puede indicar radiofrecuencia sobre el mismo nervio o articulación para obtener un alivio más prolongado.',
      },
      {
        q: '¿Puedo seguir con mi neurólogo?',
        a: 'Sí, y lo recomendamos. El manejo intervencionista de la cefalea complementa el tratamiento neurológico, no lo sustituye. Coordinamos con su neurólogo tratante para integrar el bloqueo dentro de su plan global.',
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
      'Aplica calor controlado sobre el nervio que transmite el dolor desde las articulaciones facetarias. Ofrece alivio duradero (12-24 meses) en síndrome facetario confirmado por bloqueo diagnóstico.',
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
