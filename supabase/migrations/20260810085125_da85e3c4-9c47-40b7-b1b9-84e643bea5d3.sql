ALTER TABLE public.whatsapp_leads
  ADD COLUMN IF NOT EXISTS assigned_to uuid,
  ADD COLUMN IF NOT EXISTS assigned_email text,
  ADD COLUMN IF NOT EXISTS assigned_at timestamptz;

CREATE INDEX IF NOT EXISTS whatsapp_leads_assigned_to_idx ON public.whatsapp_leads (assigned_to);
CREATE INDEX IF NOT EXISTS whatsapp_leads_status_created_idx ON public.whatsapp_leads (status, created_at DESC);

CREATE OR REPLACE FUNCTION public.assign_lead_round_robin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user uuid;
  v_email text;
BEGIN
  IF NEW.assigned_to IS NOT NULL THEN
    RETURN NEW;
  END IF;

  SELECT ur.user_id INTO v_user
  FROM public.user_roles ur
  WHERE ur.role = 'admin'
  ORDER BY (
    SELECT count(*) FROM public.whatsapp_leads l
    WHERE l.assigned_to = ur.user_id AND l.status = 'nuevo'
  ) ASC, ur.created_at ASC
  LIMIT 1;

  IF v_user IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT u.email INTO v_email FROM auth.users u WHERE u.id = v_user;

  NEW.assigned_to := v_user;
  NEW.assigned_email := v_email;
  NEW.assigned_at := now();
  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.assign_lead_round_robin() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS whatsapp_leads_assign ON public.whatsapp_leads;
CREATE TRIGGER whatsapp_leads_assign
  BEFORE INSERT ON public.whatsapp_leads
  FOR EACH ROW EXECUTE FUNCTION public.assign_lead_round_robin();

CREATE OR REPLACE FUNCTION public.list_lead_assignees()
RETURNS TABLE(user_id uuid, email text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT ur.user_id, u.email::text
  FROM public.user_roles ur
  JOIN auth.users u ON u.id = ur.user_id
  WHERE ur.role = 'admin'
    AND EXISTS (
      SELECT 1 FROM public.user_roles me
      WHERE me.user_id = auth.uid() AND me.role = 'admin'
    )
  ORDER BY u.email;
$$;

REVOKE ALL ON FUNCTION public.list_lead_assignees() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.list_lead_assignees() TO authenticated;