/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface InviteEmailProps {
  siteName: string
  siteUrl: string
  confirmationUrl: string
}

export const InviteEmail = ({ siteUrl, confirmationUrl }: InviteEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Has sido invitado al panel interno de ALGOS</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brand}>ALGOS</Text>
          <Text style={tagline}>Centro de Dolor Intervencionista</Text>
        </Section>
        <Section style={card}>
          <Heading style={h1}>Te han invitado</Heading>
          <Text style={text}>
            Fuiste invitado a unirte al panel interno de{' '}
            <Link href={siteUrl} style={link}>ALGOS</Link> como administrador.
            Haz clic en el botón para aceptar la invitación y crear tu contraseña.
          </Text>
          <Button style={button} href={confirmationUrl}>
            Aceptar invitación
          </Button>
          <Text style={footer}>
            Si no esperabas esta invitación, puedes ignorar este correo.
          </Text>
        </Section>
        <Text style={brandFooter}>ALGOS · Maracaibo, Venezuela</Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Helvetica, Arial, sans-serif' }
const container = { padding: '32px 20px', maxWidth: '560px', margin: '0 auto' }
const header = { textAlign: 'center' as const, padding: '0 0 24px' }
const brand = { fontSize: '28px', fontWeight: '600' as const, color: '#1a4a55', letterSpacing: '6px', margin: '0' }
const tagline = { fontSize: '10px', fontWeight: '500' as const, color: '#c69636', letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '4px 0 0' }
const card = { backgroundColor: '#f5f0e8', borderRadius: '6px', padding: '36px 32px', borderTop: '3px solid #c69636' }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#1a4a55', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#2a3d43', lineHeight: '1.6', margin: '0 0 20px' }
const link = { color: '#1a4a55', fontWeight: 600 as const, textDecoration: 'underline' }
const button = {
  backgroundColor: '#c69636',
  color: '#1a4a55',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  letterSpacing: '1.5px',
  textTransform: 'uppercase' as const,
  borderRadius: '4px',
  padding: '14px 28px',
  textDecoration: 'none',
  display: 'inline-block',
  margin: '8px 0 4px',
}
const footer = { fontSize: '13px', color: '#5a6b6f', margin: '28px 0 0', lineHeight: '1.5' }
const brandFooter = { fontSize: '11px', color: '#8a9599', textAlign: 'center' as const, letterSpacing: '1.5px', textTransform: 'uppercase' as const, margin: '24px 0 0' }
