import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealCard from '../components/MealCard';
import {
  fetchMealCountries,
  fetchMealByCountry,
  fetchMeals,
} from '../services/fetchMeals';

function ExploreNationality({ history, location }) {
  const [allCountries, setAllCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState('All');
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const loadAllCountries = async () => {
      const countries = await fetchMealCountries();
      setAllCountries([{ strArea: 'All' }, ...countries]);
    };
    loadAllCountries();
  }, []);

  useEffect(() => {
    const loadAllRecipes = async () => {
      if (currentCountry === 'All') {
        const recipes = await fetchMeals();
        setAllRecipes(recipes);
      } else {
        const recipes = await fetchMealByCountry(currentCountry);
        setAllRecipes(recipes);
      }
    };
    loadAllRecipes();
  }, [currentCountry]);

  return (
    <div>
      <Header location={ location.pathname } history={ history } />
      <main>
        <select
          data-testid="explore-by-nationality-dropdown"
          value={ currentCountry }
          onChange={ ({ target }) => setCurrentCountry(target.value) }
        >
          {allCountries.map(({ strArea }) => (
            <option
              key={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          ))}
        </select>
        { allRecipes.map((meal, index) => (
          <MealCard key={ meal.idMeal } meal={ meal } index={ index } />
        ))}
      </main>
      <Footer />
    </div>
  );
}

ExploreNationality.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default ExploreNationality;
