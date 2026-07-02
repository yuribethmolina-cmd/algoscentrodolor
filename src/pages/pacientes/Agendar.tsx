import { useState } from "react";
import Navbar from "@/components/Navbar";
import HomeFooter from "@/components/HomeFooter";
import { CONDITIONS } from "@/data/treatments";
import { MessageCircle, Phone, CheckCircle2, MapPin, Clock } from "lucide-react";

const WA_NUMBER = "584146807886";

interface FormData {
  nombre: string;
  telefono: string;
  condicion: string;
  descripcion: string;
  tieneEstudios: "si" | "no" | "";
}

const INITIAL: FormData = {
  nombre: "",
  telefono: "",
  condicion: "",
  descripcion: "",
  tieneEstudios: "",
};

function buildWAMessage(f: FormData): string {
  const estudios = f.tieneEstudios === "si" ? "Sí" : "No";
  const cond = CONDITIONS.find((c) => c.slug === f.condicion);
  const condLabel = cond ? cond.name : f.condicion;

  const lines: string[] = [
    "Hola, quisiera agendar una valoración en ALGOS.",
    "",
    `• Nombre: ${f.nombre}`,
    `• Condición: ${condLabel}`,
    `• Teléfono: ${f.telefono}`,
    `• Estudios de imagen recientes: ${estudios}`,
  ];
  if (f.descripcion.trim()) lines.push(`• Descripción: ${f.descripcion.trim()}`);

  return encodeURIComponent(lines.join("\n"));
}

export default function Agendar() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  function validate(): boolean {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.nombre.trim()) e.nombre = "Ingrese su nombre";
    if (!form.telefono.trim()) e.telefono = "Ingrese un número de contacto";
    if (!form.condicion) e.condicion = "Seleccione una condición";
    if (!form.tieneEstudios) e.tieneEstudios = "Indique si tiene estudios";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    window.open(`https://wa.me/${WA_NUMBER}?text=${buildWAMessage(form)}`, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      <Navbar />

      <main className="pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">

          {/* Header */}
          <div className="max-w-2xl mb-12 md:mb-16">
            <p className="text-[#c69636] font-medium text-sm tracking-[0.25em] uppercase mb-5">
              AGENDAR VALORACIÓN
            </p>
            <h1 className="font-display font-bold text-[#1a4a55] text-4xl md:text-5xl lg:text-6xl leading-[1.05] mb-5">
              Primera consulta<br />
              <span className="text-[#c69636]">sin compromiso</span>
            </h1>
            <p className="font-sans text-[#1a4a55]/75 text-lg leading-relaxed">
              Complete el formulario y abrirá WhatsApp con su información prellenada.
              Nuestro equipo le confirma disponibilidad en pocas horas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

            {/* Form / Confirmation */}
            {sent ? (
              <div className="bg-white rounded-none p-10 md:p-12 border border-[#3d8b96]/20">
                <CheckCircle2 className="w-12 h-12 text-[#3d8b96] mb-6" />
                <h2 className="font-display font-bold text-[#1a4a55] text-2xl md:text-3xl mb-4">
                  Mensaje listo en WhatsApp
                </h2>
                <p className="font-sans text-[#1a4a55]/75 leading-relaxed mb-8">
                  Se abrió WhatsApp con su solicitud prellenada. Si no se abrió
                  automáticamente, escríbanos directamente.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={`https://wa.me/${WA_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#3d8b96] hover:bg-[#4a9ca8] text-[#f5f0e8] font-ui font-bold uppercase rounded-none transition-all px-6 py-4 text-sm tracking-[0.2em]"
                  >
                    <MessageCircle size={18} />
                    Abrir WhatsApp
                  </a>
                  <button
                    onClick={() => { setForm(INITIAL); setSent(false); }}
                    className="inline-flex items-center justify-center border border-[#1a4a55]/30 text-[#1a4a55] hover:border-[#1a4a55] font-ui font-semibold rounded-none transition-all px-6 py-4 text-sm"
                  >
                    Nueva solicitud
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-none p-8 md:p-10 border border-[#1a4a55]/10"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

                  {/* Nombre */}
                  <div className="sm:col-span-2">
                    <label className="block font-ui font-semibold text-[#1a4a55] text-sm mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={form.nombre}
                      onChange={(e) => set("nombre", e.target.value)}
                      placeholder="Dr. / Sra. / Sr."
                      className={`w-full rounded-lg border px-4 py-3 font-sans text-[#1a4a55] placeholder:text-[#1a4a55]/40 bg-[#f5f0e8]/60 outline-none focus:ring-2 focus:ring-[#3d8b96]/40 transition ${errors.nombre ? "border-red-400" : "border-[#1a4a55]/20"}`}
                    />
                    {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                  </div>

                  {/* Teléfono */}
                  <div>
                    <label className="block font-ui font-semibold text-[#1a4a55] text-sm mb-2">
                      Teléfono de contacto
                    </label>
                    <input
                      type="tel"
                      value={form.telefono}
                      onChange={(e) => set("telefono", e.target.value)}
                      placeholder="0414-000 0000"
                      className={`w-full rounded-lg border px-4 py-3 font-sans text-[#1a4a55] placeholder:text-[#1a4a55]/40 bg-[#f5f0e8]/60 outline-none focus:ring-2 focus:ring-[#3d8b96]/40 transition ${errors.telefono ? "border-red-400" : "border-[#1a4a55]/20"}`}
                    />
                    {errors.telefono && <p className="text-red-500 text-xs mt-1">{errors.telefono}</p>}
                  </div>

                  {/* Condición */}
                  <div>
                    <label className="block font-ui font-semibold text-[#1a4a55] text-sm mb-2">
                      Condición principal
                    </label>
                    <select
                      value={form.condicion}
                      onChange={(e) => set("condicion", e.target.value)}
                      className={`w-full rounded-lg border px-4 py-3 font-sans text-[#1a4a55] bg-[#f5f0e8]/60 outline-none focus:ring-2 focus:ring-[#3d8b96]/40 transition appearance-none cursor-pointer ${errors.condicion ? "border-red-400" : "border-[#1a4a55]/20"} ${!form.condicion ? "text-[#1a4a55]/40" : ""}`}
                    >
                      <option value="" disabled>Seleccionar…</option>
                      {CONDITIONS.map((c) => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                      <option value="otra">Otro / No sé aún</option>
                    </select>
                    {errors.condicion && <p className="text-red-500 text-xs mt-1">{errors.condicion}</p>}
                  </div>

                  {/* Estudios */}
                  <div className="sm:col-span-2">
                    <p className="font-ui font-semibold text-[#1a4a55] text-sm mb-3">
                      ¿Tiene estudios de imagen recientes?{" "}
                      <span className="font-normal text-[#1a4a55]/50">(TAC, eco, radiografía)</span>
                    </p>
                    <div className="flex gap-4">
                      {(["si", "no"] as const).map((v) => (
                        <label
                          key={v}
                          className={`flex-1 flex items-center justify-center gap-2 rounded-lg border py-3 cursor-pointer font-ui font-semibold text-sm transition select-none ${
                            form.tieneEstudios === v
                              ? "border-[#3d8b96] bg-[#3d8b96]/10 text-[#1a4a55]"
                              : "border-[#1a4a55]/20 text-[#1a4a55]/60 hover:border-[#3d8b96]/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name="tieneEstudios"
                            value={v}
                            checked={form.tieneEstudios === v}
                            onChange={() => set("tieneEstudios", v)}
                            className="sr-only"
                          />
                          {v === "si" ? "Sí" : "No"}
                        </label>
                      ))}
                    </div>
                    {errors.tieneEstudios && <p className="text-red-500 text-xs mt-1">{errors.tieneEstudios}</p>}
                  </div>

                  {/* Descripción */}
                  <div className="sm:col-span-2">
                    <label className="block font-ui font-semibold text-[#1a4a55] text-sm mb-2">
                      Descripción breve{" "}
                      <span className="font-normal text-[#1a4a55]/50">(opcional)</span>
                    </label>
                    <textarea
                      value={form.descripcion}
                      onChange={(e) => set("descripcion", e.target.value)}
                      placeholder="¿Cuánto tiempo lleva con el dolor? ¿Qué lo empeora?"
                      rows={3}
                      className="w-full rounded-lg border border-[#1a4a55]/20 px-4 py-3 font-sans text-[#1a4a55] placeholder:text-[#1a4a55]/40 bg-[#f5f0e8]/60 outline-none focus:ring-2 focus:ring-[#3d8b96]/40 transition resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#3d8b96] hover:bg-[#4a9ca8] text-[#f5f0e8] font-ui font-bold uppercase rounded-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.3)] px-8 py-4 text-sm tracking-[0.2em]"
                >
                  <MessageCircle size={18} />
                  Enviar por WhatsApp
                </button>
                <p className="text-center text-[#1a4a55]/50 text-xs mt-4 font-sans">
                  Al continuar, abrirá WhatsApp con su información. No almacenamos sus datos.
                </p>
              </form>
            )}

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-[#1a4a55] text-[#f5f0e8] rounded-none p-8">
                <p className="text-[#c69636] font-ui font-bold text-xs tracking-[0.25em] uppercase mb-5">
                  QUÉ INCLUYE LA PRIMERA VISITA
                </p>
                <ul className="space-y-3 font-sans text-sm text-[#f5f0e8]/85 leading-relaxed">
                  {[
                    "Evaluación clínica completa",
                    "Revisión de estudios previos",
                    "Diagnóstico claro y honesto",
                    "Propuesta de tratamiento personalizada",
                    "Presupuesto transparente, sin sorpresas",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-[#c69636] mt-0.5 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-none p-8 border border-[#1a4a55]/10 space-y-5">
                <p className="text-[#c69636] font-ui font-bold text-xs tracking-[0.25em] uppercase mb-1">
                  CONTACTO DIRECTO
                </p>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[#1a4a55] hover:text-[#3d8b96] transition-colors"
                >
                  <MessageCircle size={18} className="text-[#3d8b96] shrink-0" />
                  <span className="font-ui font-semibold text-sm">0414-680 7886</span>
                </a>
                <a
                  href="tel:+584146807886"
                  className="flex items-center gap-3 text-[#1a4a55] hover:text-[#3d8b96] transition-colors"
                >
                  <Phone size={18} className="text-[#3d8b96] shrink-0" />
                  <span className="font-ui font-semibold text-sm">0414-680 7886</span>
                </a>
                <div className="flex items-start gap-3 text-[#1a4a55]/70">
                  <MapPin size={18} className="text-[#3d8b96] shrink-0 mt-0.5" />
                  <span className="font-sans text-sm leading-relaxed">
                    CC América, Local N° 4<br />
                    Av. 20 con Calle 65<br />
                    Sector Paraíso · Maracaibo
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#1a4a55]/70">
                  <Clock size={18} className="text-[#3d8b96] shrink-0" />
                  <span className="font-sans text-sm">Lun–Vie · 8:00 – 18:00</span>
                </div>
              </div>

              <div className="rounded-none border border-[#c69636]/30 p-6" style={{ background: "rgba(198,150,54,0.06)" }}>
                <p className="font-sans text-sm text-[#1a4a55] leading-relaxed">
                  <strong className="font-bold">Sin estudios de imagen aún,</strong> puede realizarlos antes
                  de su cita en{" "}
                  <a
                    href="https://uduz.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline underline-offset-2"
                  >
                    UDUZ Paraíso
                  </a>
                  {" "}— misma zona. Tomografía desde $25 · Ecografía $15.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}
