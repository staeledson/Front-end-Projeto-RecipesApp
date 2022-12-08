import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import fetchCategory from '../services/fetchCategory';
import fetchSearch from '../services/fetchSearch';
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

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const useFetchMeal = await fetchSearch('_', 'meals');
      const useFetchDrink = await fetchSearch('_', 'drink');
      const useMealsCategory = await fetchCategory('meals');
      const useDrinksCategory = await fetchCategory('drinks');
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
