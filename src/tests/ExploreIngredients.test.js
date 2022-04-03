import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl } from './helpers/renderUrl';
import '@testing-library/jest-dom';
import { drinkIngredientsMock, drinksByIngredientMock,
  mealIngredientsMock, mealsByIngredientMock } from './mocks/ingredientsMocks';

describe('Explore Food Ingredients Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('On the explore ingredients screen, the ingredients are shown', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealIngredientsMock),
    });

    renderUrl('/explore/foods/ingredients');

    const chickenIngredient = await screen.findByAltText('Chicken');
    expect(chickenIngredient).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  });

  it('Clicking on an ingredient redirects to the main screen', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealIngredientsMock)
        .mockResolvedValue(mealsByIngredientMock),
    });

    renderUrl('/explore/foods/ingredients');

    const chickenIngredient = await screen.findByAltText('Chicken');
    userEvent.click(chickenIngredient);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
  });
});

describe('Explore Drink Ingredients Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('On the explore ingredients screen, the ingredients are shown', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkIngredientsMock),
    });

    renderUrl('/explore/drinks/ingredients');

    const rumIngredient = await screen.findByAltText('Light rum');
    expect(rumIngredient).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  });
  it('Clicking on an ingredient redirects to the main screen', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinkIngredientsMock)
        .mockResolvedValue(drinksByIngredientMock),
    });

    renderUrl('/explore/drinks/ingredients');

    const rumIngredient = await screen.findByAltText('Light rum');
    userEvent.click(rumIngredient);
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
  });
});
