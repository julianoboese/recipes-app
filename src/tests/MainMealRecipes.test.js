import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl } from './helpers/renderUrl';
import { mealsMock } from './mocks/mealMocks';
import '@testing-library/jest-dom';
import { mealsByIngredientMock } from './mocks/ingredientsMocks';
import { mealCategoriesMock } from './mocks/categoriesMocks';

describe('MainMealRecipes screen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render meals on page load', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsMock),
    });

    renderUrl('./foods');

    const firstMeal = await screen.findByAltText('Corba');
    expect(firstMeal).toBeInTheDocument();
  });

  it('should filter by categories', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealCategoriesMock)
        .mockResolvedValueOnce(mealCategoriesMock)
        .mockResolvedValueOnce(mealsMock)
        .mockResolvedValue(mealsByIngredientMock),
    });

    renderUrl('./foods');

    const chickenBtn = await screen.findByRole('button', { name: 'Chicken' });
    expect(chickenBtn).toBeInTheDocument();

    userEvent.click(chickenBtn);

    const firstChickenFood = await screen.findByAltText('Brown Stew Chicken');
    expect(firstChickenFood).toBeInTheDocument();
  });
});

describe('Search button', () => {
  it('should show search bar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsMock),
    });

    renderUrl('./foods');

    const searchBtn = await screen.findByAltText('ícone de pesquisa');
    expect(searchBtn).toBeInTheDocument();

    userEvent.click(searchBtn);
    const input = screen.getByPlaceholderText('Search Recipe');
    expect(input).toBeInTheDocument();

    const ingredientRadio = screen.getByLabelText('Ingredient');
    const nameRadio = screen.getByLabelText('Name');
    const firstLetterRadio = screen.getByLabelText('First Letter');

    expect(ingredientRadio && nameRadio && firstLetterRadio).toBeInTheDocument();
  });

  it('should search for ingredients', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealsMock)
        .mockResolvedValue(mealsByIngredientMock),
    });

    renderUrl('./foods');

    const searchBtn = await screen.findByAltText('ícone de pesquisa');
    userEvent.click(searchBtn);

    const ingredientRadio = screen.getByLabelText('Ingredient');
    userEvent.click(ingredientRadio);

    const input = screen.getByPlaceholderText('Search Recipe');
    userEvent.type(input, 'chicken');

    const doSearchBtn = screen.getByRole('button', { name: 'Search' });
    userEvent.click(doSearchBtn);

    const firstChickenFood = await screen.findByAltText('Brown Stew Chicken');
    expect(firstChickenFood).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });
});
