import Popup from "./Popup";

export default class PopupForRemoving extends Popup {
    constructor(selector, removedItem) {
        super(selector);
        this.itemForRemoving = '';
        this.itemIdForRemoving = '';
        this._removedItem = removedItem;
    }

    setEventListeners() {
        super.setEventListeners();

        this.popupElement.querySelector('.popup__save_margin_less').addEventListener('click', () => {
            this._removedItem();
        })
    }
}