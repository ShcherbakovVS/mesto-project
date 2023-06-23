export default class Card {
    constructor({ link = '', name = '', likes = '', owner = '', _id = '' }, selector = '', handleCardClick = () => {}, likeCardApi = () => {}, dislikeCardApi = () => {}, handleCardRemoving = () => {}) {
        this._img = link;
        this._name = name;
        this._likesId = likes;
        this._likes = likes.length;
        this._cardOwnerId = owner._id;
        this._cardId = _id;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._likeCardApi = likeCardApi;
        this._dislikeCardApi = dislikeCardApi;
        this._handleCardRemoving = handleCardRemoving;
    }

    _getElement() {
        const cardElement = document
        .querySelector(this._selector)
        .content
        .querySelector('.elements__element')
        .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like').addEventListener('click', evt => {
            this._handleLikeClick(evt);
        });

        this._image.addEventListener('click', () => {
            this._handleImageClick();
        });

        this._trash.addEventListener('click', () => {
            this._handleTrashClick();
        })

    }

    _handleLikeClick(evt) {
        if (!evt.target.classList.contains('elements__like_actived')) {
            this._likeCardApi(this._cardId)
                .then(res => {
                    this.likeCard(res.likes.length);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this._dislikeCardApi(this._cardId)
                .then(res => {
                    this.dislikeCard(res.likes.length);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    _handleImageClick() {
        this._handleCardClick(this._image.src, this._title.textContent);
    }

    _handleTrashClick() {
        this._handleCardRemoving(this._element, this._cardId);
    }

    likeCard(count) {
        this._element.querySelector('.elements__like').classList.add('elements__like_actived');
        this._like.textContent = count;
    }
    
    dislikeCard(count) {
        this._element.querySelector('.elements__like').classList.remove('elements__like_actived');
        this._like.textContent = count;
    }

    deleteCard(cardElement) {
        cardElement.remove();
    }

    generate(ownerId) {
        this._element = this._getElement();
        this._image = this._element.querySelector('.elements__image');
        this._trash = this._element.querySelector('.elements__trash');
        this._like = this._element.querySelector('.elements__like-quantity');
        this._title = this._element.querySelector('.elements__title');

        this._image.src = this._img;
        this._image.alt = this._name;

        this._title.textContent = this._name;
        this._like.textContent = this._likes;

        this._likesId.some(likeId => likeId._id === ownerId) ? this.likeCard(this._likes) : this._like.textContent = this._likes;

        if (this._cardOwnerId !== ownerId) {
            this._trash.remove();
        }

        this._setEventListeners();

        return this._element;
    }
}