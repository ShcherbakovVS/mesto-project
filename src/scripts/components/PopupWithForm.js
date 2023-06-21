import Popup from "./Popup";

export default class PopupWithForm extends Popup {
    constructor(selector, formSubmiting) {
        super(selector);
        this._formSubmiting = formSubmiting;
    }

    _getInputValues() {
        this._inputList = this.popupElement.querySelectorAll('.popup__input-text');
        
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formContainer = this.popupElement.querySelector('.popup__container');
        
        this._formContainer.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitButton = this._formContainer.querySelector('.popup__save');
            this._submitButton.textContent = 'Сохранение...';

            this._formSubmiting(this._getInputValues());
        }) 
    }

    close() {
        super.close();

        this._formContainer.reset();
    }
}