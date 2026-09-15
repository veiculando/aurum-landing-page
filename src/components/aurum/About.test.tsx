import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { About } from './About';

describe('About exibe o texto atualizado de Sobre', () => {
  it('o parágrafo intro inclui o trecho sobre Grande São Paulo, Vale do Paraíba e Litoral Norte', () => {
    const { container } = render(<About />);
    const intro = Array.from(container.querySelectorAll('p')).map(p => p.textContent).join(' ');
    expect(intro).toMatch(/Grande São Paulo/i);
    expect(intro).toMatch(/Vale do Paraíba/i);
    expect(intro).toMatch(/Litoral Norte/i);
  });

  it('o Card 2 de estatística exibe "5K+" no lugar de "500+"', () => {
    render(<About />);
    expect(screen.getByText('5K+')).toBeInTheDocument();
    expect(screen.queryByText('500+')).not.toBeInTheDocument();
  });
});
