export default class FormValidator {
    constructor(objSelectors, form) {
        this._objSelectors = objSelectors;
        this._form = form;
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => !inputElement.validity.valid)
    }

    _toggleButtonState(inputList, buttonElement, objSelectors) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(objSelectors.inactiveButtonClass);
            buttonElement.classList.remove(objSelectors.activeButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(objSelectors.inactiveButtonClass);
            buttonElement.classList.add(objSelectors.activeButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _showInputError(formElement, inputElement, errorMessage, objSelectors) {
        const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.add(objSelectors.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(objSelectors.errorClass);
    }

    _hideInputError(formElement, inputElement, objSelectors) {
        const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
        inputElement.classList.remove(objSelectors.inputErrorClass);
        errorElement.classList.remove(objSelectors.errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(formElement, inputElement, objSelectors) {
        inputElement.validity.patternMismatch ? inputElement.setCustomValidity(inputElement.dataset.errorMessage) : inputElement.setCustomValidity('');
        inputElement.validity.valid ? this._hideInputError(formElement, inputElement, objSelectors) : this._showInputError(formElement, inputElement, inputElement.validationMessage, objSelectors);
    }

    _setEventListeners(formElement, objSelectors) {
        const inputList = Array.from(formElement.querySelectorAll(objSelectors.inputSelector));
        const buttonElement = formElement.querySelector(objSelectors.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement, objSelectors);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement, objSelectors);
                this._toggleButtonState(inputList, buttonElement, objSelectors);
            });
        });
    }

    enableValidation() {
        this._setEventListeners(this._form, this._objSelectors);
    }

}