import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  banner: null as { html_path: string | null } | null,
  bannerError: null as unknown,
  file: null as { text: () => Promise<string> } | null,
  fileError: null as unknown,
  eqCalls: [] as [string, unknown][],
  downloadedPath: '' as string,
}));

vi.mock('@/lib/supabase', () => {
  const query = {
    select: () => query,
    eq: (col: string, val: unknown) => {
      state.eqCalls.push([col, val]);
      return query;
    },
    maybeSingle: async () => ({ data: state.banner, error: state.bannerError }),
  };
  return {
    supabase: {
      from: () => query,
      storage: {
        from: (bucket: string) => ({
          download: async (path: string) => {
            state.downloadedPath = `${bucket}/${path}`;
            return { data: state.file, error: state.fileError };
          },
        }),
      },
    },
  };
});

import { GET, revalidate } from './route';

const ID = '3f2b1c9e-8a4d-4e6f-9b7a-1c2d3e4f5a6b';
const call = (id: string) => GET(new Request('http://x/ofertas/' + id), { params: Promise.resolve({ id }) });

beforeEach(() => {
  state.banner = { html_path: `banners/${ID}.html` };
  state.bannerError = null;
  state.file = { text: async () => '<h1>oferta</h1>' };
  state.fileError = null;
  state.eqCalls = [];
  state.downloadedPath = '';
});

describe('GET /ofertas/[id]', () => {
  it('serve o HTML com os headers da ADR-CMS-003 (sandbox sem allow-same-origin)', async () => {
    const res = await call(ID);
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('<h1>oferta</h1>');
    expect(res.headers.get('Content-Type')).toBe('text/html; charset=utf-8');
    const csp = res.headers.get('Content-Security-Policy')!;
    expect(csp).toContain('sandbox');
    expect(csp).toContain('allow-scripts');
    expect(csp).not.toContain('allow-same-origin');
    expect(res.headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(res.headers.get('Referrer-Policy')).toBe('no-referrer');
    expect(state.downloadedPath).toBe(`cms-html/banners/${ID}.html`);
  });

  it('consulta só banner ativo do tipo html', async () => {
    await call(ID);
    expect(state.eqCalls).toContainEqual(['is_active', true]);
    expect(state.eqCalls).toContainEqual(['tipo_destino', 'html']);
  });

  it('404 para id que não é uuid, sem consultar o banco', async () => {
    const res = await call('nao-e-uuid');
    expect(res.status).toBe(404);
    expect(state.eqCalls).toHaveLength(0);
  });

  it('404 quando o banner não existe, está inativo ou não é html', async () => {
    state.banner = null;
    expect((await call(ID)).status).toBe(404);
  });

  it('404 quando a consulta falha', async () => {
    state.bannerError = { message: 'boom' };
    expect((await call(ID)).status).toBe(404);
  });

  it('404 quando o objeto não existe no storage', async () => {
    state.file = null;
    state.fileError = { message: 'Object not found' };
    expect((await call(ID)).status).toBe(404);
  });

  it('usa ISR de 300 s', () => {
    expect(revalidate).toBe(300);
  });
});
