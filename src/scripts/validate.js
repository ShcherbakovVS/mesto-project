function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid)
}

export function toggleButtonState(inputList, buttonElement, objSelectors) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(objSelectors.inactiveButtonClass);
        buttonElement.classList.remove(objSelectors.activeButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(objSelectors.inactiveButtonClass);
        buttonElement.classList.add(objSelectors.activeButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

function showInputError(formElement, inputElement, errorMessage, objSelectors) {
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    inputElement.classList.add(objSelectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(objSelectors.errorClass);
}

function hideInputError(formElement, inputElement, objSelectors) {
    const errorElement = formElement.querySelector(`.popup__${inputElement.id}-error`);
    inputElement.classList.remove(objSelectors.inputErrorClass);
    errorElement.classList.remove(objSelectors.errorClass);
    errorElement.textContent = '';
}

export function checkInputValidity(formElement, inputElement, objSelectors) {
    inputElement.validity.patternMismatch ? inputElement.setCustomValidity(inputElement.dataset.errorMessage) : inputElement.setCustomValidity('');
    inputElement.validity.valid ? hideInputError(formElement, inputElement, objSelectors) : showInputError(formElement, inputElement, inputElement.validationMessage, objSelectors);
};

function setEventListeners(formElement, objSelectors) {
    const inputList = Array.from(formElement.querySelectorAll(objSelectors.inputSelector));
    const buttonElement = formElement.querySelector(objSelectors.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, objSelectors);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, objSelectors);
            toggleButtonState(inputList, buttonElement, objSelectors);
        });
    });
};

export function enableValidation(objSelectors) {
    Array.from(document.querySelectorAll(objSelectors.formSelector)).forEach((form) => {
        setEventListeners(form, objSelectors);
    });
};