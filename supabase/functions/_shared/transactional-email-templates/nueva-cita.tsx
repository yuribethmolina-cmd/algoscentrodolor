/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Button,
  Hr,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface NuevaCitaProps {
  name?: string
  phone?: string
  email?: string
  condition?: string
  hasStudies?: string
  preferredDate?: string
  preferredShift?: string
  notes?: string
  sourceSection?: string
  device?: string
  createdAt?: string
  appointmentId?: string
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Text style={row}>
    <span style={rowLabel}>{label}: </span>
    <span style={rowValue}>{value && value.length > 0 ? value : '—'}</span>
  </Text>
)

const NuevaCitaEmail = ({
  name,
  phone,
  email,
  condition,
  hasStudies,
  preferredDate,
  preferredShift,
  notes,
  sourceSection,
  device,
  createdAt,
  appointmentId,
}: NuevaCitaProps) => {
  const waPhone = (phone ?? '').replace(/\D/g, '')
  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>{`Nueva solicitud de cita: ${name ?? 'paciente'}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brand}>ALGOS</Text>
            <Text style={tagline}>Centro de Dolor Intervencionista</Text>
          </Section>
          <Section style={card}>
            <Heading style={h1}>Nueva solicitud de cita</Heading>
            <Text style={lead}>
              {name ?? 'Un paciente'} solicitó una cita
              {condition ? ` por ${condition}` : ''}. Contáctalo y marca el estado en el panel.
            </Text>

            <Text style={subhead}>Datos del paciente</Text>
            <Row label="Paciente" value={name} />
            <Row label="Teléfono" value={phone} />
            <Row label="Email" value={email} />

            <Hr style={hr} />

            <Text style={subhead}>Motivo y preferencias</Text>
            <Row label="Motivo" value={condition} />
            <Row label="Estudios previos" value={hasStudies} />
            <Row label="Fecha preferida" value={preferredDate} />
            <Row label="Turno" value={preferredShift} />
            <Row label="Notas" value={notes} />

            <Hr style={hr} />

            <Text style={subhead}>Origen</Text>
            <Row label="Sección" value={sourceSection} />
            <Row label="Dispositivo" value={device} />
            <Row label="Recibida" value={createdAt} />

            <Section style={ctaWrap}>
              <Button
                href={`https://algoscentrodolor.com/admin/citas${appointmentId ? `?id=${appointmentId}` : ''}`}
                style={button}
              >
                Abrir panel y marcar estado
              </Button>
            </Section>

            {waPhone.length >= 7 && (
              <Text style={rowCenter}>
                <Link href={`https://wa.me/${waPhone}`} style={link}>
                  Escribir al paciente por WhatsApp
                </Link>
              </Text>
            )}
          </Section>
          <Text style={brandFooter}>ALGOS · Maracaibo, Venezuela</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: NuevaCitaEmail,
  subject: (data: NuevaCitaProps) =>
    `Nueva cita: ${data?.name ?? 'paciente'}${data?.condition ? ` · ${data.condition}` : ''}`,
  displayName: 'Nueva solicitud de cita',
  previewData: {
    name: 'María Pérez',
    phone: '+584146807886',
    email: 'maria@example.com',
    condition: 'Dolor lumbar',
    hasStudies: 'si',
    preferredDate: '2026-08-10',
    preferredShift: 'mañana',
    notes: 'Prefiere en la tarde si es posible.',
    sourceSection: 'form_agendar',
    device: 'mobile',
    createdAt: '2026-08-02 09:15',
    appointmentId: '00000000-0000-0000-0000-000000000000',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '24px 20px', maxWidth: '560px' }
const header = { marginBottom: '16px' }
const brand = { fontSize: '22px', fontWeight: 700, color: '#1A4A55', margin: '0' }
const tagline = { fontSize: '13px', color: '#3D8B96', margin: '2px 0 0' }
const card = {
  border: '1px solid #E5E0D6',
  borderRadius: '12px',
  padding: '20px',
  backgroundColor: '#F5F0E8',
}
const h1 = { fontSize: '19px', color: '#1A4A55', margin: '0 0 14px' }
const row = { fontSize: '14px', color: '#1A4A55', margin: '0 0 8px', lineHeight: '20px' }
const rowLabel = { color: '#3D8B96', fontWeight: 600 }
const rowValue = { color: '#1A4A55' }
const link = { color: '#C69636', fontWeight: 600 }
const lead = { fontSize: '14px', color: '#1A4A55', lineHeight: '21px', margin: '0 0 16px' }
const subhead = { fontSize: '12px', fontWeight: 700, color: '#3D8B96', textTransform: 'uppercase' as const, letterSpacing: '0.4px', margin: '0 0 8px' }
const hr = { borderColor: '#E5E0D6', margin: '16px 0' }
const ctaWrap = { textAlign: 'center' as const, margin: '20px 0 8px' }
const button = {
  backgroundColor: '#1A4A55',
  color: '#ffffff',
  fontSize: '15px',
  fontWeight: 600,
  padding: '14px 24px',
  borderRadius: '10px',
  textDecoration: 'none',
  display: 'inline-block',
}
const rowCenter = { fontSize: '14px', textAlign: 'center' as const, margin: '4px 0 0' }
const brandFooter = { fontSize: '12px', color: '#3D8B96', marginTop: '16px' }
