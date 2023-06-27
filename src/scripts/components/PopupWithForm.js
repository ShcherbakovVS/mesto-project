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
        this.formContainer = this.popupElement.querySelector('.popup__container');
        
        this.formContainer.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitButton = this.formContainer.querySelector('.popup__save');
            this.submitButton.textContent = 'Сохранение...';

            this._formSubmiting(this._getInputValues());
        }) 
    }

    close() {
        super.close();

        this.formContainer.reset();
    }
}