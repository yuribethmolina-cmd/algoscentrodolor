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
  if (beforeOpening) return "Respondemos hoy desde las 7:00 AM";
  if (dayIndex === 5 || dayIndex === 6 || dayIndex === 0) return "Respondemos el lunes desde las 7:00 AM";
  return "Respondemos mañana desde las 7:00 AM";
}

export type BusinessHoursState = {
  isOpen: boolean;
  /** "Abierto ahora" / "Fuera de horario" */
  statusLabel: string;
  /** Microcopy contextual para mostrar bajo el botón. */
  helperText: string;
  /** Texto sugerido para el botón de WhatsApp. */
  ctaLabel: string;
  scheduleLabel: string;
};

export function getBusinessHoursState(date = new Date()): BusinessHoursState {
  const isOpen = isWithinBusinessHours(date);
  return {
    isOpen,
    statusLabel: isOpen ? "Abierto ahora" : "Fuera de horario",
    helperText: isOpen
      ? "Estamos atendiendo por WhatsApp. Le confirmamos fecha y hora."
      : `${nextOpeningLabel(date)}. Puede dejar su mensaje ahora y lo tomamos primero.`,
    ctaLabel: isOpen ? "AGENDE POR WHATSAPP" : "ESCRÍBANOS POR WHATSAPP",
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

/** Añade contexto de horario al mensaje prellenado de WhatsApp. */
export function withHoursContext(waHref: string, message: string, date = new Date()): string {
  const suffix = isWithinBusinessHours(date)
    ? ""
    : " (Escribo fuera del horario de atención, agradezco su respuesta al abrir.)";
  const [base] = waHref.split("?");
  return `${base}?text=${encodeURIComponent(message + suffix)}`;
}
