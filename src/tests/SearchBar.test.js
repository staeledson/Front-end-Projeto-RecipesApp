import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import fetch from '../../cypress/mocks/fetch';
import App from '../App';
import ContextAppProvider from '../context/ContextAppProvider';

const ICON_SEARCH = 'search-top-btn';
const INPUT_SEARCH = 'search-input';

describe('Teste do Componente SearchBar', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  it('01 - Testa se todos os componentes estão na tela', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const iconSearch = screen.getByTestId(ICON_SEARCH);
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);

    const nameSearchBar = screen.getByRole('heading', { name: /Meals/i });
    const inputSearch = screen.getByTestId(INPUT_SEARCH);
    const radioIgredientes = screen.getByDisplayValue(/ingredient/i);
    const radioName = screen.getByDisplayValue(/name/i);
    const radioFirstLetter = screen.getByDisplayValue(/first-letter/i);
    const btnSearch = screen.getByRole('button', { name: /search/i });

    expect(nameSearchBar).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
    expect(radioIgredientes).toBeInTheDocument();
    expect(radioName).toBeInTheDocument();
    expect(radioFirstLetter).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });

  it('02 - Testa se é renderizado algo na tela ao pesquisar por comidas', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const iconSearch = screen.getByTestId(ICON_SEARCH);
    const recipe = await screen.findByText(/corba/i);

    expect(iconSearch).toBeInTheDocument();
    expect(recipe).toBeInTheDocument();

    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(INPUT_SEARCH);
    const radioName = screen.getByTestId('ingredient-search-radio');
    const btnSearch = screen.getByRole('button', { name: /search/i });

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(radioName);
    userEvent.click(btnSearch);

    const resultSearch = await screen.findByText(/Brown Stew Chicken/i);

    await waitFor(() => expect(resultSearch).toBeInTheDocument());
  });

  it('03 - Testa se ao pesquisar por drinks é mostrado resultado na tela', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );
    act(() => {
      history.push('/drinks');
    });

    const iconSearch = screen.getByTestId(ICON_SEARCH);
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);

    const inputSearch = screen.getByTestId(INPUT_SEARCH);
    const radioName = screen.getByDisplayValue(/Ingredient/i);
    const btnSearch = screen.getByRole('button', { name: /search/i });

    userEvent.type(inputSearch, 'gin');
    userEvent.click(radioName);
    userEvent.click(btnSearch);

    const resultSearch = await screen.findByText(/gin fizz/i);

    expect(resultSearch).toBeInTheDocument();
  });

  it('05 - Teste se ao pesquisar por receitas com mais de uma letra é exibido um alert', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );
    act(() => {
      history.push('/drinks');
    });

    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => { });

    const iconSearch = screen.getByTestId(ICON_SEARCH);
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);
    const inputSearch = screen.getByTestId(INPUT_SEARCH);
    const btnSearch = screen.getByRole('button', {
      name: /search/i,
    });
    userEvent.type(inputSearch, 'lemon');
    const radioName = screen.getByDisplayValue(/First/i);
    userEvent.click(radioName);
    userEvent.click(btnSearch);
    expect(global.alert).toHaveBeenCalledTimes(1);
    // expect(global.alert).toBeCalled(1);
  });

  it('06 - Teste se ao pesquisar por receita inexistente', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );
    act(() => {
      history.push('/meals');
    });
    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => { });

    const iconSearch = screen.getByTestId(ICON_SEARCH);
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);
    const inputSearch = screen.getByTestId(INPUT_SEARCH);
    const btnSearch = screen.getByRole('button', {
      name: /search/i,
    });
    const radioName = screen.getByDisplayValue(/Name/i);
    userEvent.click(radioName);
    userEvent.type(inputSearch, 'xablau');
    console.log(fetch);
    userEvent.click(btnSearch);

    expect(global.alert).toHaveBeenCalledTimes(1);
    // await screen.findByText(/Sorry, we haven't found any recipes for these filters./i);
    // expect(resultSearch).toBeInTheDocument();
  });

  it('07 - Teste se ao pesquisar por apenas por ingredietes é mostrado todas as receitas', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    jest.spyOn(global, 'alert');
    global.alert.mockImplementation(() => { });

    const iconSearch = screen.getByTestId(ICON_SEARCH);
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);
    // const inputSearch = screen.getByTestId(INPUT_SEARCH);
    const btnSearch = screen.getByRole('button', {
      name: /search/i,
    });
    // userEvent.type(inputSearch, 'xablau');
    const radioName = screen.getByDisplayValue(/Ingredient/i);
    userEvent.click(radioName);
    userEvent.click(btnSearch);
    const resultSearch = await screen.findByText(/Bubble & Squeak/i);
    expect(resultSearch).toBeInTheDocument();
  });
});
