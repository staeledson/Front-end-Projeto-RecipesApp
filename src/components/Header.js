import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const [showBar, setShowBar] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;
  return (
    <div>
      <h1 data-testid="page-title">{pathname === '/meals' ? 'Meals' : 'Drinks'}</h1>
      {/* {showBar && <SearchBar />} */}
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="ícone de perfil"
        />
      </Link>
      {pathname !== '/profile'
        && pathname !== '/done-recipes'
        && pathname !== '/favorite-recipes'
        && (
          <div>
            <button
              type="button"
              onClick={ () => setShowBar(!showBar) }
            >
              <img data-testid="search-top-btn" src={ searchIcon } alt="logoSearch" />
            </button>
          </div>
        )}
    </div>
  );
}

export default Header;
