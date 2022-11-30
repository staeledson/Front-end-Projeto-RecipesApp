import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import ContextApp from '../context/ContextApp';

function Meals() {
  const { searchedMeals } = useContext(ContextApp);
  console.log(searchedMeals);
  return (
    <div>
      <h1>Meals Page</h1>
      <SearchBar />
      <div>
        {
          searchedMeals?.map((m) => (
            <div key={ m.idMeal }>
              <p>{m.idMeal}</p>
              <p>{m.strMeal}</p>
              <img src={ m.strMealThumb } className="search_img" alt={ m.strMeal } />
            </div>))
        }
      </div>
    </div>
  );
}

export default Meals;
