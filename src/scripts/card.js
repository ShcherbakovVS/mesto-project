import { initialCards } from "./data.js";
import { bigImg, popupImageTitle, openPopup, popupImage } from "./modal.js";

const template = document.querySelector('#template-card').content;
export const elements = document.querySelector('.elements');

export function createCard(img, name) {
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
        bigImg.src = image.src;
        bigImg.alt = title.textContent;
        popupImageTitle.textContent = title.textContent; 
    });
    return cardElement;
}

initialCards.forEach((card) => {
    elements.append(createCard(card.link, card.name));
})