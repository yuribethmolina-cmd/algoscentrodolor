import { ALGOS } from "@/config/algos.config";
import type { Doctor } from "@/data/doctors";

export type VisitType = "primera-vez" | "seguimiento";

type BuildParams = {
  doctor?: Pick<Doctor, "name" | "specialty">;
  specialty?: string;
  visitType?: VisitType;
};

const VISIT_LABEL: Record<VisitType, string> = {
  "primera-vez": "primera consulta",
  seguimiento: "consulta de seguimiento",
};

/**
 * Construye un URL de WhatsApp con mensaje prellenado.
 * Ajusta el texto según especialidad y tipo de consulta.
 */
export function buildWhatsAppUrl(params: BuildParams = {}): string {
  const { doctor, specialty, visitType } = params;

  const parts: string[] = ["Hola, quisiera agendar"];

  if (visitType) {
    parts.push(`una ${VISIT_LABEL[visitType]}`);
  } else {
    parts.push("una consulta");
  }

  if (doctor) {
    parts.push(`con ${doctor.name}`);
    if (doctor.specialty) {
      parts.push(`(${doctor.specialty})`);
    }
  } else if (specialty) {
    parts.push(`en ${specialty}`);
  }

  const message = `${parts.join(" ")}.`;
  return `${ALGOS.contact.whatsappHref}?text=${encodeURIComponent(message)}`;
}
