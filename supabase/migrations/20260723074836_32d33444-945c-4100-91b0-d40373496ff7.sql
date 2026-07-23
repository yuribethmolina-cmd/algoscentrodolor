
CREATE TABLE public.doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  specialty text NOT NULL,
  specialty_slug text NOT NULL,
  schedule text NOT NULL DEFAULT '',
  note text,
  is_director boolean NOT NULL DEFAULT false,
  photo_url text,
  photo_position text,
  bio text,
  credentials text[] NOT NULL DEFAULT '{}',
  languages text[] NOT NULL DEFAULT '{}',
  display_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX doctors_display_order_idx ON public.doctors (display_order, name);
CREATE INDEX doctors_active_idx ON public.doctors (active);

GRANT SELECT ON public.doctors TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.doctors TO authenticated;
GRANT ALL ON public.doctors TO service_role;

ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active doctors"
  ON public.doctors FOR SELECT
  TO anon, authenticated
  USING (
    active = true
    OR EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
  );

CREATE POLICY "Admins can insert doctors"
  ON public.doctors FOR INSERT
  TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins can update doctors"
  ON public.doctors FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins can delete doctors"
  ON public.doctors FOR DELETE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE OR REPLACE FUNCTION public.doctors_set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
REVOKE EXECUTE ON FUNCTION public.doctors_set_updated_at() FROM anon, authenticated;

CREATE TRIGGER doctors_updated_at
  BEFORE UPDATE ON public.doctors
  FOR EACH ROW EXECUTE FUNCTION public.doctors_set_updated_at();

CREATE POLICY "Public can view team photos"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'team-photos');

CREATE POLICY "Admins can upload team photos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'team-photos' AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins can update team photos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'team-photos' AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (bucket_id = 'team-photos' AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins can delete team photos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'team-photos' AND EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

INSERT INTO public.doctors (slug, name, specialty, specialty_slug, schedule, is_director, photo_position, bio, credentials, languages, display_order) VALUES
('dr-atilio-rodriguez', 'Dr. Atilio Rodríguez',
 'Neurocirugía y cirugía de columna · Director Médico', 'neurocirugia',
 'Lunes, martes, jueves y viernes · 1:00 PM - 4:00 PM', true, 'center top',
 'Neurocirujano fundador y Director Médico de ALGOS. Lidera el enfoque intervencionista del centro: procedimientos guiados por imagen para tratar el dolor de columna y nervios cuando la cirugía todavía no hace falta.',
 ARRAY['Neurocirujano, Universidad del Zulia','Especialista en dolor intervencionista y cirugía de columna','Director Médico · ALGOS Centro de Dolor'],
 ARRAY['Español'], 10),
('dr-antulio-parra', 'Dr. Antulio Parra', 'Traumatología y Ortopedia', 'traumatologia',
 'Martes y jueves · 8:00 AM - 11:00 AM', false, NULL, NULL, ARRAY[]::text[], ARRAY[]::text[], 20),
('dr-tomas-iragorry', 'Dr. Tomás Iragorry', 'Traumatología y Ortopedia', 'traumatologia',
 'Lunes, martes y miércoles · 8:00 AM - 12:00 PM', false, NULL,
 'Traumatólogo Ortopedista con Fellowship en Traumatología Deportiva, entrenamiento en ecografía músculo-esquelética y certificación en Medicina del Fútbol FIFA-CONMEBOL. Miembro activo de la SVCOT, aporta al equipo de ALGOS un enfoque de alta precisión para lesiones del aparato locomotor tanto en pacientes deportivos como en dolor crónico musculoesquelético.',
 ARRAY['Médico Traumatólogo Ortopedista','Miembro · Sociedad Venezolana de Cirugía Ortopédica y Traumatológica (SVCOT)','Fellowship en Traumatología Deportiva','Certificado en Medicina del Fútbol · FIFA-CONMEBOL','Entrenamiento en Ecografía Músculo-Esquelética'],
 ARRAY['Español'], 30),
('dr-miguel-guevara', 'Dr. Miguel Guevara', 'Traumatología y Ortopedia', 'traumatologia',
 'Lunes · 8:00 AM - 10:00 AM', false, NULL, NULL, ARRAY[]::text[], ARRAY[]::text[], 40),
('dra-doris-meneses', 'Dra. Doris Meneses', 'Reumatología', 'reumatologia',
 'Viernes · 8:00 AM - 12:00 PM', false, NULL,
 'Médico Reumatólogo especializado en el diagnóstico y manejo de enfermedades articulares y autoinmunes que cursan con dolor crónico. En ALGOS evalúa pacientes con artritis, fibromialgia, espondiloartritis y otros síndromes reumáticos, coordinando su tratamiento con el equipo intervencionista cuando procede.',
 ARRAY['Médico Reumatólogo','Especialista en enfermedades articulares y autoinmunes'],
 ARRAY['Español'], 50),
('dra-leslie-ramirez', 'Dra. Leslie Ramírez', 'Fisiatría y rehabilitación', 'fisiatria',
 'Jueves · 2:00 PM', false, NULL,
 'Médico Fisiatra especializada en Medicina Física y Rehabilitación, con base en Maracaibo. En ALGOS diseña y supervisa programas de rehabilitación individualizados que acompañan la recuperación funcional de los pacientes tras procedimientos intervencionistas.',
 ARRAY['Médico Fisiatra','Especialista en Medicina Física y Rehabilitación'],
 ARRAY['Español'], 60),
('dra-carolina-rodriguez', 'Dra. Carolina Rodríguez',
 'Fisiatría, rehabilitación y estudios electromiográficos', 'fisiatria',
 'Miércoles tarde', false, NULL,
 'Fisiatra especializada en rehabilitación física personalizada, electrodiagnóstico y ozonoterapia. Miembro de la Sociedad Venezolana de Ozonoterapia, integra estudios electromiográficos y técnicas avanzadas de rehabilitación neuromuscular para acompañar la recuperación funcional de los pacientes de ALGOS.',
 ARRAY['Médico Fisiatra · Medicina Física y Rehabilitación','Miembro · Sociedad Venezolana de Ozonoterapia','Especialista en Estudios Electromiográficos (EMG)','Rehabilitación física personalizada y neuromuscular'],
 ARRAY['Español'], 70),
('dra-gilda-gomez', 'Dra. Gilda Gómez Neipp',
 'Algología, anestesiología y cuidados paliativos', 'cuidados-paliativos',
 'Miércoles · 9:00 AM - 12:00 PM', false, NULL,
 'Anestesióloga y especialista en Terapia del Dolor con más de cuatro décadas en el Hospital Central ''Dr. Urquinaona'' de Maracaibo, donde fundó el Servicio de Terapia del Dolor. En ALGOS integra protocolos de algología, manejo del dolor postoperatorio y cuidados paliativos para pacientes con dolor crónico complejo.',
 ARRAY['Médico Anestesióloga · Especialista en Terapia del Dolor','Fundadora y Jefa de Terapia del Dolor · Hospital Central ''Dr. Urquinaona'', Maracaibo','Jefa del Dpto. de Anestesiología y Terapia del Dolor · H.C. ''Dr. Urquinaona'' (2011–actualidad)','Directora Médica · Hospice Venezuela, Fundación pacientes oncológicos terminales (2009–2013)','Médica asesora · Fundación Zuliana Fibromialgia, Maracaibo (2010–actualidad)'],
 ARRAY['Español'], 80),
('lcdo-daniel-rodriguez', 'Lic. Daniel Rodríguez', 'Nutrición Clínica Antiinflamatoria', 'nutricion',
 'Lunes, martes, jueves y viernes · 1:00 PM - 4:00 PM', true, NULL,
 'Licenciado en Nutrición y Dietética. Acompaña al paciente intervencionista con un plan antiinflamatorio individualizado, enfocado en apoyar la recuperación y reducir factores metabólicos que sostienen el dolor.',
 ARRAY['Licenciado en Nutrición y Dietética','Especialista en nutrición clínica antiinflamatoria','Director de Nutrición · ALGOS Centro de Dolor'],
 ARRAY['Español'], 90);
