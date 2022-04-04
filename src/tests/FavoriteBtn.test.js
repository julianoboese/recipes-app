import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl } from './helpers/renderUrl';
import '@testing-library/jest-dom';

describe('Favorite Button', () => {
  beforeEach(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    renderUrl('/done-recipes');
  });
  afterEach(() => localStorage.clear());

  it('should have three filters: All, Food and Drink', async () => {
    const allBtn = await screen.findByRole('button', { name: /All/i });
    const foodsBtn = await screen.findByRole('button', { name: /Food/i });
    const drinksBtn = await screen.findByRole('button', { name: /Drinks/i });
    expect(allBtn && foodsBtn && drinksBtn).toBeInTheDocument();
  });
});
