import '../pages/index.css';
import { elements, createCard } from "./card.js";
import { nameInput, jobInput, formElementEdit, openPopup, popupEditClose, closePopup, popupAddClose, formElementAdd, popupImageClose, popups, popupImage, popupEdit, popupAdd, nameInputAdd, imgInputAdd } from './modal.js';
import { toggleButtonState, checkInputValidity, enableValidation } from './validate.js';

const editing = document.querySelector('.profile__edit');
const adding = document.querySelector('.profile__add');
const nameProf = document.querySelector('.profile__name');
const jobProf = document.querySelector('.profile__description');

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
    evt.preventDefault();
    nameProf.textContent = nameInput.value;
    jobProf.textContent = jobInput.value;
    closePopup(popupEdit);
}

function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    elements.prepend(createCard(imgInputAdd.value, nameInputAdd.value));
    formElementAdd.reset();
    closePopup(popupAdd);
    const inputList = Array.from(formElementAdd.querySelectorAll('.popup__input-text'));
    const buttonElement = formElementAdd.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'popup__save_type_inactive', activeButtonClass: 'popup__save_type_active'});
}

popupEditClose.addEventListener('click', () => {
    closePopup(popupEdit);
});

formElementEdit.addEventListener('submit', handleFormSubmitEdit);

adding.addEventListener('click', () => {
    openPopup(popupAdd);
});

popupAddClose.addEventListener('click', () => {
    closePopup(popupAdd);
});

formElementAdd.addEventListener('submit', handleFormSubmitAdd);

popupImageClose.addEventListener('click', () => {
    closePopup(popupImage);
})

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