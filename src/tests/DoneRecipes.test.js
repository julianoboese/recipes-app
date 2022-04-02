// https://stackoverflow.com/questions/62351935/how-to-mock-navigator-clipboard-writetext-in-jest
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl } from './helpers/renderUrl';
import '@testing-library/jest-dom';

const SPICY_ARRABIATA_PENNE = 'Spicy Arrabiata Penne';

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: SPICY_ARRABIATA_PENNE,
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

describe('Explore Food Ingredients Screen', () => {
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

  it('should have two done recipes, one of each type', async () => {
    const foodName = await screen.findByText(SPICY_ARRABIATA_PENNE);
    const drinkName = await screen.findByText('Aquamarine');
    expect(foodName && drinkName).toBeInTheDocument();
    const foodBtn = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(foodBtn);
  });

  it('should copy the recipe\'s link to clipboard on share button click', async () => {
    jest.spyOn(navigator.clipboard, 'writeText');
    const foodBtn = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(foodBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('http://localhost:3000/foods/52771');
  });

  it('should show recipes according to filter selected', async () => {
    const allBtn = await screen.findByRole('button', { name: /All/i });
    const foodsBtn = await screen.findByRole('button', { name: /Food/i });
    const drinksBtn = await screen.findByRole('button', { name: /Drinks/i });
    let foodName = await screen.findByText(SPICY_ARRABIATA_PENNE);
    let drinkName = await screen.findByText('Aquamarine');
    expect(foodName && drinkName).toBeInTheDocument();
    userEvent.click(foodsBtn);
    expect(foodName).toBeInTheDocument();
    expect(drinkName).not.toBeInTheDocument();
    userEvent.click(drinksBtn);
    drinkName = await screen.findByText('Aquamarine');
    expect(drinkName).toBeInTheDocument();
    expect(foodName).not.toBeInTheDocument();
    userEvent.click(allBtn);
    foodName = await screen.findByText(SPICY_ARRABIATA_PENNE);
    expect(foodName && drinkName).toBeInTheDocument();
  });
});
