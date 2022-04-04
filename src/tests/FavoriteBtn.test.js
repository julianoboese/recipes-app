import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl } from './helpers/renderUrl';
import '@testing-library/jest-dom';

describe('Favorite Button - add favorites', () => {
  it('should add recipe to favorites on button click', async () => {
    renderUrl('/foods/52771');

    const notFavoriteBtn = await screen.findByAltText('ícone de não favorito');
    const favoriteBtn = screen.queryByAltText('ícone de favorito');
    expect(localStorage.getItem('favoriteRecipes')).toBeNull();
    expect(notFavoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).not.toBeInTheDocument();

    userEvent.click(notFavoriteBtn);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')))
      .toEqual([{ id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' }]);
  });

  it('should add another recipe to favorites on button click', async () => {
    renderUrl('/drinks/178319');
    const notFavoriteBtn = await screen.findByAltText('ícone de não favorito');

    userEvent.click(notFavoriteBtn);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')))
      .toEqual([{ id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg' },
      { id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg' }]);
  });
});

describe('Favorite Button - remove favorite', () => {
  it('should remove recipe from favorites on button click', async () => {
    renderUrl('/foods/52771');

    const favoriteBtn = await screen.findByAltText('ícone de favorito');
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes')))
      .toEqual([{ id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg' }]);
  });
});
