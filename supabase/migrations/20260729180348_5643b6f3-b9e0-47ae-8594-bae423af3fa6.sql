UPDATE public.doctors 
SET 
  bio = 'Traumatólogo Ortopedista con Fellowship en Traumatología Deportiva, entrenamiento en ecografía músculo-esquelétic. Miembro activo de la SVCOT, aporta al equipo de ALGOS un enfoque de alta precisión para lesiones del aparato locomotor tanto en pacientes deportivos como en dolor crónico musculoesquelético.',
  credentials = ARRAY['Médico Traumatólogo Ortopedista', 'Miembro · Sociedad Venezolana de Cirugía Ortopédica y Traumatológica (SVCOT)', 'Fellowship en Traumatología Deportiva', ' ', 'Entrenamiento en Ecografía Músculo-Esquelética']
WHERE slug = 'dr-tomas-iragorry';