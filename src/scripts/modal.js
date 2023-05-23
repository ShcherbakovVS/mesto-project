export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');
export const popupImageClose = popupImage.querySelector('.popup__close');
export const popupEditClose = popupEdit.querySelector('.popup__close');
export const formElementEdit = popupEdit.querySelector('.popup__container');
export const popupAddClose = popupAdd.querySelector('.popup__close');
export const formElementAdd = popupAdd.querySelector('.popup__container');
export const nameInputAdd = formElementAdd.querySelector('#placeName');
export const imgInputAdd = formElementAdd.querySelector('#placeImg');
export const nameInput = formElementEdit.querySelector('#name');
export const jobInput = formElementEdit.querySelector('#description');
export const popupImageTitle = popupImage.querySelector('.popup__title-place');
export const popups = Array.from(document.querySelectorAll('.popup'));

const closeByEsc = (evt) => {
    if (evt.key === 'Escape') {
        closePopup(document.querySelector('.popup_opened'));
    }
}

export function openPopup(pop) {
    pop.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
}

export function closePopup(pop) {
    document.removeEventListener('keydown', closeByEsc);
    pop.classList.remove('popup_opened');
}