CREATE TABLE public.whatsapp_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  source_code text NOT NULL,
  section text,
  section_label text,
  cta_label text,
  reason text,
  path text,
  device text,
  referrer text,
  status text NOT NULL DEFAULT 'nuevo',
  patient_name text,
  patient_phone text,
  internal_notes text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid
);

CREATE INDEX whatsapp_leads_created_at_idx ON public.whatsapp_leads (created_at DESC);
CREATE INDEX whatsapp_leads_source_code_idx ON public.whatsapp_leads (source_code);

GRANT SELECT, UPDATE ON public.whatsapp_leads TO authenticated;
GRANT ALL ON public.whatsapp_leads TO service_role;

ALTER TABLE public.whatsapp_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view whatsapp leads"
ON public.whatsapp_leads FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins can update whatsapp leads"
ON public.whatsapp_leads FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE OR REPLACE FUNCTION public.whatsapp_leads_set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

REVOKE EXECUTE ON FUNCTION public.whatsapp_leads_set_updated_at() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER whatsapp_leads_updated_at
BEFORE UPDATE ON public.whatsapp_leads
FOR EACH ROW EXECUTE FUNCTION public.whatsapp_leads_set_updated_at();