export interface ShareableAppointment {
  name: string;
  phone: string;
  email: string | null;
  condition: string | null;
  has_studies: string | null;
  preferred_date: string | null;
  preferred_shift: string | null;
  notes: string | null;
}

export function buildAppointmentShareUrl(appointment: ShareableAppointment): string {
  const fields = [
    "ALGOS · Solicitud de cita",
    `Nombre: ${appointment.name}`,
    `Teléfono: ${appointment.phone}`,
    appointment.email && `Correo: ${appointment.email}`,
    appointment.condition && `Motivo: ${appointment.condition}`,
    appointment.has_studies && `Estudios previos: ${appointment.has_studies}`,
    appointment.preferred_date && `Fecha preferida: ${appointment.preferred_date}`,
    appointment.preferred_shift && `Turno preferido: ${appointment.preferred_shift}`,
    appointment.notes && `Notas del paciente: ${appointment.notes}`,
  ];
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(fields.filter(Boolean).join("\n"))}`;
}