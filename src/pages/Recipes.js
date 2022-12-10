import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ContextApp from '../context/ContextApp';

function Recipes() {
  const magicTwelve = 12;
  const magicFive = 5;
  const { searchedMeals, searchedDrinks, isLoading, mealsCategory,
    drinksCategory } = useContext(ContextApp);
  const history = useHistory();
  const { pathname } = history.location;
  const getCategory = pathname === '/meals' ? mealsCategory : drinksCategory;

  if (pathname === '/drinks' && searchedDrinks.length === 1 && !isLoading) {
    history.push(`/drinks/${searchedDrinks[0].idDrink}`);
  }
  if (pathname === '/meals' && searchedMeals?.length === 1 && !isLoading) {
    history.push(`/meals/${searchedMeals[0].idMeal}`);
  }

  return (
    <div>
      <Header title={ pathname === '/meals' ? 'Meals' : 'Drinks' } />
      {isLoading && <h3>Loading...</h3>}
      {getCategory.map((btn, index) => (
        index < magicFive
              && (
                <button
                  key={ index }
                  type="button"
                  data-testid={ `${btn.strCategory}-category-filter` }
                  id={ btn.strCategory }
                >
                  {btn.strCategory}
                </button>)))}
      {pathname === '/meals' && searchedMeals.map((m, index) => (
        index < magicTwelve
            && (
              <div data-testid={ `${index}-recipe-card` } key={ m.idMeal }>
                <p>{m.idMeal}</p>
                <p data-testid={ `${index}-card-name` }>{m.strMeal}</p>
                <Link to={ `/meals/${m.idMeal}` } className="link-drinks">
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ m.strMealThumb }
                    className="search_img"
                    alt={ m.strMeal }
                  />
                </Link>
              </div>
            )
      ))}
      {pathname === '/drinks'
          && searchedDrinks.map((d, index) => (
            index < magicTwelve
            && (
              <div data-testid={ `${index}-recipe-card` } key={ d.idDrink }>
                <p data-testid={ `${index}-card-name` }>{d.strDrink}</p>
                <Link to={ `/drinks/${d.idDrink}` } className="link-drinks">
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ d.strDrinkThumb }
                    alt="img"
                  />
                </Link>
              </div>
            )
          ))}
      <Footer />
    </div>
  );
}

export default Recipes;
