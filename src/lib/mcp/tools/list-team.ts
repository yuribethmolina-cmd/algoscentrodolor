import { defineTool } from "@lovable.dev/mcp-js";

// Inlined so the bundled edge function doesn't pull image asset imports.
const TEAM = [
  {
    type: "confirmed",
    slug: "dr-atilio",
    givenName: "Dr. Atilio J.",
    familyName: "Rodríguez",
    role: "Director Médico",
    specialty: "Neurocirujano · Especialista en dolor intervencionista",
    city: "Maracaibo",
    country: "Venezuela",
    group: "01",
  },
  {
    type: "aspirational",
    slug: "algologo-anestesiologo",
    roleAsName: "Algólogo · Anestesiólogo intervencionista",
    profileLine:
      "Especialidad principal en procedimientos intervencionistas guiados por imagen. Subespecialidad en medicina del dolor.",
    city: "Maracaibo",
    group: "01",
  },
  {
    type: "confirmed",
    slug: "dr-luis-alberto",
    givenName: "Dr. Luis Alberto",
    familyName: "Rodríguez",
    role: "Director · Estrategia Internacional",
    specialty: "Neurocirujano",
    city: "Múnich",
    country: "Venezuela",
    group: "02",
    bio: { formacion: "Neurocirujano.", idiomas: "Español · Deutsch" },
  },
  {
    type: "confirmed",
    slug: "lcdo-daniel",
    givenName: "Lcdo. Daniel",
    familyName: "Rodríguez",
    role: "Director de Nutrición",
    specialty: "Nutrición clínica · Acompañamiento del paciente intervencionista",
    city: "Maracaibo",
    country: "Venezuela",
    group: "03",
  },
  {
    type: "aspirational",
    slug: "psicologo-dolor-cronico",
    roleAsName: "Psicólogo clínico de dolor crónico",
    profileLine:
      "Terapia cognitivo-conductual para dolor, educación en neurociencia del dolor, manejo de comorbilidades psicológicas.",
    city: "Maracaibo",
    group: "03",
  },
  {
    type: "aspirational",
    slug: "fisioterapeuta-dolor",
    roleAsName: "Fisioterapeuta especializado en dolor",
    profileLine:
      "Rehabilitación post-procedimiento, terapia manual, programa de ejercicio terapéutico.",
    city: "Maracaibo",
    group: "03",
  },
];

export default defineTool({
  name: "list_team",
  title: "Equipo clínico",
  description:
    "Devuelve el equipo clínico de ALGOS: miembros confirmados (nombre, rol, especialidad, ciudad) y perfiles en incorporación.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(TEAM, null, 2) }],
    structuredContent: { members: TEAM },
  }),
});
