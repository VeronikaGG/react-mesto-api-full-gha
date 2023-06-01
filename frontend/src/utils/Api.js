class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  _updateHeaders() {
    this._headers = {
      ...this._headers,
      authorization: `Bearer ${localStorage.getItem('token')}`,
    };
  }
  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
    }
  
  //массив карточек с сервера
  getInitialCard() {
    this._updateHeaders(); 
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }
  //информация пользователя (о себе)
  getUserInfo() {
    this._updateHeaders(); 
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }
  //установить данные о себе
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify(data),
    }).then((res) => this._getResponse(res));
  }
  //создать карточку
  createCard(newCard) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${newCard.name}`,
        link: `${newCard.link}`,
      }),
    }).then(this._getResponse);
  }
  //удалить карточку
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }
  //установить аватар
  setUserAvatar(img) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${img.avatar}`,
      }),
    }).then(this._getResponse);
  }

  //лайки
  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      isLiked = true;
    } else {
      isLiked = false;
    }
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._getResponse);
  }
}

 const api = new Api({
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.veronikagg.student.nomoredomains.monster',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default api;