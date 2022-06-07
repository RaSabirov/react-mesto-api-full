import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import { Api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { useHistory } from 'react-router-dom';
import * as ApiAuth from '../utils/ApiAuth';
import NotFound from './NotFound';

function App() {
  // =================================================
  // ===== СТЕЙТЫ
  // =================================================
  // Переменные состояния, отвечающие за видимость попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);

  // Переменная состояния, отвечающая за выбранную карточку(при клике на картинку)
  const [selectedCard, setSelectedCard] = React.useState({});
  // Стейт, отвечающий за данные текущего пользователя
  const [currentUser, setCurrentUser] = React.useState({});
  // Переменная состояния отвечающая за состояние cards
  const [cards, setCards] = React.useState([]);
  // Стейт, отвечающий за подготовку к удалении карточки. Передаем карту в api и при открытии попапа
  const [toDeleteCard, setToDeleteCard] = React.useState({});

  // Стейты прелоудеров загрузки
  const [isLoadingAddPopup, setIsLoadingAddPopup] = React.useState(false);
  const [isLoadingEditPopup, setIsLoadingEditPopup] = React.useState(false);
  const [isLoadingAvatarPopup, setIsLoadingAvatarPopup] = React.useState(false);
  const [isLoadingDeletePopup, setIsLoadingDeletePopup] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegistrationSuccess, setIsRegistrationSuccess] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const history = useHistory();
  // =================================================
  // ===== РАБОТА С API ЗАПРОСАМИ
  // =================================================

  const api = new Api({
    url: 'https://mesto.sbrvrvl.nomoredomains.xyz',
    headers: {
      authorization: `${localStorage.getItem('jwt')}`,
      'content-type': 'application/json',
    },
  });

  // Эффект который будет совершать запрос в API за отображением карточек
  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => alert(`Ошибка загрузки данных с сервера: ${err}`));
  }, []);

  // Отображаем информацию о пользователе из API
  React.useEffect(() => {
    api
      .getUserData()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => alert('Ошибка загрузки данных с сервера:', err));
  }, []);

  // Эффект который будет проверять токен при загрузки страницы,
  // чтобы не выбивало сессию при ребуте страницы
  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => alert('Ошибка лайка/дизлайка карточки:', err));
  }

  function handleDeleteCardSubmit() {
    setIsLoadingDeletePopup(true);
    api
      .deleteCard(toDeleteCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== toDeleteCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => alert('Ошибка удаления карточки:', err))
      .finally(() => {
        setIsLoadingDeletePopup(false);
      });
  }

  function handleUpdateUser({name, about}) {
    setIsLoadingEditPopup(true);
    api
      .setUserInfo(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => alert('Ошибка загрузки данных пользователя:', err))
      .finally(() => {
        setIsLoadingEditPopup(false);
      });
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoadingAvatarPopup(true);
    api
      .setUserAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => alert('Ошибка обновления аватара:', err))
      .finally(() => {
        setIsLoadingAvatarPopup(false);
      });
  }

  function handleAddPlaceSubmit({ name, link}) {
    setIsLoadingAddPopup(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert('Ошибка добавления карточки:', err))
      .finally(() => {
        setIsLoadingAddPopup(false);
      });
  }

  function handleRegister(email, password) {
    ApiAuth.register(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setIsRegistrationSuccess(true);
          setIsInfoTooltipOpen(true);
          history.push('/sign-in');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccess(false);
        console.log('Ошибка регистрации:', err);
      });
  }

  function handleAuthorization(email, password) {
    ApiAuth.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setUserEmail(email);
          history.push('/');
          console.log('Время входа:', new Date().toLocaleTimeString());
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setIsRegistrationSuccess(false);
        console.log('Ошибка входа в систему:', err);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      ApiAuth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.email);
            history.push('/');
          }
        })
        .catch((err) => {
          console.log('Ошибка проверки токена:', err);
        });
    }
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserEmail('');
    history.push('/sign-in');
    console.log('Время выхода:', new Date().toLocaleTimeString());
  }

  // =================================================
  // ===== Функции-обработчики для открытия попапов
  // =================================================
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleCardDeleteClick(toDeleteCard) {
    // Отмечаем выбранную id карточки
    setToDeleteCard(toDeleteCard);
    // Передаем открытие попапа
    setIsDeleteCardPopupOpen(true);
  }
  // =================================================
  // ===== Функция-обработчик для закрытия всех попапов
  // =================================================
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  // =================================================
  // ===== РЕНДЕР КОМПОНЕНТОВ
  // =================================================
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={userEmail} onLogOut={handleLogOut} />
      <Switch>
        <ProtectedRoute /* Защита контента главной страницы от неавторизованных пользователей */
          component={Main}
          loggedIn={loggedIn}
          exact
          path="/"
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}
          cards={cards}
        />
        <Route path="/sign-up">
          <Register onRegister={handleRegister} />
        </Route>

        <Route path="/sign-in">
          <Login onLogin={handleAuthorization} />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
      <Footer />
      <EditProfilePopup /* Попап редактирования данных профиля */
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoadingEditPopup}
      />
      <EditAvatarPopup /* Попап смены аватарки профиля */
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoadingAvatarPopup}
      />

      <AddPlacePopup /* Попап добавлении новой карточки в список */
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoadingAddPopup}
      />

      <DeleteCardPopup /* Попап подтверждение при удалении карточки */
        isOpen={isDeleteCardPopupOpen}
        onClose={closeAllPopups}
        onDeleteCard={handleDeleteCardSubmit}
        isLoading={isLoadingDeletePopup}
      />

      <ImagePopup /* Попап открытия превью картинки (при клике) */
        namePopup="image"
        isOpen={!!selectedCard.name && !!selectedCard.link}
        card={selectedCard}
        onClose={closeAllPopups}
        isImagePopup={selectedCard}
      />
      <InfoTooltip /* Попап уведомление о регистрации (успешно/неуспешно) */
        namePopup="infoTool"
        isSuccess={isRegistrationSuccess}
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
