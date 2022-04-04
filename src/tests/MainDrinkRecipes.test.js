import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl } from './helpers/renderUrl';
import { drinksMock } from './mocks/drinkMocks';
import '@testing-library/jest-dom';
import { drinksByIngredientMock } from './mocks/ingredientsMocks';
import { drinkCategoriesMock } from './mocks/categoriesMocks';

describe('MainDrinkRecipes screen', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should render drinks on page load', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksMock),
    });

    renderUrl('./drinks');

    const firstDrink = await screen.findByAltText('A1');
    expect(firstDrink).toBeInTheDocument();
  });

  it('should filter by categories', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinkCategoriesMock)
        .mockResolvedValueOnce(drinkCategoriesMock)
        .mockResolvedValueOnce(drinksMock)
        .mockResolvedValue(drinksByIngredientMock),
    });

    renderUrl('./drinks');

    const shakeBtn = await screen.findByRole('button', { name: 'Shake' });
    expect(shakeBtn).toBeInTheDocument();

    userEvent.click(shakeBtn);

    const firstShakeDrink = await screen.findByAltText('151 Florida Bushwacker');
    expect(firstShakeDrink).toBeInTheDocument();
  });
});

describe('Search button', () => {
  it('should show search bar', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksMock),
    });

    renderUrl('./drinks');

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
      json: jest.fn().mockResolvedValueOnce(drinksMock)
        .mockResolvedValue(drinksByIngredientMock),
    });

    renderUrl('./drinks');

    const searchBtn = await screen.findByAltText('ícone de pesquisa');
    userEvent.click(searchBtn);

    const ingredientRadio = screen.getByLabelText('Ingredient');
    userEvent.click(ingredientRadio);

    const input = screen.getByPlaceholderText('Search Recipe');
    userEvent.type(input, 'light rum');

    const doSearchBtn = screen.getByRole('button', { name: 'Search' });
    userEvent.click(doSearchBtn);

    const firstRumDrink = await screen.findByAltText('151 Florida Bushwacker');
    expect(firstRumDrink).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
  });
});
