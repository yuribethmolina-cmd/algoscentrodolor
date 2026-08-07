CREATE TABLE public.appointment_notification_log (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id uuid REFERENCES public.appointment_requests(id) ON DELETE CASCADE,
  channel text NOT NULL,
  kind text NOT NULL,
  recipient text,
  status text NOT NULL,
  error_message text,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_appointment_notification_log_appointment ON public.appointment_notification_log(appointment_id);
CREATE INDEX idx_appointment_notification_log_created_at ON public.appointment_notification_log(created_at DESC);

GRANT SELECT ON public.appointment_notification_log TO authenticated;
GRANT ALL ON public.appointment_notification_log TO service_role;

ALTER TABLE public.appointment_notification_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view notification log"
ON public.appointment_notification_log
FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));