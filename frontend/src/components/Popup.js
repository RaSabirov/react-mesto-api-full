import React from 'react';
// создаем отдельный компонент `Popup` для обертки любых попапов
function Popup({ isOpen, namePopup, onClose, children, isImagePopup }) {
  // внутри указываем `useEffect` для обработчика `Escape`
  React.useEffect(() => {
    // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if (!isOpen) return;

    // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', closeByEscape);
    // обязательно удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener('keydown', closeByEscape);
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
  }, [isOpen, onClose]);

  // создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`. По семантике тег `section`
  return (
    <section
      className={`popup ${isOpen ? 'popup_is-opened' : ''} popup_type_${namePopup}`}
      // добавляем обработчик оверлея
      onClick={handleOverlay}
    >
      {/* добавляем контейнер для контента попапа 
          у ImagePopup свой контейнер, у всех остальных одинаковый
          из-за этого делаем условие на котором будет отображаться тот или иной попап (пропсами)
      */}
      <div className={`${isImagePopup ? 'popup__img-container' : 'popup__container'}`}>
        {/* тут может быть любой контент попапа в `children` */}
        {children}
        {/* кнопка крестика есть у любого попапа */}
        <button className="popup__close-btn link" type="button" onClick={onClose} />
      </div>
    </section>
  );
}

export default Popup;
