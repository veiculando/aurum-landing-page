INSERT INTO storage.buckets (id, name, public) VALUES ('cms-assets', 'cms-assets', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-html', 'cms-html', true);

CREATE POLICY "cms-assets public read" ON storage.objects FOR SELECT TO public USING (bucket_id = 'cms-assets');
CREATE POLICY "cms-html public read" ON storage.objects FOR SELECT TO public USING (bucket_id = 'cms-html');