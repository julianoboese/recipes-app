import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import '@testing-library/jest-dom';

const changeToFoods = (history) => history.push('/explore/foods');

describe('Tela de Explorar Foods', () => {
  it('Na tela de explorar foods, existem três botões', () => {
    const { history } = renderWithRouter(<App />);

    changeToFoods(history);

    const exploreByIngredientBtn = screen.getByRole('button', { name: /By Ingredient/i });
    expect(exploreByIngredientBtn).toBeInTheDocument();

    const exploreByNationalityBtn = screen
      .getByRole('button', { name: /By Nationality/i });
    expect(exploreByNationalityBtn).toBeInTheDocument();

    const surpriseMeBtn = screen.getByRole('button', { name: /Surprise me!/i });
    expect(surpriseMeBtn).toBeInTheDocument();
  });
  it('O botão By Ingredient redireciona para /explore/foods/ingredients', () => {
    const { history } = renderWithRouter(<App />);

    changeToFoods(history);

    const exploreByIngredientBtn = screen.getByRole('button', { name: /By Ingredient/i });
    userEvent.click(exploreByIngredientBtn);

    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });
  it('O botão By Nationality redireciona para /explore/foods/nationalities', () => {
    const { history } = renderWithRouter(<App />);

    changeToFoods(history);

    const exploreByNationalityBtn = screen
      .getByRole('button', { name: /By Nationality/i });
    userEvent.click(exploreByNationalityBtn);

    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });
  // falta o mock pra testar o botão Surprise me!
});

describe('Tela de Explorar Drinks', () => {
  it('Na tela de explorar drinks, existem apenas dois botões', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/explore/drinks');

    const exploreByIngredientBtn = screen.getByRole('button', { name: /By Ingredient/i });
    expect(exploreByIngredientBtn).toBeInTheDocument();

    const surpriseMeBtn = screen.getByRole('button', { name: /Surprise me!/i });
    expect(surpriseMeBtn).toBeInTheDocument();
  });
  it('O botão By Ingredient redireciona para /explore/drinks/ingredients', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/explore/drinks');

    const exploreByIngredientBtn = screen.getByRole('button', { name: /By Ingredient/i });
    userEvent.click(exploreByIngredientBtn);

    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });
  // falta o mock pra testar o botão Surprise me!
});
