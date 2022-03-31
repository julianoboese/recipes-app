import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl, history } from './helpers/renderUrl';
// import { fetchMealRandomly } from '../services/fetchMeals';
// import oneMeal from '../../cypress/mocks/oneMeal';
import '@testing-library/jest-dom';

describe('Explore Foods Screen', () => {
  beforeEach(() => renderUrl('/explore/foods'));
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
  // falta o mock pra testar o botão Surprise me!
});

describe('Explore Screen Drinks', () => {
  beforeEach(() => renderUrl('/explore/drinks'));
  it('On the explore drinks screen, there are only two buttons', () => {
    const exploreByIngredientBtn = screen
      .getByRole('button', { name: /By Ingredient/i });
    const surpriseMeBtn = screen.getByRole('button', { name: /Surprise me!/i });

    expect(exploreByIngredientBtn && surpriseMeBtn).toBeInTheDocument();
  });
  it('By Ingredient button redirects the user to /explore/drinks/ingredients', () => {
    const exploreByIngredientBtn = screen
      .getByRole('button', { name: /By Ingredient/i });
    userEvent.click(exploreByIngredientBtn);

    expect(history.location.pathname).toBe('/explore/drinks/ingredients');
  });
  // falta o mock pra testar o botão Surprise me!
});
