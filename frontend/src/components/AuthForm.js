import '../styles/sign.css';
import React from 'react';

// Универсальная форма для форм регистрации и входа
function AuthForm({ section, title, submit, emailValue, passwordValue, onChange, submitName }) {
  return (
    <section className={section}>
      <div className="sign">
        <h2 className="sign__welcome ">{title}</h2>
        <form className="sign__form" onSubmit={submit}>
          <input
            className="sign__input"
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={emailValue}
            onChange={onChange}
            required
          />
          <input
            className="sign__input"
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={passwordValue}
            onChange={onChange}
            autoComplete="off"
            minLength="5"
            required
          />
          <button type="submit" className="sign__button">
            {submitName}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AuthForm;
