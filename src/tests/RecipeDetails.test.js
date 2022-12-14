import { screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import ContextAppProvider from '../context/ContextAppProvider';

describe('Teste do Componente RecipeDetails', () => {
  test('Testa se todos os componentes estão na tela meals', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );
    act(() => {
      history.push('/meals/52977');
    });

    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const recipeTittle = await screen.findByTestId('recipe-title');
    expect(recipeTittle).toBeInTheDocument();

    const recipeVideo = await screen.findByTestId('video');
    expect(recipeVideo).toBeInTheDocument();

    const recipeInstructions = await screen.findByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();

    const recomendation1 = await screen.findByText('GG');
    expect(recomendation1).toBeInTheDocument();

    const recomendation2 = await screen.findByText('A1');
    expect(recomendation2).toBeInTheDocument();
  });

  test('Testa se ao clicar em Share, a mensagem LinkCopied! é exibida', async () => {
    window.document.execCommand = jest.fn(() => true);
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );
    act(() => {
      history.push('/meals/52977');
    });

    const shareBtn = await screen.findByTestId('share-btn1');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
    const linkCopied = await screen.findByTestId('link-copied');
    expect(linkCopied).toBeInTheDocument();
  });

  test('Testa se todos os componentes estão na tela Drinks', async () => {
    const { history } = renderWithRouter(
      <ContextAppProvider>
        <App />
      </ContextAppProvider>,
    );
    act(() => {
      history.push('/drinks/178366');
    });

    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();

    const shareBtn = await screen.findByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();

    const recipeTittleDT = await screen.findByTestId('recipe-title');
    expect(recipeTittleDT).toBeInTheDocument();

    const recipeTittle = await screen.findByText('Gin Lemon');
    expect(recipeTittle).toBeInTheDocument();

    const recipeInstructions = await screen.findByTestId('instructions');
    expect(recipeInstructions).toBeInTheDocument();
  });
});
