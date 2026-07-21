
CREATE TYPE public.appointment_status AS ENUM (
  'pendiente','contactado','agendado','asistio','no_asistio','realizado'
);

CREATE TABLE public.appointment_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  condition text,
  has_studies text,
  preferred_date date,
  preferred_shift text,
  notes text,
  source_section text,
  device text,
  status public.appointment_status NOT NULL DEFAULT 'pendiente',
  status_updated_at timestamptz,
  status_updated_by uuid,
  internal_notes text
);

CREATE INDEX appointment_requests_created_at_idx ON public.appointment_requests (created_at DESC);
CREATE INDEX appointment_requests_status_idx ON public.appointment_requests (status);

GRANT SELECT, UPDATE ON public.appointment_requests TO authenticated;
GRANT ALL ON public.appointment_requests TO service_role;

ALTER TABLE public.appointment_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view appointment requests"
  ON public.appointment_requests FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins can update appointment requests"
  ON public.appointment_requests FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));
