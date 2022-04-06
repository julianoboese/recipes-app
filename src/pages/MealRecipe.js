import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { fetchMealById } from '../services/fetchMeals';
import embedYoutubeUrl from '../helpers/toEmbedYoutube';
import { fetchDrinks } from '../services/fetchDrinks';
import RecomendCarousel from '../components/RecomendCarousel';
import StartRecipeBtn from '../components/StartRecipeBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import FoodDetailsStyled from '../default_styles/FoodDetailsStyle';
import Home from '../components/Home';

function MealRecipe({ match: { params: { id } }, history }) {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [recomendations, setRecomendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      const recomendationsReq = await fetchDrinks();
      const MAX_CAROUSEL_RECOM = 6;
      setRecomendations(recomendationsReq.slice(0, MAX_CAROUSEL_RECOM));
      const responseRecipe = await fetchMealById(id);
      if (responseRecipe) {
        setYoutubeUrl(embedYoutubeUrl(responseRecipe.strYoutube));

        setRecipe(responseRecipe);

        const recipeIngredients = Object.entries(responseRecipe)
          .filter((entry) => entry[0].includes('strIngredient')
            && entry[1] !== ('')
            && entry[1] !== (null))
          .map((entry) => entry[1]);

        const recipeMeasure = Object.entries(responseRecipe)
          .filter((entry) => entry[0].includes('strMeasure')
            && entry[1] !== ('')
            && entry[1] !== (null))
          .map((entry) => entry[1]);

        setMeasure(recipeMeasure);
        setIngredients(recipeIngredients);
      }
      setIsLoading(false);
    };
    getRecipe();
  }, [id]);

  const objToCarousel = recomendations.map((drink) => ({
    id: drink.idDrink,
    name: drink.strDrink,
    imgUrl: drink.strDrinkThumb,
    category: drink.strAlcoholic,
  }));

  return (
    <FoodDetailsStyled>
      {!isLoading && (
        <>
          <Home history={ history } />
          <section className="header-title">
            <img
              className="food-thumbnail"
              src={ recipe.strMealThumb }
              data-testid="recipe-photo"
              alt="imagem da receita"
            />
            <div className="title-box">
              <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
              ●
              <p data-testid="recipe-category">{recipe.strCategory}</p>
            </div>
          </section>

          <section className="action-buttons">
            <FavoriteBtn recipe={ recipe } type="food" />
            <ShareBtn type="foods" id={ recipe.idMeal || '' } />
          </section>

          <section className="ingredients-section">
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
          </section>

          <section className="instructions-section">
            <h3>Instructions</h3>
            <p data-testid="instructions">{recipe.strInstructions}</p>
          </section>

          <div className="video-section">
            <h3>Video</h3>
            <iframe
              data-testid="video"
              width="340"
              height="315"
              src={ youtubeUrl }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture"
              allowFullScreen
            />
          </div>

          <RecomendCarousel recomendations={ objToCarousel } loading={ isLoading } />

          <StartRecipeBtn type="meals" id={ recipe.idMeal } />
        </>)}
    </FoodDetailsStyled>
  );
}

MealRecipe.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default MealRecipe;
