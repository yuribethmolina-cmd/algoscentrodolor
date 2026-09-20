import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const MOTIVO_LABEL: Record<string, string> = {
  'motivo:emg': 'Electromiografía (EMG)',
  'motivo:eeg': 'Electroencefalograma (EEG)',
  'motivo:eeg_sedacion': 'EEG con sedación',
  'motivo:consulta': 'Consulta con un doctor',
  'motivo:precios': 'Precios',
  'motivo:otro': 'Otra pregunta',
  chat_quick_whatsapp: 'Escribió desde el asistente',
}

const PAGE_LABEL: Record<string, string> = {
  '/': 'Inicio',
  '/procedimientos/emg': 'Electromiografía (EMG)',
  '/procedimientos/eeg': 'Electroencefalograma (EEG)',
  '/estudios-laboratorio': 'Estudios de laboratorio',
  '/agendar': 'Pedir cita',
  '/contacto': 'Contacto',
  '/equipo': 'Equipo médico',
  '/lp/dolor': 'Página de dolor',
  '/lp/diagnostico': 'Página de diagnóstico',
}

const STATUS_LABEL: Record<string, string> = {
  nuevo: 'Nuevo',
  contactado: 'Contactado',
  agendado: 'Agendado',
  perdido: 'Perdido',
  cerrado: 'Cerrado',
  pendiente: 'Pendiente',
  asistio: 'Asistió',
  no_asistio: 'No asistió',
  realizado: 'Realizado',
}

function cleanReason(reason?: string | null): string | undefined {
  if (!reason) return undefined
  return reason.replace(/^(una|un|los|las|el|la)\s+/i, '').trim()
}

function motivoOf(row: Record<string, unknown>): string {
  const cta = row.cta_label as string | null
  if (cta && MOTIVO_LABEL[cta]) return MOTIVO_LABEL[cta]
  const reason = cleanReason(row.reason as string | null)
  if (reason) return reason
  return 'No indicó el motivo'
}

function pageOf(row: Record<string, unknown>): string {
  const path = row.path as string | null
  if (!path) return 'Página no registrada'
  return PAGE_LABEL[path] ?? path
}

function deviceOf(device?: string | null): string | undefined {
  if (!device) return undefined
  if (device === 'mobile') return 'Desde el teléfono'
  if (device === 'desktop') return 'Desde computadora'
  return device
}

const TZ = 'America/Caracas'

function timeLabel(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-VE', {
    timeZone: TZ,
    hour: '2-digit',
    minute: '2-digit',
  })
}

const DEFAULT_RECIPIENTS = [
  'info@algoscentrodolor.com',
  'recepcion.algos@algoscentrodolor.com',
]

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const cronToken = Deno.env.get('DIGEST_CRON_TOKEN')
  const providedToken =
    req.headers.get('x-digest-token') ??
    (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '')
  if (!cronToken || providedToken !== cronToken) {
    return new Response(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }


  try {
    const body = await req.json().catch(() => ({}))
    const hours = Number(body?.hours) > 0 ? Number(body.hours) : 24
    const recipients = typeof body?.to === 'string' && body.to.includes('@')
      ? [body.to]
      : DEFAULT_RECIPIENTS

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const since = new Date(Date.now() - hours * 3600 * 1000).toISOString()

    const [leadsRes, apptRes] = await Promise.all([
      supabase
        .from('whatsapp_leads')
        .select(
          'id, created_at, patient_name, patient_phone, reason, cta_label, path, device, status, section_label'
        )
        .gte('created_at', since)
        .order('created_at', { ascending: false }),
      supabase
        .from('appointment_requests')
        .select('id, created_at, name, phone, email, condition, status')
        .gte('created_at', since)
        .order('created_at', { ascending: false }),
    ])

    if (leadsRes.error) throw leadsRes.error
    if (apptRes.error) throw apptRes.error

    const allLeads = leadsRes.data ?? []
    const withData = allLeads.filter(
      (r) => (r.patient_name && r.patient_name.length > 0) || (r.patient_phone && r.patient_phone.length > 0)
    )
    const anonymous = allLeads.filter((r) => !withData.includes(r))

    const counts = new Map<string, number>()
    for (const r of anonymous) {
      const key = motivoOf(r as Record<string, unknown>)
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }

    const templateData = {
      dateLabel: new Date().toLocaleDateString('es-VE', {
        timeZone: TZ,
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
      leadsWithData: withData.map((r) => ({
        time: timeLabel(r.created_at as string),
        name: r.patient_name ?? undefined,
        phone: r.patient_phone ?? undefined,
        reason: motivoOf(r as Record<string, unknown>),
        page: pageOf(r as Record<string, unknown>),
        device: deviceOf(r.device),
        status: STATUS_LABEL[r.status as string] ?? (r.status as string),
      })),
      appointments: (apptRes.data ?? []).map((a) => ({
        time: timeLabel(a.created_at as string),
        name: a.name ?? undefined,
        phone: a.phone ?? undefined,
        reason: a.condition ?? 'Solicitud de cita',
        status: STATUS_LABEL[a.status as string] ?? (a.status as string),
      })),
      anonymousCount: anonymous.length,
      anonymousByReason: [...counts.entries()]
        .sort((a, b) => b[1] - a[1])
        .map(([reason, count]) => ({ reason, count })),
    }

    const dayKey = new Date().toISOString().slice(0, 10)
    const results: { to: string; status: string }[] = []

    for (const to of recipients) {
      let status = 'sent'
      let errorMessage: string | null = null

      try {
        const result = await sendTemplateEmail('resumen-leads-diario', to, {
          templateData,
          idempotencyKey: `resumen-leads-${dayKey}-${hours}-${to}`,
        })
        if (!result.sent) status = 'suppressed'
      } catch (error) {
        status = 'failed'
        errorMessage = error instanceof Error ? error.message : String(error)
        console.error(`daily-leads-digest send failed for ${to}`, errorMessage)
      }

      const { error: logError } = await supabase.from('email_send_log').insert({
        template_name: 'resumen-leads-diario',
        recipient_email: to,
        status,
        error_message: errorMessage,
      })
      if (logError) console.error('email_send_log insert failed', logError.message)

      results.push({ to, status })
    }

    const overall = results.some((r) => r.status === 'sent')
      ? 'sent'
      : results[0]?.status ?? 'failed'

    return new Response(
      JSON.stringify({
        status: overall,
        hours,
        recipients: results,
        leads_with_data: templateData.leadsWithData.length,
        appointments: templateData.appointments.length,
        anonymous: anonymous.length,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('daily-leads-digest error', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
