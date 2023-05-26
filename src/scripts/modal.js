export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');
export const popupDelete = document.querySelector('.popup_type_delete');
export const popupAvatarChange = document.querySelector('.popup_type_avatar-exchange');
export const buttonRemovingCard = document.querySelector('.popup__save_margin_less');
export const formElementEdit = popupEdit.querySelector('.popup__container');
export const formElementAdd = popupAdd.querySelector('.popup__container');
export const formElementAvatarChange = popupAvatarChange.querySelector('.popup__container');
export const avatarUrl = formElementAvatarChange.querySelector('#avatarUrl');
export const nameInputAdd = formElementAdd.querySelector('#placeName');
export const imgInputAdd = formElementAdd.querySelector('#placeImg');
export const nameInput = formElementEdit.querySelector('#name');
export const jobInput = formElementEdit.querySelector('#description');
export const popupImageTitle = popupImage.querySelector('.popup__title-place');
export const popups = Array.from(document.querySelectorAll('.popup'));
export const crosses = Array.from(document.querySelectorAll('.popup__close'));

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