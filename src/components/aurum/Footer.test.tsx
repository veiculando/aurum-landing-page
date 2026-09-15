import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer exibe os dados de contato atualizados', () => {
  it('telefone, e-mail e endereço batem com o doc do cliente', () => {
    render(<Footer />);
    expect(screen.getByText('(11) 94477-4353')).toBeInTheDocument();
    expect(screen.getByText('comercial@aurumooh.com.br')).toBeInTheDocument();
    expect(screen.getByText('Rua Francelino Rodrigues, 178 - Vl São Sebastião - Mogi das Cruzes')).toBeInTheDocument();
  });
});

describe('Footer inclui o link Alugue seu imóvel', () => {
  it('aponta para https://aurumooh.com.br/locacoes.php mesmo sem o texto descritivo', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /alugue seu imóvel/i });
    expect(link).toHaveAttribute('href', 'https://aurumooh.com.br/locacoes.php');
  });
});

describe('Footer linka para o Catálogo do App WL', () => {
  it('"Catálogo" aponta para https://app.aurumooh.com.br/mapa', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /catálogo/i });
    expect(link).toHaveAttribute('href', 'https://app.aurumooh.com.br/mapa');
  });
});

describe('Footer não expõe links para páginas ou rotas inexistentes', () => {
  it('não linka Preços, Cases, Blog, Ajuda, Minha Conta, Termos, Privacidade ou Minhas Campanhas', () => {
    render(<Footer />);
    for (const label of ['Preços', 'Cases', 'Blog', 'Ajuda', 'Minha Conta', 'Minhas Campanhas']) {
      expect(screen.queryByText(new RegExp(`^${label}$`, 'i'))).not.toBeInTheDocument();
    }
  });
});
