import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ContextApp from '../context/ContextApp';
import Fetch from '../services/Fetch';

function Recipes() {
  const magicTwelve = 12;
  const magicFive = 5;
  const { searchedMeals, searchedDrinks, isLoading, mealsCategory,
    drinksCategory, setSearchedMeals, setSearchedDrinks,
    setIsLoading } = useContext(ContextApp);
  const history = useHistory();
  const { pathname } = history.location;
  const getCategory = pathname === '/meals' ? mealsCategory : drinksCategory;

  if (pathname === '/drinks' && searchedDrinks.length === 1) {
    history.push(`/drinks/${searchedDrinks.map((info) => info.idDrink)}`);
  }
  if (pathname === '/meals' && searchedMeals.length === 1) {
    history.push(`/meals/${searchedMeals.map((info) => info.idMeal)}`);
  }

  const handleClick = ({ target: { id } }) => {
    if (pathname === '/meals') {
      const getCategories = async () => {
        setIsLoading(true);
        const categoryMeal = await Fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`, 'meals');
        setSearchedMeals(categoryMeal);
        setIsLoading(false);
      };
      getCategories();
    } else {
      const getCategories = async () => {
        setIsLoading(true);
        const categoryDrink = await Fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`, 'drinks');
        setSearchedDrinks(categoryDrink);
        setIsLoading(false);
      };
      getCategories();
    }
  };

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
                  onClick={ handleClick }
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
