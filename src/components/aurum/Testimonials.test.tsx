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

  it('não inventa empresa/foto para os depoimentos', () => {
    const { container } = render(<TestimonialsView depoimentos={FIXTURE} />);
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });
});
