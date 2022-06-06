import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar, isLoading }) {
  const [avatar, setAvatar] = React.useState('');

  function handleChange(evt) {
    setAvatar(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar,
    });
  }

  // Сбрасываем значения инпутов при повторном открытии попапа
  React.useEffect(() => {
    setAvatar('');
  }, [isOpen]);

  return (
    <PopupWithForm /* Форма смены аватара */
      namePopup="avatar"
      title="Обновить аватар"
      formName="form-new-photo"
      buttonName="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingTextBtn="Сохранение..."
    >
      <div className="popup__input-container">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_title"
          name="link"
          required
          autoComplete="off"
          id="linkImg-input"
          value={avatar ?? ''}
          onChange={handleChange}
        />

        <span className="popup__input-error" id="linkImg-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
