import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Hero } from './Hero';

describe('Hero exibe o conteúdo revisado dentro dos limites de caracteres', () => {
  it('exibe a tag "Mídia exterior e DOOH desde 1995" com no máximo 40 caracteres', () => {
    render(<Hero />);
    const tag = screen.getByText(/mídia exterior e dooh desde 1995/i);
    expect(tag).toBeInTheDocument();
    expect(tag.textContent!.length).toBeLessThanOrEqual(40);
  });

  it('exibe a legenda da Estatística 2 mencionando cidades na Grande SP, Interior e Litoral', () => {
    render(<Hero />);
    expect(screen.getByText(/na Grande SP, Interior e Litoral/i)).toBeInTheDocument();
  });

  it('mantém os botões "Anuncie agora" e "Ver formatos" presentes e navegáveis', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /anuncie agora/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver formatos/i })).toBeInTheDocument();
  });
});

describe('CTAs do Hero apontam para os destinos corretos', () => {
  it('"Anuncie agora" direciona para app.aurumooh.com.br', () => {
    render(<Hero />);
    const cta = screen.getByRole('link', { name: /anuncie agora/i });
    expect(cta).toHaveAttribute('href', 'https://app.aurumooh.com.br');
  });
});
