import PropTypes from 'prop-types';
import React from 'react';

function Profile({ history }) {
  const getEmail = () => {
    const jsonUser = JSON.parse(localStorage.getItem('user'));
    console.log(jsonUser);
    return jsonUser.email;
  };

  const redirectDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const redirectFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const redirectLoginPage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <p data-testid="profile-email">
        { getEmail() }
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ redirectDoneRecipes }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ redirectFavoriteRecipes }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ redirectLoginPage }
      >
        Logout
      </button>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
