import { useEffect, useState } from "react";

export type View = "paciente" | "clinica";
const STORAGE_KEY = "algos.tratamientos.view";

function readInitial(): View {
  if (typeof window === "undefined") return "paciente";
  const params = new URLSearchParams(window.location.search);
  const q = params.get("view");
  if (q === "clinica" || q === "paciente") {
    try {
      window.localStorage.setItem(STORAGE_KEY, q);
    } catch {
      /* no-op */
    }
    return q;
  }
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "clinica" || stored === "paciente" ? stored : "paciente";
}

/**
 * Shared state hook for the audience view. Uses localStorage as the single
 * source of truth and a custom window event so multiple components stay in
 * sync within the same tab (the native `storage` event only fires across tabs).
 */
const SYNC_EVENT = "algos:audience-view-change";

export function useAudienceView(): [View, (v: View) => void] {
  const [view, setViewState] = useState<View>(readInitial);

  const setView = (v: View) => {
    setViewState(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {
      /* no-op */
    }
    window.dispatchEvent(new CustomEvent<View>(SYNC_EVENT, { detail: v }));
  };

  useEffect(() => {
    const onSync = (e: Event) => {
      const detail = (e as CustomEvent<View>).detail;
      if (detail === "paciente" || detail === "clinica") setViewState(detail);
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && (e.newValue === "paciente" || e.newValue === "clinica")) {
        setViewState(e.newValue);
      }
    };
    window.addEventListener(SYNC_EVENT, onSync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(SYNC_EVENT, onSync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return [view, setView];
}

export default function AudienceToggle() {
  const [view, setView] = useAudienceView();

  const inactive =
    "px-5 py-2 rounded-full font-medium text-sm transition-all text-[#1a4a55]/70 hover:text-[#1a4a55]";
  const activePaciente =
    "px-5 py-2 rounded-full font-medium text-sm transition-all bg-[#3d8b96] text-white";
  const activeClinica =
    "px-5 py-2 rounded-full font-medium text-sm transition-all bg-[#1a4a55] text-white";

  return (
    <div className="sticky top-20 z-30 bg-cream/80 backdrop-blur-sm border-b border-deep-teal/10">
      <div className="container mx-auto max-w-7xl px-6 py-3 flex justify-center">
        <div
          className="inline-flex flex-col sm:flex-row w-full sm:w-auto bg-white rounded-2xl sm:rounded-full p-1 shadow-sm gap-1 sm:gap-0"
          role="tablist"
          aria-label="Audiencia"
        >
          <button
            role="tab"
            aria-selected={view === "paciente"}
            onClick={() => setView("paciente")}
            className={`${view === "paciente" ? activePaciente : inactive} flex-1 sm:flex-none`}
          >
            Vista para pacientes
          </button>
          <button
            role="tab"
            aria-selected={view === "clinica"}
            onClick={() => setView("clinica")}
            className={`${view === "clinica" ? activeClinica : inactive} flex-1 sm:flex-none`}
          >
            Vista clínica
          </button>
        </div>
      </div>
    </div>
  );
}
