import { useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { ALGOS } from "@/config/algos.config";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "algos.asistente.v1";
const DEEP_TEAL = ALGOS.palette.deepTeal;
const TEAL = ALGOS.palette.brandTeal;
const CREAM = ALGOS.palette.cream;
const GOLD = ALGOS.palette.gold;

const WELCOME: Msg = {
  role: "assistant",
  content:
    "¡Hola! Soy el Asistente ALGOS 👋 Puedo ayudarte con información sobre nuestros servicios, especialistas, horarios y sedes en Maracaibo.\n\n_Este asistente no diagnostica ni reemplaza una consulta médica. Para evaluar síntomas o agendar, te conectamos con un especialista por WhatsApp._\n\n¿En qué puedo ayudarte?",
};

const SUGGESTIONS = [
  "¿Qué tratan en ALGOS?",
  "¿Dónde están ubicados?",
  "Horarios de especialistas",
  "¿Cómo agendo una cita?",
];

function loadMessages(): Msg[] {
  if (typeof window === "undefined") return [WELCOME];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch {
    /* noop */
  }
  return [WELCOME];
}

export default function AsistenteAlgos() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => loadMessages());
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      /* noop */
    }
  }, [messages]);

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, messages, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setError(null);
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/asistente`;
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ messages: next }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data?.error ?? "Error");
      setMessages((m) => [...m, { role: "assistant", content: data.text ?? "" }]);
    } catch (e: any) {
      setError(e?.message ?? "No pudimos responder. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setMessages([WELCOME]);
    setError(null);
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  }

  return (
    <>
      {/* Floating trigger */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Abrir asistente ALGOS"
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full px-4 py-3 text-white shadow-lg transition-all duration-200 active:scale-95 md:hover:shadow-xl md:hover:scale-105"
          style={{ backgroundColor: DEEP_TEAL }}
        >
          <MessageSquare size={22} />
          <span className="hidden sm:inline text-sm font-semibold tracking-wide">
            Asistente ALGOS
          </span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed z-[60] flex flex-col shadow-2xl overflow-hidden bottom-0 left-0 right-0 h-[85svh] sm:bottom-6 sm:left-6 sm:right-auto sm:h-[600px] sm:w-[380px] sm:rounded-2xl"
          style={{ backgroundColor: CREAM, border: `1px solid ${DEEP_TEAL}20` }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ backgroundColor: DEEP_TEAL, color: CREAM }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                style={{ backgroundColor: GOLD, color: DEEP_TEAL }}
              >
                A
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">Asistente ALGOS</div>
                <div className="text-[10px] opacity-80">Información general · No diagnostica</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={reset}
                className="text-[10px] uppercase tracking-wider px-2 py-1 rounded opacity-80 hover:opacity-100"
                title="Nueva conversación"
              >
                Limpiar
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar asistente"
                className="p-1.5 rounded hover:bg-white/10"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user" ? "rounded-2xl rounded-br-md" : "rounded-2xl rounded-bl-md"
                  }`}
                  style={
                    m.role === "user"
                      ? { backgroundColor: TEAL, color: CREAM }
                      : { backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}15` }
                  }
                >
                  {renderContent(m.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm"
                  style={{ backgroundColor: "white", color: DEEP_TEAL, border: `1px solid ${DEEP_TEAL}15` }}
                >
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: TEAL, animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: TEAL, animationDelay: "120ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: TEAL, animationDelay: "240ms" }} />
                  </span>
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs px-3 py-2 rounded" style={{ backgroundColor: "#fdecea", color: "#8a2a20" }}>
                {error}
              </div>
            )}

            {messages.length <= 1 && !loading && (
              <div className="pt-2 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-xs px-3 py-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: "white",
                      color: DEEP_TEAL,
                      border: `1px solid ${DEEP_TEAL}30`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="px-3 py-3" style={{ borderTop: `1px solid ${DEEP_TEAL}15`, backgroundColor: "white" }}>
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Escribe tu pregunta…"
                rows={1}
                className="flex-1 resize-none px-3 py-2 text-sm rounded-lg outline-none max-h-24"
                style={{
                  backgroundColor: CREAM,
                  color: DEEP_TEAL,
                  border: `1px solid ${DEEP_TEAL}25`,
                }}
                disabled={loading}
              />
              <button
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                aria-label="Enviar"
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white transition-opacity disabled:opacity-40"
                style={{ backgroundColor: TEAL }}
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] mt-2 text-center opacity-60" style={{ color: DEEP_TEAL }}>
              Para agendar, escríbenos por{" "}
              <a
                href={`${ALGOS.contact.whatsappHref}?text=Hola%2C%20quisiera%20agendar%20una%20cita`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>
        </div>
      )}
    </>
  );
}

// Minimal markdown-ish renderer: **bold** and links.
function renderContent(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|https?:\/\/[^\s)]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else {
      parts.push(
        <a key={key++} href={token} target="_blank" rel="noopener noreferrer" className="underline">
          {token}
        </a>,
      );
    }
    lastIndex = match.index + token.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}
