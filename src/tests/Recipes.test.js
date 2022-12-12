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
        renderWithRouter(
        <Recipes />
        );
      </ContextAppProvider>,
    );
    const loading = screen.getByText(/loading.../i);

    expect(loading).toBeInTheDocument();
  });

  it('02 - Testa se existem 5 botões de categoria na página meals', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <App />
        );
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
        renderWithRouter(
        <App />
        );
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
        renderWithRouter(
        <App />
        );
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
        renderWithRouter(
        <App />
        );
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
        renderWithRouter(
        <App />
        );
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
    const beef = screen.findByText('52874');
    waitFor(() => expect(beef).toBeInTheDocument());
    userEvent.click(btn1);
    waitFor(() => expect(recipe).toBeInTheDocument());

    userEvent.click(btn2);
    const breakfast = screen.findByText('52965');
    waitFor(() => expect(breakfast).toBeInTheDocument());
    userEvent.click(btn2);
    waitFor(() => expect(recipe).toBeInTheDocument());

    userEvent.click(btn3);
    const chicken = screen.findByText('53050');
    waitFor(() => expect(chicken).toBeInTheDocument());
    userEvent.click(btn3);
    waitFor(() => expect(recipe).toBeInTheDocument());

    userEvent.click(btn4);
    const dessert = screen.findByText('53049');
    waitFor(() => expect(dessert).toBeInTheDocument());
    userEvent.click(btn4);
    waitFor(() => expect(recipe).toBeInTheDocument());

    userEvent.click(btn5);
    const goat = screen.findByText('52968');
    waitFor(() => expect(goat).toBeInTheDocument());
    userEvent.click(btn5);
    waitFor(() => expect(recipe).toBeInTheDocument());
  });

  it('07 - Testa os botões de filtro na página /drinks', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <App />
        );
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
    const ordinary = screen.findByText(/3-Mile Long Island Iced Tea/i);
    waitFor(() => expect(ordinary).toBeInTheDocument());
    userEvent.click(btn1);
    waitFor(() => expect(recipe).toBeInTheDocument());

    userEvent.click(btn2);
    const cocktail = screen.findByText(/155 Belmont/i);
    waitFor(() => expect(cocktail).toBeInTheDocument());
    userEvent.click(btn2);
    waitFor(() => expect(recipe).toBeInTheDocument());

    userEvent.click(btn3);
    const shake = screen.findByText(/151 Florida Bushwacker/i);
    waitFor(() => expect(shake).toBeInTheDocument());
    userEvent.click(btn3);
    waitFor(() => expect(recipe).toBeInTheDocument());

    userEvent.click(btn4);
    const other = screen.findByText(/A Piece of Ass/i);
    waitFor(() => expect(other).toBeInTheDocument());
    userEvent.click(btn4);
    waitFor(() => expect(recipe).toBeInTheDocument());

    userEvent.click(btn5);
    const cocoa = screen.findByText(/Castillian Hot Chocolate/i);
    waitFor(() => expect(cocoa).toBeInTheDocument());
    userEvent.click(btn5);
    waitFor(() => expect(recipe).toBeInTheDocument());
  });
});
