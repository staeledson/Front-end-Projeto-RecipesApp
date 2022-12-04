import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      {/* <Route exact path="/meals/:id-da-receita" component={ RecipeDetails } /> */}
      {/* <Route exact path="/drinks/:id-da-receita" component={ RecipeDetails } /> */}
      <Route exact path="/meals/recipedetails" component={ RecipeDetails } />
      <Route exact path="/drinks/recipedetails" component={ RecipeDetails } />
      {/* <Route exact path="/meals/:id-da-receita/in-progress" /> */}
      {/* <Route exact path="/drinks/:id-da-receita/in-progress" /> */}
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}
