import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './helpers/renderWith';
import Profile from '../pages/Profile';
import ContextAppProvider from '../context/ContextAppProvider';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import DoneRecipes from '../pages/DoneRecipes';
import App from '../App';

const dataTestid = 'profile-top-btn';

describe('Testa o Header', () => {
  it('01 - Testa se o Header aparece em Recipes na rota `/drinks`, com o title certo', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <Recipes />
        );
      </ContextAppProvider>,
    );

    const linkDrink = screen.getByTestId('drinks-bottom-btn');

    userEvent.click(linkDrink);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/drinks');

    const title = screen.getByRole('heading', { level: 1 });
    const imgProfile = screen.getByTestId(dataTestid);
    const imgSearch = screen.getByTestId('search-top-btn');

    expect(title).toHaveTextContent(/drinks/i);
    expect(imgProfile).toBeInTheDocument();
    expect(imgSearch).toBeInTheDocument();
  });

  it('02 - Testa se o Header aparece em Recipes na rota `/meals`, com o title certo', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <App />
        );
      </ContextAppProvider>,
    );

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const inputPassword = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(inputEmail, 'trybe@teste.com');
    userEvent.type(inputPassword, '12345678');

    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/meals');

    const title = screen.getByRole('heading', { level: 1 });
    const imgProfile = screen.getByTestId(dataTestid);
    const imgSearch = screen.getByTestId('search-top-btn');

    expect(title).toHaveTextContent(/meals/i);
    expect(imgProfile).toBeInTheDocument();
    expect(imgSearch).toBeInTheDocument();
  });

  it('03 - Testa se o Header aparece no Profile', () => {
    renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <Profile />
        );
      </ContextAppProvider>,
    );

    const title = screen.getByRole('heading', { level: 1 });
    const imgProfile = screen.getByTestId(dataTestid);

    expect(title).toHaveTextContent(/profile/i);
    expect(imgProfile).toBeInTheDocument();
  });

  it('04 - Testa se o Header aparece em Done Recipes', () => {
    renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <DoneRecipes />
        );
      </ContextAppProvider>,
    );

    const title = screen.getByRole('heading', { level: 1 });
    const imgProfile = screen.getByTestId(dataTestid);

    expect(title).toHaveTextContent(/done recipes/i);
    expect(imgProfile).toBeInTheDocument();
  });

  it('05 - Testa se o Header aparece em Favorite Recipes', () => {
    renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <FavoriteRecipes />
        );
      </ContextAppProvider>,
    );

    const title = screen.getByRole('heading', { level: 1 });
    const imgProfile = screen.getByTestId(dataTestid);

    expect(title).toHaveTextContent(/favorite recipes/i);
    expect(imgProfile).toBeInTheDocument();
  });

  it('06 - Testa se há um redirecionamento para /profile quando clica no link certo', () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <Recipes />
        );
      </ContextAppProvider>,
    );

    const links = screen.getAllByRole('link');

    userEvent.click(links[0]);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/profile');
  });

  it('07 - Testa se o searchBar aparece ao clicar no button com a imagem da lupa', () => {
    renderWithRouter(
      <ContextAppProvider>
        renderWithRouter(
        <Recipes />
        );
      </ContextAppProvider>,
    );

    const btn = screen.getByRole('button');

    userEvent.click(btn);

    const search = screen.getByTestId('exec-search-btn');

    expect(search).toBeInTheDocument();

    userEvent.click(btn);

    expect(search).not.toBeInTheDocument();
  });
});
