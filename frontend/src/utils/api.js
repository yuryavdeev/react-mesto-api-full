import { urlFetch } from './utils.js';

class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`)
    }

    async getUserInfo() {
        const res = await fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'GET',
            headers: this._headers
        });
        return this._checkResponse(res);
    }

    async changeLikeCardStatus(id, isLikedCard) {
        if (!isLikedCard) {
            const res = await fetch(`${this._url}/cards/${id}/likes`, {
                credentials: 'include',
                method: 'PUT',
                headers: this._headers
            });
            return this._checkResponse(res);
        } else {
            const res = await fetch(`${this._url}/cards/${id}/likes`, {
                credentials: 'include',
                method: 'DELETE',
                headers: this._headers
            });
            return this._checkResponse(res);
        }
    }

    getCards() {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            headers: this._headers
        })
            .then(this._checkResponse)
    }

    async deleteCard(id) {
        const res = await fetch(`${this._url}/cards/${id}`, {
            credentials: 'include',
            method: 'DELETE',
            headers: this._headers
        });
        return this._checkResponse(res);
    }

    setUserInfo({ name, about }) {
        return fetch(`${this._url}/users/me`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkResponse)
    }

    saveNewCard({ name, url }) {
        return fetch(`${this._url}/cards`, {
            credentials: 'include',
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: url
            })
        })
            .then(this._checkResponse)
    }

    setNewAvatar(url) {
        return fetch(`${this._url}/users/me/avatar`, {
            credentials: 'include',
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url,
            })
        })
            .then(this._checkResponse)
    }
}

const api = new Api({ // <=  тут же создал экзмепляр
    url: urlFetch,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;