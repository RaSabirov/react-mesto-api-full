import React from 'react';
import { api } from '../utils/Api';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }) {
  // Подписываем компонент Main на данные из CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile page__container">
        <div className="profile__container">
          <div className="profile__avatar-container">
            <button className="profile__change-avatar" type="button" onClick={onEditAvatar}></button>
            <img className="profile__image" src={currentUser?.avatar ?? ' '} alt="Аватарка профиля" />
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser?.name ?? ' '}</h1>
            <button
              className="profile__edit-btn link"
              type="button"
              aria-label="Кнопка изменить"
              onClick={onEditProfile}
            ></button>
            <p className="profile__job">{currentUser?.about ?? ' '}</p>
          </div>
        </div>
        <button
          className="profile__add-btn link"
          type="button"
          aria-label="Кнопка добавить"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places page__container">
        <ul className="places__card">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
