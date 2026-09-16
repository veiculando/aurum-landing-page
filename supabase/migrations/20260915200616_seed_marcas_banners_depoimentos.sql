-- Seed inicial das 3 tabelas de CMS que o frontend ainda tinha hardcoded.
-- image_url são placeholders (placehold.co) — o cliente vai passar as
-- logos/fotos reais depois, é só fazer UPDATE nas linhas.

INSERT INTO public.marcas (name, image_url, display_order) VALUES
  ('Bradesco',         'https://placehold.co/160x60/cc0000/ffffff?text=Bradesco',         0),
  ('Unimed',           'https://placehold.co/160x60/00843d/ffffff?text=Unimed',           1),
  ('Havan',            'https://placehold.co/160x60/005ca9/ffffff?text=Havan',            2),
  ('Shibata',          'https://placehold.co/160x60/e60026/ffffff?text=Shibata',          3),
  ('Vanguarda',        'https://placehold.co/160x60/1a1a6e/ffffff?text=Vanguarda',        4),
  ('Colinas Shopping', 'https://placehold.co/160x60/8b6914/ffffff?text=Colinas',          5),
  ('Magazine Luiza',   'https://placehold.co/160x60/0086ff/ffffff?text=Magalu',           6),
  ('Centervale',       'https://placehold.co/160x60/c8102e/ffffff?text=Centervale',       7),
  ('Drogaria Total',   'https://placehold.co/160x60/009036/ffffff?text=Drogaria+Total',   8),
  ('Univap',           'https://placehold.co/160x60/003087/ffffff?text=Univap',           9);

INSERT INTO public.banners (image_url, destino) VALUES
  ('https://images.unsplash.com/photo-1762421028555-f18bf9596a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', '#contato'),
  ('https://images.unsplash.com/photo-1781740146105-e2bd98e9ea6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', '#contato'),
  ('https://images.unsplash.com/photo-1771775751001-eab9483febe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200', '#contato');

-- Conteúdo neutro/genérico de propósito: os depoimentos anteriores (código
-- hardcoded, nunca vieram deste banco) atribuíam citações fabricadas a
-- empresas reais e clientes da Aurum (Rede Shibata, Centervale Shopping,
-- Drogaria Total) sem que o time tivesse coletado esses depoimentos de
-- fato — risco de reputação já reportado e não seedado aqui de propósito.
-- Estes 3 são só placeholder de layout até depoimentos reais chegarem.
INSERT INTO public.depoimentos (author, role, content) VALUES
  ('Cliente satisfeito', 'Parceiro comercial', 'Aguardando depoimento real do cliente — conteúdo de exemplo para preencher o layout.'),
  ('Cliente satisfeito', 'Parceiro comercial', 'Aguardando depoimento real do cliente — conteúdo de exemplo para preencher o layout.'),
  ('Cliente satisfeito', 'Parceiro comercial', 'Aguardando depoimento real do cliente — conteúdo de exemplo para preencher o layout.');
