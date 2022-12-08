import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import fetchSearch from '../services/fetchSearch';
import ContextApp from './ContextApp';

export default function ContextAppProvider({ children }) {
  const [searchedMeals, setSearchedMeals] = useState([]);
  const [searchedDrinks, setSearchedDrinks] = useState([]);
  const [useDetails, setUseDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [searchOptions, setSearchOptions] = useState({
    inputSearch: '',
    radioChecked: 'ingredient',
  });

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const useFetchMeal = await fetchSearch('_', 'meals');
      const useFetchDrink = await fetchSearch('_', 'drink');
      setSearchedMeals(useFetchMeal);
      setSearchedDrinks(useFetchDrink);
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
