import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [showBar, setShowBar] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  // a forma de renderizar o title teve que mudar porque estava atrapalhando os testes.

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="imagem de um ícone de perfil"
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
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="imagem de uma lupa"
              />
            </button>
          </div>
        )}
      {showBar && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
