import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Header } from './Header';
import { APP_LINK, CONTACT_LINK } from '@/lib/site-links';

describe('Header — navegação e CTA apontam para os destinos corretos', () => {
  it('"Catálogo" leva para a âncora #cobertura, não mais #catalogo', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: 'Catálogo' })).toHaveAttribute('href', '#cobertura');
  });

  it('"Contato" abre o contact_link (wa.me) em nova aba', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: 'Contato' });
    expect(link).toHaveAttribute('href', CONTACT_LINK);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('o CTA "Anuncie" abre o app_link em nova aba', () => {
    render(<Header />);
    const link = screen.getByRole('link', { name: 'Anuncie' });
    expect(link).toHaveAttribute('href', APP_LINK);
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('não quebra o scroll-spy com um href externo (http) na lista de navegação', () => {
    render(<Header />);
    expect(() => fireEvent.scroll(window)).not.toThrow();
  });
});
