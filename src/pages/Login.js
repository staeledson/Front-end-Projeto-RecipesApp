import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setPassWord] = useState('');
  const history = useHistory();
  // const [disable, setDisable] = useState(true);

  const magicNumber = 7;
  // const validatingEmailPassword = () => {
  //   const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
  //   if (regex.test(inputEmail) && inputPassword.length === magicNumber) {
  //     setDisable(false);
  //   }
  // };

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
          // value={ inputEmail }
          onChange={ (event) => setInputEmail(event.target.value) }
          // onChange={ handleChange }
        />
      </label>
      <label htmlFor="inputPassword">
        senha
        <input
          type="text"
          name="inputPassword"
          id="inputPassword"
          data-testid="password-input"
          // value={ inputPassword }
          onChange={ (event) => setPassWord(event.target.value) }
          // onChange={ handleChange }
        />
      </label>
      <button
        type="button"
        // onClick={ this.onClick }
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
