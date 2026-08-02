import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { trackAppointment } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { ALGOS } from "@/config/algos.config";
import { CheckCircle2, Loader2, MessageCircle, ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const CONDITIONS = [
  "Dolor lumbar",
  "Dolor cervical",
  "Ciática",
  "Hernia discal",
  "Cefaleas / migraña",
  "Neuropatía diabética",
  "Dolor tras cirugía",
  "Otro",
];

type Shift = "manana" | "tarde" | "cualquiera";

export default function Agendar() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [condition, setCondition] = useState("");
  const [hasStudies, setHasStudies] = useState<"si" | "no" | "">("");
  const [preferredDate, setPreferredDate] = useState("");
  const [shift, setShift] = useState<Shift | "">("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null); // WhatsApp URL after success

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 2) return setError("Ingresa tu nombre completo.");
    if (phone.replace(/\D/g, "").length < 7) return setError("Ingresa un teléfono válido.");

    setLoading(true);
    try {
      const device = window.innerWidth < 768 ? "mobile" : "desktop";
      const payload = {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        condition: condition || null,
        has_studies: hasStudies || null,
        preferred_date: preferredDate || null,
        preferred_shift: shift || null,
        notes: notes.trim() || null,
        source_section: "form_agendar",
        device,
      };
      const { data, error: err } = await supabase.functions.invoke("submit-appointment", { body: payload });
      if (err) throw err;
      if (!data?.ok) throw new Error(data?.error || "No se pudo enviar. Intenta de nuevo.");

      trackAppointment({ condition: condition || undefined, hasStudies: hasStudies || undefined, source: "form_agendar" });

      const waUrl = buildWhatsAppUrl({ specialty: condition || undefined, visitType: "primera-vez" });
      setDone(waUrl);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Error al enviar";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SEOHead
        title="Agendar cita | ALGOS Centro de Dolor"
        description="Solicita tu cita en ALGOS Centro de Dolor Intervencionista, Maracaibo. Te contactamos por WhatsApp para confirmar."
        canonical={`${ALGOS.brand.website}/agendar`}
      />
      <main className="min-h-screen bg-[#f5f0e8] py-16 px-4">
        <div className="mx-auto max-w-xl">
          <p className="text-[#c69636] font-medium text-xs tracking-[0.25em] uppercase mb-3">AGENDAR CITA</p>
          <h1 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl mb-3">
            Cuéntanos sobre tu dolor
          </h1>
          <p className="text-[#1a4a55]/80 mb-8">
            Completa el formulario y te contactaremos por WhatsApp para coordinar tu evaluación con el equipo de ALGOS.
          </p>

          {done ? (
            <div className="rounded-lg bg-white border border-[#3d8b96]/30 p-8 text-center">
              <CheckCircle2 className="mx-auto text-[#3d8b96] mb-3" size={48} />
              <h2 className="font-display font-semibold text-[#1a4a55] text-xl mb-2">
                Solicitud recibida
              </h2>
              <p className="text-[#1a4a55]/80 mb-6">
                Gracias, {name.split(" ")[0]}. Nuestro equipo te contactará pronto al {phone}. Si quieres, puedes escribirnos directamente por WhatsApp:
              </p>
              <a
                href={done}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-[#3d8b96] hover:bg-[#4a9ca8] text-white font-medium px-6 py-3 transition-colors"
              >
                <MessageCircle size={18} /> Abrir WhatsApp
              </a>
              <div className="mt-6">
                <Link to="/" className="text-[#1a4a55]/60 hover:text-[#1a4a55] text-sm underline">
                  Volver al inicio
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5 rounded-lg bg-white border border-[#1a4a55]/15 p-6 md:p-8">
              <Field label="Nombre completo *">
                <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} required maxLength={120} />
              </Field>
              <Field label="Teléfono / WhatsApp *" hint="Ej: 0414-680 7886">
                <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} required inputMode="tel" maxLength={30} />
              </Field>
              <Field label="Email (opcional)">
                <input value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} type="email" maxLength={200} />
              </Field>
              <Field label="¿Qué te trae a consulta?">
                <select value={condition} onChange={(e) => setCondition(e.target.value)} className={inputCls}>
                  <option value="">Selecciona una opción</option>
                  {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="¿Tienes estudios previos (RM, TAC, EMG)?">
                <div className="flex gap-3">
                  {(["si", "no"] as const).map((v) => (
                    <label key={v} className={`flex-1 border rounded-md px-4 py-2 text-center cursor-pointer transition-colors ${hasStudies === v ? "border-[#3d8b96] bg-[#3d8b96]/5 text-[#1a4a55]" : "border-[#1a4a55]/20 text-[#1a4a55]/70"}`}>
                      <input type="radio" name="studies" value={v} checked={hasStudies === v} onChange={() => setHasStudies(v)} className="sr-only" />
                      {v === "si" ? "Sí" : "No"}
                    </label>
                  ))}
                </div>
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Fecha preferida (opcional)">
                  <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className={inputCls} min={new Date().toISOString().slice(0, 10)} />
                </Field>
                <Field label="Turno preferido">
                  <select value={shift} onChange={(e) => setShift(e.target.value as Shift)} className={inputCls}>
                    <option value="">Sin preferencia</option>
                    <option value="manana">Mañana</option>
                    <option value="tarde">Tarde</option>
                    <option value="cualquiera">Cualquiera</option>
                  </select>
                </Field>
              </div>
              <Field label="Notas adicionales (opcional)">
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className={`${inputCls} min-h-[90px]`} maxLength={500} placeholder="Cuéntanos brevemente cómo puedes describir tu dolor..." />
              </Field>

              {error && <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[#1a4a55] hover:bg-[#3d8b96] text-white font-semibold px-6 py-3 transition-colors disabled:opacity-60"
              >
                {loading ? <><Loader2 size={18} className="animate-spin" /> Enviando...</> : "Solicitar cita"}
              </button>
              <p className="text-xs text-[#1a4a55]/60 text-center">
                Al enviar aceptas nuestra <Link to="/privacidad" className="underline">política de privacidad</Link>.
              </p>
            </form>
          )}
        </div>
      </main>
    </>
  );
}

const inputCls =
  "w-full rounded-md border border-[#1a4a55]/20 bg-white px-3 py-2.5 text-[#1a4a55] placeholder:text-[#1a4a55]/40 focus:outline-none focus:ring-2 focus:ring-[#3d8b96]/40 focus:border-[#3d8b96]";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-[#1a4a55] mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-[#1a4a55]/60 mt-1">{hint}</span>}
    </label>
  );
}
