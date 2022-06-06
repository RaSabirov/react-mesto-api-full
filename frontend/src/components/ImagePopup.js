import React from 'react';
import Popup from './Popup';

function ImagePopup({ namePopup, isOpen, onClose, card, isImagePopup }) {
  return (
    <Popup isOpen={isOpen} namePopup={namePopup} onClose={onClose} isImagePopup={isImagePopup}>
      <figure className="popup__figure">
        <img className="popup__modal-img" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
