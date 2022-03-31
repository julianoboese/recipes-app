import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter, history } from './helpers/renderWithRouter';
import App from '../App';
import '@testing-library/jest-dom';

describe('Explore Screen', () => {
  beforeEach(() => {
    renderWithRouter(<App />);

    history.push('/explore');
  });

  it('On screen, there are two buttons: Explore Foods and Explore Drinks', () => {
    const exploreFoodsBtn = screen.getByRole('link', { name: /Explore Foods/i });
    const exploreDrinksBtn = screen.getByRole('link', { name: /Explore Drinks/i });

    expect(exploreFoodsBtn && exploreDrinksBtn).toBeInTheDocument();
  });

  it('When click on Explore Foods, you should be redirected to /explore/foods', () => {
    const exploreFoodsBtn = screen.getByRole('link', { name: /Explore Foods/i });
    userEvent.click(exploreFoodsBtn);

    expect(history.location.pathname).toBe('/explore/foods');
  });
  it('When click on Explore Drinks, you should be redirected to /explore/drinks', () => {
    const exploreDrinksBtn = screen.getByRole('link', { name: /Explore Drinks/i });
    userEvent.click(exploreDrinksBtn);

    expect(history.location.pathname).toBe('/explore/drinks');
  });
});
