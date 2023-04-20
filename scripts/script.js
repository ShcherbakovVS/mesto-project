const template = document.querySelector('#template-card').content;
const edit = document.querySelector('.profile__edit');
const add = document.querySelector('.profile__add');
const popupEdit = document.querySelector('.popup');
const popupAdd = document.querySelectorAll('.popup')[1];
const popupImage = document.querySelectorAll('.popup')[2];
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
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

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
    popupEdit.classList.remove('popup_opened');
}

formElementEdit.addEventListener('submit', handleFormSubmitEdit);

add.addEventListener('click', () => {
    openPopup(popupAdd);
});

popupAddClose.addEventListener('click', () => {
    closePopup(popupAdd);
});

function addCard(img, name) {
    const cardElement = template.querySelector('.elements__element').cloneNode(true);
    const image = cardElement.querySelector('.elements__image');
    const title = cardElement.querySelector('.elements__title');
    image.src = img;
    title.textContent = name;
    cardElement.querySelector('.elements__like').addEventListener('click', (evt => {
        evt.target.classList.toggle('elements__like_actived');
    }));
    cardElement.querySelector('.elements__trash').addEventListener('click', () => {
        cardElement.remove()
    });
    image.addEventListener('click', () => {
        openPopup(popupImage);
        popupImage.querySelector('.popup__image').src = image.src;
        popupImage.querySelector('.popup__title-place').textContent = title.textContent; 
    });
    return cardElement;
}

function handleFormSubmitAdd(evt) {
    evt.preventDefault();
    elements.prepend(addCard(imgInputAdd.value, nameInputAdd.value));
    popupAdd.classList.remove('popup_opened');
}

formElementAdd.addEventListener('submit', handleFormSubmitAdd);

initialCards.forEach((card) => {
    elements.append(addCard(card.link, card.name));
})

popupImageClose.addEventListener('click', () => {
    closePopup(popupImage);
})