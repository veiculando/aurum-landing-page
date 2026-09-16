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

describe('Correção de Assurance: linha do tempo com cores variadas e sem distorção entre larguras', () => {
  it('os pontos não-ativos têm cores diferentes entre si (não são todos o mesmo hollow dourado)', () => {
    const { container } = render(<History />);
    const yearLabels = ['2001', '2004', '2006'];
    const colors = yearLabels.map(year => {
      const span = Array.from(container.querySelectorAll('span')).find(s => s.textContent === year);
      const dot = span?.parentElement?.querySelector('div');
      return dot ? getComputedStyle(dot).background || (dot as HTMLElement).style.background : null;
    });
    expect(new Set(colors).size).toBeGreaterThan(1);
  });

  it('a curva SVG usa as mesmas 9 posições x (0, 10, 990) dos pontos — não distorce entre larguras', () => {
    const { container } = render(<History />);
    const path = container.querySelector('svg path');
    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute('d', expect.stringContaining('M 10 50'));
    expect(path).toHaveAttribute('d', expect.stringContaining('L 990 50'));
  });
});
