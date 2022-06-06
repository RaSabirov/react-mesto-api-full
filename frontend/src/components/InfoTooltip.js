import React from 'react';
import Popup from './Popup';
import successPicture from '../images/ok.svg';
import rejectPicture from '../images/notok.svg';

// Попап для отображении информации при успешной или не успешной регистрации
function InfoTooltip({ namePopup, isOpen, onClose, isSuccess }) {
  return (
    <Popup isOpen={isOpen} namePopup={namePopup} onClose={onClose}>
      <figure className="infoTooltip__figure">
        <img className="infoTooltip__img" src={isSuccess ? successPicture : rejectPicture} alt="Статус о регистрации" />
        <figcaption className="infoTooltip__caption">
          {isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
        </figcaption>
      </figure>
    </Popup>
  );
}

export default InfoTooltip;
