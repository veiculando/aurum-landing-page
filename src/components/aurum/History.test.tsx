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
