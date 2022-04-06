import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import DoneCard from '../components/DoneCard';
import Header from '../components/Header';
import FavoriteNDoneStyled from '../default_styles/FavoriteNDoneStyle';

function DoneRecipes({ history, location }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    const storedDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipes(storedDoneRecipes);
  }, []);

  return (
    <div>
      <Header location={ location.pathname } history={ history } />
      <FavoriteNDoneStyled>
        <section className="filter-section">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            onClick={ () => setTypeFilter('') }
            className="filter-item"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            onClick={ () => setTypeFilter('food') }
            className="filter-item"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            onClick={ () => setTypeFilter('drink') }
            className="filter-item"
          >
            Drinks
          </button>
        </section>
        <section className="card-section">
          {doneRecipes.filter((recipe) => {
            if (!typeFilter) {
              return true;
            }
            return recipe.type === typeFilter;
          }).map((recipe, index) => (
            <DoneCard recipe={ recipe } index={ index } key={ recipe.id } />
          ))}
        </section>
      </FavoriteNDoneStyled>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default DoneRecipes;
