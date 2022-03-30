import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import MainMealRecipes from './pages/MainMealRecipes';
import MainDrinkRecipes from './pages/MainDrinkRecipes';
import MealRecipe from './pages/MealRecipe';
import DrinkRecipe from './pages/DrinkRecipe';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods/:id" render={ (props) => <MealRecipe { ...props } /> } />
        <Route path="/foods" component={ MainMealRecipes } />
        <Route path="/drinks/:id" render={ (props) => <DrinkRecipe { ...props } /> } />
        <Route path="/drinks" component={ MainDrinkRecipes } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
