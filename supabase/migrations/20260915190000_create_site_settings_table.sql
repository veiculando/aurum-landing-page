CREATE TABLE public.site_settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  key text UNIQUE NOT NULL,
  value text NOT NULL
);

-- Seed: mesmos valores genéricos hoje hardcoded em src/lib/site-links.ts
-- (CONTACT_LINK/APP_LINK). Trocar o value aqui edita o link em produção
-- sem precisar de deploy, uma vez que o app estiver lendo desta tabela.
INSERT INTO public.site_settings (key, value) VALUES
  ('contact_link', 'https://wa.me/5511944774353'),
  ('app_link', 'https://app.aurumooh.com.br');

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read-only access to site_settings" ON public.site_settings FOR SELECT TO anon USING (true);
CREATE POLICY "Allow service_role full access to site_settings" ON public.site_settings TO service_role USING (true) WITH CHECK (true);
