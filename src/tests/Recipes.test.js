import React from 'react';
import { screen, waitFor } from '@testing-library/react';
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
    const loading = screen.getByText(/loading/i);

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

    const loading = screen.getByText(/loading/i);

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

    const loading = screen.getByText(/loading/i);

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
});
