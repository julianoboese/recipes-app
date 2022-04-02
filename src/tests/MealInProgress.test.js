import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl, history } from './helpers/renderUrl';
import { oneMealMock } from './mocks/mealMocks';
import '@testing-library/jest-dom';

describe('Meal In Progress Screen', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMealMock),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the recipe data', async () => {
    renderUrl('/foods/52771/in-progress');
    const recipeName = await screen
      .findByRole('heading', { name: /Spicy Arrabiata Penne/i });
    expect(recipeName).toBeInTheDocument();
    const ingredients = await screen.findAllByRole('checkbox');
    const INGREDIENTS_LENGTH = 8;
    expect(ingredients).toHaveLength(INGREDIENTS_LENGTH);
    expect(ingredients[0].parentNode).toHaveTextContent('penne rigate');
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771');
  });

  it('should enable the finish button after the ingredients are checked', async () => {
    renderUrl('/foods/52771/in-progress');
    const finishBtn = await screen.findByRole('button', { name: /Finish/i });
    const ingredients = await screen.findAllByRole('checkbox');
    ingredients.forEach((ingredient) => {
      expect(finishBtn).toBeDisabled();
      userEvent.click(ingredient);
    });
    expect(finishBtn).not.toBeDisabled();
    userEvent.click(ingredients[0]);
    expect(finishBtn).toBeDisabled();
    userEvent.click(ingredients[0]);
    userEvent.click(finishBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  });
});
