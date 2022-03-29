import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import MainMealRecipes from './pages/MainMealRecipes';
import MainDrinkRecipes from './pages/MainDrinkRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ MainMealRecipes } />
      <Route path="/drinks" component={ MainDrinkRecipes } />
    </Switch>
  );
}

export default App;
