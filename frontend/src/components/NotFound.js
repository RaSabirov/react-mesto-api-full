import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/notFound.css';

function NotFound() {
  return (
    <div className="notFound page__container">
      <p className="notFound__note">
        Кажется что-то пошло не&nbsp;так! Страница, которую вы&nbsp;запрашиваете, не&nbsp;существует. Возможно она
        устарела, была удалена, или был введен неверный адрес в&nbsp;адресной строке.
        <Link className="notFound__link" to="/">
          <button type="submit" className="notFound__button">
            Вернуться на главную
          </button>
        </Link>
      </p>
    </div>
  );
}

export default NotFound;
