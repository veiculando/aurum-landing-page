// Destinos externos (WhatsApp comercial e o App WL). A fonte real agora é a
// tabela `site_settings` no Supabase (ver src/lib/cms.ts#getSiteLinks) —
// estas constantes são só o fallback usado quando o banco está indisponível
// (env vars ausentes, projeto pausado, erro de rede) e o valor inicial dos
// componentes antes do server fetch, para que testes possam renderizar cada
// componente isoladamente sem precisar mockar o Supabase.
export const DEFAULT_CONTACT_LINK = 'https://wa.me/5511944774353';
export const DEFAULT_APP_LINK = 'https://app.aurumooh.com.br';

// Links externos nunca devem substituir a landing page — sempre nova aba.
export const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
