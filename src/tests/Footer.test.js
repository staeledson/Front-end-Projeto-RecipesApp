import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouter from './helpers/renderWith';
import Profile from '../pages/Profile';

describe('Testa o Footer', () => {
  it('01 - Testa se o Footer aparece em Recipes', () => {
    renderWithRouter(<Recipes />);

    const links = screen.getAllByRole('link');
    const images = screen.getAllByRole('img');

    expect(links[0]).toBeInTheDocument();
    expect(links[1]).toBeInTheDocument();
    expect(links).toHaveLength(2);
    expect(images[0]).toBeInTheDocument();
    expect(images[1]).toBeInTheDocument();
    expect(images).toHaveLength(2);
  });

  it('02 - Testa se o Footer aparece no Profile', () => {
    renderWithRouter(<Profile />);

    const links = screen.getAllByRole('link');
    const images = screen.getAllByRole('img');

    expect(links[0]).toBeInTheDocument();
    expect(links[1]).toBeInTheDocument();
    expect(links).toHaveLength(2);
    expect(images[0]).toBeInTheDocument();
    expect(images[1]).toBeInTheDocument();
    expect(images).toHaveLength(2);
  });

  it('03 - Testa se há um redirecionamento para /drinks quando clica no link certo', () => {
    const { history } = renderWithRouter(<Recipes />);
    const links = screen.getAllByRole('link');

    userEvent.click(links[0]);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/drinks');
  });

  it('04 - Testa se há um redirecionamento para /meals quando clica no link certo', () => {
    const { history } = renderWithRouter(<Recipes />);
    const links = screen.getAllByRole('link');

    userEvent.click(links[1]);

    const { location: { pathname } } = history;

    expect(pathname).toBe('/meals');
  });
});
