import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import fetchDetails from '../services/fetchDetails';
import fetchSearch from '../services/fetchSearch';
import ContextApp from '../context/ContextApp';

function RecipeDetails() {
  const [useDetails, setUseDetails] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  const { setRecommendations } = useContext(ContextApp);

  const getDetailsInfo = () => {
    const mealsMagic = 7;
    const drinksMagic = 8;
    if (pathname.includes('/meals')) {
      return {
        id: pathname.substring(mealsMagic),
        type: 'meals',
      };
    }
    if (pathname.includes('/drinks')) {
      return {
        id: pathname.substring(drinksMagic),
        type: 'drinks',
      };
    }
  };

  useEffect(() => {
    const getDet = async () => {
      const a = await fetchDetails(getDetailsInfo());
      setUseDetails(a);
    };
    const getrecommendations = async () => {
      let r = {};
      if (pathname.includes('/meals')) {
        r = await fetchSearch({}, 'drinks');
        setRecommendations(r);
      }
      if (pathname.includes('/drinks')) {
        r = await fetchSearch({}, 'meals');
        setRecommendations(r);
      }
      console.log(r);
    };
    getDet();
    getrecommendations();
  }, []);

  const valuesApi = (obj, name) => Object.entries(obj)
    .reduce((acc, [key, value]) => (
      value && key.includes(name) ? [...acc, { k: value }] : acc), []);

  let ingredients = {};
  let measure = {};

  if (useDetails[0]) {
    ingredients = valuesApi(useDetails[0], 'strIngredient');
    measure = valuesApi(useDetails[0], 'strMeasure');
  }

  return (
    <div>
      <h1>Recipe Details</h1>
      <div>
        {useDetails.map((m, index) => (
          <div key={ index }>
            <img
              src={ m.strMealThumb || m.strDrinkThumb }
              alt={ m.strMealThumb || m.strDrinkThumb }
              className="search_img"
              data-testid="recipe-photo"
            />
            <h2 data-testid="recipe-title">{ m.strMeal || m.strDrink }</h2>
            <h5>Category: </h5>
            <p data-testid="recipe-category">
              {pathname.includes('/meals')
                ? m.strCategory : m.strAlcoholic}

            </p>
            <h5>Ingredients: </h5>
            <ul>
              {ingredients?.map(({ k }, idx) => (
                <li
                  key={ idx }
                  data-testid={ `${idx}-ingredient-name-and-measure` }
                >
                  {`${k} ${measure[idx].k}`}
                </li>
              ))}
            </ul>
            <h5>Intructions: </h5>
            <p data-testid="instructions">{m.strInstructions}</p>
            <iframe
              title={ m.strMeal }
              src={ m.strYoutube && m.strYoutube.replace(/watch\?v=/g, 'embed/') }
              data-testid="video"
            />
            <h5>recommendations: </h5>
          </div>))}
      </div>
    </div>
  );
}

export default RecipeDetails;
