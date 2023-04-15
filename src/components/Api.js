export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  //проверка результа запроса
  _checkResponse() {
    if (res.ok) {
      return res.json();
    }
    console.log(res.json)
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  //получение данных пользователя с сервера ок
  _getInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res.json)
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  //замена данных пользователя на сервере ок
  setInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        // id: data.id

      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res.json)
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  //замена аватара пользователя ок
  setAvatar(avatar) {
    console.log(avatar)
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar.link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res.json)
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }
  //получение начальных карточек с сервера ок
  _getInitialsCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    })
      .then((res) => {

        if (res.ok) {
          return res.json();
        }
        console.log(res.json)
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  //получение всех нужных данных для отрисовки первоначального состояния страницы ок
  getAllInitialData() {
    return Promise.all([this._getInfo(), this._getInitialsCards()])

  }

  //добавить карточку ок
  setNewCard(data) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res.json)
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  //удалить карточку
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log(res.json)
        return Promise.reject(`Ошибка: ${res.status}`)
      })
  }

  //запрос на постановку лайка
  isLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        cardId: cardId._cardId,
        likes: cardId._likes
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(res.json)
      return Promise.reject(`Ошибка: ${res.status}`)
    })

  }

  //запрос на удаление лайка
  disLikeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        cardId: cardId._cardId,
        likes: cardId._likes
      })
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      console.log(res.json)
      return Promise.reject(`Ошибка: ${res.status}`)
    })

  }






}
