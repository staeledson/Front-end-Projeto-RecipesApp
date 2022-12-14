import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

function Header({ title }) {
  const [showBar, setShowBar] = useState(false);
  const history = useHistory();
  const { pathname } = history.location;

  // a forma de renderizar o title teve que mudar porque estava atrapalhando os testes.

  return (
    <div>
      <div className="header">
        {pathname !== '/profile'
        && pathname !== '/done-recipes'
        && pathname !== '/favorite-recipes'
        && (
          <button
            className="btn-searchBar"
            type="button"
            onClick={ () => setShowBar(!showBar) }
          >
            <img
              className="image-profile"
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="imagem de uma lupa"
            />
          </button>
        )}
        <Link className="link-profile" to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="imagem de um ícone de perfil"
          />
        </Link>
      </div>
      <h1 className="title" data-testid="page-title">{title}</h1>
      {showBar && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
