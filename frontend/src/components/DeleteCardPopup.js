import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, isLoading, onDeleteCard }) {
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm /* Форма запрос на удаление "Вы уверены?" */
      namePopup="del-request"
      title="Вы уверены?"
      formName="form-del-request"
      isOpen={isOpen}
      onClose={onClose}
      buttonName="Да"
      isLoading={isLoading}
      loadingTextBtn="Удаление..."
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
