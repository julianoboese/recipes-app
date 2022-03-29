import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import RecipesProvider from './context/RecipesProvider';
import Login from './pages/Login';
import MainMealRecipes from './pages/MainMealRecipes';
import MainDrinkRecipes from './pages/MainDrinkRecipes';
import Explore from './pages/Explore';

function App() {
  return (
    <RecipesProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ MainMealRecipes } />
        <Route path="/drinks" component={ MainDrinkRecipes } />
        <Route path="/explore" component={ Explore } />
      </Switch>
    </RecipesProvider>
  );
}

export default App;
