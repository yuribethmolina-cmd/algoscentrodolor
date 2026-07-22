
REVOKE EXECUTE ON FUNCTION public.get_chat_funnel(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_chat_funnel(integer) TO service_role;

REVOKE EXECUTE ON FUNCTION public.get_conversion_summary(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_conversion_summary(integer) TO service_role;
