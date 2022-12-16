import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

describe('Testa a pagina RecipesInProgress', () => {
  test('Verificando renderizacao', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52772/in-progress');
    });
    const title = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');

    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();

    const btnShare = screen.getByRole('button', {
      name: /botão de compartilhar/i,
    });

    const favBtn = screen.getByRole('button', {
      name: /favorite/i,
    });

    const finBtn = screen.getByRole('button', {
      name: /finish recipe/i,
    });

    expect(btnShare && favBtn && finBtn).toBeInTheDocument();

    const checkbox1 = await screen.findByText(/brown rice 3 cups/i);
    const checkbox2 = await screen.findByText(/chicken breasts 2/i);

    userEvent.click(checkbox1);
    userEvent.click(checkbox2);
    screen.logTestingPlaygroundURL();
  });

  test('Test Drinks', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks/11007/in-progress');
    });
    const title = await screen.findByTestId('recipe-title');
    const category = await screen.findByTestId('recipe-category');

    expect(title).toBeInTheDocument();
    expect(category).toBeInTheDocument();

    const btnShare = screen.getByRole('button', {
      name: /botão de compartilhar/i,
    });

    const favBtn = screen.getByRole('button', {
      name: /favorite/i,
    });

    const finBtn = screen.getByRole('button', {
      name: /finish recipe/i,
    });

    expect(btnShare && favBtn && finBtn).toBeInTheDocument();

    const titleDrinks = await screen.findByText(/Margarita/i);
    const categoryDrinks = await screen.findByText(/Alcoholic/i);

    userEvent.click(titleDrinks);
    userEvent.click(categoryDrinks);
  });
  test('Teste se o botão finish recipes inicia desabilitado', async () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals/52772/in-progress');
    });
    const btnFinish = await screen.findByTestId('finish-recipe-btn');
    expect(btnFinish).toBeInTheDocument();

    expect(btnFinish).toBeDisabled();
    screen.logTestingPlaygroundURL();
  });
});
