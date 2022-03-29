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

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ MainMealRecipes } />
        <Route exact path="/drinks" component={ MainDrinkRecipes } />
        <Route exact path="/foods/:recipeId/in-progress" component={ MealInProgress } />
        <Route exact path="/drinks/:recipeId/in-progress" component={ DrinkInProgress } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
