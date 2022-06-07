import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ onCardClick, onCardLike, onCardDelete, card }) {
  const { link, name, likes } = card;
  // Подписываем компонент Card на данные из CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  /* ========= Работаем с button delete ========= */
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `places__del-btn ${!isOwn && 'places__del-btn_hide'}`;

  /* ========= Работаем с button like ========= */
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `places__like-btn ${isLiked && 'places__like-btn_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="places__card-item">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        aria-label="Кнопка удалить"
        onClick={handleDeleteClick}
      ></button>
      <img className="places__photo" src={link} alt={name} onClick={handleClick} />
      <div className="places__text-container">
        <h2 className="places__text">{name}</h2>
        <div className="places__like-container">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Кнопка лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="places__like-counter">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
