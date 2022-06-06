import React from 'react';
import headerLogo from '../images/logo.svg';
import { Route, Link } from 'react-router-dom';

function Header({ userEmail, onLogOut }) {
  return (
    <header className="header page__container">
      <img className="header__logo" src={headerLogo} alt="Логотип Место" />

      <Route path={'/sign-up'}>
        <Link to="/sign-in" className="header__auth">
          Войти
        </Link>
      </Route>

      <Route path={'/sign-in'}>
        <Link to="/sign-up" className="header__auth">
          Регистрация
        </Link>
      </Route>

      <Route exact path={'/'}>
        <div className="header__profile-container">
          <p className="header__email">{userEmail}</p>
          <Link to="/sign-in" className="header__sign-out" onClick={onLogOut}>
            Выйти
          </Link>
        </div>
      </Route>
    </header>
  );
}

export default Header;
