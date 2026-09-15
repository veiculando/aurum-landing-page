import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Coverage } from './Coverage';

describe('Coverage exibe o parágrafo e o título do mapa atualizados', () => {
  it('o parágrafo de apoio menciona Alto Tietê, Vale do Paraíba e Litoral Norte', () => {
    const { container } = render(<Coverage />);
    const paragraph = Array.from(container.querySelectorAll('p')).find(p => p.textContent?.includes('alcançando mais de'));
    expect(paragraph).toBeTruthy();
    expect(paragraph!.textContent).toMatch(/Alto Tietê/i);
    expect(paragraph!.textContent).toMatch(/Vale do Paraíba/i);
    expect(paragraph!.textContent).toMatch(/Litoral Norte/i);
  });

  it('o título do mapa exibe "GRANDE SP | VALE DO PARAIBA | LITORAL NORTE"', () => {
    render(<Coverage />);
    expect(screen.getByText('GRANDE SP | VALE DO PARAIBA | LITORAL NORTE')).toBeInTheDocument();
  });
});

describe('Mapa de cobertura reflete a nova lista de cidades', () => {
  const WINE = '#8a0009';
  const GOLD = '#d9b442';

  it('inclui Mogi das Cruzes, Suzano, Poá e Bertioga como pins e na lista de cidades', () => {
    render(<Coverage />);
    for (const city of ['Mogi das Cruzes', 'Suzano', 'Poá', 'Bertioga']) {
      expect(screen.getAllByText(city).length).toBeGreaterThan(0);
    }
  });

  it('remove Ilhabela, Pindamonhangaba, Guaratinguetá, Caraguatatuba e Ubatuba', () => {
    render(<Coverage />);
    for (const city of ['Ilhabela', 'Pindamonhangaba', 'Guaratinguetá', 'Caraguatatuba', 'Ubatuba']) {
      expect(screen.queryByText(city)).not.toBeInTheDocument();
    }
  });

  it('cada pin novo mantém a cor correta pela região (vale = vinho, litoral = dourado)', () => {
    const { container } = render(<Coverage />);
    const findPinFill = (label: string) => {
      const textEl = Array.from(container.querySelectorAll('text')).find(t => t.textContent === label);
      const group = textEl?.closest('g');
      return group?.querySelector('circle[r="6"]')?.getAttribute('fill');
    };
    expect(findPinFill('Mogi das Cruzes')).toBe(WINE);
    expect(findPinFill('Suzano')).toBe(WINE);
    expect(findPinFill('Poá')).toBe(WINE);
    expect(findPinFill('Bertioga')).toBe(GOLD);
  });
});

describe('Segunda peça gráfica de rodovias é exibida com a legenda correta', () => {
  it('exibe a legenda "PRINCIPAIS RODOVIAS DO CORREDOR"', () => {
    render(<Coverage />);
    expect(screen.getByText(/PRINCIPAIS RODOVIAS DO CORREDOR/i)).toBeInTheDocument();
  });

  it('lista as 6 rodovias do corredor com seus traçados', () => {
    const { container } = render(<Coverage />);
    const highways = [
      'BR-116 Via Dutra',
      'SP-070 Ayrton Senna/Carvalho Pinto',
      'SP-088 Mogi-Dutra',
      'SP-098 Mogi-Bertioga',
      'SP-099 Tamoios',
      'SP-055/BR-101 Rio-Santos',
    ];
    for (const name of highways) {
      const item = screen.getByText(name);
      expect(item).toBeInTheDocument();
      const row = item.closest('[data-highway-row]');
      expect(row?.querySelector('path')).toBeTruthy();
    }
  });
});
