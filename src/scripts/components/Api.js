export default class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getDataUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    updateDataUser(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })   
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    deleteCard(idCard) {
        return fetch(`${this._baseUrl}/cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    likeCard(idCard) {
        return fetch(`${this._baseUrl}/cards/likes/${idCard}`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    dislikeCard(idCard) {
        return fetch(`${this._baseUrl}/cards/likes/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
       })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    changeAvatar(avatarLink) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }
}