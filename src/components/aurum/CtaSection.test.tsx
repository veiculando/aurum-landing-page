import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CtaSection } from './CtaSection';

describe('CtaSection exibe o passo 2 sinalizado, não aplicado (fluxo de upload automático não existe no produto)', () => {
  it('mantém o texto atual do Passo 02, já que não há fluxo de upload automático em Veiculando.WhiteLabel.App/Api hoje', () => {
    render(<CtaSection />);
    expect(screen.getByText(/Entregue os arquivos no formato aprovado/i)).toBeInTheDocument();
    expect(screen.queryByText(/Faça upload automático/i)).not.toBeInTheDocument();
  });
});
