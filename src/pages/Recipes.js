import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ContextApp from '../context/ContextApp';

function Recipes() {
  // const arr = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16];
  // const alert = 'Sorry, we haven`t found any recipes for these filters.';
  const magicTwelve = 12;
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
      <div>
        {pathname === '/meals'
          && searchedMeals?.map((m, index) => (
            index < magicTwelve
            && (
              <div data-testid={ `${index}-recipe-card` } key={ m.idMeal }>
                <p>{m.idMeal}</p>
                <p data-testid={ `${index}-card-name` }>{m.strMeal}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ m.strMealThumb }
                  className="search_img"
                  alt={ m.strMeal }
                />
              </div>
            )
          ))}
      </div>
      <div>
        {pathname === '/drinks'
          && searchedDrinks?.map((d, index) => (
            index < magicTwelve
            && (
              <div data-testid={ `${index}-recipe-card` } key={ d.idDrink }>
                <p data-testid={ `${index}-card-name` }>{d.strDrink}</p>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ d.strDrinkThumb }
                  alt="img"
                />
              </div>
            )
          ))}
      </div>
      {/* {arr.map((ar, index) => {
        if (index < 5) {
          return <p key={ index }>{ar}</p>;
        }
      })} */}
    </div>
  );
}

export default Recipes;

// {/* <p>{m.idMeal}</p>
// <p>{m.strMeal}</p>
// <img src={ m.strMealThumb } className="search_img" alt={ m.strMeal } /> */}

// {/* <div key={ d.idDrink }>
//               <p>{d.strDrink}</p>
//               <img src={ d.strDrinkThumb } alt="img" />
//             </div> */}
