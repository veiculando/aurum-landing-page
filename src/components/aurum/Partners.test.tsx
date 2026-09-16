import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PartnersView } from './Partners';
import type { Marca } from '@/lib/cms';

const FIXTURE: Marca[] = [
  { id: '1', name: 'Bradesco', image_url: 'https://example.com/bradesco.png', display_order: 0 },
  { id: '2', name: 'Unimed', image_url: 'https://example.com/unimed.png', display_order: 1 },
];

describe('Partners (view) exibe as marcas vindas do banco como imagens reais', () => {
  it('mostra o parágrafo de apoio', () => {
    render(<PartnersView marcas={FIXTURE} />);
    expect(screen.getByText(/Mais de 5 mil campanhas de sucesso/i)).toBeInTheDocument();
  });

  it('renderiza um <img> com o image_url e o nome de cada marca (não mais sigla/cor)', () => {
    render(<PartnersView marcas={FIXTURE} />);
    const images = screen.getAllByRole('img', { name: 'Bradesco' });
    expect(images.length).toBeGreaterThan(0);
    expect(images[0]).toHaveAttribute('src', 'https://example.com/bradesco.png');
    expect(screen.getAllByText('Unimed').length).toBeGreaterThan(0);
  });

  it('não quebra quando a lista de marcas vem vazia (banco indisponível/sem linhas ativas)', () => {
    render(<PartnersView marcas={[]} />);
    expect(screen.getByText(/Mais de 5 mil campanhas de sucesso/i)).toBeInTheDocument();
  });
});
