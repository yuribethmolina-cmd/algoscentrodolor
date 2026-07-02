interface HighContrastToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function HighContrastToggle({ enabled, onToggle }: HighContrastToggleProps) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Desactivar modo de alto contraste" : "Activar modo de alto contraste"}
      className={`fixed bottom-6 left-6 z-50 font-sans font-bold uppercase text-[11px] tracking-[0.2em] px-5 py-3 border-2 transition-colors min-h-[44px] min-w-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        enabled
          ? "bg-black text-white border-white focus-visible:ring-white focus-visible:ring-offset-black"
          : "bg-deep-teal text-cream border-cream focus-visible:ring-algos-gold focus-visible:ring-offset-cream"
      }`}
    >
      {enabled ? "Contraste normal" : "Alto contraste"}
    </button>
  );
}
