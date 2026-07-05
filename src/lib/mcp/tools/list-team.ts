import { defineTool } from "@lovable.dev/mcp-js";
import TEAM from "../../../data/team";

export default defineTool({
  name: "list_team",
  title: "Equipo clínico",
  description:
    "Devuelve el equipo clínico de ALGOS: miembros confirmados (nombre, rol, especialidad, ciudad) y perfiles en incorporación.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    return {
      content: [{ type: "text", text: JSON.stringify(TEAM, null, 2) }],
      structuredContent: { members: TEAM },
    };
  },
});
