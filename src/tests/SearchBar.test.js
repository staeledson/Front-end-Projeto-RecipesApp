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
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    const btnSearch = screen.getByRole('button', {
      name: /search/i,
    });
    expect(btnSearch).toBeInTheDocument();
    const radioIgredientes = screen.getByDisplayValue(/ingredient/i);
    const radioName = screen.getByDisplayValue(/name/i);
    const radioFirstLetter = screen.getByDisplayValue(/first-letter/i);
    expect(radioIgredientes).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  test('Teste se é rednizado algo na tela ao pesquisar por comidas', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const iconSearch = screen.getByTestId('search-top-btn');
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);
    const inputSearch = screen.getByTestId('search-input');
    expect(inputSearch).toBeInTheDocument();
    const btnSearch = screen.getByRole('button', {
      name: /search/i,
    });
    userEvent.type(inputSearch, 'lemon');
    const radioName = screen.getByDisplayValue(/ingredient/i);
    userEvent.click(radioName);
    userEvent.click(btnSearch);
    const resultSearch = await screen.findByText(/Baked salmon with fennel & tomatoes/i);
    expect(resultSearch).toBeInTheDocument();
  });
});
