CREATE TABLE public.marcas (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  image_url text NOT NULL,
  name text,
  display_order integer DEFAULT 0 NOT NULL,
  is_active boolean DEFAULT true NOT NULL
);
