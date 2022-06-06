import '../styles/sign.css';
import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChange(evt) {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value);
    } else if (evt.target.name === 'password') {
      setPassword(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return (
    <>
      <AuthForm
        section="register"
        title="Регистрация"
        submit={handleSubmit}
        onChange={handleChange}
        submitName="Зарегистрироваться"
        emailValue={email}
        passwordValue={password}
      />
      <div className="sign__signin">
        <Link to="/sign-in" className="sign__login-link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
}

export default Register;
