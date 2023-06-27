import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
    }
    
    open(image, title) {
        const bigImg = this.popupElement.querySelector('.popup__image');
        bigImg.src = image;
        bigImg.alt = title;
        this.popupElement.querySelector('.popup__title-place').textContent = title;
        super.open();
    }
}