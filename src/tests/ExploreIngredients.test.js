import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl } from './helpers/renderUrl';
import { mealIngredients, mealsByIngredient,
  drinkIngredients, drinksByIngredient } from './mocks/ingredientsMocks';
import '@testing-library/jest-dom';

describe('Explore Food Ingredients Screen', () => {
  beforeEach(() => {
    renderUrl('/explore/foods');
    jest.clearAllMocks();
  });
  it('On the explore ingredients screen, the ingredients are shown', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredients),
    });

    const exploreByIngredientBtn = screen
      .getByRole('button', { name: /By Ingredient/i });
    userEvent.click(exploreByIngredientBtn);
    const chickenIngredient = await screen.findByAltText('Chicken');
    expect(chickenIngredient).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  });
  it('Clicking on an ingredient redirects to the main screen', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealIngredients)
        .mockResolvedValue(mealsByIngredient),
    });

    const exploreByIngredientBtn = screen
      .getByRole('button', { name: /By Ingredient/i });
    userEvent.click(exploreByIngredientBtn);

    const chickenIngredient = await screen.findByAltText('Chicken');
    userEvent.click(chickenIngredient);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });
});

describe('Explore Drink Ingredients Screen', () => {
  beforeEach(() => {
    renderUrl('/explore/drinks');
    jest.clearAllMocks();
  });
  it('On the explore ingredients screen, the ingredients are shown', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkIngredients),
    });

    const exploreByIngredientBtn = screen
      .getByRole('button', { name: /By Ingredient/i });
    userEvent.click(exploreByIngredientBtn);
    const rumIngredient = await screen.findByAltText('Light rum');
    expect(rumIngredient).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  });
  it('Clicking on an ingredient redirects to the main screen', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinkIngredients)
        .mockResolvedValue(drinksByIngredient),
    });

    const exploreByIngredientBtn = screen
      .getByRole('button', { name: /By Ingredient/i });
    userEvent.click(exploreByIngredientBtn);

    const rumIngredient = await screen.findByAltText('Light rum');
    userEvent.click(rumIngredient);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
  });
});
