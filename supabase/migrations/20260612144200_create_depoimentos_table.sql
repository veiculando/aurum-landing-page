CREATE TABLE public.depoimentos (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  author text NOT NULL,
  role text,
  content text NOT NULL,
  is_active boolean DEFAULT true NOT NULL
);