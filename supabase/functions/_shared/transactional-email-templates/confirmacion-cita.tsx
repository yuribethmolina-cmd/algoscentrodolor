/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ConfirmacionCitaProps {
  name?: string
  phone?: string
  condition?: string
  preferredDate?: string
  preferredShift?: string
}

const Row = ({ label, value }: { label: string; value?: string }) => (
  <Text style={row}>
    <span style={rowLabel}>{label}: </span>
    <span style={rowValue}>{value && value.length > 0 ? value : '—'}</span>
  </Text>
)

const ConfirmacionCitaEmail = ({
  name,
  phone,
  condition,
  preferredDate,
  preferredShift,
}: ConfirmacionCitaProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Recibimos tu solicitud de cita en ALGOS</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brand}>ALGOS</Text>
          <Text style={tagline}>Centro de Dolor Intervencionista · Maracaibo</Text>
        </Section>

        <Section style={card}>
          <Heading style={h1}>
            {name ? `¡Hola, ${name}!` : '¡Hola!'}
          </Heading>
          <Text style={paragraph}>
            Recibimos tu solicitud de cita. Nuestro equipo de recepción te contactará
            muy pronto por teléfono o WhatsApp para confirmar día y hora.
          </Text>

          <Text style={subhead}>Resumen de tu solicitud</Text>
          <Row label="Nombre" value={name} />
          <Row label="Teléfono" value={phone} />
          <Row label="Motivo de consulta" value={condition} />
          <Row label="Fecha preferida" value={preferredDate} />
          <Row label="Turno preferido" value={preferredShift} />

          <Text style={paragraph}>
            ¿Necesitas algo antes? Escríbenos por{' '}
            <Link href="https://wa.me/584146807886" style={link}>
              WhatsApp al 0414-680 7886
            </Link>
            .
          </Text>
        </Section>

        <Text style={note}>
          Este correo es solo una confirmación de recepción, no una cita agendada.
        </Text>
        <Text style={brandFooter}>
          ALGOS · Maracaibo, Venezuela ·{' '}
          <Link href="https://algoscentrodolor.com" style={link}>
            algoscentrodolor.com
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ConfirmacionCitaEmail,
  subject: 'Recibimos tu solicitud de cita · ALGOS',
  displayName: 'Confirmación de cita al paciente',
  previewData: {
    name: 'María Pérez',
    phone: '+584146807886',
    condition: 'Dolor lumbar',
    preferredDate: '2026-08-10',
    preferredShift: 'mañana',
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
const h1 = { fontSize: '20px', color: '#1A4A55', margin: '0 0 12px' }
const paragraph = { fontSize: '14px', color: '#1A4A55', lineHeight: '21px', margin: '0 0 14px' }
const subhead = { fontSize: '13px', fontWeight: 700, color: '#3D8B96', margin: '4px 0 8px' }
const row = { fontSize: '14px', color: '#1A4A55', margin: '0 0 8px', lineHeight: '20px' }
const rowLabel = { color: '#3D8B96', fontWeight: 600 }
const rowValue = { color: '#1A4A55' }
const link = { color: '#C69636', fontWeight: 600 }
const note = { fontSize: '12px', color: '#3D8B96', marginTop: '14px' }
const brandFooter = { fontSize: '12px', color: '#3D8B96', marginTop: '6px' }
