
-- Conversion events table (no PII)
CREATE TABLE public.conversion_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  section text,
  device text,
  condition text,
  has_studies text,
  source text,
  label text,
  path text,
  referrer text,
  created_at timestamptz not null default now()
);

CREATE INDEX conversion_events_created_at_idx ON public.conversion_events(created_at DESC);
CREATE INDEX conversion_events_event_type_idx ON public.conversion_events(event_type);

GRANT INSERT ON public.conversion_events TO anon, authenticated;
GRANT ALL ON public.conversion_events TO service_role;

ALTER TABLE public.conversion_events ENABLE ROW LEVEL SECURITY;

-- Anyone can INSERT (called from public edge function), but never SELECT rows directly.
CREATE POLICY "Anyone can insert conversion events"
  ON public.conversion_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Aggregated summary function (SECURITY DEFINER exposes only counts, no PII).
CREATE OR REPLACE FUNCTION public.get_conversion_summary(days_back int DEFAULT 7)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  since timestamptz := now() - (days_back || ' days')::interval;
  result jsonb;
BEGIN
  SELECT jsonb_build_object(
    'range_days', days_back,
    'since', since,
    'totals', (
      SELECT jsonb_object_agg(event_type, cnt)
      FROM (
        SELECT event_type, count(*)::int AS cnt
        FROM public.conversion_events
        WHERE created_at >= since
        GROUP BY event_type
      ) t
    ),
    'by_section', (
      SELECT coalesce(jsonb_agg(row_to_json(s) ORDER BY s.total DESC), '[]'::jsonb)
      FROM (
        SELECT
          coalesce(section, 'unknown') AS section,
          count(*) FILTER (WHERE event_type = 'whatsapp_click')::int AS whatsapp_clicks,
          count(*) FILTER (WHERE event_type = 'appointment_submit')::int AS appointments,
          count(*)::int AS total
        FROM public.conversion_events
        WHERE created_at >= since
        GROUP BY coalesce(section, 'unknown')
      ) s
    ),
    'by_device', (
      SELECT coalesce(jsonb_agg(row_to_json(d) ORDER BY d.device), '[]'::jsonb)
      FROM (
        SELECT
          coalesce(device, 'unknown') AS device,
          count(*) FILTER (WHERE event_type = 'whatsapp_click')::int AS whatsapp_clicks,
          count(*) FILTER (WHERE event_type = 'appointment_submit')::int AS appointments
        FROM public.conversion_events
        WHERE created_at >= since
        GROUP BY coalesce(device, 'unknown')
      ) d
    ),
    'daily', (
      SELECT coalesce(jsonb_agg(row_to_json(x) ORDER BY x.day), '[]'::jsonb)
      FROM (
        SELECT
          date_trunc('day', created_at)::date AS day,
          count(*) FILTER (WHERE event_type = 'whatsapp_click')::int AS whatsapp_clicks,
          count(*) FILTER (WHERE event_type = 'appointment_submit')::int AS appointments
        FROM public.conversion_events
        WHERE created_at >= since
        GROUP BY 1
      ) x
    ),
    'top_conditions', (
      SELECT coalesce(jsonb_agg(row_to_json(c) ORDER BY c.count DESC), '[]'::jsonb)
      FROM (
        SELECT coalesce(condition, 'unspecified') AS condition, count(*)::int AS count
        FROM public.conversion_events
        WHERE created_at >= since AND event_type = 'appointment_submit'
        GROUP BY 1
        LIMIT 15
      ) c
    )
  ) INTO result;

  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_conversion_summary(int) TO anon, authenticated;
