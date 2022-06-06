import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClose, isOpen, onAddPlace, isLoading }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  function handleChange(evt) {
    if (evt.target.name === 'name') {
      setName(evt.target.value);
    } else if (evt.target.name === 'link') {
      setLink(evt.target.value);
    }
  }

  // Сбрасываем значения инпутов при повторном открытии попапа
  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm /* Форма добавления картинок */
      namePopup="places-add"
      title="Новое место"
      formName="form-add-places"
      buttonName="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      loadingTextBtn="Создание..."
    >
      <div className="popup__input-container">
        <input
          type="text"
          placeholder="Название"
          className="popup__input popup__input_type_title"
          name="name"
          minLength="2"
          maxLength="30"
          required
          autoComplete="off"
          id="title-input"
          value={name ?? ''}
          onChange={handleChange}
        />
        <span className="popup__input-error" id="title-input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_type_link"
          name="link"
          required
          autoComplete="off"
          id="link-input"
          value={link ?? ''}
          onChange={handleChange}
        />
        <span className="popup__input-error" id="link-input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
