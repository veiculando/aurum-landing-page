ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marcas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.depoimentos ENABLE ROW LEVEL SECURITY;

-- Banners policies
CREATE POLICY "Allow public read-only access for active banners" ON public.banners FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Allow service_role full access to banners" ON public.banners TO service_role USING (true) WITH CHECK (true);

-- Marcas policies
CREATE POLICY "Allow public read-only access for active marcas" ON public.marcas FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Allow service_role full access to marcas" ON public.marcas TO service_role USING (true) WITH CHECK (true);

-- Depoimentos policies
CREATE POLICY "Allow public read-only access for active depoimentos" ON public.depoimentos FOR SELECT TO anon USING (is_active = true);
CREATE POLICY "Allow service_role full access to depoimentos" ON public.depoimentos TO service_role USING (true) WITH CHECK (true);
