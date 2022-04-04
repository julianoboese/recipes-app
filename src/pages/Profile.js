import PropTypes from 'prop-types';
import React from 'react';
import md5 from 'crypto-js/md5';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileStyled from '../default_styles/ProfileStyle';

function Profile({ history, location }) {
  const getEmail = () => {
    const jsonUser = JSON.parse(localStorage.getItem('user')) || { email: '' };
    return jsonUser.email;
  };

  const getGravatar = () => {
    const jsonUser = JSON.parse(localStorage.getItem('user')) || { email: '' };
    const hashGenerated = md5(jsonUser.email).toString();
    const sourceGravatar = `https://www.gravatar.com/avatar/${hashGenerated}`;
    return sourceGravatar;
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
      <ProfileStyled>
        <section className="profile">
          <img src={ getGravatar() } alt="Gravatar profile" className="image-gravatar" />
          <p data-testid="profile-email" className="email">
            { getEmail() }
          </p>
        </section>
        <section className="btn-section">
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
        </section>
      </ProfileStyled>
      <Footer />
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
