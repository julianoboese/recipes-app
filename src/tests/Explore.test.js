import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import '@testing-library/jest-dom';

describe('Tela de Explorar', () => {
  it('Na tela principal, existe um botão que redireciona para /explore', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/foods');

    const exploreRouterBtn = screen.getByTestId('explore-bottom-btn');
    expect(exploreRouterBtn).toBeInTheDocument();

    userEvent.click(exploreRouterBtn);
    expect(history.location.pathname).toBe('/explore');
  });

  it('Na tela de explorar, existem dois botões, Explore Foods e Explore Drinks', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/explore');

    const exploreFoodsBtn = screen.getByRole('link', { name: /Explore Foods/i });
    expect(exploreFoodsBtn).toBeInTheDocument();

    const exploreDrinksBtn = screen.getByRole('link', { name: /Explore Drinks/i });
    expect(exploreDrinksBtn).toBeInTheDocument();
  });

  it('O botão Explore Foods deve redirecionar parar /explore/foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/explore');

    const exploreFoodsBtn = screen.getByRole('link', { name: /Explore Foods/i });
    userEvent.click(exploreFoodsBtn);

    expect(history.location.pathname).toBe('/explore/foods');
  });
  it('O botão Explore Foods deve redirecionar parar /explore/foods', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/explore');

    const exploreDrinksBtn = screen.getByRole('link', { name: /Explore Drinks/i });
    userEvent.click(exploreDrinksBtn);

    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
