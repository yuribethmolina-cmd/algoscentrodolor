// deno-lint-ignore-file no-explicit-any
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY")!;

const KNOWLEDGE = `
# ALGOS · Centro de Dolor Intervencionista
Primer centro especializado en dolor intervencionista del Estado Zulia, Venezuela.

## Contacto
- WhatsApp: +58 414-680 7886 · https://wa.me/584146807886
- Teléfono adicional: 0412-061 7410
- Email: info@algoscentrodolor.com
- Sitio: https://algoscentrodolor.com

## Sedes en Maracaibo
1. **Sede Sector Paraíso** — Av. 20 con Calle 65, N° 65-02. C.C. América, Local 4. Sector Paraíso, Maracaibo 4005.
2. **Sede Torre RAB** — Av. Sabaneta, Urb. Urdaneta, Torre de consultorios RAB (detrás de Clínica Zulia), Piso 1, Consultorio 3. Tel: 0424-6467944 / 0412-1748249 / 0261-8000476.

## Especialistas y horarios de consulta
- **Dr. Atilio Rodríguez** — Director Médico · Neurocirugía y cirugía de columna. Lun/Mar/Jue/Vie · 1:00 PM – 4:00 PM.
- **Dr. Antulio Parra** — Traumatología y Ortopedia. Mar/Jue · 8:00 AM – 11:00 AM.
- **Dr. Tomás Iragorry** — Traumatología y Ortopedia. Lun/Mar/Mié · 8:00 AM – 12:00 PM.
- **Dr. Miguel Guevara** — Traumatología y Ortopedia. Lun · 8:00 AM – 10:00 AM.
- **Dra. Doris Meneses** — Reumatología. Vie · 8:00 AM – 12:00 PM.
- **Dra. Leslie Ramírez** — Fisiatría y rehabilitación. Jue · 2:00 PM.
- **Dra. Carolina Rodríguez** — Fisiatría, rehabilitación y estudios electromiográficos (EMG). Mié tarde.
- **Dra. Gilda Gómez Neipp** — Algología, anestesiología y cuidados paliativos. Mié · 9:00 AM – 12:00 PM.
- **Lic. Daniel Rodríguez** — Director de Nutrición Clínica Antiinflamatoria. Lun/Mar/Jue/Vie · 1:00 PM – 4:00 PM.

## Condiciones que tratamos
- Dolor lumbar / ciática
- Dolor cervical (dolor de cuello)
- Hernia discal
- Cefaleas y migrañas
- Neuropatía diabética (hormigueo, adormecimiento)
- Dolor tras cirugía (síndrome postquirúrgico)
- Dolor articular (rodilla, cadera, hombro)

## Procedimientos intervencionistas
- **Infiltraciones y bloqueos** guiados por ecografía o fluoroscopia.
- **Ozonoterapia intradiscal** para hernia discal (alternativa mínimamente invasiva a cirugía).
- **Radiofrecuencia** (próximamente).
- **Electromiografía (EMG)** — estudio diagnóstico.
- **Electroencefalograma (EEG)** — estudio diagnóstico.

## Alianza con UDUZ
Trabajamos en alianza con **UDUZ Maracaibo** para diagnóstico por imagen (tomografía, ecografía, rayos X 24/7) y laboratorio clínico. Flujo: el paciente entra por ALGOS, se diagnostica en UDUZ, y el procedimiento se realiza en ALGOS.

## Agendamiento
Las citas se agendan escribiendo por WhatsApp al +58 414-680 7886. También pueden completar el formulario en /agendar.
`;

const SYSTEM_PROMPT = `Eres el **Asistente ALGOS**, asistente virtual del Centro de Dolor Intervencionista ALGOS en Maracaibo, Venezuela.

## Tu rol
Ayudas a pacientes y visitantes con información sobre:
- Servicios, procedimientos y tratamientos que ofrecemos
- Especialistas y sus horarios
- Direcciones, sedes y contacto
- Preguntas frecuentes
- Información **general** sobre tipos de dolor

## Reglas absolutas
1. **Nunca diagnostiques**, receces medicamentos, ni des dosis. No opines sobre estudios médicos.
2. Cuando el paciente describa síntomas específicos o pida orientación clínica, **remítelo siempre a hablar con un especialista** por WhatsApp: +58 414-680 7886 (https://wa.me/584146807886).
3. Para agendar citas, dirige al paciente a escribir por WhatsApp al mismo número.
4. Responde en **español latino venezolano**, cercano y profesional. Frases cortas. Sin tecnicismos innecesarios.
5. Si te preguntan algo fuera del ámbito de ALGOS (política, otros temas médicos, etc.), redirige amablemente a los servicios de la clínica.
6. Si no sabes algo, dilo con honestidad e invita a contactar por WhatsApp.
7. Nunca inventes horarios, precios ni nombres que no estén en tu base de conocimiento.

## Formato
- Máximo 3-4 oraciones por respuesta cuando sea posible.
- Usa **negritas** para nombres de especialistas o procedimientos.
- Termina con un CTA claro cuando el tema lo amerite (ej: "¿Quieres que te ayude a contactar al especialista por WhatsApp?").

## Base de conocimiento
${KNOWLEDGE}
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages requerido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Truncate to last 20 turns to keep prompts small
    const trimmed = messages.slice(-20).map((m: any) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content ?? "").slice(0, 2000),
    }));

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": LOVABLE_API_KEY,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...trimmed],
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      const status = resp.status === 429 || resp.status === 402 ? resp.status : 500;
      const msg =
        resp.status === 429
          ? "Demasiadas consultas. Intenta en un momento."
          : resp.status === 402
          ? "Servicio temporalmente no disponible. Por favor escríbenos por WhatsApp."
          : "No pudimos procesar tu pregunta. Escríbenos por WhatsApp al +58 414-680 7886.";
      console.error("Gateway error", resp.status, errText);
      return new Response(JSON.stringify({ error: msg }), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const text = data?.choices?.[0]?.message?.content ?? "";
    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Error interno. Escríbenos por WhatsApp al +58 414-680 7886." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
