import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import Login from '../pages/Login';

describe('testa a página de Login', () => {
  test('se tem 2 inputs na tela e 1 botao', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId('password-input');
    expect(inputPassword).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
  });

  test('se o botão inicial com "disable"', () => {
    renderWithRouter(<Login />);

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();
  });

  test('se as regras de autenticaçao de email e senha estao corretos', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByRole('textbox', { name: /email/i });
    const inputPassword = screen.getByTestId('password-input');

    userEvent.type(inputEmail, 'tulio@barros.com');
    userEvent.type(inputPassword, '12345678');

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);
  });
});
