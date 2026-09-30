import { supabase } from './supabase';
import { DEFAULT_CONTACT_LINK, DEFAULT_APP_LINK } from './site-links';

export type SiteLinks = { contactLink: string; appLink: string };
export type Marca = { id: string; name: string; image_url: string; display_order: number };
export type Banner = { id: string; image_url: string; destino: string | null };
export type Depoimento = {
  id: string;
  author: string;
  role: string | null;
  content: string;
  avatar_url?: string | null;
  company?: string | null;
  display_order?: number;
};

const FALLBACK_SITE_LINKS: SiteLinks = { contactLink: DEFAULT_CONTACT_LINK, appLink: DEFAULT_APP_LINK };

// Usados só se o Supabase estiver indisponível (ex.: projeto pausado) — o
// banco (tabela site_settings/marcas/banners/depoimentos) é a fonte real.
export async function getSiteLinks(): Promise<SiteLinks> {
  if (!supabase) return FALLBACK_SITE_LINKS;
  try {
    const { data, error } = await supabase.from('site_settings').select('key, value');
    if (error || !data?.length) return FALLBACK_SITE_LINKS;
    const map = Object.fromEntries(data.map(r => [r.key, r.value]));
    return {
      contactLink: map.contact_link ?? FALLBACK_SITE_LINKS.contactLink,
      appLink: map.app_link ?? FALLBACK_SITE_LINKS.appLink,
    };
  } catch {
    return FALLBACK_SITE_LINKS;
  }
}

export async function getMarcas(): Promise<Marca[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('marcas')
      .select('id, name, image_url, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function getBanners(): Promise<Banner[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('banners')
      .select('id, title, image_url, destino, tipo_destino, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true })
      .order('id', { ascending: true });
    if (error) return [];
    // Banner de hotsite HTML (ADR-CMS-003) abre a rota /ofertas/{id} da LP.
    return (data ?? []).map(({ id, image_url, destino, tipo_destino }) => ({
      id,
      image_url,
      destino: tipo_destino === 'html' ? `/ofertas/${id}` : destino,
    }));
  } catch {
    return [];
  }
}

export async function getDepoimentos(): Promise<Depoimento[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('depoimentos')
      .select('id, author, role, content, avatar_url, company, display_order')
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true })
      .order('id', { ascending: true });
    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}
