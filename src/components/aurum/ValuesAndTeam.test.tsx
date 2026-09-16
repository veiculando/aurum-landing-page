import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ValuesAndTeam } from './ValuesAndTeam';

describe('ValuesAndTeam exibe o texto atualizado da Missão', () => {
  it('o card Missão exibe o novo texto sobre promover conexões entre marcas e pessoas', () => {
    render(<ValuesAndTeam />);
    const missao = screen.getByText('Missão').closest('div');
    expect(missao?.textContent).toMatch(/promover conexões entre marcas e pessoas/i);
  });

  it('os cards Visão e Responsabilidade permanecem inalterados', () => {
    render(<ValuesAndTeam />);
    expect(screen.getByText(/Ser a referência em mídia OOH no interior e litoral paulista/i)).toBeInTheDocument();
    expect(screen.getByText(/Crescer com consciência/i)).toBeInTheDocument();
  });
});
