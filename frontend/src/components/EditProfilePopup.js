import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');

  // Сбрасываем значения инпутов при повторном открытии попапа
  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChange(evt) {
    if (evt.target.name === 'firstName-input') {
      setName(evt.target.value);
    } else if (evt.target.name === 'job-input') {
      setAbout(evt.target.value);
    }
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm /* Форма редактирования профиля */
      namePopup="profile-edit"
      title="Редактировать профиль"
      formName="form-edit-profile"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingTextBtn="Сохранение..."
    >
      <div className="popup__input-container">
        <input
          placeholder="Название"
          className="popup__input popup__input_type_title"
          minLength="2"
          maxLength="30"
          required
          autoComplete="off"
          id="firstName-input"
          name="firstName-input"
          type="text"
          value={name ?? ''}
          onChange={handleChange}
        />
        <span className="popup__input-error" id="title-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          placeholder="Введите описание"
          className="popup__input popup__input_type_job"
          required
          autoComplete="off"
          type="text"
          name="job-input"
          id="job-input"
          value={about ?? ''}
          onChange={handleChange}
        />
        <span className="popup__input-error" id="job-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
