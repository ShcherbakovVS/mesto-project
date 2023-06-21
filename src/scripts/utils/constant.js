export const config = {
        baseUrl: 'https://nomoreparties.co/v1/plus-cohort-24',
        headers: {
            authorization: 'dc42361d-7522-43c4-a3be-561c52a9ed06',
            'Content-Type': 'application/json'
        }
}

export const objSelectors = {
    formSelector: '.popup__container',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_type_inactive',
    activeButtonClass: 'popup__save_type_active',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__input-error_active'
}

export const cardListSection = '.elements';

export const popups = {};

export const buttonOnAvatar = document.querySelector('.profile__avatar-change');

export const adding = document.querySelector('.profile__add');

export const editing = document.querySelector('.profile__edit');