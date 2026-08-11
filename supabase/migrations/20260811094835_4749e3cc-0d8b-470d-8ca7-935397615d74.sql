-- appointment_notification_log: writes only via service role (bypasses RLS)
REVOKE INSERT, UPDATE, DELETE ON public.appointment_notification_log FROM anon, authenticated;
GRANT SELECT ON public.appointment_notification_log TO authenticated;
GRANT ALL ON public.appointment_notification_log TO service_role;

DROP POLICY IF EXISTS "No client writes to notification log" ON public.appointment_notification_log;
CREATE POLICY "No client writes to notification log"
ON public.appointment_notification_log
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (true)
WITH CHECK (false);

-- whatsapp_leads: inserts only via service role edge function; no client reads except admins
REVOKE INSERT, DELETE ON public.whatsapp_leads FROM anon, authenticated;
REVOKE ALL ON public.whatsapp_leads FROM anon;
GRANT SELECT, UPDATE ON public.whatsapp_leads TO authenticated;
GRANT ALL ON public.whatsapp_leads TO service_role;

DROP POLICY IF EXISTS "No client inserts or deletes on whatsapp leads" ON public.whatsapp_leads;
CREATE POLICY "No client inserts or deletes on whatsapp leads"
ON public.whatsapp_leads
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.user_roles ur
    WHERE ur.user_id = auth.uid() AND ur.role = 'admin'
  )
);