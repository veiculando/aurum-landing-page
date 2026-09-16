import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { History } from './History';

describe('Nossa História é exibida como carrossel navegável', () => {
  it('avança para o próximo marco ao clicar em "Próximo"', async () => {
    const user = userEvent.setup();
    render(<History />);
    expect(screen.getByText('1 / 9')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /próximo/i }));
    expect(screen.getByText('2 / 9')).toBeInTheDocument();
  });

  it('não quebra ao clicar em "Anterior" no primeiro marco (fica no primeiro ou desabilita o botão)', async () => {
    const user = userEvent.setup();
    render(<History />);
    const prevButton = screen.getByRole('button', { name: /anterior/i });
    expect(prevButton).toBeDisabled();
    await user.click(prevButton);
    expect(screen.getByText('1 / 9')).toBeInTheDocument();
  });

  it('mantém os 9 marcos atuais como placeholder', () => {
    render(<History />);
    expect(screen.getByText(/1 \/ 9/)).toBeInTheDocument();
  });
});

describe('Timeline: 3 estados fixos de bolinha, todas centralizadas', () => {
  const getDot = (container: HTMLElement, year: string) => {
    const span = Array.from(container.querySelectorAll('span')).find(s => s.textContent === year);
    return span?.parentElement?.querySelector('div') as HTMLElement | undefined;
  };

  it('a bolinha selecionada (1995, marco inicial) é vermelha sólida', () => {
    const { container } = render(<History />);
    const dot = getDot(container, '1995');
    expect(dot?.className).toContain('bg-wine');
  });

  it('a última bolinha (2025) é dourada quando não selecionada', () => {
    const { container } = render(<History />);
    const dot = getDot(container, '2025');
    expect(dot?.className).toContain('border-gold');
  });

  it('bolinhas do meio (nem ativa, nem última) são brancas/cinzas', () => {
    const { container } = render(<History />);
    const dot = getDot(container, '2010');
    expect(dot?.className).not.toContain('bg-wine');
    expect(dot?.className).not.toContain('border-gold');
  });

  it('nenhuma bolinha tem deslocamento vertical (translateY) — todas centralizadas', () => {
    const { container } = render(<History />);
    const dot = getDot(container, '2010');
    const wrapper = dot?.parentElement as HTMLElement;
    expect(wrapper.getAttribute('style') || '').not.toContain('translateY');
  });

  it('a curva SVG (decorativa) usa as mesmas 9 posições x (10 a 990) — não distorce entre larguras', () => {
    const { container } = render(<History />);
    const path = container.querySelector('svg path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('d', expect.stringContaining('M 10 50'));
    expect(path).toHaveAttribute('d', expect.stringContaining('L 990 50'));
  });
});
