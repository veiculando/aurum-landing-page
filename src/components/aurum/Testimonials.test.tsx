import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TestimonialsView } from './Testimonials';
import type { Depoimento } from '@/lib/cms';

const FIXTURE: Depoimento[] = [
  { id: '1', author: 'Cliente A', role: 'Sócio-proprietário', content: 'Ótimo atendimento.' },
  { id: '2', author: 'Cliente B', role: null, content: 'Recomendo.' },
];

describe('Testimonials (view) exibe author/role/content — schema real de `depoimentos`', () => {
  it('renderiza autor e conteúdo de cada depoimento', () => {
    render(<TestimonialsView depoimentos={FIXTURE} />);
    expect(screen.getByText('Cliente A')).toBeInTheDocument();
    expect(screen.getByText(/Ótimo atendimento/i)).toBeInTheDocument();
  });

  it('não quebra quando role é null (não há coluna company/photo no schema)', () => {
    render(<TestimonialsView depoimentos={FIXTURE} />);
    expect(screen.getByText('Cliente B')).toBeInTheDocument();
  });

  it('sem avatar_url não renderiza <img> e mostra as iniciais', () => {
    const { container } = render(<TestimonialsView depoimentos={FIXTURE} />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('avatar-iniciais')[0]).toHaveTextContent('CA');
  });

  it('com avatar_url renderiza a foto', () => {
    render(<TestimonialsView depoimentos={[{ ...FIXTURE[0], avatar_url: 'https://example.com/a.jpg' }]} />);
    expect(screen.getByRole('img', { name: 'Cliente A' })).toHaveAttribute('src', 'https://example.com/a.jpg');
  });

  it('mostra "Cargo · Empresa" quando há company', () => {
    render(<TestimonialsView depoimentos={[{ ...FIXTURE[0], company: 'Acme' }]} />);
    expect(screen.getByText('Sócio-proprietário · Acme')).toBeInTheDocument();
  });

  it('mostra só a empresa quando não há cargo', () => {
    render(<TestimonialsView depoimentos={[{ ...FIXTURE[1], company: 'Acme' }]} />);
    expect(screen.getByText('Acme')).toBeInTheDocument();
  });
});
