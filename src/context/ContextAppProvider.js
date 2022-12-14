import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import Fetch from '../services/Fetch';
import ContextApp from './ContextApp';

export default function ContextAppProvider({ children }) {
  const [searchedMeals, setSearchedMeals] = useState([]);
  const [searchedDrinks, setSearchedDrinks] = useState([]);
  const [useDetails, setUseDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    inputSearch: '',
    radioChecked: 'ingredient',
  });
  const [click, setClick] = useState(0);
  const [btnName, setBtnName] = useState('');

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const useFetchMeal = await Fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'meals');
      const useFetchDrink = await Fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'drinks');
      const useMealsCategory = await Fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list', 'meals');
      const useDrinksCategory = await Fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', 'drinks');
      setSearchedMeals(useFetchMeal);
      setSearchedDrinks(useFetchDrink);
      setMealsCategory(useMealsCategory);
      setDrinksCategory(useDrinksCategory);
      setIsLoading(false);
    };
    getData();
  }, []);

  const value = useMemo(
    () => ({
      searchedMeals,
      setSearchedMeals,
      searchedDrinks,
      setSearchedDrinks,
      searchOptions,
      setSearchOptions,
      isLoading,
      setIsLoading,
      useDetails,
      setUseDetails,
      recommendations,
      setRecommendations,
      mealsCategory,
      drinksCategory,
      click,
      setClick,
      btnName,
      setBtnName,
    }),
    [
      searchedMeals,
      setSearchedMeals,
      searchedDrinks,
      setSearchedDrinks,
      searchOptions,
      setSearchOptions,
      isLoading,
      setIsLoading,
      useDetails,
      setUseDetails,
      recommendations,
      setRecommendations,
      mealsCategory,
      drinksCategory,
      click,
      setClick,
      btnName,
      setBtnName,
    ],
  );
  return (
    <ContextApp.Provider value={ value }>
      {children}
    </ContextApp.Provider>
  );
}

ContextAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
