import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const userSaved = JSON.parse(localStorage.getItem('user'));

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
      <Header title="Profile" />
      <h2 data-testid="profile-email">{ userSaved.email }</h2>
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
      <Footer />
    </div>
  );
}

export default Profile;
