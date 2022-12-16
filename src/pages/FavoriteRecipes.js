import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import doneRecipesMock from '../services/mockMeals';

function FavoriteRecipes() {
  const history = useHistory();
  const magicTime = 1300;
  const [copyMessageMeal, setCopyMessageMeal] = useState(false);
  const [copyMessageDrink, setCopyMessageDrink] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const favoriteRecipesss = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const sendToLocalStorage = () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesss));
  };

  const getFavoriteRecipesLocalStorage = JSON.parse(localStorage
    .getItem('favoriteRecipes')) || [];

  const shareMeal = async (event) => {
    setCopyMessageMeal(true);
    const foodIndex = Number(event.target.alt);
    const filt = getFavoriteRecipesLocalStorage[foodIndex];
    await copy(`http://localhost:3000/${filt.type}s/${filt.id}`);
    setTimeout(() => { setCopyMessageMeal(false); }, magicTime);
  };

  const shareDrink = async (event) => {
    setCopyMessageDrink(true);
    const foodIndex = Number(event.target.alt);
    const filt = getFavoriteRecipesLocalStorage[foodIndex];
    await copy(`http://localhost:3000/${filt.type}s/${filt.id}`);
    setTimeout(() => { setCopyMessageDrink(false); }, magicTime);
  };

  useEffect(() => {
    setFavoriteRecipes(getFavoriteRecipesLocalStorage);
  }, []);

  const onlyDrinks = () => {
    const filter = getFavoriteRecipesLocalStorage
      .filter((drink) => drink.type === 'drink');
    setFavoriteRecipes(filter);
    console.log(filter);
  };

  const onlyMeals = () => {
    const filter = getFavoriteRecipesLocalStorage.filter((meal) => meal.type === 'meal');
    setFavoriteRecipes(filter);
    console.log(filter);
  };

  const mealsAndDrinks = () => {
    setFavoriteRecipes(getFavoriteRecipesLocalStorage);
  };

  const mealDetails = (event) => {
    const targets = (event.target.id);
    const filter = getFavoriteRecipesLocalStorage.filter((meal) => meal.name === targets);
    // console.log(filter);
    history.push(`/${filter[0].type}s/${filter[0].id}`);
    console.log(filter);
  };

  const drinkDetails = (event) => {
    // console.log(event.target.id);
    const targets = (event.target.id);
    const filter = getFavoriteRecipesLocalStorage
      .filter((drink) => drink.name === targets);
    history.push(`/${filter[0].type}s/${filter[0].id}`);
  };

  return (
    <div>
      {/* <Header /> */}
      <Header title="Favorite Recipes" />
      <br />
      <br />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ mealsAndDrinks }
      >
        ALL
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ onlyMeals }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ onlyDrinks }
      >
        Drinks
      </button>
      {(favoriteRecipes.length !== 0) && favoriteRecipes.map((meal, index) => (
        (meal.type === 'meal')
          ? (
            <div key={ `${meal} ${index}` }>
              <button
                // data-testid="botao"
                type="button"
                onClick={ (event) => mealDetails(event) }
              >
                <img
                  className="search_img"
                  data-testid={ `${index}-horizontal-image` }
                  src={ meal.image }
                  alt={ meal.name }
                  id={ meal.name }
                />
                <p
                  id={ meal.name }
                  data-testid={ `${index}-horizontal-name` }
                >
                  {meal.name}
                </p>
              </button>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {(meal.type === 'meal') ? `${meal.nationality} - ` : ''}
                {meal.category}
              </p>
              <p data-testid={ `${index}-horizontal-done-date` }>{meal.doneDate}</p>
              <input
                type="image"
                onClick={ (event) => shareMeal(event) }
                src={ shareIcon }
                alt={ index }
                data-testid={ `${index}-horizontal-share-btn` }
              />
              {copyMessageMeal === true ? <p>Link copied!</p> : ''}
              <p />
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                alt="favorite-btn"
                src={ blackHeartIcon }
              />
              <br />
            </div>
          )
          : ''
      ))}
      {favoriteRecipes.map((drink, index) => (
        (drink.type === 'drink') ? (
          <div key={ drink.id }>
            <button
              onClick={ drinkDetails }
              type="button"
            >
              <img
                id={ drink.name }
                className="search_img"
                data-testid={ `${index}-horizontal-image` }
                src={ drink.image }
                alt="food"
              />
              <p
                id={ drink.name }
                data-testid={ `${index}-horizontal-name` }
              >
                {drink.name}
              </p>
            </button>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              {drink.category}
              {' - '}
              {drink.alcoholicOrNot}
            </p>
            <p>{drink.alcoholicOrNot}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>{drink.doneDate}</p>
            <input
              type="image"
              onClick={ (event) => shareDrink(event) }
              src={ shareIcon }
              alt={ index }
              data-testid={ `${index}-horizontal-share-btn` }
            />
            {copyMessageDrink === true ? <p>Link copied!</p> : ''}
            <p />
            <input
              type="image"
              src={ blackHeartIcon }
              alt={ index }
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </div>
        ) : ''
      ))}
      <div />
      <button
        type="button"
        onClick={ sendToLocalStorage }
      >
        sendToLocalStorage
      </button>
    </div>
  );
}

export default FavoriteRecipes;
