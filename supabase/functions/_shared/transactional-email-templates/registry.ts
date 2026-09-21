import type * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string
}

import { template as nuevaCita } from './nueva-cita.tsx'
import { template as confirmacionCita } from './confirmacion-cita.tsx'
import { template as nuevoLead } from './nuevo-lead.tsx'
import { template as resumenLeadsDiario } from './resumen-leads-diario.tsx'
import { template as graciasLead } from './gracias-lead.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'nueva-cita': nuevaCita,
  'confirmacion-cita': confirmacionCita,
  'nuevo-lead': nuevoLead,
  'resumen-leads-diario': resumenLeadsDiario,
  'gracias-lead': graciasLead,
}

