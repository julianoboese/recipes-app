import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import MainMealRecipes from './pages/MainMealRecipes';
import MainDrinkRecipes from './pages/MainDrinkRecipes';
import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ MainMealRecipes } />
        <Route path="/drinks" component={ MainDrinkRecipes } />
        <Route exact path="/explore" component={ Explore } />
        <Route path="/explore/foods" component={ ExploreFoods } />
        <Route path="/explore/drinks" component={ ExploreFoods } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
