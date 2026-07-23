UPDATE public.doctors
SET specialty = 'Cirujano de mano',
    specialty_slug = 'traumatologia',
    display_order = 45,
    bio = 'Cirujana de mano con formación en traumatología y ortopedia. En ALGOS evalúa y trata patologías de mano, muñeca y nervios periféricos que causan dolor o limitación funcional, coordinando su abordaje con el equipo intervencionista cuando procede.',
    credentials = ARRAY['Cirujana de mano', 'Formación en traumatología y ortopedia']
WHERE slug = 'dra-doris-meneses';

INSERT INTO public.doctors (
  id, slug, name, specialty, specialty_slug, schedule,
  is_director, active, display_order, credentials, languages, bio
) VALUES (
  gen_random_uuid(),
  'dra-jannine-viloria',
  'Dra. Jannine Viloria',
  'Reumatología',
  'reumatologia',
  'Viernes · 8:00 AM - 12:00 PM',
  false,
  true,
  50,
  ARRAY['Médico Reumatólogo', 'Especialista en enfermedades articulares y autoinmunes'],
  ARRAY['Español'],
  'Médico Reumatólogo especializado en el diagnóstico y manejo de enfermedades articulares y autoinmunes que cursan con dolor crónico. En ALGOS evalúa pacientes con artritis, fibromialgia, espondiloartritis y otros síndromes reumáticos, coordinando su tratamiento con el equipo intervencionista cuando procede.'
);