import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CtaSection } from './CtaSection';
import { DEFAULT_APP_LINK as APP_LINK } from '@/lib/site-links';

describe('CtaSection exibe o passo 2 sinalizado, não aplicado (fluxo de upload automático não existe no produto)', () => {
  it('mantém o texto atual do Passo 02, já que não há fluxo de upload automático em Veiculando.WhiteLabel.App/Api hoje', () => {
    render(<CtaSection />);
    expect(screen.getByText(/Entregue os arquivos no formato aprovado/i)).toBeInTheDocument();
    expect(screen.queryByText(/Faça upload automático/i)).not.toBeInTheDocument();
  });
});

describe('CTA "Solicitar proposta gratuita" abre o app_link em nova aba', () => {
  it('aponta para o APP_LINK com target="_blank"', () => {
    render(<CtaSection />);
    const link = screen.getByRole('link', { name: /solicitar proposta gratuita/i });
    expect(link).toHaveAttribute('href', APP_LINK);
    expect(link).toHaveAttribute('target', '_blank');
  });
});
