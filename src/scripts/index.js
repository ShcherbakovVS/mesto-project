import '../pages/index.css';
import { elements, createCard, cardForRemoving, idCardForRemoving } from "./card.js";
import { crosses, nameInput, jobInput, formElementEdit, openPopup, closePopup, formElementAdd, popups, popupEdit, popupAdd, nameInputAdd, imgInputAdd, buttonRemovingCard, popupDelete, popupAvatarChange, formElementAvatarChange, avatarUrl } from './modal.js';
import { toggleButtonState, checkInputValidity, enableValidation } from './validate.js';
import { getDataUser, updateDataUser, addNewCard, deleteCard, changeAvatar, getInitialCards } from "./api.js";

const buttonOnAvatar = document.querySelector('.profile__avatar-change');
const editing = document.querySelector('.profile__edit');
const adding = document.querySelector('.profile__add');
export const nameProf = document.querySelector('.profile__name');
export const jobProf = document.querySelector('.profile__description');
export let idOwner;
const avatar = document.querySelector('.profile__avatar');

getDataUser()
    .then(res => {
        avatar.src = res.avatar;
        nameProf.textContent = res.name;
        jobProf.textContent = res.about;
        idOwner = res._id;
        getInitialCards()
            .then((res) => {
                res.forEach((card) => {
                    elements.append(createCard(card.link, card.name, card.likes.length, card.owner._id, card._id));
                })
            })
            .catch((err) => {
                console.log(err);
            });
    })
    .catch((err) => {
        console.log(err);
    });

editing.addEventListener('click', () => {
    nameInput.value = nameProf.textContent;
    jobInput.value = jobProf.textContent;
    const inputList = Array.from(formElementEdit.querySelectorAll('.popup__input-text'));
    const buttonElement = formElementEdit.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'popup__save_type_inactive', activeButtonClass: 'popup__save_type_active'});
    inputList.forEach((inputElement) => {
        checkInputValidity(formElementEdit, inputElement, {inputErrorClass: 'popup__input-text_type_error', errorClass: 'popup__input-error_active'});
    });
    openPopup(popupEdit);
});

function handleFormSubmitEdit(evt) {
    const submitButton = evt.target.querySelector('.popup__save');
    submitButton.textContent = 'Сохранение...';
    evt.preventDefault();
    updateDataUser(nameInput.value, jobInput.value)
        .then(res => {
            nameProf.textContent = res.name;
            jobProf.textContent = res.about;
            closePopup(popupEdit);
            submitButton.textContent = 'Сохранить';
        })
        .catch((err) => {
            console.log(err);
        });
    
}

function handleFormSubmitAdd(evt) {
    const submitButton = evt.target.querySelector('.popup__save');
    submitButton.textContent = 'Сохранение...';
    evt.preventDefault();
    addNewCard(nameInputAdd.value, imgInputAdd.value)
        .then(res => {
            elements.prepend(createCard(res.link, res.name, 0, idOwner, res._id));
            formElementAdd.reset();
            closePopup(popupAdd);
            const inputList = Array.from(formElementAdd.querySelectorAll('.popup__input-text'));
            const buttonElement = formElementAdd.querySelector('.popup__save');
            toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'popup__save_type_inactive', activeButtonClass: 'popup__save_type_active'});
            submitButton.textContent = 'Создать';
        })
        .catch((err) => {
            console.log(err);
        });
}

crosses.forEach((cross) => {
    cross.addEventListener('click', () => {
        closePopup(document.querySelector('.popup_opened'));
    });
})

formElementEdit.addEventListener('submit', handleFormSubmitEdit);

adding.addEventListener('click', () => {
    openPopup(popupAdd);
});

formElementAdd.addEventListener('submit', handleFormSubmitAdd);

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__window-image')) {
            closePopup(evt.currentTarget);
        }
    })
})

enableValidation({
    formSelector: '.popup__container',
    inputSelector: '.popup__input-text',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_type_inactive',
    activeButtonClass: 'popup__save_type_active',
    inputErrorClass: 'popup__input-text_type_error',
    errorClass: 'popup__input-error_active'
  });

buttonRemovingCard.addEventListener('click', () => {
    deleteCard(idCardForRemoving)
        .then(() => {
            cardForRemoving.remove();
            closePopup(popupDelete);
        })
        .catch((err) => {
            console.log(err);
        });
})

buttonOnAvatar.addEventListener('click', () => {
    openPopup(popupAvatarChange);
})

formElementAvatarChange.addEventListener('submit', evt => {
    const submitButton = evt.target.querySelector('.popup__save');
    submitButton.textContent = 'Сохранение...';
    evt.preventDefault();
    changeAvatar(avatarUrl.value)
        .then((res) => {
            avatar.src = res.avatar;
            closePopup(popupAvatarChange);
            formElementAvatarChange.reset();
            submitButton.textContent = 'Сохранить';
        })
        .catch((err) => {
            console.log(err);
        });
})
