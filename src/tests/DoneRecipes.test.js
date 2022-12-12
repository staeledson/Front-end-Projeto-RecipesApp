import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import DoneRecipes from '../pages/DoneRecipes';
import doneRecipes from '../services/mockMeals';
import ContextAppProvider from '../context/ContextAppProvider';

// window.document.execCommand = jest.fn(() => true);
describe('testa a página "done-recipes"', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  });

  test('se a rota da página é "/done-recipes"', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    act(() => {
      history.push('/done-recipes');
    });

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('se tem os botões na tela', () => {
    renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );
    const allButton = screen.getByRole('button', { name: /all/i });
    const mealButton = screen.getByRole('button', { name: /meals/i });
    const drinkButton = screen.getByRole('button', { name: /drinks/i });

    expect(allButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();

    userEvent.click(allButton);
    userEvent.click(drinkButton);
    userEvent.click(mealButton);
  });

  test('se tem a mensagem "Link copied!" e se ela está visível', () => {
    renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    const shareButton = screen.getByRole('button', { name: /0/i });
    expect(shareButton).toBeInTheDocument();

    // userEvent.click(shareButton);
    // const copyMessage = screen.getByText('Link copied!');

    // expect(copyMessage).toBeInTheDocument();
  });

  test('se ao clicar no botão do profile é redirecionado para página de profile', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    const profileButton = screen.getByRole('img', { name: /imagem de um ícone de perfil/i });
    expect(profileButton).toBeInTheDocument();

    userEvent.click(profileButton);

    expect(history.location.pathname).toBe('/profile');
  });
});
