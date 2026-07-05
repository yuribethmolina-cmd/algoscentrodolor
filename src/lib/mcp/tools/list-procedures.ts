import { defineTool } from "@lovable.dev/mcp-js";
import { PROCEDURES } from "@/data/treatments";

export default defineTool({
  name: "list_procedures",
  title: "Listar procedimientos",
  description:
    "Devuelve el catálogo de procedimientos intervencionistas que realiza ALGOS (nombre, nombre técnico, descripción y condiciones en que se usan).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    return {
      content: [{ type: "text", text: JSON.stringify(PROCEDURES, null, 2) }],
      structuredContent: { items: PROCEDURES },
    };
  },
});
