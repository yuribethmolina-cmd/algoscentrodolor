import { useEffect, useState } from "react";

/** Horario de atención por WhatsApp: lunes a viernes, 7:00 AM – 4:00 PM (hora Venezuela). */
export const BUSINESS_HOURS = {
  startHour: 7,
  endHour: 16,
  label: "Lunes a viernes, 7:00 AM – 4:00 PM",
} as const;

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getCaracasParts(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Caracas",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);
}

function readClock(date = new Date()) {
  const parts = getCaracasParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = parseInt(parts.find((p) => p.type === "hour")?.value || "-1", 10);
  const minute = parseInt(parts.find((p) => p.type === "minute")?.value || "0", 10);
  return { dayIndex: WEEKDAYS.indexOf(weekday), hour, minute };
}

export function isWithinBusinessHours(date = new Date()): boolean {
  const { dayIndex, hour } = readClock(date);
  return dayIndex >= 1 && dayIndex <= 5 && hour >= BUSINESS_HOURS.startHour && hour < BUSINESS_HOURS.endHour;
}

/** Texto corto que explica cuándo responderá el equipo si está cerrado. */
export function nextOpeningLabel(date = new Date()): string {
  const { dayIndex, hour } = readClock(date);
  const beforeOpening = dayIndex >= 1 && dayIndex <= 5 && hour < BUSINESS_HOURS.startHour;
  if (beforeOpening) return "Hoy a las 7:00 AM";
  if (dayIndex === 5 || dayIndex === 6 || dayIndex === 0) return "El lunes a las 7:00 AM";
  return "Mañana a las 7:00 AM";
}

export type BusinessHoursState = {
  isOpen: boolean;
  statusLabel: string;
  helperText: string;
  ctaLabel: string;
  scheduleLabel: string;
};

export function getBusinessHoursState(date = new Date()): BusinessHoursState {
  const isOpen = isWithinBusinessHours(date);
  return {
    isOpen,
    statusLabel: isOpen ? "Le respondemos ahora" : "Le respondemos apenas abramos",
    helperText: isOpen
      ? "Le contesta una persona de nuestro equipo, no un robot. Escriba su nombre y cuéntenos qué le molesta."
      : `Deje su mensaje ahora. ${nextOpeningLabel(date)} lo leemos de primero y le confirmamos su cita.`,
    ctaLabel: "Escríbanos por WhatsApp",
    scheduleLabel: BUSINESS_HOURS.label,
  };
}

/** Hook reactivo: recalcula el estado cada minuto. */
export function useBusinessHours(): BusinessHoursState {
  const [state, setState] = useState<BusinessHoursState>(() => getBusinessHoursState());

  useEffect(() => {
    const tick = () => setState(getBusinessHoursState());
    tick();
    const id = window.setInterval(tick, 60_000);
    const onFocus = () => tick();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return state;
}

/** Añade contexto de horario al texto ya presente en un enlace de WhatsApp. */
export function withHoursContext(waHref: string, date = new Date()): string {
  const suffix = isWithinBusinessHours(date)
    ? ""
    : " (Escribo fuera del horario de atención; agradezco su respuesta al abrir.)";
  try {
    const parsed = new URL(waHref, typeof window !== "undefined" ? window.location.origin : "https://algoscentrodolor.com");
    const text = parsed.searchParams.get("text") ?? "";
    parsed.searchParams.set("text", text + suffix);
    return parsed.toString();
  } catch {
    return waHref;
  }
}
