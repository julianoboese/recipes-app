import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile({ history, location }) {
  const getEmail = () => {
    const jsonUser = JSON.parse(localStorage.getItem('user')) || { email: '' };
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
    <>
      <Header history={ history } location={ location.pathname } />
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
        <Footer />
      </div>
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Profile;
