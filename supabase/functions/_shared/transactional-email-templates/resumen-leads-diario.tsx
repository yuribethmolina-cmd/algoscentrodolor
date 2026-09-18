/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface LeadItem {
  time?: string
  name?: string
  phone?: string
  reason?: string
  page?: string
  device?: string
  status?: string
}

interface MotivoItem {
  reason: string
  count: number
}

interface ResumenLeadsProps {
  dateLabel?: string
  leadsWithData?: LeadItem[]
  appointments?: LeadItem[]
  anonymousCount?: number
  anonymousByReason?: MotivoItem[]
}

function waDigits(phone?: string): string {
  const d = (phone ?? '').replace(/\D/g, '')
  if (d.length === 11 && d.startsWith('0')) return `58${d.slice(1)}`
  if (d.length === 10 && d.startsWith('4')) return `58${d}`
  return d
}

const LeadCard = ({ item }: { item: LeadItem }) => {
  const wa = waDigits(item.phone)
  return (
    <Section style={itemBox}>
      <Text style={itemTitle}>
        {item.name && item.name.length > 0 ? item.name : 'Sin nombre'}
        {item.time ? <span style={itemTime}>{` · ${item.time}`}</span> : null}
      </Text>
      <Text style={itemLine}>
        <span style={rowLabel}>Pregunta por: </span>
        {item.reason && item.reason.length > 0 ? item.reason : 'No indicó el motivo'}
      </Text>
      <Text style={itemLine}>
        <span style={rowLabel}>Teléfono: </span>
        {item.phone && item.phone.length > 0 ? item.phone : 'No dejó teléfono'}
      </Text>
      {item.page ? (
        <Text style={itemLine}>
          <span style={rowLabel}>Estaba en: </span>
          {item.page}
          {item.device ? ` · ${item.device}` : ''}
        </Text>
      ) : null}
      {item.status ? (
        <Text style={itemLine}>
          <span style={rowLabel}>Estado: </span>
          {item.status}
        </Text>
      ) : null}
      {wa.length >= 7 ? (
        <Text style={itemLine}>
          <Link href={`https://wa.me/${wa}`} style={link}>
            Escribir por WhatsApp
          </Link>
        </Text>
      ) : null}
    </Section>
  )
}

const ResumenLeadsDiarioEmail = ({
  dateLabel,
  leadsWithData = [],
  appointments = [],
  anonymousCount = 0,
  anonymousByReason = [],
}: ResumenLeadsProps) => {
  const total = leadsWithData.length + appointments.length
  return (
    <Html lang="es" dir="ltr">
      <Head />
      <Preview>{`Resumen de leads${dateLabel ? ` · ${dateLabel}` : ''}: ${total} con datos de contacto`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brand}>ALGOS</Text>
            <Text style={tagline}>Centro de Dolor Intervencionista</Text>
          </Section>

          <Section style={card}>
            <Heading style={h1}>Resumen de leads</Heading>
            <Text style={lead}>
              {dateLabel ? `${dateLabel}. ` : ''}
              {total > 0
                ? `${total} persona${total === 1 ? '' : 's'} dejó sus datos para que la contactes.`
                : 'Nadie dejó datos de contacto en este período.'}
              {anonymousCount > 0
                ? ` Además, ${anonymousCount} persona${anonymousCount === 1 ? '' : 's'} abrió WhatsApp sin dejar datos.`
                : ''}
            </Text>

            {leadsWithData.length > 0 ? (
              <>
                <Text style={subhead}>Clics a WhatsApp con datos</Text>
                {leadsWithData.map((item, i) => (
                  <LeadCard key={`l-${i}`} item={item} />
                ))}
              </>
            ) : null}

            {appointments.length > 0 ? (
              <>
                <Hr style={hr} />
                <Text style={subhead}>Solicitudes por formulario</Text>
                {appointments.map((item, i) => (
                  <LeadCard key={`a-${i}`} item={item} />
                ))}
              </>
            ) : null}

            {anonymousByReason.length > 0 ? (
              <>
                <Hr style={hr} />
                <Text style={subhead}>Clics sin datos · por qué escribieron</Text>
                {anonymousByReason.map((m, i) => (
                  <Text key={`m-${i}`} style={itemLine}>
                    <span style={rowLabel}>{m.reason}: </span>
                    {m.count}
                  </Text>
                ))}
                <Text style={note}>
                  A estas personas no podemos escribirles porque no dejaron sus datos, pero el
                  motivo te ayuda a reconocer sus mensajes en WhatsApp.
                </Text>
              </>
            ) : null}

            <Section style={ctaWrap}>
              <Button href="https://algoscentrodolor.com/admin/leads" style={button}>
                Abrir panel de leads
              </Button>
            </Section>
          </Section>

          <Text style={brandFooter}>ALGOS · Maracaibo, Venezuela</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: ResumenLeadsDiarioEmail,
  subject: (data: ResumenLeadsProps) => {
    const total = (data?.leadsWithData?.length ?? 0) + (data?.appointments?.length ?? 0)
    return `Resumen de leads${data?.dateLabel ? ` · ${data.dateLabel}` : ''}: ${total} con datos`
  },
  displayName: 'Resumen diario de leads',
  previewData: {
    dateLabel: 'Jueves 17 de septiembre',
    leadsWithData: [
      {
        time: '09:14',
        name: 'Erika Méndez',
        phone: '04146807886',
        reason: 'Electromiografía (EMG)',
        page: 'Inicio',
        device: 'Desde el teléfono',
        status: 'Nuevo',
      },
    ],
    appointments: [
      {
        time: '15:40',
        name: 'Jaimary Rojas',
        phone: '04121234567',
        reason: 'Electroencefalograma (EEG)',
        status: 'Pendiente',
      },
    ],
    anonymousCount: 6,
    anonymousByReason: [
      { reason: 'Electromiografía (EMG)', count: 3 },
      { reason: 'Precios', count: 2 },
      { reason: 'Otra pregunta', count: 1 },
    ],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Arial, sans-serif' }
const container = { padding: '24px 20px', maxWidth: '600px' }
const header = { marginBottom: '16px' }
const brand = { fontSize: '22px', fontWeight: 700, color: '#1A4A55', margin: '0' }
const tagline = { fontSize: '13px', color: '#3D8B96', margin: '2px 0 0' }
const card = {
  border: '1px solid #E5E0D6',
  borderRadius: '12px',
  padding: '20px',
  backgroundColor: '#F5F0E8',
}
const h1 = { fontSize: '19px', color: '#1A4A55', margin: '0 0 12px' }
const lead = { fontSize: '14px', color: '#1A4A55', lineHeight: '21px', margin: '0 0 16px' }
const subhead = {
  fontSize: '12px',
  fontWeight: 700,
  color: '#3D8B96',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.4px',
  margin: '0 0 10px',
}
const itemBox = {
  backgroundColor: '#ffffff',
  border: '1px solid #E5E0D6',
  borderRadius: '10px',
  padding: '12px 14px',
  marginBottom: '10px',
}
const itemTitle = { fontSize: '15px', fontWeight: 700, color: '#1A4A55', margin: '0 0 6px' }
const itemTime = { fontSize: '13px', fontWeight: 400, color: '#3D8B96' }
const itemLine = { fontSize: '13px', color: '#1A4A55', margin: '0 0 4px', lineHeight: '19px' }
const rowLabel = { color: '#3D8B96', fontWeight: 600 }
const note = { fontSize: '12px', color: '#3D8B96', lineHeight: '18px', margin: '8px 0 0' }
const link = { color: '#C69636', fontWeight: 600 }
const hr = { borderColor: '#E5E0D6', margin: '16px 0' }
const ctaWrap = { textAlign: 'center' as const, margin: '20px 0 4px' }
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
const brandFooter = { fontSize: '12px', color: '#3D8B96', marginTop: '16px' }
