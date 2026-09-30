import { beforeEach, describe, expect, it, vi } from 'vitest';

const state = vi.hoisted(() => ({
  rows: [] as unknown[],
  error: null as unknown,
  selects: [] as string[],
  orders: [] as string[],
}));

vi.mock('./supabase', () => {
  const query = {
    select: (cols: string) => {
      state.selects.push(cols);
      return query;
    },
    eq: () => query,
    order: (col: string) => {
      state.orders.push(col);
      return query;
    },
    then: (resolve: (v: unknown) => unknown) => resolve({ data: state.rows, error: state.error }),
  };
  return { supabase: { from: () => query } };
});

import { getBanners, getDepoimentos } from './cms';

beforeEach(() => {
  state.rows = [];
  state.error = null;
  state.selects = [];
  state.orders = [];
});

describe('getBanners', () => {
  it('ordena por display_order, created_at e id', async () => {
    await getBanners();
    expect(state.orders).toEqual(['display_order', 'created_at', 'id']);
    expect(state.selects[0]).toContain('tipo_destino');
  });

  it('banner html aponta para /ofertas/{id}; link mantém o destino', async () => {
    state.rows = [
      { id: 'a', image_url: 'i1', destino: null, tipo_destino: 'html' },
      { id: 'b', image_url: 'i2', destino: 'https://x.com', tipo_destino: 'link' },
    ];
    expect(await getBanners()).toEqual([
      { id: 'a', image_url: 'i1', destino: '/ofertas/a' },
      { id: 'b', image_url: 'i2', destino: 'https://x.com' },
    ]);
  });

  it('devolve [] em erro', async () => {
    state.error = { message: 'x' };
    expect(await getBanners()).toEqual([]);
  });
});

describe('getDepoimentos', () => {
  it('seleciona avatar_url/company e ordena por display_order', async () => {
    await getDepoimentos();
    expect(state.selects[0]).toContain('avatar_url');
    expect(state.selects[0]).toContain('company');
    expect(state.orders).toEqual(['display_order', 'created_at', 'id']);
  });
});
