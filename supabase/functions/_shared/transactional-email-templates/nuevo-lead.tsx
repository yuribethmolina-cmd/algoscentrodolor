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

interface NuevoLeadProps {
  name?: string
  phone?: string
  email?: string
  reason?: string
  sectionLabel?: string
  device?: string
  path?: string
  sourceCode?: string
  createdAt?: string
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Text style={row}>
    <span style={rowLabel}>{label}: </span>
    <span style={rowValue}>{value && value.length > 0 ? value : '—'}</span>
  </Text>
)

function waDigits(phone?: string): string {
  const d = (phone ?? '').replace(/\D/g, '')
  if (d.length === 11 && d.startsWith('0')) return `58${d.slice(1)}`
  if (d.length === 10 && d.startsWith('4')) return `58${d}`
  return d
}

const NuevoLeadEmail = ({
  name,
  phone,
  email,
  reason,
  sectionLabel,
  device,
  path,
  sourceCode,
  createdAt,
}: NuevoLeadProps) => {
  const wa = waDigits(phone)
  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>{`Nuevo lead por WhatsApp: ${name ?? 'paciente'}`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brand}>ALGOS</Text>
            <Text style={tagline}>Centro de Dolor Intervencionista</Text>
          </Section>
          <Section style={card}>
            <Heading style={h1}>Nuevo lead por WhatsApp</Heading>
            <Text style={lead}>
              {name ?? 'Un paciente'} dejó sus datos antes de abrir WhatsApp
              {reason ? ` y preguntó por ${reason}` : ''}. Si no escribe al chat, escríbele tú.
            </Text>

            <Text style={subhead}>Datos del paciente</Text>
            <Row label="Paciente" value={name} />
            <Row label="Teléfono" value={phone} />
            <Row label="Correo" value={email} />
            <Row label="Interés" value={reason} />

            <Hr style={hr} />

            <Text style={subhead}>Origen</Text>
            <Row label="Sección" value={sectionLabel} />
            <Row label="Página" value={path} />
            <Row label="Dispositivo" value={device} />
            <Row label="Código interno" value={sourceCode} />
            <Row label="Recibido" value={createdAt} />

            <Section style={ctaWrap}>
              <Button href="https://algoscentrodolor.com/admin/leads" style={button}>
                Abrir panel de leads
              </Button>
            </Section>

            {wa.length >= 7 && (
              <Text style={rowCenter}>
                <Link href={`https://wa.me/${wa}`} style={link}>
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
  component: NuevoLeadEmail,
  subject: (data: NuevoLeadProps) =>
    `Nuevo lead: ${data?.name ?? 'paciente'}${data?.reason ? ` · ${data.reason}` : ''}`,
  displayName: 'Nuevo lead por WhatsApp',
  previewData: {
    name: 'María Pérez',
    phone: '04146807886',
    reason: 'una Electromiografía (EMG)',
    sectionLabel: 'Barra fija móvil',
    device: 'mobile',
    path: '/',
    sourceCode: 'ALG-EMG-STICKY-M',
    createdAt: '2026-09-18 13:05 UTC',
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
const subhead = {
  fontSize: '12px',
  fontWeight: 700,
  color: '#3D8B96',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.4px',
  margin: '0 0 8px',
}
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
