export class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _errorHandler = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Возникла ошибка: ${res.status}`);
  };

  // Получаем карточки с сервера
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._errorHandler);
  }

  // Получаем информацию о пользователе
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._errorHandler);
  }

  setUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._errorHandler);
  }

  setUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._errorHandler);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._errorHandler);
  }

  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._errorHandler);
  }

  // Получаем статус лайка на сервере
  changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: `${isLiked ? 'PUT' : 'DELETE'}`,
        headers: this._headers,
      }).then(this._errorHandler);
  }
}
