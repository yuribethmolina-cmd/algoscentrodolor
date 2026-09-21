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

interface GraciasLeadProps {
  name?: string
  reason?: string
}

const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(
    'ALGOS Centro de Dolor Intervencionista, CC América, Av. 20 con Calle 65, Sector Paraíso, Maracaibo, Venezuela',
  )

const GraciasLeadEmail = ({ name, reason }: GraciasLeadProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Gracias por escribir a ALGOS · Aquí estamos para ayudarte</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brand}>ALGOS</Text>
          <Text style={tagline}>Centro de Dolor Intervencionista · Maracaibo</Text>
        </Section>

        <Section style={card}>
          <Heading style={h1}>{name ? `¡Gracias, ${name}!` : '¡Gracias por escribirnos!'}</Heading>
          <Text style={paragraph}>
            Recibimos tus datos y nos alegra que nos hayas contactado
            {reason ? ` por ${reason}` : ''}. En ALGOS estamos para escucharte y
            ayudarte a resolver tu dolor, con un equipo que te atiende como
            persona, no como un número.
          </Text>

          <Text style={subhead}>¿Cómo seguimos?</Text>
          <Text style={step}>
            <span style={stepNum}>1. </span>
            Continúa la conversación por WhatsApp al{' '}
            <Link href="https://wa.me/584146807886" style={link}>
              0414-680 7886
            </Link>
            : te orientamos sobre consultas, estudios y disponibilidad.
          </Text>
          <Text style={step}>
            <span style={stepNum}>2. </span>
            Si prefieres, una persona de nuestro equipo te escribirá al número
            que dejaste (horario de atención: lunes a viernes, 7:00 a. m. a 4:00 p. m.).
          </Text>

          <Text style={subhead}>Dónde estamos</Text>
          <Text style={address}>
            Av. 20 con Calle 65, N° 65-02
            <br />
            C.C. América, Local 4
            <br />
            Sector Paraíso · Maracaibo 4001
            <br />
            Estado Zulia, Venezuela
          </Text>
          <Text style={paragraph}>
            <Link href={MAPS_URL} style={link}>
              Ver cómo llegar en Google Maps
            </Link>
          </Text>
        </Section>

        <Text style={note}>
          Este correo es un agradecimiento por tu contacto. Si no solicitaste
          información de ALGOS, puedes ignorarlo.
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
  component: GraciasLeadEmail,
  subject: 'Gracias por escribir a ALGOS · Aquí estamos para ti',
  displayName: 'Agradecimiento a lead de WhatsApp',
  previewData: {
    name: 'María Pérez',
    reason: 'consulta sobre electromiografía',
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
const step = { fontSize: '14px', color: '#1A4A55', margin: '0 0 10px', lineHeight: '21px' }
const stepNum = { color: '#C69636', fontWeight: 700 }
const address = { fontSize: '14px', color: '#1A4A55', lineHeight: '22px', margin: '0 0 10px' }
const link = { color: '#C69636', fontWeight: 600 }
const note = { fontSize: '12px', color: '#3D8B96', marginTop: '14px' }
const brandFooter = { fontSize: '12px', color: '#3D8B96', marginTop: '6px' }
