export default class FormValidator {
    constructor(objSelectors, form) {
        this._objSelectors = objSelectors;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(objSelectors.inputSelector));
        this._buttonElement = this._form.querySelector(objSelectors.submitButtonSelector);
    }

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => !inputElement.validity.valid)
    }

    _setDisabledStateButton() {
        this._buttonElement.classList.add(this._objSelectors.inactiveButtonClass);
        this._buttonElement.classList.remove(this._objSelectors.activeButtonClass);
        this._buttonElement.setAttribute('disabled', true);
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._setDisabledStateButton();
        } else {
            this._buttonElement.classList.remove(this._objSelectors.inactiveButtonClass);
            this._buttonElement.classList.add(this._objSelectors.activeButtonClass);
            this._buttonElement.removeAttribute('disabled');
        }
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._form.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.add(this._objSelectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._objSelectors.errorClass);
    }

    _hideInputError(inputElement) {
        const errorElement = this._form.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.remove(this._objSelectors.inputErrorClass);
        errorElement.classList.remove(this._objSelectors.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        inputElement.validity.patternMismatch ? inputElement.setCustomValidity(inputElement.dataset.errorMessage) : inputElement.setCustomValidity('');
        inputElement.validity.valid ? this._hideInputError(inputElement) : this._showInputError(inputElement, inputElement.validationMessage);
    }

    setInitialState() {
        this._setDisabledStateButton()
        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        })
}

    _setEventListeners() {
        this._toggleButtonState();
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._setEventListeners();
    }

}