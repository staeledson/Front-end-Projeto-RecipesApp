import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

describe('Teste do Componente SearchBar', () => {
  test('Testa se todos os componentes estão na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const iconSearch = screen.getByTestId('search-top-btn');
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);
    const nameSearchBar = screen.getByRole('heading', {
      name: /search component/i,
    });
    expect(nameSearchBar).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
});
