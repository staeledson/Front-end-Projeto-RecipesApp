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
    setIsLoading, click, setClick, btnName, setBtnName } = useContext(ContextApp);
  const history = useHistory();
  const { pathname } = history.location;
  const recipes = pathname === '/meals' ? searchedMeals.slice(0, magicTwelve)
    : searchedDrinks.slice(0, magicTwelve);
  const category = pathname === '/meals' ? mealsCategory.slice(0, magicFive)
    : drinksCategory.slice(0, magicFive);

  if (pathname === '/drinks' && searchedDrinks.length === 1 && click === 0) {
    history.push(`/drinks/${searchedDrinks.map((info) => info.idDrink)}`);
  }
  if (pathname === '/meals' && searchedMeals.length === 1 && click === 0) {
    history.push(`/meals/${searchedMeals.map((info) => info.idMeal)}`);
  }

  const handleClickAll = () => {
    if (pathname === '/meals') {
      const getData = async () => {
        setIsLoading(true);
        const useFetchMeal = await Fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
        setSearchedMeals(useFetchMeal);
        setIsLoading(false);
      };
      getData();
    } else {
      const getData = async () => {
        setIsLoading(true);
        const useFetchDrink = await Fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
        setSearchedDrinks(useFetchDrink);
        setIsLoading(false);
      };
      getData();
    }
  };

  const handleClick = ({ target: { id } }) => {
    setClick(1);
    if (btnName === '' || btnName !== id) {
      setBtnName(id);
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
    } else if (btnName === id) {
      handleClickAll();
      setBtnName('');
    }
  };

  return (
    <div>
      <Header title={ pathname === '/meals' ? 'Meals' : 'Drinks' } />
      {isLoading && <h3>Loading...</h3>}
      {!isLoading
      && category.map((btn) => (
        <button
          key={ btn.strCategory }
          type="button"
          data-testid={ `${btn.strCategory}-category-filter` }
          id={ btn.strCategory }
          onClick={ handleClick }
        >
          {btn.strCategory}
        </button>))}
      {!isLoading
      && (
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ handleClickAll }
        >
          All
        </button>)}
      {!isLoading
      && pathname === '/meals'
        ? (
          recipes.map((m, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
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
            </div>)))
        : (
          recipes.map((d, index) => (
            <div data-testid={ `${index}-recipe-card` } key={ index }>
              <p data-testid={ `${index}-card-name` }>{d.strDrink}</p>
              <Link to={ `/drinks/${d.idDrink}` } className="link-drinks">
                <img
                  data-testid={ `${index}-card-img` }
                  src={ d.strDrinkThumb }
                  alt="img"
                />
              </Link>
            </div>)))}
      <Footer />
    </div>
  );
}

export default Recipes;
