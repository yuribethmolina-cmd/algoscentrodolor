/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu código de verificación ALGOS</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={brand}>ALGOS</Text>
          <Text style={tagline}>Centro de Dolor Intervencionista</Text>
        </Section>
        <Section style={card}>
          <Heading style={h1}>Confirma tu identidad</Heading>
          <Text style={text}>Usa el siguiente código para confirmar tu identidad:</Text>
          <Text style={codeStyle}>{token}</Text>
          <Text style={footer}>
            Este código expira en pocos minutos. Si no lo solicitaste, ignora este mensaje.
          </Text>
        </Section>
        <Text style={brandFooter}>ALGOS · Maracaibo, Venezuela</Text>
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Inter, Helvetica, Arial, sans-serif' }
const container = { padding: '32px 20px', maxWidth: '560px', margin: '0 auto' }
const header = { textAlign: 'center' as const, padding: '0 0 24px' }
const brand = { fontSize: '28px', fontWeight: '600' as const, color: '#1a4a55', letterSpacing: '6px', margin: '0' }
const tagline = { fontSize: '10px', fontWeight: '500' as const, color: '#c69636', letterSpacing: '3px', textTransform: 'uppercase' as const, margin: '4px 0 0' }
const card = { backgroundColor: '#f5f0e8', borderRadius: '6px', padding: '36px 32px', borderTop: '3px solid #c69636', textAlign: 'center' as const }
const h1 = { fontSize: '22px', fontWeight: '600' as const, color: '#1a4a55', margin: '0 0 20px' }
const text = { fontSize: '15px', color: '#2a3d43', lineHeight: '1.6', margin: '0 0 16px' }
const codeStyle = {
  fontFamily: 'Courier, monospace',
  fontSize: '32px',
  fontWeight: 'bold' as const,
  color: '#1a4a55',
  letterSpacing: '8px',
  backgroundColor: '#ffffff',
  border: '2px solid #c69636',
  borderRadius: '4px',
  padding: '16px 20px',
  margin: '0 0 24px',
  display: 'inline-block',
}
const footer = { fontSize: '13px', color: '#5a6b6f', margin: '20px 0 0', lineHeight: '1.5' }
const brandFooter = { fontSize: '11px', color: '#8a9599', textAlign: 'center' as const, letterSpacing: '1.5px', textTransform: 'uppercase' as const, margin: '24px 0 0' }
