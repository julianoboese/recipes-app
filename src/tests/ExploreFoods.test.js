// https://stackoverflow.com/questions/62771257/return-different-data-in-different-mock-api-calls-in-jest
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl, history } from './helpers/renderUrl';
// import { fetchMealRandomly } from '../services/fetchMeals';
import { oneMealMock, mealsMock, randomMealMock } from './mocks/mealMocks';
import { oneDrinkMock, drinksMock, randomDrinkMock } from './mocks/drinkMocks';
import '@testing-library/jest-dom';

describe('Explore Foods Screen', () => {
  beforeEach(() => {
    renderUrl('/explore/foods');
    jest.clearAllMocks();
  });
  it('On the explore foods screen, there are three buttons', () => {
    const exploreByIngredientBtn = screen
      .getByRole('button', { name: /By Ingredient/i });
    const exploreByNationalityBtn = screen
      .getByRole('button', { name: /By Nationality/i });
    const surpriseMeBtn = screen.getByRole('button', { name: /Surprise me!/i });

    expect(exploreByIngredientBtn && exploreByNationalityBtn && surpriseMeBtn)
      .toBeInTheDocument();
  });
  it('By Ingredient button redirects the user to /explore/foods/ingredients', () => {
    const exploreByIngredientBtn = screen
      .getByRole('button', { name: /By Ingredient/i });
    userEvent.click(exploreByIngredientBtn);

    expect(history.location.pathname).toBe('/explore/foods/ingredients');
  });
  it('By Nationality button redirects the user to /explore/foods/nationalities', () => {
    const exploreByNationalityBtn = screen
      .getByRole('button', { name: /By Nationality/i });
    userEvent.click(exploreByNationalityBtn);

    expect(history.location.pathname).toBe('/explore/foods/nationalities');
  });
  it('Surprise me! button redirects the user to a random food', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(randomMealMock)
        .mockResolvedValueOnce(drinksMock)
        .mockResolvedValueOnce(oneMealMock),
    });
    const surpriseMeBtn = screen
      .getByRole('button', { name: /Surprise me!/i });
    userEvent.click(surpriseMeBtn);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');
    // await waitFor(() => expect(history.location.pathname).toBe('/foods/53058'));
  });
  // falta o mock pra testar o botão Surprise me!
});

describe('Explore Screen Drinks', () => {
  beforeEach(() => {
    renderUrl('/explore/drinks');
    jest.clearAllMocks();
  });
  it('On the explore drinks screen, there are only two buttons', () => {
    const exploreByIngredientBtn = screen
      .getByRole('button', { name: /By Ingredient/i });
    const surpriseMeBtn = screen.getByRole('button', { name: /Surprise me!/i });

    expect(exploreByIngredientBtn && surpriseMeBtn).toBeInTheDocument();
  });
  it('By Ingredient button redirects the user to /explore/drinks/ingredients', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinksMock),
    });
    const exploreByIngredientBtn = screen
      .getByRole('button', { name: /By Ingredient/i });
    userEvent.click(exploreByIngredientBtn);

    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });
  it('Surprise me! button redirects the user to a random drink', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(randomDrinkMock)
        .mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(oneDrinkMock),
    });
    const surpriseMeBtn = screen
      .getByRole('button', { name: /Surprise me!/i });
    userEvent.click(surpriseMeBtn);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    // await waitFor(() => expect(history.location.pathname).toBe('/drinks/15997'));
  });
});
