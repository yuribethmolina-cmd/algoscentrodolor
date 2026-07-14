
-- Remove permissive INSERT policy and public INSERT grants; inserts now go
-- exclusively through the track-conversion edge function (service_role).
DROP POLICY IF EXISTS "Anyone can insert conversion events" ON public.conversion_events;
REVOKE INSERT ON public.conversion_events FROM anon, authenticated;

-- Remove public EXECUTE on the SECURITY DEFINER summary function; the
-- get-conversions-summary edge function calls it via service_role.
REVOKE EXECUTE ON FUNCTION public.get_conversion_summary(int) FROM anon, authenticated, PUBLIC;
