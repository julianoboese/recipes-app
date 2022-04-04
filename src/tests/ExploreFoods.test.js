// https://stackoverflow.com/questions/62771257/return-different-data-in-different-mock-api-calls-in-jest
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl, history } from './helpers/renderUrl';
import { oneMealMock, randomMealMock } from './mocks/mealMocks';
import { oneDrinkMock, randomDrinkMock } from './mocks/drinkMocks';
import '@testing-library/jest-dom';
import carouselDrinksMock from './mocks/carouselDrinksMock';
import carouselMealsMock from './mocks/carouselMealsMock';
// import { drinkIngredientsMock, mealIngredientsMock } from './mocks/ingredientsMocks';
// import nationalitiesMock from './mocks/nationalitiesMock';

describe('Explore Foods Screen, by ingredient and nationality', () => {
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
  // it('By Ingredient button redirects to /explore/foods/ingredients', async () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(mealIngredientsMock),
  //   });

  //   const exploreByIngredientBtn = screen
  //     .getByRole('button', { name: /By Ingredient/i });
  //   userEvent.click(exploreByIngredientBtn);
  //   waitFor(() => expect(screen.getByText('Chicken')).toBeInTheDocument());
  //   console.log(screen.getByText('Chicken'));

  //   expect(global.fetch).toHaveBeenCalled();
  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  //   expect(history.location.pathname).toBe('/explore/foods/ingredients');
  // });

  // it('By Nationality button redirects to /explore/foods/nationalities', async () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValueOnce(nationalitiesMock)
  //       .mockResolvedValueOnce(mealsMock),
  //   });

  //   const exploreByNationalityBtn = screen
  //     .getByRole('button', { name: /By Nationality/i });
  //   userEvent.click(exploreByNationalityBtn);
  //   await waitFor(() => expect(screen.getByTestId('explore-by-nationality-dropdown'))
  //     .toBeInTheDocument());

  //   expect(global.fetch).toHaveBeenCalled();
  //   expect(global.fetch).toHaveBeenCalledTimes(2);
  //   expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
  //   expect(history.location.pathname).toBe('/explore/foods/nationalities');
  // });
});

describe('Explore Foods Screen, surprise me', () => {
  beforeEach(() => {
    renderUrl('/explore/foods');
    jest.clearAllMocks();
  });
  it('Surprise me! button redirects the user to a random food', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(randomMealMock)
        .mockResolvedValueOnce(carouselDrinksMock)
        .mockResolvedValueOnce(oneMealMock),
    });
    const surpriseMeBtn = screen
      .getByRole('button', { name: /Surprise me!/i });
    userEvent.click(surpriseMeBtn);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/random.php');

    await waitForElementToBeRemoved(() => screen
      .queryByRole('button', { name: /Surprise me!/i }));

    const TIMES_CALLED = 3;
    expect(global.fetch).toHaveBeenCalledTimes(TIMES_CALLED);
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53058');
    expect(history.location.pathname).toBe('/foods/53058');
  });
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
  // it('By Ingredient button redirects to /explore/drinks/ingredients', async () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValueOnce(drinkIngredientsMock),
  //   });
  //   const exploreByIngredientBtn = screen
  //     .getByRole('button', { name: /By Ingredient/i });
  //   userEvent.click(exploreByIngredientBtn);

  //   await waitFor(() => expect(screen.getByText('Applejack')).toBeInTheDocument());

  //   expect(global.fetch).toHaveBeenCalled();
  //   expect(global.fetch).toHaveBeenCalledTimes(1);
  //   expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  //   expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  // });
  it('Surprise me! button redirects the user to a random drink', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(randomDrinkMock)
        .mockResolvedValueOnce(carouselMealsMock)
        .mockResolvedValueOnce(oneDrinkMock),
    });
    const surpriseMeBtn = screen
      .getByRole('button', { name: /Surprise me!/i });
    userEvent.click(surpriseMeBtn);

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/random.php');

    await waitForElementToBeRemoved(() => screen
      .queryByRole('button', { name: /Surprise me!/i }));

    const TIMES_CALLED = 3;
    expect(global.fetch).toHaveBeenCalledTimes(TIMES_CALLED);
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997');
    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
