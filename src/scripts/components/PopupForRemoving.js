import Popup from "./Popup";

export default class PopupForRemoving extends Popup {
    constructor(selector, cardRemoving) {
        super(selector);
        this.cardForRemoving = '';
        this.cardIdForRemoving = '';
        this._cardRemoving = cardRemoving;
    }

    setEventListeners() {
        super.setEventListeners();

        this.popupElement.querySelector('.popup__save_margin_less').addEventListener('click', () => {
            this._cardRemoving();
        })
    }
}