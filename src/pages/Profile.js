import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  // const userSaved = JSON.parse(localStorage.getItem('user'));

  const onClickToDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const onClickToFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const onClickToLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      {/* <h2>{ userSaved }</h2> */}
      <Header />
      <h2 data-testid="profile-email">email</h2>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ (() => onClickToDoneRecipes()) }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ (() => onClickToFavoriteRecipes()) }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ (() => onClickToLogout()) }
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
