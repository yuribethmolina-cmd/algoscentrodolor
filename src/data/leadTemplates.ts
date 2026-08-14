export type LeadTemplateStatus = "nuevo" | "contactado" | "agendado" | "perdido" | "spam";

export interface LeadTemplate {
  id: string;
  label: string;
  body: string;
}

export interface TemplateVars {
  nombre?: string | null;
  ref: string;
  seccion?: string | null;
  motivo?: string | null;
}

/**
 * Plantillas de seguimiento por estado del lead.
 * Variables disponibles: {nombre} {ref} {seccion} {motivo}
 */
export const LEAD_TEMPLATES: Record<LeadTemplateStatus, LeadTemplate[]> = {
  nuevo: [
    {
      id: "nuevo-primer-contacto",
      label: "Primer contacto",
      body:
        "Hola {nombre}, le saluda el equipo de ALGOS — Centro de Dolor Intervencionista. Vimos su consulta desde nuestra página y queremos ayudarle.\n\n¿Nos cuenta qué le está molestando y desde cuándo? Con eso le orientamos sobre la evaluación que necesita.",
    },
    {
      id: "nuevo-seguimiento-24h",
      label: "Seguimiento a las 24 h",
      body:
        "Hola {nombre}, seguimos pendientes de su consulta en ALGOS. Si aún tiene la molestia, con gusto le ayudamos a agendar su evaluación.\n\nAtendemos de lunes a viernes, de 7:00 a. m. a 4:00 p. m.",
    },
    {
      id: "nuevo-info-estudios",
      label: "Información de estudios (EMG / EEG)",
      body:
        "Hola {nombre}, con gusto le informo sobre nuestros estudios:\n\n• Electroencefalograma (EEG): 60 $\n• Electromiografía (EMG): 80 $\n• EEG con sedación: 80 $\n\nSe realizan con cita previa. ¿Le agendamos uno? Solo necesitamos su nombre completo, cédula y un teléfono de contacto.",
    },
  ],
  contactado: [
    {
      id: "contactado-agendar",
      label: "Invitación a agendar",
      body:
        "Hola {nombre}, gracias por contarnos sobre su caso. El siguiente paso es su evaluación con nuestro especialista.\n\nPara reservar necesitamos: nombre completo, cédula, teléfono y el día que le quede mejor. ¿Se lo agendamos?",
    },
    {
      id: "contactado-recordatorio",
      label: "Recordatorio amable",
      body:
        "Hola {nombre}, ¿pudo revisar la información que le enviamos sobre {motivo}? Quedamos atentos para reservar su cita cuando usted disponga.",
    },
    {
      id: "contactado-preparacion",
      label: "Indicaciones previas a la cita",
      body:
        "Hola {nombre}, para su cita en ALGOS le pedimos traer:\n\n• Cédula de identidad\n• Estudios previos que tenga (resonancia, tomografía, radiografías)\n• Lista de los medicamentos que toma\n\nLlegue 15 minutos antes. Cualquier duda, escríbanos por aquí.",
    },
  ],
  agendado: [
    {
      id: "agendado-confirmacion",
      label: "Confirmación de cita",
      body:
        "Hola {nombre}, su cita en ALGOS quedó registrada. Le confirmamos por este mismo chat el día y la hora.\n\nSi necesita reprogramar, avísenos con anticipación y con gusto le buscamos otro cupo.",
    },
    {
      id: "agendado-recordatorio-vispera",
      label: "Recordatorio (día previo)",
      body:
        "Hola {nombre}, le recordamos su cita en ALGOS para mañana. Traiga su cédula y los estudios que tenga. ¿Confirma su asistencia?",
    },
  ],
  perdido: [
    {
      id: "perdido-cierre-amable",
      label: "Cierre amable",
      body:
        "Hola {nombre}, no queremos insistir. Dejamos su consulta abierta por si más adelante desea evaluarse; aquí estaremos cuando lo necesite.\n\nLe deseamos mucha mejoría.",
    },
    {
      id: "perdido-reactivacion",
      label: "Reactivación",
      body:
        "Hola {nombre}, hace un tiempo nos escribió por {motivo}. ¿Cómo ha seguido? Si la molestia continúa, podemos evaluarle y explicarle las opciones sin compromiso.",
    },
  ],
  spam: [],
};

export function renderTemplate(body: string, vars: TemplateVars): string {
  return body
    .replace(/\{nombre\}/g, vars.nombre?.trim() || "")
    .replace(/\{ref\}/g, vars.ref)
    .replace(/\{seccion\}/g, vars.seccion?.trim() || "nuestra página")
    .replace(/\{motivo\}/g, vars.motivo?.trim() || "su dolor")
    .replace(/Hola\s+([,.])/g, "Hola$1");
}

