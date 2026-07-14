-- ── 1. Admin roles ──────────────────────────────────────────────────────────
CREATE TABLE public.user_roles (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role    text NOT NULL CHECK (role IN ('admin')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own role"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL   ON public.user_roles TO service_role;


-- ── 2. Rate limits (1-minute windows, service_role only) ─────────────────────
CREATE TABLE public.rate_limits (
  ip_hash    text NOT NULL,
  window_key text NOT NULL,
  count      int  NOT NULL DEFAULT 1,
  PRIMARY KEY (ip_hash, window_key)
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
-- No direct client access — edge functions use service_role
GRANT ALL ON public.rate_limits TO service_role;

-- Atomic upsert: insert or increment, return new count
CREATE OR REPLACE FUNCTION public.upsert_rate_limit(p_ip_hash text, p_window_key text)
RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  v_count int;
BEGIN
  INSERT INTO public.rate_limits (ip_hash, window_key, count)
  VALUES (p_ip_hash, p_window_key, 1)
  ON CONFLICT (ip_hash, window_key)
  DO UPDATE SET count = rate_limits.count + 1
  RETURNING count INTO v_count;
  RETURN v_count;
END;
$$;
GRANT EXECUTE ON FUNCTION public.upsert_rate_limit(text, text) TO service_role;


-- Auto-purge windows older than 10 minutes
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  DELETE FROM public.rate_limits
  WHERE window_key < to_char(now() - interval '10 minutes', 'YYYYMMDDHH24MI');
END;
$$;
GRANT EXECUTE ON FUNCTION public.cleanup_rate_limits() TO service_role;


-- ── 3. Admin audit log ────────────────────────────────────────────────────────
CREATE TABLE public.admin_audit_log (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email text,
  action     text NOT NULL,
  metadata   jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX admin_audit_log_created_at_idx ON public.admin_audit_log(created_at DESC);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read audit log"
  ON public.admin_audit_log FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

GRANT SELECT ON public.admin_audit_log TO authenticated;
GRANT ALL   ON public.admin_audit_log TO service_role;
