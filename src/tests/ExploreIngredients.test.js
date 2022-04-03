import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl } from './helpers/renderUrl';
import '@testing-library/jest-dom';
import { drinkIngredientsMock, drinksByIngredientMock,
  mealIngredientsMock, mealsByIngredientMock } from './mocks/ingredientsMocks';
import { drinkCategoriesMock, mealCategoriesMock } from './mocks/categoriesMocks';

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
        .mockResolvedValueOnce(mealsByIngredientMock)
        .mockResolvedValue(mealCategoriesMock),
    });

    renderUrl('/explore/foods/ingredients');

    const chickenIngredient = await screen.findByAltText('Chicken');

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');

    userEvent.click(chickenIngredient);

    await waitForElementToBeRemoved(() => screen.getByAltText('Chicken'));

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByAltText('Brown Stew Chicken')).toBeInTheDocument();

    const TIMES_CALLED = 4;
    expect(global.fetch).toHaveBeenCalledTimes(TIMES_CALLED);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
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
        .mockResolvedValueOnce(drinksByIngredientMock)
        .mockResolvedValue(drinkCategoriesMock),
    });

    renderUrl('/explore/drinks/ingredients');

    const rumIngredient = await screen.findByAltText('Light rum');

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');

    userEvent.click(rumIngredient);

    await waitForElementToBeRemoved(() => screen.getByAltText('Light rum'));

    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    expect(screen.getByAltText('Acapulco')).toBeInTheDocument();

    const TIMES_CALLED = 4;
    expect(global.fetch).toHaveBeenCalledTimes(TIMES_CALLED);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  });
});
