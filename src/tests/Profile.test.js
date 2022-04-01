import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderUrl } from './helpers/renderUrl';

describe('1-Desenvolva os testes unitários da página "Profile"', () => {
  it('Verifique se o email possui o atributo data-testid="profile-email"', () => {
    const { history } = renderUrl('/');
    history.push('/profile');
    const testIdEmail = screen.getByTestId('profile-email');
    expect(testIdEmail).toBeInTheDocument();
  });
  it('Verifique se Done Recipes possui o data-testid="profile-done-btn"', () => {
    const { history } = renderUrl('/');
    history.push('/profile');
    const testIdDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(testIdDoneRecipes).toBeInTheDocument();
  });
  it('Verifique se Favorite Recipes possui o data-testid="profile-favorite-btn"', () => {
    const { history } = renderUrl('/');
    history.push('/profile');
    const testIdFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(testIdFavoriteRecipes).toBeInTheDocument();
  });
  it('Verifique se Logout possui o data-testid="profile-logout-btn"', () => {
    const { history } = renderUrl('/');
    history.push('/profile');
    const testIdLogout = screen.getByTestId('profile-logout-btn');
    expect(testIdLogout).toBeInTheDocument();
  });
  it('Verifique se o botao Done Recipes redireciona corretamente', () => {
    const { history } = renderUrl('/');
    history.push('/profile');
    const buttonDoneRecipes = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(buttonDoneRecipes);
    expect(history.location.pathname).toBe('/done-recipes');
  });
  it('Verifique se o botao Favorite Recipes redireciona corretamente', () => {
    const { history } = renderUrl('/');
    history.push('/profile');
    const buttonFavRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(buttonFavRecipes);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Verifique se o botao Logout redireciona corretamente', () => {
    const { history } = renderUrl('/');
    history.push('/profile');
    const buttonLogout = screen.getByRole('button', { name: /logout/i });
    userEvent.click(buttonLogout);
    expect(history.location.pathname).toBe('/');
  });
});
