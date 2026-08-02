CREATE TABLE public.notification_settings (
  id integer PRIMARY KEY DEFAULT 1,
  email_enabled boolean NOT NULL DEFAULT true,
  email_recipients text[] NOT NULL DEFAULT ARRAY['info@algoscentrodolor.com','recepcionalgos@algoscentrodolor.com'],
  telegram_enabled boolean NOT NULL DEFAULT false,
  telegram_bot_token text,
  telegram_chat_id text,
  twilio_enabled boolean NOT NULL DEFAULT false,
  twilio_account_sid text,
  twilio_auth_token text,
  twilio_from text,
  twilio_to text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid,
  CONSTRAINT notification_settings_singleton CHECK (id = 1)
);

GRANT ALL ON public.notification_settings TO service_role;

ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny all client access" ON public.notification_settings
  AS RESTRICTIVE FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

INSERT INTO public.notification_settings (id) VALUES (1) ON CONFLICT DO NOTHING;