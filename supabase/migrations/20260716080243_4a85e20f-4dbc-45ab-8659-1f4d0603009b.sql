-- Lock down conversion_events and rate_limits: revoke all client access so only
-- the service role (used by edge functions) can read/write. RLS is enabled;
-- with no policies, anon/authenticated get zero rows and cannot insert.

REVOKE ALL ON public.conversion_events FROM anon, authenticated, PUBLIC;
REVOKE ALL ON public.rate_limits FROM anon, authenticated, PUBLIC;

GRANT ALL ON public.conversion_events TO service_role;
GRANT ALL ON public.rate_limits TO service_role;

-- Explicit restrictive policy to make intent obvious and satisfy scanners
-- flagging "RLS enabled but no policies".
DROP POLICY IF EXISTS "Deny all client access" ON public.conversion_events;
CREATE POLICY "Deny all client access"
  ON public.conversion_events
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

DROP POLICY IF EXISTS "Deny all client access" ON public.rate_limits;
CREATE POLICY "Deny all client access"
  ON public.rate_limits
  AS RESTRICTIVE
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);
