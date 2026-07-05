import { defineMcp } from "@lovable.dev/mcp-js";
import listConditions from "./tools/list-conditions";
import getCondition from "./tools/get-condition";
import listProcedures from "./tools/list-procedures";
import listTeam from "./tools/list-team";
import clinicInfo from "./tools/clinic-info";

export default defineMcp({
  name: "algos-mcp",
  title: "ALGOS · Centro de Dolor Intervencionista",
  version: "0.1.0",
  instructions:
    "Herramientas de solo lectura sobre el contenido público de ALGOS Centro de Dolor Intervencionista (Maracaibo, Venezuela): condiciones tratadas, procedimientos intervencionistas, equipo clínico y datos de contacto. Usa `list_conditions` y luego `get_condition` para responder preguntas de pacientes sobre síntomas, procedimientos, qué esperar y cuándo consultar.",
  tools: [listConditions, getCondition, listProcedures, listTeam, clinicInfo],
});
