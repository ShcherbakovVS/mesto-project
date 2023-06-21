import '../../pages/index.css';
import { config, objSelectors, cardListSection, popups, buttonOnAvatar, adding, editing } from "../utils/constant";
import Api from "../components/Api";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Selector from "../components/Selector";
import PopupWithImage from '../components/PopupWithImage';
import UserInfo from '../components/UserInfo';
import PopupForRemoving from '../components/PopupForRemoving';
import PopupWithForm from '../components/PopupWithForm';

const api = new Api(config);

const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    userInfoSelector: '.profile__description',
    imgSelector: '.profile__avatar'
}, () => {
    return api.getDataUser()
}, (name, about) => {
    return api.updateDataUser(name, about);
}
);

popups.removing = new PopupForRemoving('.popup_type_delete', () => {
    api.deleteCard(popups.removing.cardIdForRemoving)
        .then(() => {
            popups.removing.cardForRemoving.remove();
            popups.removing.close();
        })
        .catch((err) => {
            console.log(err);
        });
});

popups.editing = new PopupWithForm('.popup_type_edit', (inputValues) => {
    userInfo.setUserInfo(inputValues.name, inputValues.description)
        .then(res => {
            popups.editing.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popups.editing._submitButton.textContent = 'Сохранить';
        });
})

popups.imageUpdate = new PopupWithForm('.popup_type_avatar-exchange', (inputValues) => {
    api.changeAvatar(inputValues.avatarUrl)
        .then((res) => {
            userInfo.avatarElement.src = res.avatar;
            popups.imageUpdate.close();
            popups.imageUpdate._formContainer.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popups.imageUpdate._submitButton.textContent = 'Сохранить';
        })
})

popups.image = new PopupWithImage('.popup_type_image');

popups.adding = new PopupWithForm('.popup_type_add', (inputValues) => {
    api.addNewCard(inputValues.placeName, inputValues.placeImg)
        .then(res => {
            const card = new Card(res, '#template-card', (image, title) => {
                popups.image.open(image, title)
            }, (cardId) => {
                return api.likeCard(cardId);
            }, (cardId) => {
                return api.dislikeCard(cardId);
            }, (element, cardId) => {
                popups.removing.cardForRemoving = element;
                popups.removing.cardIdForRemoving = cardId;
                popups.removing.open();
            });

            const cardElement = card.generate(userInfo.ownerId);

            document.querySelector(cardListSection).prepend(cardElement);
            popups.adding.close();
            popups.adding._formContainer.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popups.adding._submitButton.textContent = 'Создать';
        });
})

Object.values(popups).forEach(popup => {
    popup.setEventListeners();
});

Promise.all([api.getDataUser(), api.getInitialCards()])
    .then(([info, initialCards]) => {
        userInfo.avatarElement.src = info.avatar;
        userInfo.nameElement.textContent = info.name;
        userInfo.userInfoElement.textContent = info.about;
        userInfo.ownerId = info._id;

        const cardList = new Selector({
            items: initialCards,
            renderer: item => {
                const card = new Card(item, '#template-card', (image, title) => {
                    popups.image.open(image, title)
                }, (cardId) => {
                    return api.likeCard(cardId);
                }, (cardId) => {
                    return api.dislikeCard(cardId);
                }, (element, cardId) => {
                    popups.removing.cardForRemoving = element;
                    popups.removing.cardIdForRemoving = cardId;
                    popups.removing.open();
                });

                const cardElement = card.generate(info._id);

                cardList.addItem(cardElement);
            }
            },
            cardListSection
        )
        cardList.rendereItems();
    })
    .catch((err) => {
        console.log(err);
    });

buttonOnAvatar.addEventListener('click', () => {
    popups.imageUpdate.open();
})

adding.addEventListener('click', () => {
    popups.adding.open();
});

editing.addEventListener('click', () => {
    userInfo.getUserInfo()
        .then(userData => {
            popups.editing.popupElement.querySelector('#name').value = userData.name;
            popups.editing.popupElement.querySelector('#description').value = userData.about;
            popups.editing.open();
        })   
});

Array.from(document.querySelectorAll(objSelectors.formSelector)).forEach((form) => {
    const formValid = new FormValidator(objSelectors, form);
    formValid.enableValidation();
});

//Урезал функционал с валидацией из-за жестких рамок в задании.