import { idOwner } from "./index.js";
import { likeCard, dislikeCard } from "./api.js";
import { popupImageTitle, openPopup, popupImage, popupDelete } from "./modal.js";

const template = document.querySelector('#template-card').content;
const bigImg = popupImage.querySelector('.popup__image');
export const elements = document.querySelector('.elements');
export let idCardForRemoving;
export let cardForRemoving;

export function createCard(img, name, likes, idOwnerCard, idCard) {
    const cardElement = template.querySelector('.elements__element').cloneNode(true);
    const image = cardElement.querySelector('.elements__image');
    const title = cardElement.querySelector('.elements__title');
    const like = cardElement.querySelector('.elements__like-quantity');
    const trash = cardElement.querySelector('.elements__trash');
    
    if (idOwnerCard !== idOwner) {
        trash.remove();
    }

    image.src = img;
    image.alt = name
    title.textContent = name;
    like.textContent = likes;

    cardElement.querySelector('.elements__like').addEventListener('click', (evt => {
        if (!evt.target.classList.contains('elements__like_actived')) {
            likeCard(idCard)
                .then(res => {
                    if (res.likes.some((like) => {
                        return like._id === idOwner
                    })) {
                        evt.target.classList.add('elements__like_actived');
                    }
                    like.textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            dislikeCard(idCard)
                .then(res => {
                    console.log(res);
                    if (!(res.likes.some((like) => {
                        return like._id === idOwner
                    }))) {
                        evt.target.classList.remove('elements__like_actived');
                    }
                    like.textContent = res.likes.length;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }));

    trash.addEventListener('click', () => {
        openPopup(popupDelete);
        idCardForRemoving = idCard;
        cardForRemoving = cardElement;
    })

    image.addEventListener('click', () => {
        openPopup(popupImage);
        bigImg.src = image.src;
        bigImg.alt = title.textContent;
        popupImageTitle.textContent = title.textContent; 
    });

    return cardElement;
}


