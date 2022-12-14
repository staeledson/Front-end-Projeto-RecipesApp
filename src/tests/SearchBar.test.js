import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

const ICON_SEARCH = 'search-top-btn';
const INPUT_SEARCH = 'search-input';

describe('Teste do Componente SearchBar', () => {
  test('Testa se todos os componentes estão na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    screen.logTestingPlaygroundURL();
    const iconSearch = screen.getByTestId(ICON_SEARCH);
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);
    const nameSearchBar = screen.getByRole('heading', {
      name: /Meals/i,
    });
    expect(nameSearchBar).toBeInTheDocument();
    const inputSearch = screen.getByTestId(INPUT_SEARCH);
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
    const iconSearch = screen.getByTestId(ICON_SEARCH);
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);
    const inputSearch = screen.getByTestId(INPUT_SEARCH);
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
  test('Teste se ao pesquisar por uma receita e retorna somente uma, é direcionado para pagina de detalhes', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const iconSearch = screen.getByTestId(ICON_SEARCH);
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);
    const inputSearch = screen.getByTestId(INPUT_SEARCH);
    const btnSearch = screen.getByRole('button', {
      name: /search/i,
    });
    userEvent.type(inputSearch, 'lemon');
    const radioName = screen.getByDisplayValue(/name/i);
    userEvent.click(radioName);
    userEvent.click(btnSearch);
    const resultSearch = await screen.findByText(/Lamb and Lemon Souvlaki/i);
    expect(resultSearch).toBeInTheDocument();
  });
  test('Teste se ao pesquisar por drinks é mostrado resultado na tela', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });

    // jest.spyOn(global, 'alert');
    // global.alert.mockImplementation(() => { });

    const iconSearch = screen.getByTestId(ICON_SEARCH);
    expect(iconSearch).toBeInTheDocument();
    userEvent.click(iconSearch);
    const inputSearch = screen.getByTestId(INPUT_SEARCH);
    const btnSearch = screen.getByRole('button', {
      name: /search/i,
    });
    userEvent.type(inputSearch, 'lemon');
    const radioName = screen.getByDisplayValue(/Ingredient/i);
    userEvent.click(radioName);
    userEvent.click(btnSearch);
    const resultSearch = await screen.findByText(/A True Amaretto Sour/i);
    expect(resultSearch).toBeInTheDocument();
    // expect(global.alert).toHaveBeenCalledTimes(1);
    // expect(global.alert).toBeCalled(1);
  });

  test('Teste se ao pesquisar por receitas com mais de uma letra é exibido um alert', async () => {
    const { history } = renderWithRouter(<App />);
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
  test.only('Teste se ao pesquisar por receita inexistente', async () => {
    const { history } = renderWithRouter(<App />);
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
  test('Teste se ao pesquisar por apenas por ingredietes é mostrado todas as receitas', async () => {
    const { history } = renderWithRouter(<App />);
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
