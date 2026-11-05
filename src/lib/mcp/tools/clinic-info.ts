import { defineTool } from "@lovable.dev/mcp-js";

// Inlined so the bundled edge function doesn't resolve the @/ alias.
const INFO = {
  name: "ALGOS · Centro de Dolor Intervencionista",
  positioning:
    "Primer centro especializado en dolor intervencionista del Estado Zulia, Venezuela.",
  location: {
    city: "Maracaibo",
    state: "Zulia",
    country: "Venezuela",
    address:
      "Av. 15 Delicias, Edif. Hospital Clínico, Urb. La Trinidad, Maracaibo, Zulia",
  },
  sedes: [
    "Sede Hospital Clínico (principal) — Av. 15 Delicias, Edif. Hospital Clínico, Urb. La Trinidad, Maracaibo, Zulia",
    "Sede Torre RAB — Av. Sabaneta, Urb. Urdaneta, Torre de consultorios RAB (Clínica Zulia), Piso 1, Consultorio 3, Maracaibo, Zulia",
  ],
  contact: {
    whatsapp: "https://wa.me/584146807886",
    email: "info@algoscentrodolor.com",
  },
  website: "https://algoscentrodolor.com",
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
