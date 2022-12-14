import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import copy from 'clipboard-copy';
import fetchDetails from '../services/fetchDetails';
import fetchSearch from '../services/fetchSearch';
import ContextApp from '../context/ContextApp';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { RecommendationCard } from '../components/RecommendationCard';

function RecipeDetails() {
  const [useDetails, setUseDetails] = useState([]);
  const [useDoneRecipe, setUseDoneRecipe] = useState(false);
  const [useInProgressRecipe, setUseInProgressRecipe] = useState(false);
  const [useLinkCopied, setUseLinkCopied] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  const { recommendations, setRecommendations } = useContext(ContextApp);
  const cardsMagic = 6;

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

  const handleBtnStartRecipeClick = () => {
    history.push(`${pathname}/in-progress`);
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
        r.splice(cardsMagic);
        setRecommendations(r);
      }
      if (pathname.includes('/drinks')) {
        r = await fetchSearch({}, 'meals');
        r.splice(cardsMagic);
        setRecommendations(r);
      }
    };
    const getLocalStorage = async () => {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

      if (doneRecipes) {
        setUseDoneRecipe(doneRecipes.some((dR) => (dR.id === getDetailsInfo().id)));
      }
      if (pathname.includes('/meals') && inProgressRecipes?.meals) {
        setUseInProgressRecipe(Object.keys(inProgressRecipes?.meals).some((iP) => (
          iP === getDetailsInfo().id)));
      }
      if (pathname.includes('/drinks') && inProgressRecipes?.drinks) {
        setUseInProgressRecipe(Object.keys(inProgressRecipes?.drinks).some((iP) => (
          iP === getDetailsInfo().id)));
      }
    };

    getDet();
    getrecommendations();
    getLocalStorage();
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

  const handleShareBtnClick = () => {
    const shareMN = 3000;
    copy(`http://localhost:3000${pathname}`);
    setUseLinkCopied(true);
    setTimeout(() => {
      setUseLinkCopied(false);
    }, shareMN);
  };
  const handleFavoriteBtnClick = () => {
    if (pathname.includes('/meals')) {
      const favoriteMeal = {
        id: useDetails[0].idMeal,
        type: 'meal',
        nationality: useDetails[0].strArea,
        category: useDetails[0].strCategory,
        alcoholicOrNot: '',
        name: useDetails[0].strMeal,
        image: useDetails[0].strMealThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteMeal]));
    }
    if (pathname.includes('/drinks')) {
      const favoriteDrink = {
        id: useDetails[0].idDrink,
        type: 'drink',
        nationality: '',
        category: useDetails[0].strCategory,
        alcoholicOrNot: useDetails[0].strAlcoholic,
        name: useDetails[0].strDrink,
        image: useDetails[0].strDrinkThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteDrink]));
    }
  };

  const isFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    return favorites?.some((fav) => (fav.id === getDetailsInfo().id));
  };

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
            <button
              className="share-button"
              type="button"
              onClick={ handleFavoriteBtnClick }
            >
              <img
                data-testid="favorite-btn"
                alt="favorite-btn"
                src={ isFavorite() ? blackHeartIcon : whiteHeartIcon }
              />
            </button>

            <button
              className="share-button"
              type="button"
              onClick={ handleShareBtnClick }
              data-testid="share-btn1"

            >
              <img
                data-testid="share-btn"
                src={ shareIcon }
                alt="share-btn"
              />
            </button>
            {console.log(useLinkCopied)}
            {useLinkCopied && <p data-testid="link-copied">Link copied!</p>}

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
            <AliceCarousel
              items={
                recommendations?.map((recommendation, i) => (
                  <RecommendationCard
                    key={ pathname.includes('/meals')
                      ? recommendation.idDrink : recommendation.idMeal }
                    recommendation={ recommendation }
                    index={ i }
                    isMeal={ !!pathname.includes('/meals') }
                  />
                ))
              }
              responsive={ { 400: { items: 2 } } }
            />
            {!useDoneRecipe
              && (
                <button
                  type="button"
                  className="btn_start_recipe"
                  data-testid="start-recipe-btn"
                  onClick={ handleBtnStartRecipeClick }
                >
                  Start Recipe
                </button>
              )}
            {useInProgressRecipe
              && (
                <button
                  type="button"
                  className="btn_start_recipe"
                  data-testid="start-recipe-btn"
                  onClick={ handleBtnStartRecipeClick }
                >
                  Continue Recipe
                </button>
              )}
          </div>))}
      </div>
    </div>
  );
}

export default RecipeDetails;
