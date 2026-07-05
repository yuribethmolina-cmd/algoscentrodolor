import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { CONDITIONS } from "../../../data/treatments";

export default defineTool({
  name: "get_condition",
  title: "Detalle de una condición",
  description:
    "Devuelve el detalle completo de una condición de ALGOS: síntomas, cuándo consultar, qué esperar, procedimientos asociados y FAQ.",
  inputSchema: {
    slug: z.string().min(1).describe("Slug de la condición (ej. dolor-lumbar-ciatica)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const condition = CONDITIONS.find((c) => c.slug === slug);
    if (!condition) {
      return {
        content: [
          {
            type: "text",
            text: `No existe una condición con slug "${slug}". Usa list_conditions para ver los slugs disponibles.`,
          },
        ],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(condition, null, 2) }],
      structuredContent: { condition },
    };
  },
});
