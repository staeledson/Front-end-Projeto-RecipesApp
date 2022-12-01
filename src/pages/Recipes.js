import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ContextApp from '../context/ContextApp';

function Recipes() {
  const { searchedMeals, searchedDrinks } = useContext(ContextApp);
  const history = useHistory();
  const { pathname } = history.location;

  if (pathname === '/drinks' && searchedDrinks.length === 1) {
    history.push(`/drinks/:${searchedDrinks[0].idIngredient}`);
  }
  if (pathname === '/meals' && searchedMeals?.length === 1) {
    history.push(`/meals/:${searchedMeals[0].idMeal}`);
  }

  return (
    <div>
      <Header />
      <SearchBar />
      <div>
        {/* {pathname === '/meals'
          && searchedMeals?.map((m, index) => (
            <div key={ index }>
              <p>{m.idMeal}</p>
              <p>{m.strMeal}</p>
              <img src={ m.strMealThumb } className="search_img" alt={ m.strMeal } />
            </div>))} */}
      </div>
      <div>
        {pathname === '/drinks'
          && searchedDrinks?.map((d) => (
            <div key={ d.idDrink }>
              <p>{d.strDrink}</p>
              <img src={ d.strDrinkThumb } alt="img" />
              {/* <p>{d.strIngredient}</p>
              <p>{d.strDescription}</p>
              <p>{d.strType}</p>
              <p>{d.strAlcohol}</p>
              <p>{d.strABV}</p> */}
            </div>))}
      </div>
    </div>
  );
}

export default Recipes;
