import photoAtilioAsset from '@/assets/Atilio_foto_cortada.png.asset.json';
import photoDanielAsset from '@/assets/daniel-rodriguez.png.asset.json';
const photoAtilio = photoAtilioAsset.url;
const photoDaniel = photoDanielAsset.url;

export type ConfirmedMember = {
  type: 'confirmed';
  slug: string;
  index: '01' | '02' | '03' | '04';
  givenName: string;
  familyName: string;
  role: string;
  specialty: string;
  city: string;
  country: string;
  coords: string;
  group: '01' | '02' | '03';
  bio: {
    formacion?: string;
    experiencia?: string;
    investigacion?: string;
    idiomas?: string;
  };
  photoUrl?: string;
};

export type AspirationalSlot = {
  type: 'aspirational';
  slug: string;
  roleAsName: string;
  profileLine: string;
  city: string;
  group: '01' | '02' | '03';
};

export type TeamMember = ConfirmedMember | AspirationalSlot;

const TEAM: TeamMember[] = [
  // GROUP 01 · MEDICINA INTERVENCIONISTA DEL DOLOR
  {
    type: 'confirmed',
    slug: 'dr-atilio',
    index: '01',
    givenName: 'Dr. Atilio J.',
    familyName: 'Rodríguez',
    role: 'Director Médico',
    specialty: 'Neurocirujano · Especialista en dolor intervencionista',
    city: 'Maracaibo',
    country: 'Venezuela',
    coords: '10°39′N · 71°36′W',
    group: '01',
    photoUrl: photoAtilio,
    bio: {
      idiomas: 'Español',
    },
  },
  {
    type: 'aspirational',
    slug: 'algologo-anestesiologo',
    roleAsName: 'Algólogo · Anestesiólogo intervencionista',
    profileLine: 'Especialidad principal en procedimientos intervencionistas guiados por imagen. Subespecialidad en medicina del dolor.',
    city: 'Maracaibo',
    group: '01',
  },

  // GROUP 03 · SOPORTE CLÍNICO INTEGRAL
  {
    type: 'confirmed',
    slug: 'lcdo-daniel',
    index: '04',
    givenName: 'Lcdo. Daniel',
    familyName: 'Rodríguez',
    role: 'Director de Nutrición',
    specialty: 'Nutrición clínica · Acompañamiento del paciente intervencionista',
    city: 'Maracaibo',
    country: 'Venezuela',
    coords: '10°39′N · 71°36′W',
    group: '03',
    photoUrl: photoDaniel,
    bio: {
      idiomas: 'Español',
    },
  },
  {
    type: 'aspirational',
    slug: 'dr-antonino-parra',
    roleAsName: 'Dr. Antonino Parra · Traumatología (cadera)',
    profileLine: 'Traumatólogo con subespecialidad en cadera. Perfil completo próximamente.',
    city: 'Maracaibo',
    group: '01',
  },
  {
    type: 'aspirational',
    slug: 'dra-doris-meneses',
    roleAsName: 'Dra. Doris Meneses · Reumatología',
    profileLine: 'Reumatóloga especialista en enfermedades articulares y autoinmunes. Perfil completo próximamente.',
    city: 'Maracaibo',
    group: '01',
  },
  {
    type: 'aspirational',
    slug: 'dra-carolina-fisiatria',
    roleAsName: 'Dra. Carolina · Fisiatría',
    profileLine: 'Medicina física y rehabilitación. Perfil completo próximamente.',
    city: 'Maracaibo',
    group: '01',
  },
  {
    type: 'aspirational',
    slug: 'dr-miguel-guevara',
    roleAsName: 'Dr. Miguel Guevara',
    profileLine: 'Especialidad y perfil completo próximamente.',
    city: 'Maracaibo',
    group: '01',
  },
  {
    type: 'aspirational',
    slug: 'dr-alirio-rios',
    roleAsName: 'Dr. Alirio Ríos · Neurofisiología (EEG · EMG)',
    profileLine: 'Estudios de electroencefalograma y electromiografía. Miércoles por la tarde.',
    city: 'Maracaibo',
    group: '01',
  },
  {
    type: 'aspirational',
    slug: 'dra-alicia-cardiologia',
    roleAsName: 'Dra. Alicia · Cardiología (Holter)',
    profileLine: 'Cardiología ambulatoria y estudio Holter. Perfil completo próximamente.',
    city: 'Maracaibo',
    group: '01',
  },
  {
    type: 'aspirational',
    slug: 'psicologo-dolor-cronico',
    roleAsName: 'Psicólogo clínico de dolor crónico',
    profileLine: 'Terapia cognitivo-conductual para dolor, educación en neurociencia del dolor, manejo de comorbilidades psicológicas.',
    city: 'Maracaibo',
    group: '03',
  },
  {
    type: 'aspirational',
    slug: 'fisioterapeuta-dolor',
    roleAsName: 'Fisioterapeuta especializado en dolor',
    profileLine: 'Rehabilitación post-procedimiento, terapia manual, programa de ejercicio terapéutico.',
    city: 'Maracaibo',
    group: '03',
  },
];

export default TEAM;

// Helper para filtrar por grupo:
export function getMembersByGroup(group: '01' | '02' | '03'): TeamMember[] {
  return TEAM.filter((m) => m.group === group);
}

// Helper para obtener solo confirmed:
export function getConfirmedMembers(): ConfirmedMember[] {
  return TEAM.filter((m) => m.type === 'confirmed') as ConfirmedMember[];
}
