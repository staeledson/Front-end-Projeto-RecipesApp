import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Recipes from '../pages/Recipes';
import renderWithRouter from './helpers/renderWith';
import ContextAppProvider from '../context/ContextAppProvider';
import fetch from '../../cypress/mocks/fetch';
import mealCategoriesMock from './helpers/mealCategoriesMock';
import drinkCategoriesMock from './helpers/drinkCategoriesMock';
import App from '../App';

describe('Testa a página Recipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  it('01 - Testa se o Loading aparece na tela', () => {
    renderWithRouter(
      <ContextAppProvider>
        <Recipes />
      </ContextAppProvider>,
    );
    const loading = screen.getByText(/loading.../i);

    expect(loading).toBeInTheDocument();
  });

  it('02 - Testa se existem 5 botões de categoria na página meals', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const loading = screen.getByText(/loading.../i);

    await waitFor(() => expect(loading).not.toBeInTheDocument());

    const { meals } = mealCategoriesMock;
    const getCategories = meals.slice(0, 5).map((category) => category.strCategory);
    const btn1 = screen.getByRole('button', { name: getCategories[0] });
    const btn2 = screen.getByRole('button', { name: getCategories[1] });
    const btn3 = screen.getByRole('button', { name: getCategories[2] });
    const btn4 = screen.getByRole('button', { name: getCategories[3] });
    const btn5 = screen.getByRole('button', { name: getCategories[4] });

    expect(btn1).toBeInTheDocument();
    expect(btn2).toBeInTheDocument();
    expect(btn3).toBeInTheDocument();
    expect(btn4).toBeInTheDocument();
    expect(btn5).toBeInTheDocument();
  });

  it('03 - Testa se existem 5 botões de categoria na página drinks', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const loading = screen.getByText(/loading.../i);

    await waitFor(() => expect(loading).not.toBeInTheDocument());

    const { drinks } = drinkCategoriesMock;
    const getCategories = drinks.slice(0, 5).map((category) => category.strCategory);
    const btn1 = screen.getByRole('button', { name: getCategories[0] });
    const btn2 = screen.getByRole('button', { name: getCategories[1] });
    const btn3 = screen.getByRole('button', { name: getCategories[2] });
    const btn4 = screen.getByRole('button', { name: getCategories[3] });
    const btn5 = screen.getByRole('button', { name: getCategories[4] });

    expect(btn1).toBeInTheDocument();
    expect(btn2).toBeInTheDocument();
    expect(btn3).toBeInTheDocument();
    expect(btn4).toBeInTheDocument();
    expect(btn5).toBeInTheDocument();
  });

  it('04 - Testa se o botão All funciona corretamente na página /meals', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const loading = screen.getByText(/loading.../i);

    await waitFor(() => expect(loading).not.toBeInTheDocument());

    const btnAll = screen.getByRole('button', { name: 'All' });
    const recipe = screen.getByText('52977');

    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);

    expect(recipe).toBeInTheDocument();
  });

  it('05 - Testa se o botão All funciona corretamente na página /drinks', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const loading = screen.getByText(/loading.../i);

    await waitFor(() => expect(loading).not.toBeInTheDocument());

    const btnAll = screen.getByRole('button', { name: 'All' });
    const recipe = screen.getByText(/gg/i);

    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);

    expect(recipe).toBeInTheDocument();
  });

  it('06 - Testa os botões de filtro na página /meals', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const loading = screen.getByText(/loading.../i);

    await waitFor(() => expect(loading).not.toBeInTheDocument());

    const { meals } = mealCategoriesMock;
    const getCategories = meals.slice(0, 5).map((category) => category.strCategory);
    const btn1 = screen.getByRole('button', { name: getCategories[0] });
    const btn2 = screen.getByRole('button', { name: getCategories[1] });
    const btn3 = screen.getByRole('button', { name: getCategories[2] });
    const btn4 = screen.getByRole('button', { name: getCategories[3] });
    const btn5 = screen.getByRole('button', { name: getCategories[4] });
    const recipe = screen.getByText('52977');

    userEvent.click(btn1);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    const beef = screen.getByText('52874');
    expect(beef).toBeInTheDocument();

    userEvent.click(btn1);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    expect(recipe).toBeInTheDocument();

    userEvent.click(btn2);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    const breakfast = screen.getByText('52965');
    expect(breakfast).toBeInTheDocument();

    userEvent.click(btn2);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    expect(recipe).toBeInTheDocument();

    userEvent.click(btn3);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    const chicken = screen.getByText('52940');
    expect(chicken).toBeInTheDocument();

    userEvent.click(btn3);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    expect(recipe).toBeInTheDocument();

    userEvent.click(btn4);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    const dessert = screen.getByText('52893');
    expect(dessert).toBeInTheDocument();

    userEvent.click(btn4);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    expect(recipe).toBeInTheDocument();

    userEvent.click(btn5);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    const goat = screen.getByText('52968');
    expect(goat).toBeInTheDocument();

    userEvent.click(btn5);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    expect(recipe).toBeInTheDocument();
  });

  it('07 - Testa os botões de filtro na página /drinks', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    const loading = screen.getByText(/loading.../i);

    await waitFor(() => expect(loading).not.toBeInTheDocument());

    const { drinks } = drinkCategoriesMock;
    const getCategories = drinks.slice(0, 5).map((category) => category.strCategory);
    const btn1 = screen.getByRole('button', { name: getCategories[0] });
    const btn2 = screen.getByRole('button', { name: getCategories[1] });
    const btn3 = screen.getByRole('button', { name: getCategories[2] });
    const btn4 = screen.getByRole('button', { name: getCategories[3] });
    const btn5 = screen.getByRole('button', { name: getCategories[4] });
    const recipe = screen.getByText(/gg/i);

    userEvent.click(btn1);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    const ordinary = screen.getByText(/3-Mile Long Island Iced Tea/i);
    expect(ordinary).toBeInTheDocument();

    userEvent.click(btn1);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    expect(recipe).toBeInTheDocument();

    userEvent.click(btn2);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    const cocktail = screen.getByText(/155 Belmont/i);
    expect(cocktail).toBeInTheDocument();

    userEvent.click(btn2);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    expect(recipe).toBeInTheDocument();

    userEvent.click(btn3);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    const shake = screen.getByText(/151 Florida Bushwacker/i);
    expect(shake).toBeInTheDocument();

    userEvent.click(btn3);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    expect(recipe).toBeInTheDocument();

    userEvent.click(btn4);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    const other = screen.getByText(/A Piece of Ass/i);
    expect(other).toBeInTheDocument();

    userEvent.click(btn4);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    expect(recipe).toBeInTheDocument();

    userEvent.click(btn5);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    const cocoa = screen.getByText(/Castillian Hot Chocolate/i);
    expect(cocoa).toBeInTheDocument();

    userEvent.click(btn5);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument());
    expect(recipe).toBeInTheDocument();
  });

  it('08 - Testa se vai pra a página de detalhes da receita', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const searchIcon = screen.getByTestId('search-top-btn');

    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const input = screen.getByTestId('search-input');
    const radio = screen.getByTestId('name-search-radio');
    const searchBtn = screen.getByRole('button', { name: /search/i });

    act(() => {
      userEvent.type(input, 'Arrabiata');
      userEvent.click(radio);
      userEvent.click(searchBtn);
    });

    // await waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
    expect(await screen.findByText(/Spicy Arrabiata Penne/i)).toBeInTheDocument();
  });
});
