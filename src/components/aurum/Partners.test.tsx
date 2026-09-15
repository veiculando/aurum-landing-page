import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Partners } from './Partners';

describe('Partners exibe o novo parágrafo de apoio sem alterar a lista de marcas', () => {
  it('mostra o parágrafo atualizado com "Mais de 5 mil campanhas"', () => {
    render(<Partners />);
    expect(screen.getByText(/Mais de 5 mil campanhas de sucesso/i)).toBeInTheDocument();
  });

  it('mantém as 10 marcas do array PARTNERS inalteradas', () => {
    render(<Partners />);
    const names = ['Bradesco', 'Unimed', 'Havan', 'Shibata', 'Vanguarda', 'Colinas Shopping', 'Magazine Luiza', 'Centervale', 'Drogaria Total', 'Univap'];
    for (const name of names) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    }
  });
});
