import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { BillboardCarousel } from './BillboardCarousel';
import type { Banner } from '@/lib/cms';

const FIXTURE: Banner[] = [
  { id: '1', image_url: 'https://example.com/banner1.jpg', destino: 'https://aurumooh.com.br/oferta1' },
  { id: '2', image_url: 'https://example.com/banner2.jpg', destino: null },
];

describe('BillboardCarousel exibe banners reais (imagem + destino), schema de `banners`', () => {
  it('renderiza o link do primeiro slide apontando para o destino cadastrado', () => {
    render(<BillboardCarousel slides={FIXTURE} />);
    expect(screen.getByLabelText('Ver oferta')).toHaveAttribute('href', 'https://aurumooh.com.br/oferta1');
  });

  it('mostra navegação (dots/setas) quando há mais de um slide', () => {
    render(<BillboardCarousel slides={FIXTURE} />);
    expect(screen.getByLabelText('Próximo')).toBeInTheDocument();
  });

  it('avança de slide ao clicar em "Próximo"', async () => {
    const user = userEvent.setup();
    render(<BillboardCarousel slides={FIXTURE} />);
    await user.click(screen.getByLabelText('Próximo'));
    expect(screen.getByLabelText('Ver oferta')).not.toHaveAttribute('href', 'https://aurumooh.com.br/oferta1');
  });

  it('não renderiza nada (nem quebra) quando não há banners ativos', () => {
    const { container } = render(<BillboardCarousel slides={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('não mostra navegação com um único slide', () => {
    render(<BillboardCarousel slides={[FIXTURE[0]]} />);
    expect(screen.queryByLabelText('Próximo')).not.toBeInTheDocument();
  });
});
