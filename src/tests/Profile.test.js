import React from 'react';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

describe('testa a página Profile', () => {
  beforeEach(() => {
    const email = 'trybe@teste.com';
    localStorage.setItem('user', JSON.stringify({ email }));
  });

  test('se é renderizado 3 botões na tela', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const doneRecipesButton = screen.getByRole('button', { name: /done recipes/i });
    expect(doneRecipesButton).toBeInTheDocument();

    const favoriteRecipesButton = screen.getByRole('button', { name: /favorite recipes/i });
    expect(favoriteRecipesButton).toBeInTheDocument();

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();
  });

  test('se tem um "h1" na tela com nome "Profile"', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const profileTitle = screen.getByRole('heading', { name: /profile/i });
    expect(profileTitle).toBeInTheDocument();
  });

  test('se tem um "h2" na tela com o email do localStorage', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const showEmail = screen.getByRole('heading', { name: /trybe@teste.com/i });
    expect(showEmail).toBeInTheDocument();

    localStorage.clear();

    const otherTitle = screen.findByRole('heading', { name: /faça login/i });
    waitFor(() => expect(showEmail).not.toBeInTheDocument());
    waitFor(() => expect(otherTitle).toBeInTheDocument());
  });

  test('se tem um "h2" na tela sem o email do localStorage', () => {
    localStorage.clear();
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const otherTitle = screen.getByRole('heading', { name: /faça login/i });

    expect(otherTitle).toBeInTheDocument();
  });

  test('se ao clicar no botão "Done Recipes" vai para a rota "/done-recipes"', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const doneRecipesButton = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(doneRecipesButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('se ao clicar no botão "Favorite Recipes" vai para a rota "/favorite-recipes"', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const favoriteRecipesButton = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(favoriteRecipesButton);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('se ao clicar no botão "Logout" vai para a rota "/"', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/profile');
    });

    const logoutButton = screen.getByRole('button', { name: /logout/i });
    userEvent.click(logoutButton);

    expect(history.location.pathname).toBe('/');
  });
});
