import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setPassWord] = useState('');
  const history = useHistory();
  const magicNumber = 7;
  const onClick = () => {
    const user = { email: inputEmail };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  return (
    <div>
      <label htmlFor="inputEmail">
        email
        <input
          type="text"
          name="inputEmail"
          id="inputEmail"
          data-testid="email-input"
          onChange={ (event) => setInputEmail(event.target.value) }
        />
      </label>
      <label htmlFor="inputPassword">
        senha
        <input
          type="text"
          name="inputPassword"
          id="inputPassword"
          data-testid="password-input"
          onChange={ (event) => setPassWord(event.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !(inputEmail.match(/\S+@\S+\.\S+/i)) || (inputPassword.length < magicNumber) }
        onClick={ (() => onClick()) }
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
