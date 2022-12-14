import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import fetchDetails from '../services/fetchDetails';
import './RecipeInProgress.css';

const MAGIC_NUMBER = 20;
function RecipeInProgress() {
  const [data, setData] = useState({});
  const [thumb, setThumb] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [instructions, setinstructions] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [ingredientSelect, setIngredientSelect] = useState([]);

  const { id } = useParams();
  const history = useHistory();
  const {
    location: { pathname },
  } = history;

  const meals = pathname.includes('meals');
  const drinks = pathname.includes('drinks');

  useEffect(() => {
    (async () => {
      if (meals) {
        const mealsDetails = await fetchDetails({ id, type: 'meals' });
        setData(mealsDetails[0]);
        setThumb(data?.strMealThumb);
        setTitle(data?.strMeal);
        setCategory(data?.strCategory);
        setinstructions(data?.strInstructions);
      }
      if (drinks) {
        const drinksDetails = await fetchDetails({ id, type: 'drinks' });
        setData(drinksDetails[0]);
        setThumb(data?.strDrinkThumb);
        setTitle(data?.strDrink);
        setCategory(data?.strAlcoholic);
        setinstructions(data?.strInstructions);
      }
    })();
  }, [data?.strMealThumb, id, drinks, meals, data?.strDrinkThumb]);

  useEffect(() => {
    const ingredientsArr = [];
    const measuresArr = [];
    for (let i = 1; i <= MAGIC_NUMBER; i += 1) {
      ingredientsArr.push(data[`strIngredient${i}`]);
      measuresArr.push(data[`strMeasure${i}`]);
    }
    setIngredients(ingredientsArr);
    setMeasures(measuresArr);
  }, [data]);

  const changeClass = (target) => {
    if (target.checked === true) {
      target.parentElement.className = 'check';
      const ingredietCurrent = target.parentElement.innerText;
      setIngredientSelect([...ingredientSelect, ingredietCurrent]);
    } else {
      target.parentElement.className = '';
      const ingredientDelet = target.parentElement.innerText;
      const editIngredient = ingredientSelect.filter(
        (ingredient) => !ingredient.includes(ingredientDelet),
      );
      setIngredientSelect(editIngredient);
    }
    console.log(ingredientSelect);
  };

  return (
    <div>
      <h1>Olá</h1>
      <ShareButton />
      <FavoriteButton />
      <div>

        {ingredients.filter(Boolean).map((element, index) => {
          const checkIngredients = (ingredientSelect
            .some((ele) => ele
              .includes(`${element}${' '}${measures[index]}`))) ? 'select' : 'notSelect';
          return (

            <label
              key={ index }
              htmlFor={ element }
              data-testid={ `${index}-ingredient-step` }
              className={ (checkIngredients === 'select' ? 'check' : '') }
            >
              {element}
              {' '}
              {measures[index]}
              <input
                type="checkbox"
                name={ element }
                checked={ (checkIngredients === 'select') }
                onChange={ ({ target }) => changeClass(target) }
              />
            </label>
          );
        })}
      </div>
      <img
        src={ thumb }
        alt="img"
        className="imgRecipe"
        data-testid="recipe-photo"
      />
      <p data-testid="recipe-title">
        {title}
      </p>
      <p data-testid="recipe-category">
        {category}
      </p>
      <p data-testid="instructions">
        {instructions}
      </p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
