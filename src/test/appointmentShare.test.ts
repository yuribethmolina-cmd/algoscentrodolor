import { describe, expect, it } from "vitest";
import { buildAppointmentShareUrl } from "../lib/appointmentShare";

describe("manual appointment sharing", () => {
  it("shares the appointment details without choosing a recipient or sharing internal notes", () => {
    const appointment = {
      name: "Paciente de prueba", phone: "0412-0000000", email: "prueba@example.com",
      condition: "Electromiografía", has_studies: "Sí", preferred_date: "2026-10-30",
      preferred_shift: "Mañana", notes: "Consulta de disponibilidad",
      internal_notes: "Privado", status: "pendiente",
    };
    const url = new URL(buildAppointmentShareUrl(appointment));
    expect(url.origin).toBe("https://api.whatsapp.com");
    expect(url.searchParams.has("phone")).toBe(false);
    const text = url.searchParams.get("text");
    expect(text).toContain("Nombre: Paciente de prueba");
    expect(text).toContain("Teléfono: 0412-0000000");
    expect(text).toContain("Correo: prueba@example.com");
    expect(text).toContain("Motivo: Electromiografía");
    expect(text).toContain("Fecha preferida: 2026-10-30");
    expect(text).toContain("Notas del paciente: Consulta de disponibilidad");
    expect(text).not.toContain("Privado");
  });

  it("omits missing optional details", () => {
    const url = new URL(buildAppointmentShareUrl({
      name: "Prueba", phone: "0412-0000000", email: null, condition: null,
      has_studies: null, preferred_date: null, preferred_shift: null, notes: null,
    }));
    expect(url.searchParams.get("text")).toBe("ALGOS · Solicitud de cita\nNombre: Prueba\nTeléfono: 0412-0000000");
  });
});