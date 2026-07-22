
CREATE OR REPLACE FUNCTION public.get_chat_funnel(days_back integer DEFAULT 7)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  since timestamptz := now() - (days_back || ' days')::interval;
  v_submits int;
  v_appointments int;
  v_retries int;
  v_fallback int;
  v_fail_validation int;
  v_fail_whatsapp_blocked int;
  v_fail_whatsapp_exception int;
  v_fail_network int;
  v_fail_api int;
  v_fail_storage int;
  v_abandons int;
  v_rate numeric;
  daily_json jsonb;
  reasons_json jsonb;
BEGIN
  SELECT count(*) INTO v_submits
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
      AND event_type = 'whatsapp_click' AND label = 'chat_miniform';

  SELECT count(*) INTO v_appointments
    FROM public.conversion_events
    WHERE created_at >= since AND event_type = 'appointment_submit'
      AND source = 'chat_asistente';

  SELECT count(*) INTO v_retries
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
      AND event_type = 'cta_click' AND label IN ('chat_miniform_retry','chat_retry_last_message');

  SELECT count(*) INTO v_fallback
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
      AND event_type = 'cta_click' AND label = 'chat_miniform_fallback_link';

  SELECT count(*) INTO v_fail_validation
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
      AND event_type = 'cta_click' AND label LIKE 'chat_fail:validation:%';

  SELECT count(*) INTO v_fail_whatsapp_blocked
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
      AND event_type = 'cta_click' AND label = 'chat_fail:whatsapp:popup_blocked';

  SELECT count(*) INTO v_fail_whatsapp_exception
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
      AND event_type = 'cta_click' AND label LIKE 'chat_fail:whatsapp:exception_%';

  SELECT count(*) INTO v_fail_network
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
      AND event_type = 'cta_click' AND label LIKE 'chat_fail:network:%';

  SELECT count(*) INTO v_fail_api
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
      AND event_type = 'cta_click' AND label LIKE 'chat_fail:api:%';

  SELECT count(*) INTO v_fail_storage
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
      AND event_type = 'cta_click' AND label LIKE 'chat_fail:storage:%';

  v_abandons := v_fail_validation + v_fail_whatsapp_blocked + v_fail_whatsapp_exception + v_fail_network + v_fail_api + v_fail_storage;

  IF (v_submits + v_abandons) > 0 THEN
    v_rate := round((v_submits::numeric / (v_submits + v_abandons)::numeric) * 100, 1);
  ELSE
    v_rate := NULL;
  END IF;

  SELECT coalesce(jsonb_agg(row_to_json(x) ORDER BY x.day), '[]'::jsonb) INTO daily_json
  FROM (
    SELECT
      date_trunc('day', created_at)::date AS day,
      count(*) FILTER (WHERE event_type = 'whatsapp_click' AND label = 'chat_miniform')::int AS submits,
      count(*) FILTER (WHERE event_type = 'cta_click' AND label LIKE 'chat_fail:%')::int AS abandons
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
    GROUP BY 1
  ) x;

  SELECT coalesce(jsonb_agg(row_to_json(r) ORDER BY r.count DESC), '[]'::jsonb) INTO reasons_json
  FROM (
    SELECT label AS reason, count(*)::int AS count
    FROM public.conversion_events
    WHERE created_at >= since AND section = 'chat_asistente'
      AND event_type = 'cta_click' AND label LIKE 'chat_fail:%'
    GROUP BY label
    ORDER BY count DESC
    LIMIT 20
  ) r;

  RETURN jsonb_build_object(
    'range_days', days_back,
    'since', since,
    'submits', v_submits,
    'appointments_logged', v_appointments,
    'retries', v_retries,
    'fallback_link_clicks', v_fallback,
    'abandons_total', v_abandons,
    'conversion_rate_pct', v_rate,
    'by_category', jsonb_build_object(
      'validation', v_fail_validation,
      'whatsapp_blocked', v_fail_whatsapp_blocked,
      'whatsapp_exception', v_fail_whatsapp_exception,
      'network', v_fail_network,
      'api', v_fail_api,
      'storage', v_fail_storage
    ),
    'top_reasons', reasons_json,
    'daily', daily_json
  );
END;
$$;
