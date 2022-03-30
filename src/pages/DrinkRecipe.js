import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchMeals } from '../services/fetchMeals';
import { fetchDrinkById } from '../services/fetchDrinks';
import RecomendCarousel from '../components/RecomendCarousel';
import StartRecipeBtn from '../components/StartRecipeBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';

function DrinkRecipe({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [recomendations, setRecomendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      const recomendationsReq = await fetchMeals();
      const MAX_CAROUSEL_RECOM = 6;
      setRecomendations(recomendationsReq.slice(0, MAX_CAROUSEL_RECOM));
      const responseRecipe = await fetchDrinkById(id);

      setRecipe(responseRecipe);

      const recipeIngredients = Object.entries(responseRecipe)
        .filter((entry) => entry[0].includes('strIngredient')
         && entry[1] !== (null)
         && entry[1] !== (''))
        .map((entry) => entry[1]);

      const recipeMeasure = Object.entries(responseRecipe)
        .filter((entry) => entry[0].includes('strMeasure')
         && entry[1] !== (null)
         && entry[1] !== (''))
        .map((entry) => entry[1]);

      setMeasure(recipeMeasure);
      setIngredients(recipeIngredients);
      setIsLoading(false);
    };
    getRecipe();
  }, [id]);

  const objToCarousel = recomendations.map((drink) => ({
    id: drink.idMeal,
    name: drink.strMeal,
    imgUrl: drink.strMealThumb,
    category: drink.strCategory,
  }));

  return (
    <main>
      {!isLoading && (
        <>
          <img
            className="mw-100"
            src={ recipe.strDrinkThumb }
            data-testid="recipe-photo"
            alt="imagem da receita"
          />

          <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
          <p data-testid="recipe-category">{recipe.strAlcoholic}</p>

          <FavoriteBtn recipe={ recipe } type="drink" />

          <ShareBtn type="drinks" id={ recipe.idDrink } />

          <div>
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ingredient} - ${measure[index]}`}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </div>

          <RecomendCarousel recomendations={ objToCarousel } loading={ isLoading } />

          <StartRecipeBtn type="cocktails" id={ recipe.idDrink } />
        </>
      )}
    </main>
  );
}

DrinkRecipe.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkRecipe;
