import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import MainMealRecipes from './pages/MainMealRecipes';
import MainDrinkRecipes from './pages/MainDrinkRecipes';
import MealInProgress from './pages/MealInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreNationality from './pages/ExploreNationality';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ MainMealRecipes } />
        <Route exact path="/drinks" component={ MainDrinkRecipes } />
        <Route exact path="/foods/:recipeId/in-progress" component={ MealInProgress } />
        <Route exact path="/drinks/:recipeId/in-progress" component={ DrinkInProgress } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreFoods } />
        <Route path="/explore/foods/ingredients" component={ ExploreIngredients } />
        <Route path="/explore/drinks/ingredients" component={ ExploreIngredients } />
        <Route path="/explore/foods/nationalities" component={ ExploreNationality } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
