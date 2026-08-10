CREATE TABLE public.lead_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.whatsapp_leads(id) ON DELETE CASCADE,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  direction text NOT NULL DEFAULT 'sistema',
  body text NOT NULL,
  ref_code text,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.lead_messages TO authenticated;
GRANT ALL ON public.lead_messages TO service_role;

ALTER TABLE public.lead_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read lead messages"
ON public.lead_messages FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins can add lead messages"
ON public.lead_messages FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin')
  AND created_by = auth.uid()
);

CREATE POLICY "Admins can update lead messages"
ON public.lead_messages FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'))
WITH CHECK (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE POLICY "Admins can delete lead messages"
ON public.lead_messages FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = auth.uid() AND ur.role = 'admin'));

CREATE INDEX lead_messages_lead_idx ON public.lead_messages (lead_id, occurred_at);

-- Primer evento: el clic que originó el lead, con su código [Ref].
CREATE OR REPLACE FUNCTION public.log_lead_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.lead_messages (lead_id, occurred_at, direction, body, ref_code)
  VALUES (
    NEW.id,
    NEW.created_at,
    'sistema',
    'Clic a WhatsApp desde ' || coalesce(NEW.section_label, NEW.section, 'sección desconocida')
      || coalesce(' · ' || NEW.device, '')
      || coalesce(' · ' || NEW.path, '')
      || ' [Ref: ' || NEW.source_code || ']',
    NEW.source_code
  );
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.log_lead_created() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER whatsapp_leads_log_created
  AFTER INSERT ON public.whatsapp_leads
  FOR EACH ROW EXECUTE FUNCTION public.log_lead_created();

-- Cambios de estado y de responsable quedan en el historial.
CREATE OR REPLACE FUNCTION public.log_lead_changes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.lead_messages (lead_id, direction, body, ref_code, created_by)
    VALUES (NEW.id, 'sistema', 'Estado: ' || OLD.status || ' → ' || NEW.status, NEW.source_code, auth.uid());
  END IF;

  IF NEW.assigned_to IS DISTINCT FROM OLD.assigned_to THEN
    INSERT INTO public.lead_messages (lead_id, direction, body, ref_code, created_by)
    VALUES (
      NEW.id,
      'sistema',
      'Responsable: ' || coalesce(OLD.assigned_email, 'sin responsable') || ' → ' || coalesce(NEW.assigned_email, 'sin responsable'),
      NEW.source_code,
      auth.uid()
    );
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.log_lead_changes() FROM PUBLIC, anon, authenticated;

CREATE TRIGGER whatsapp_leads_log_changes
  AFTER UPDATE ON public.whatsapp_leads
  FOR EACH ROW EXECUTE FUNCTION public.log_lead_changes();

-- Historial inicial para los leads que ya existían.
INSERT INTO public.lead_messages (lead_id, occurred_at, direction, body, ref_code)
SELECT l.id, l.created_at, 'sistema',
  'Clic a WhatsApp desde ' || coalesce(l.section_label, l.section, 'sección desconocida')
    || coalesce(' · ' || l.device, '') || coalesce(' · ' || l.path, '')
    || ' [Ref: ' || l.source_code || ']',
  l.source_code
FROM public.whatsapp_leads l
WHERE NOT EXISTS (SELECT 1 FROM public.lead_messages m WHERE m.lead_id = l.id);