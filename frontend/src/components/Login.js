import '../styles/sign.css';
import React from 'react';
import AuthForm from './AuthForm';

function Login({ onLogin }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChande(evt) {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value);
    } else if (evt.target.name === 'password') {
      setPassword(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!email || !password) {
      return;
    }
    onLogin(email, password);
  }

  return (
    <AuthForm
      section="login"
      title="Вход"
      submit={handleSubmit}
      onChange={handleChande}
      submitName="Войти"
      emailValue={email}
      passwordValue={password}
    />
  );
}

export default Login;
