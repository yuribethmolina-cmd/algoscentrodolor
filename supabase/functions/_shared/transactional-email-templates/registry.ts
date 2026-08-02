import type * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: any) => string)
  displayName?: string
  previewData?: Record<string, unknown>
  to?: string
}

import { template as nuevaCita } from './nueva-cita.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'nueva-cita': nuevaCita,
}
