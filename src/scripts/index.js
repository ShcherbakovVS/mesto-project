import '../pages/index.css';
import { nameInput, jobInput, formElementEdit, openPopup, popupEditClose, closePopup, handleFormSubmitAdd, handleFormSubmitEdit, popupAddClose, formElementAdd, popupImageClose, popups, popupImage, nameProf, jobProf, popupEdit, popupAdd } from './modal.js';
import { toggleButtonState, checkInputValidity, enableValidation } from './validate.js';

const edit = document.querySelector('.profile__edit');
const add = document.querySelector('.profile__add');

edit.addEventListener('click', () => {
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

popupEditClose.addEventListener('click', () => {
    closePopup(popupEdit);
});

formElementEdit.addEventListener('submit', handleFormSubmitEdit);

add.addEventListener('click', () => {
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