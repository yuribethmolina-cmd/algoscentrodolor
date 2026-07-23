
ALTER TABLE public.doctors
  ADD COLUMN IF NOT EXISTS cv_url TEXT,
  ADD COLUMN IF NOT EXISTS cv_filename TEXT;

-- Storage policies for team-cvs bucket
CREATE POLICY "Admins can upload team CVs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'team-cvs'
  AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can update team CVs"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'team-cvs'
  AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can delete team CVs"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'team-cvs'
  AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can read team CVs"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'team-cvs'
  AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
);
