import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';
import { APP_LINK, CONTACT_LINK } from '@/lib/site-links';

describe('Footer exibe os dados de contato atualizados', () => {
  it('telefone, e-mail e endereço batem com o doc do cliente', () => {
    render(<Footer />);
    expect(screen.getByText('(11) 94477-4353')).toBeInTheDocument();
    expect(screen.getByText('comercial@aurumooh.com.br')).toBeInTheDocument();
    expect(screen.getByText('Rua Francelino Rodrigues, 178 - Vl São Sebastião - Mogi das Cruzes')).toBeInTheDocument();
  });
});

describe('Footer não tem mais o link Alugue seu imóvel', () => {
  it('não existe (correção do cliente na revisão de Assurance)', () => {
    render(<Footer />);
    expect(screen.queryByText(/alugue seu imóvel/i)).not.toBeInTheDocument();
  });
});

describe('Footer linka Catálogo para o app_link e Contato para o contact_link, em nova aba', () => {
  it('"Catálogo" aponta para o APP_LINK', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /^catálogo$/i });
    expect(link).toHaveAttribute('href', APP_LINK);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('"Contato" aponta para o CONTACT_LINK', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /^contato$/i });
    expect(link).toHaveAttribute('href', CONTACT_LINK);
    expect(link).toHaveAttribute('target', '_blank');
  });
});

describe('Footer ordena as colunas: Empresa primeiro, Região segundo, Formatos terceiro', () => {
  it('os títulos das colunas aparecem nessa ordem no DOM', () => {
    const { container } = render(<Footer />);
    const titles = Array.from(container.querySelectorAll('h5')).map(h => h.textContent);
    expect(titles).toEqual(['Empresa', 'Região', 'Formatos']);
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
