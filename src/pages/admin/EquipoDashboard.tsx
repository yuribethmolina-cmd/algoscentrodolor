import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, LogOut, RefreshCw, Plus, Trash2, ArrowUp, ArrowDown, Upload, X, Save, Users, FileText, Download } from "lucide-react";
import { toast } from "sonner";

type DoctorRow = {
  id: string;
  slug: string;
  name: string;
  specialty: string;
  specialty_slug: string;
  schedule: string;
  note: string | null;
  is_director: boolean;
  photo_url: string | null;
  photo_position: string | null;
  bio: string | null;
  credentials: string[];
  languages: string[];
  display_order: number;
  active: boolean;
  cv_url: string | null;
  cv_filename: string | null;
};

const SPECIALTY_SLUGS = [
  "neurocirugia",
  "traumatologia",
  "reumatologia",
  "fisiatria",
  "cuidados-paliativos",
  "psicologia",
  "nutricion",
] as const;

const EMPTY: Partial<DoctorRow> = {
  slug: "",
  name: "",
  specialty: "",
  specialty_slug: "traumatologia",
  schedule: "",
  note: "",
  is_director: false,
  photo_url: "",
  photo_position: "",
  bio: "",
  credentials: [],
  languages: ["Español"],
  display_order: 100,
  active: true,
  cv_url: "",
  cv_filename: "",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function EquipoDashboard() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<DoctorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<DoctorRow> | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("display_order")
      .order("name");
    if (error) toast.error("No se pudo cargar el equipo");
    else setRows(data as unknown as DoctorRow[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  }

  async function move(row: DoctorRow, dir: -1 | 1) {
    const sorted = [...rows].sort((a, b) => a.display_order - b.display_order);
    const idx = sorted.findIndex((r) => r.id === row.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    const { error } = await supabase.from("doctors").upsert([
      { id: row.id, display_order: swap.display_order },
      { id: swap.id, display_order: row.display_order },
    ] as any);
    if (error) toast.error("No se pudo reordenar");
    else await load();
  }

  async function toggleActive(row: DoctorRow) {
    const { error } = await supabase.from("doctors").update({ active: !row.active }).eq("id", row.id);
    if (error) toast.error("No se pudo actualizar");
    else await load();
  }

  async function remove(row: DoctorRow) {
    if (!confirm(`¿Eliminar a ${row.name}? Esta acción no se puede deshacer.`)) return;
    const { error } = await supabase.from("doctors").delete().eq("id", row.id);
    if (error) toast.error("No se pudo eliminar");
    else { toast.success("Eliminado"); await load(); }
  }

  async function uploadCV(file: File): Promise<string | null> {
    if (file.type !== "application/pdf") {
      toast.error("El archivo debe ser un PDF");
      return null;
    }
    if (file.size > 15 * 1024 * 1024) {
      toast.error("El PDF debe pesar menos de 15 MB");
      return null;
    }
    const key = `${crypto.randomUUID()}.pdf`;
    const { error: upErr } = await supabase.storage.from("team-cvs").upload(key, file, {
      cacheControl: "31536000",
      upsert: false,
      contentType: "application/pdf",
    });
    if (upErr) { toast.error(`Subida falló: ${upErr.message}`); return null; }
    const { data, error } = await supabase.storage.from("team-cvs").createSignedUrl(key, 60 * 60 * 24 * 365 * 10);
    if (error || !data) { toast.error("No se pudo firmar la URL"); return null; }
    return data.signedUrl;
  }

  async function save() {
    if (!editing) return;
    if (!editing.name?.trim() || !editing.specialty?.trim()) {
      toast.error("Nombre y especialidad son obligatorios");
      return;
    }
    setSaving(true);
    const slug = editing.slug?.trim() || slugify(editing.name);
    const payload = {
      slug,
      name: editing.name!.trim(),
      specialty: editing.specialty!.trim(),
      specialty_slug: editing.specialty_slug!,
      schedule: editing.schedule ?? "",
      note: editing.note || null,
      is_director: !!editing.is_director,
      photo_url: editing.photo_url || null,
      photo_position: editing.photo_position || null,
      bio: editing.bio || null,
      credentials: editing.credentials ?? [],
      languages: editing.languages ?? [],
      display_order: editing.display_order ?? 100,
      active: editing.active !== false,
      cv_url: editing.cv_url || null,
      cv_filename: editing.cv_filename || null,
    };
    const q = editing.id
      ? await supabase.from("doctors").update(payload).eq("id", editing.id)
      : await supabase.from("doctors").insert(payload as any);
    setSaving(false);
    if (q.error) {
      toast.error(`No se pudo guardar: ${q.error.message}`);
    } else {
      toast.success("Guardado");
      setEditing(null);
      await load();
    }
  }

  const sorted = [...rows].sort((a, b) => a.display_order - b.display_order);

  return (
    <div className="min-h-screen bg-[#f5f0e8] py-10 px-4 md:px-12">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <Link to="/admin/conversiones" className="inline-flex items-center gap-1 text-[#1a4a55]/60 hover:text-[#1a4a55] text-xs mb-2">
              <ChevronLeft size={14} /> Volver al panel
            </Link>
            <p className="text-[#c69636] font-medium text-xs tracking-[0.25em] uppercase mb-2">PANEL INTERNO</p>
            <h1 className="font-display font-bold text-[#1a4a55] text-3xl md:text-4xl flex items-center gap-2">
              <Users size={26} /> Equipo médico
            </h1>
            <p className="text-[#1a4a55]/70 text-sm mt-2 max-w-xl">
              Edita fotos, nombres, especialidades, horarios y biografías. Los cambios aparecen en la web en menos de un minuto.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing({ ...EMPTY, display_order: (Math.max(0, ...rows.map(r => r.display_order)) + 10) })}
              className="inline-flex items-center gap-2 rounded-md bg-[#1a4a55] text-white text-sm px-4 py-2.5 hover:bg-[#123640]"
            >
              <Plus size={14} /> Añadir miembro
            </button>
            <button onClick={load} className="p-2 rounded-md border border-[#1a4a55]/20 bg-white text-[#1a4a55] hover:bg-[#1a4a55]/5">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={handleLogout} className="p-2 rounded-md border border-[#1a4a55]/20 bg-white text-[#1a4a55]/60 hover:bg-red-50 hover:text-red-600" title="Cerrar sesión">
              <LogOut size={16} />
            </button>
          </div>
        </header>

        <div className="rounded-md border border-[#1a4a55]/15 bg-white overflow-hidden">
          <div className="px-5 py-3 border-b border-[#1a4a55]/10 text-xs uppercase tracking-wider text-[#1a4a55]/60">
            {rows.length} miembro{rows.length === 1 ? "" : "s"} · arrastra con ↑↓ para reordenar
          </div>
          {sorted.length === 0 ? (
            <p className="p-8 text-center text-sm text-[#1a4a55]/50 italic">
              {loading ? "Cargando..." : "Sin miembros registrados."}
            </p>
          ) : (
            <ul className="divide-y divide-[#1a4a55]/10">
              {sorted.map((r, i) => (
                <li key={r.id} className={`p-4 flex flex-wrap items-center gap-4 ${!r.active ? "opacity-50" : ""}`}>
                  <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden bg-[#1a4a55]/10 border border-[#1a4a55]/10">
                    {r.photo_url ? (
                      <img src={r.photo_url} alt={r.name} className="w-full h-full object-cover" style={{ objectPosition: r.photo_position || "center top" }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#1a4a55]/40 text-xs">S/F</div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-[#1a4a55] truncate">
                      {r.name}
                      {r.is_director && <span className="ml-2 text-xs text-[#c69636]">· director</span>}
                      {!r.active && <span className="ml-2 text-xs text-red-500">· oculto</span>}
                    </div>
                    <div className="text-xs text-[#1a4a55]/60 truncate">{r.specialty}</div>
                    <div className="text-xs text-[#1a4a55]/40 truncate">{r.schedule}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => move(r, -1)} disabled={i === 0} className="p-1.5 rounded hover:bg-[#1a4a55]/5 disabled:opacity-20"><ArrowUp size={14} /></button>
                    <button onClick={() => move(r, 1)} disabled={i === sorted.length - 1} className="p-1.5 rounded hover:bg-[#1a4a55]/5 disabled:opacity-20"><ArrowDown size={14} /></button>
                    <button onClick={() => toggleActive(r)} className="text-xs px-2 py-1 rounded border border-[#1a4a55]/15 hover:bg-[#1a4a55]/5">
                      {r.active ? "Ocultar" : "Mostrar"}
                    </button>
                    <button onClick={() => setEditing(r)} className="text-xs px-3 py-1.5 rounded-md bg-[#1a4a55] text-white hover:bg-[#123640]">
                      Editar
                    </button>
                    <button onClick={() => remove(r)} className="p-1.5 rounded hover:bg-red-50 text-red-600"><Trash2 size={14} /></button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {editing && (
        <EditModal
          editing={editing}
          setEditing={setEditing}
          onSave={save}
          saving={saving}
          uploadPhoto={uploadPhoto}
        />
      )}
    </div>
  );
}

function EditModal({
  editing, setEditing, onSave, saving, uploadPhoto,
}: {
  editing: Partial<DoctorRow>;
  setEditing: (v: Partial<DoctorRow> | null) => void;
  onSave: () => void;
  saving: boolean;
  uploadPhoto: (f: File) => Promise<string | null>;
}) {
  const [uploading, setUploading] = useState(false);
  const set = (patch: Partial<DoctorRow>) => setEditing({ ...editing, ...patch });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-2xl my-8 shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1a4a55]/10">
          <h2 className="font-display font-bold text-[#1a4a55] text-xl">
            {editing.id ? "Editar miembro" : "Nuevo miembro"}
          </h2>
          <button onClick={() => setEditing(null)} className="p-1 rounded hover:bg-[#1a4a55]/5"><X size={18} /></button>
        </div>

        <div className="p-6 space-y-4">
          {/* Photo */}
          <div className="flex items-start gap-4">
            <div className="w-24 h-32 flex-shrink-0 rounded overflow-hidden bg-[#1a4a55]/10 border border-[#1a4a55]/15">
              {editing.photo_url ? (
                <img src={editing.photo_url} alt="" className="w-full h-full object-cover" style={{ objectPosition: editing.photo_position || "center top" }} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#1a4a55]/40 text-xs">Sin foto</div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-sm bg-[#1a4a55] text-white px-3 py-2 rounded-md hover:bg-[#123640]">
                <Upload size={14} />
                {uploading ? "Subiendo..." : "Subir foto"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    setUploading(true);
                    const url = await uploadPhoto(f);
                    setUploading(false);
                    if (url) set({ photo_url: url });
                    e.target.value = "";
                  }}
                />
              </label>
              <input
                type="text"
                value={editing.photo_url ?? ""}
                onChange={(e) => set({ photo_url: e.target.value })}
                placeholder="URL de la foto"
                className="w-full px-3 py-2 border border-[#1a4a55]/20 rounded-md text-sm"
              />
              <input
                type="text"
                value={editing.photo_position ?? ""}
                onChange={(e) => set({ photo_position: e.target.value })}
                placeholder="Posición (ej: center top)"
                className="w-full px-3 py-2 border border-[#1a4a55]/20 rounded-md text-sm"
              />
            </div>
          </div>

          <Field label="Nombre completo *" value={editing.name} onChange={(v) => set({ name: v })} />
          <Field
            label="Slug (URL única)"
            value={editing.slug}
            onChange={(v) => set({ slug: slugify(v) })}
            placeholder="se genera automáticamente si se deja vacío"
          />
          <Field label="Especialidad (texto largo) *" value={editing.specialty} onChange={(v) => set({ specialty: v })} />

          <div>
            <label className="block text-xs font-semibold text-[#1a4a55] uppercase tracking-wider mb-1">
              Categoría / especialidad slug
            </label>
            <select
              value={editing.specialty_slug ?? "traumatologia"}
              onChange={(e) => set({ specialty_slug: e.target.value })}
              className="w-full px-3 py-2 border border-[#1a4a55]/20 rounded-md text-sm"
            >
              {SPECIALTY_SLUGS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <Field label="Horario" value={editing.schedule} onChange={(v) => set({ schedule: v })} />
          <Field label="Nota (opcional)" value={editing.note ?? ""} onChange={(v) => set({ note: v })} />

          <div>
            <label className="block text-xs font-semibold text-[#1a4a55] uppercase tracking-wider mb-1">Biografía</label>
            <textarea
              value={editing.bio ?? ""}
              onChange={(e) => set({ bio: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-[#1a4a55]/20 rounded-md text-sm"
            />
          </div>

          <ListField
            label="Credenciales (una por línea)"
            value={editing.credentials ?? []}
            onChange={(v) => set({ credentials: v })}
          />
          <ListField
            label="Idiomas (una por línea)"
            value={editing.languages ?? []}
            onChange={(v) => set({ languages: v })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#1a4a55] uppercase tracking-wider mb-1">Orden</label>
              <input
                type="number"
                value={editing.display_order ?? 100}
                onChange={(e) => set({ display_order: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-[#1a4a55]/20 rounded-md text-sm"
              />
            </div>
            <div className="flex flex-col gap-2 pt-6">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={!!editing.is_director} onChange={(e) => set({ is_director: e.target.checked })} />
                Miembro directivo
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={editing.active !== false} onChange={(e) => set({ active: e.target.checked })} />
                Visible en la web
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#1a4a55]/10 bg-[#f5f0e8]/50">
          <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-[#1a4a55]/70 hover:text-[#1a4a55]">
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-md bg-[#1a4a55] text-white text-sm px-4 py-2 hover:bg-[#123640] disabled:opacity-50"
          >
            <Save size={14} /> {saving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string | null | undefined; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#1a4a55] uppercase tracking-wider mb-1">{label}</label>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-[#1a4a55]/20 rounded-md text-sm"
      />
    </div>
  );
}

function ListField({ label, value, onChange }: { label: string; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#1a4a55] uppercase tracking-wider mb-1">{label}</label>
      <textarea
        value={value.join("\n")}
        onChange={(e) => onChange(e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))}
        rows={4}
        className="w-full px-3 py-2 border border-[#1a4a55]/20 rounded-md text-sm font-mono"
      />
    </div>
  );
}
