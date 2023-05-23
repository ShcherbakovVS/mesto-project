import { elements } from "./card.js";
import { toggleButtonState } from "./validate.js";
import { createCard } from "./card.js";

export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');
export const popupImageClose = popupImage.querySelector('.popup__close');
export const popupEditClose = popupEdit.querySelector('.popup__close');
export const formElementEdit = popupEdit.querySelector('.popup__container');
export const popupAddClose = popupAdd.querySelector('.popup__close');
export const formElementAdd = popupAdd.querySelector('.popup__container');
const nameInputAdd = formElementAdd.querySelector('#placeName');
const imgInputAdd = formElementAdd.querySelector('#placeImg');
export const nameInput = formElementEdit.querySelector('#name');
export const jobInput = formElementEdit.querySelector('#description');
export const nameProf = document.querySelector('.profile__name');
export const jobProf = document.querySelector('.profile__description');
export const bigImg = popupImage.querySelector('.popup__image');
export const popupImageTitle = popupImage.querySelector('.popup__title-place');
export const popups = Array.from(document.querySelectorAll('.popup'));


export function openPopup(pop) {
    pop.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopup(pop);
        }
    })
}

export function closePopup(pop) {
    pop.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopup(pop);
        }
    })
}

export function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    nameProf.textContent = nameInput.value;
    jobProf.textContent = jobInput.value;
    closePopup(popupEdit);
}

export function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    elements.prepend(createCard(imgInputAdd.value, nameInputAdd.value));
    formElementAdd.reset();
    closePopup(popupAdd);
    const inputList = Array.from(formElementAdd.querySelectorAll('.popup__input-text'));
    const buttonElement = formElementAdd.querySelector('.popup__save');
    toggleButtonState(inputList, buttonElement, {inactiveButtonClass: 'popup__save_type_inactive', activeButtonClass: 'popup__save_type_active'});
}