import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ContextApp from '../context/ContextApp';

function Recipes() {
  const { searchedMeals, searchedDrinks } = useContext(ContextApp);
  const history = useHistory();
  const { pathname } = history.location;

  console.log(pathname);
  return (
    <div>
      <h1>Recipes Page</h1>
      <SearchBar />
      <div>
        {pathname === '/meals'
          && searchedMeals?.map((m) => (
            <div key={ m.idMeal }>
              <p>{m.idMeal}</p>
              <p>{m.strMeal}</p>
              <img src={ m.strMealThumb } className="search_img" alt={ m.strMeal } />
            </div>))}
      </div>
      <div>
        {pathname === '/drinks'
          && searchedDrinks?.map((d) => (
            <div key={ d.idIngredient }>
              <p>{d.idIngredient}</p>
              <p>{d.strIngredient}</p>
              <p>{d.strDescription}</p>
              <p>{d.strType}</p>
              <p>{d.strAlcohol}</p>
              <p>{d.strABV}</p>
            </div>))}
      </div>
    </div>
  );
}

export default Recipes;
