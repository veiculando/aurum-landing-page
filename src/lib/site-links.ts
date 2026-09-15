// Destinos externos (WhatsApp comercial e o App WL). O pedido é que estes
// valores venham do banco (Supabase) — não implementado ainda porque a
// conexão MCP do Supabase não está autorizada nesta sessão. Centralizados
// aqui como o único ponto a trocar por uma leitura de banco (ex.: tabela de
// configuração/settings) quando a conexão estiver disponível.
export const CONTACT_LINK = 'https://wa.me/5511944774353';
export const APP_LINK = 'https://app.aurumooh.com.br';

// Links externos nunca devem substituir a landing page — sempre nova aba.
export const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
