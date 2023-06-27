import '../../pages/index.css';
import { config, objSelectors, cardListSection, popups, popupAvatarOpenButton, popupCardAddingOpenButton, PopupProfileOpenButton, validators } from "../utils/constant";
import Api from "../components/Api";
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import Section from "../components/Section";
import PopupWithImage from '../components/PopupWithImage';
import UserInfo from '../components/UserInfo';
import PopupForRemoving from '../components/PopupForRemoving';
import PopupWithForm from '../components/PopupWithForm';

const api = new Api(config);

const card = new Card({});

let cardList = new Section({}, cardListSection);

const userInfo = new UserInfo({
        nameSelector: '.profile__name',
        userInfoSelector: '.profile__description',
        imgSelector: '.profile__avatar'
    }
);

popups.removing = new PopupForRemoving('.popup_type_delete', () => {
    api.deleteCard(popups.removing.itemIdForRemoving)
        .then(() => {
            card.deleteCard(popups.removing.itemForRemoving);
            popups.removing.close();
        })
        .catch((err) => {
            console.log(err);
        });
});

popups.editing = new PopupWithForm('.popup_type_edit', (inputValues) => {
    api.updateDataUser(inputValues.forename, inputValues.description)
        .then(res => {
            userInfo.setUserInfo(res.name, res.about);
            popups.editing.close();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popups.editing.submitButton.textContent = 'Сохранить';
        });
})

popups.imageUpdate = new PopupWithForm('.popup_type_avatar-exchange', (inputValues) => {
    api.changeAvatar(inputValues.avatarUrl)
        .then((res) => {
            userInfo.setUserAvatar(res.avatar);
            popups.imageUpdate.close();
            popups.imageUpdate.formContainer.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popups.imageUpdate.submitButton.textContent = 'Сохранить';
        })
})

popups.image = new PopupWithImage('.popup_type_image');

const createCardObj = (item) => {
    return new Card(item, '#template-card', (image, title) => {
        console.log(image, title)
        popups.image.open(image, title)
    }, (cardId) => {
        return api.likeCard(cardId);
    }, (cardId) => {
        return api.dislikeCard(cardId);
    }, (element, cardId) => {
        popups.removing.itemForRemoving = element;
        popups.removing.itemIdForRemoving = cardId;
        popups.removing.open();
    });
}

popups.adding = new PopupWithForm('.popup_type_add', (inputValues) => {
    api.addNewCard(inputValues.placeName, inputValues.placeImg)
        .then(res => {
            const card = createCardObj(res);

            const cardElement = card.generate(userInfo.ownerId);
            console.log(cardElement, cardList)
            cardList.addItemToStart(cardElement);
            popups.adding.close();
            popups.adding.formContainer.reset();
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            popups.adding.submitButton.textContent = 'Создать';
        });
})

Object.values(popups).forEach(popup => {
    popup.setEventListeners();
});

Promise.all([api.getDataUser(), api.getInitialCards()])
    .then(([info, initialCards]) => {
        userInfo.setUserAvatar(info.avatar);
        userInfo.setUserInfo(info.name, info.about);
        userInfo.ownerId = info._id;
        
        cardList = new Section({
            items: initialCards,
            renderer: item => {
                const card = createCardObj(item);

                const cardElement = card.generate(info._id);

                cardList.addItemToEnd(cardElement);
            }
            },
            cardListSection
        )
        cardList.rendereItems();
    })
    .catch((err) => {
        console.log(err);
    });

Array.from(document.querySelectorAll(objSelectors.formSelector)).forEach((form) => {
    validators[form.name] = new FormValidator(objSelectors, form);
    validators[form.name].enableValidation();
});

popupAvatarOpenButton.addEventListener('click', () => {
            validators.exchanger.setInitialState();
            popups.imageUpdate.open();
        })
        
popupCardAddingOpenButton.addEventListener('click', () => {
    validators.addition.setInitialState();
    popups.adding.open();
});

PopupProfileOpenButton.addEventListener('click', () => {
    validators.editor.setInitialState();
    const userData = userInfo.getUserInfo();
    popups.editing.popupElement.querySelector('#forename').value = userData.name;
    popups.editing.popupElement.querySelector('#description').value = userData.about;
    popups.editing.open();  
});
