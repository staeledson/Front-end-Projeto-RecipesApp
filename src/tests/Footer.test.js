import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './helpers/renderWith';
import Profile from '../pages/Profile';
import ContextAppProvider from '../context/ContextAppProvider';

describe('Testa o Footer', () => {
  it('01 - Testa se o Footer aparece em Recipes', () => {
    renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <Recipes />
        );
      </ContextAppProvider>,
    );

    const footer = screen.getByTestId('footer');
    const imgDrink = screen.getByTestId('drinks-bottom-btn');
    const imgMeals = screen.getByTestId('meals-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(imgDrink).toBeInTheDocument();
    expect(imgMeals).toBeInTheDocument();
  });

  it('02 - Testa se o Footer aparece no Profile', () => {
    renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <Profile />
        );
      </ContextAppProvider>,
    );

    const footer = screen.getByTestId('footer');
    const imgDrink = screen.getByTestId('drinks-bottom-btn');
    const imgMeals = screen.getByTestId('meals-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(imgDrink).toBeInTheDocument();
    expect(imgMeals).toBeInTheDocument();
  });

  it('03 - Testa se há um redirecionamento para /drinks quando clica no link certo', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <Recipes />
        );
      </ContextAppProvider>,
    );

    const links = screen.getAllByRole('link');

    userEvent.click(links[1]);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/drinks');
  });

  it('04 - Testa se há um redirecionamento para /meals quando clica no link certo', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <Recipes />
        );
      </ContextAppProvider>,
    );

    const links = screen.getAllByRole('link');

    userEvent.click(links[2]);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/meals');
  });
});
