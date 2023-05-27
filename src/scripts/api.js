const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
    headers: {
        authorization: 'dc42361d-7522-43c4-a3be-561c52a9ed06',
        'Content-Type': 'application/json'
    }
}

const getResponseData = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const getDataUser = () => {
        return fetch(`${config.baseUrl}/users/me`, {
            headers: config.headers
        })
            .then(res => {
                return getResponseData(res);
            });
    }

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            return getResponseData(res);
        });
}

export const updateDataUser = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })   
    })
        .then(res => {
            return getResponseData(res);
        });
}

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(res => {
            return getResponseData(res);
        });
}

export const deleteCard = (idCard) => {
    return fetch(`${config.baseUrl}/cards/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            return getResponseData(res);
        });
}

export const likeCard = (idCard) => {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => {
            return getResponseData(res);
        });
}

export const dislikeCard = (idCard) => {
    return fetch(`${config.baseUrl}/cards/likes/${idCard}`, {
        method: 'DELETE',
        headers: config.headers
   })
        .then(res => {
            return getResponseData(res);
        });
}

export const changeAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
        .then(res => {
            return getResponseData(res);
        });
}