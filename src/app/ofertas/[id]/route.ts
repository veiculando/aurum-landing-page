import { supabase } from '@/lib/supabase';

// ISR por caminho. NÃO ler request.headers, cookies() nem searchParams aqui:
// a rota viraria dinâmica e o revalidate seria ignorado. Um 404 pode ficar
// em cache por até 300 s (aceito).
export const revalidate = 300;

// Sem pré-render no build: os ids nascem no CMS. O array vazio faz o Next
// tratar o segmento como ISR (gera no 1º acesso e cacheia) em vez de dinâmico.
export function generateStaticParams() {
  return [];
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const notFound = () => new Response('Not found', { status: 404 });

// Hotsite HTML de banner (ADR-CMS-003). O HTML é conteúdo de terceiros: vai
// numa origem opaca via CSP sandbox, SEM allow-same-origin.
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID_RE.test(id) || !supabase) return notFound();

  const { data: banner, error } = await supabase
    .from('banners')
    .select('html_path')
    .eq('id', id)
    .eq('is_active', true)
    .eq('tipo_destino', 'html')
    .maybeSingle();
  if (error || !banner?.html_path) return notFound();

  const { data: file, error: downloadError } = await supabase.storage
    .from('cms-html')
    .download(banner.html_path);
  if (downloadError || !file) return notFound();

  return new Response(await file.text(), {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Security-Policy':
        'sandbox allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'no-referrer',
    },
  });
}
