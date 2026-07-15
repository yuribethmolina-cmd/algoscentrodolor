-- Enable RLS on rate_limits (service-role only access via edge functions)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.rate_limits FROM anon, authenticated;

-- Revoke EXECUTE on SECURITY DEFINER functions from anon/authenticated/PUBLIC
REVOKE EXECUTE ON FUNCTION public.upsert_rate_limit(text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.get_conversion_summary(integer) FROM PUBLIC, anon, authenticated;
