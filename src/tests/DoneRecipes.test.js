import React from 'react';
import { screen, act, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import DoneRecipes from '../pages/DoneRecipes';
import doneRecipesMock from '../services/mockMeals';
import ContextAppProvider from '../context/ContextAppProvider';

const route = '/done-recipes';
const linkCopy = 'Link copied!';

describe('testa a página "done-recipes"', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));
  });

  test('01 - Se a rota da página é "/done-recipes"', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    act(() => {
      history.push(route);
    });

    expect(history.location.pathname).toBe(route);
  });

  test('02 - Se tem os botões na tela', () => {
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

  test('03 - Se tem a mensagem "Link copied!" e se ela está visível', async () => {
    window.document.execCommand = jest.fn(() => true);
    renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    const shareButton = screen.getByRole('button', { name: /0/i });
    expect(shareButton).toBeInTheDocument();

    userEvent.click(shareButton);

    const copyMessage = screen.getByText(linkCopy);
    expect(copyMessage).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getByText(linkCopy), { timeout: 3000 });

    expect(copyMessage).not.toBeInTheDocument();

    const shareDrinkButton = screen.getByRole('button', { name: /1/i });
    expect(shareDrinkButton).toBeInTheDocument();

    userEvent.click(shareButton);

    const copyMessage2 = screen.getByText(linkCopy);
    expect(copyMessage2).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getByText(linkCopy), { timeout: 3000 });

    expect(copyMessage2).not.toBeInTheDocument();
  });

  test('04 - Se ao clicar no botão do profile é redirecionado para página de profile', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    act(() => {
      history.push(route);
    });

    // const profileButton = screen.findByTestId('profile-top-btn');
    // expect(profileButton).toBeInTheDocument();
    // userEvent.click(profileButton);
    // =================================================================MENTORIA
    // expect(history.location.pathname).toBe('/profile');
  });

  test('05 - Se tem algo no localStorage', () => {
    renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    expect(localStorage.length).toBe(1);
  });

  test('06 - Se ao clicar na imagem da refeição "meal", vai para página de detalhes', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    act(() => {
      history.push(route);
    });

    const imgButton = screen.getByRole('img', { name: /spicy arrabiata penne/i });
    expect(imgButton).toBeInTheDocument();

    userEvent.click(imgButton);

    expect(history.location.pathname).toBe('/meals/52771');
  });

  test('07 - Se ao clicar na imagem da bebida "drink", vai para página de detalhes', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    act(() => {
      history.push(route);
    });

    const imgButton = screen.getByText(/aquamarine/i);
    expect(imgButton).toBeInTheDocument();

    userEvent.click(imgButton);

    expect(history.location.pathname).toBe('/drinks/178319');
  });

  test('08 - Se ao clicar no botao de compartilhar drink, tem resultado espetado', async () => {
    window.document.execCommand = jest.fn(() => true);
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    act(() => {
      history.push(route);
    });

    const shareDrink = screen.getByRole('button', { name: /1/i });
    expect(shareDrink).toBeInTheDocument();

    userEvent.click(shareDrink);

    const copyMessage = screen.getByText(linkCopy);
    expect(copyMessage).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.getByText(linkCopy), { timeout: 3000 });

    expect(copyMessage).not.toBeInTheDocument();
  });
});
