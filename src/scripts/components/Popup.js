export default class Popup{
    constructor(selector) {
        this.popupElement = document.querySelector(selector);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open() {
            document.addEventListener('keydown', this._handleEscClose.bind(this));
            this.popupElement.classList.add('popup_opened');
    }

    close() {
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    setEventListeners() {
        this.popupElement.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });
        this.popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__window-image')) {
                this.close();
            }
        })
    }
}