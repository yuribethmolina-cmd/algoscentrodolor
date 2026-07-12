import { defineTool } from "@lovable.dev/mcp-js";
import { ALGOS } from "@/config/algos.config";

const INFO = {
  name: ALGOS.brand.fullName,
  positioning:
    "Primer centro especializado en dolor intervencionista del Estado Zulia, Venezuela.",
  location: {
    city: ALGOS.location.city,
    state: ALGOS.location.state,
    country: ALGOS.location.country,
    address: ALGOS.location.full,
  },
  contact: {
    whatsapp: ALGOS.contact.whatsappHref,
    email: ALGOS.contact.email,
  },
  website: ALGOS.brand.website,
  alliance: {
    partner: "UDUZ",
    url: "https://www.instagram.com/uduz_maracaibo/reels/",
    role: "Diagnóstico por imagen y electrodiagnóstico (EEG, EMG). El paciente entra por ALGOS, se diagnostica en UDUZ y el procedimiento se realiza en ALGOS.",
  },
};

export default defineTool({
  name: "clinic_info",
  title: "Información de la clínica",
  description:
    "Devuelve datos institucionales de ALGOS: ubicación, contacto oficial, sitio web y alianza estratégica con UDUZ.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(INFO, null, 2) }],
    structuredContent: INFO,
  }),
});
