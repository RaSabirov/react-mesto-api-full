import React from 'react';
import Popup from './Popup';

function PopupWithForm({
  namePopup,
  isOpen,
  onClose,
  title,
  formName,
  children,
  buttonName,
  onSubmit,
  loadingTextBtn,
  isLoading,
}) {
  return (
    <Popup isOpen={isOpen} namePopup={namePopup} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={formName} onSubmit={onSubmit}>
        {children}
        <button className="popup__submit-btn" type="submit">
          {isLoading ? loadingTextBtn : buttonName}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
