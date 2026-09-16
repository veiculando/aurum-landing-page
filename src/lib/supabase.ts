import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// null quando as env vars não estão setadas (ex.: ambiente de teste) — os
// fetchers em cms.ts tratam isso como "sem banco disponível" e caem no
// conteúdo padrão, em vez de derrubar a página.
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
