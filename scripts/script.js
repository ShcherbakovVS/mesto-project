const template = document.querySelector('#template-card').content;
const edit = document.querySelector('.profile__edit');
const add = document.querySelector('.profile__add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popupImageClose = popupImage.querySelector('.popup__close');
const popupEditClose = popupEdit.querySelector('.popup__close');
const formElementEdit = popupEdit.querySelector('.popup__container');
const popupAddClose = popupAdd.querySelector('.popup__close');
const formElementAdd = popupAdd.querySelector('.popup__container');
const nameInputAdd = formElementAdd.querySelector('#placeName');
const imgInputAdd = formElementAdd.querySelector('#placeImg');
const nameInput = formElementEdit.querySelector('#name');
const jobInput = formElementEdit.querySelector('#description');
const nameProf = document.querySelector('.profile__name');
const jobProf = document.querySelector('.profile__description');
const elements = document.querySelector('.elements');

function openPopup(pop) {
    pop.classList.add('popup_opened');
}

function closePopup(pop) {
    pop.classList.remove('popup_opened');
}

edit.addEventListener('click', () => {
    openPopup(popupEdit);
    nameInput.value = nameProf.textContent;
    jobInput.value = jobProf.textContent;
});

popupEditClose.addEventListener('click', () => {
    closePopup(popupEdit);
});

function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    nameProf.textContent = nameInput.value;
    jobProf.textContent = jobInput.value;
    closePopup(popupEdit);
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit);

add.addEventListener('click', () => {
    openPopup(popupAdd);
});

popupAddClose.addEventListener('click', () => {
    closePopup(popupAdd);
});

function createCard(img, name) {
    const cardElement = template.querySelector('.elements__element').cloneNode(true);
    const image = cardElement.querySelector('.elements__image');
    const title = cardElement.querySelector('.elements__title');
    image.src = img;
    image.alt = name
    title.textContent = name;
    cardElement.querySelector('.elements__like').addEventListener('click', (evt => {
        evt.target.classList.toggle('elements__like_actived');
    }));
    cardElement.querySelector('.elements__trash').addEventListener('click', () => {
        cardElement.remove()
    });
    image.addEventListener('click', () => {
        openPopup(popupImage);
        const bigImg = popupImage.querySelector('.popup__image');
        bigImg.src = image.src;
        bigImg.alt = title.textContent;
        popupImage.querySelector('.popup__title-place').textContent = title.textContent; 
    });
    return cardElement;
}

function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    elements.prepend(createCard(imgInputAdd.value, nameInputAdd.value));
    imgInputAdd.value = '';
    nameInputAdd.value = '';
    closePopup(popupAdd);
}

formElementAdd.addEventListener('submit', handleFormSubmitAdd);

initialCards.forEach((card) => {
    elements.append(createCard(card.link, card.name));
})

popupImageClose.addEventListener('click', () => {
    closePopup(popupImage);
})