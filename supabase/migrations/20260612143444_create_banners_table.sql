CREATE TABLE public.banners (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  image_url text NOT NULL,
  destino text,
  is_active boolean DEFAULT true NOT NULL
);