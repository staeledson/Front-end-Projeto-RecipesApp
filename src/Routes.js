import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      {/* <Route exact path="/meals/recipedetails" component={ RecipeDetails } />
      <Route exact path="/drinks/recipedetails" component={ RecipeDetails } /> */}
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}
