import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { CONDITIONS } from "@/data/treatments";

export default defineTool({
  name: "list_conditions",
  title: "Listar condiciones tratadas",
  description:
    "Devuelve el catálogo de condiciones de dolor que trata ALGOS Centro de Dolor Intervencionista (nombre para paciente, nombre clínico y resumen).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = CONDITIONS.map((c) => ({
      slug: c.slug,
      name: c.name,
      clinicalName: c.clinicalName,
      summary: c.patientDescription,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { items },
    };
  },
});
