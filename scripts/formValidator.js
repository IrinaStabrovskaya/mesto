import { formValidationConfig } from './object.js';

export class FormValidator {
  constructor(formValidationConfig, formItem) {
    this._config = formValidationConfig;
    this._formItem = formItem;
    this._formSelector = formValidationConfig.formSelector;
    this._inputItem = formItem.querySelector(formValidationConfig.inputSelector);
    this._inputSelector = formValidationConfig.inputSelector;
    this._inputErrorSelector = formValidationConfig.inputErrorSelector;
    this._classInputError = formValidationConfig.classInputError;
    this._errorSelector = formValidationConfig.errorSelector;
    this._classErrorActive = formValidationConfig.classErrorActive;
    this._buttonSubmitSelector = formValidationConfig.buttonSubmitSelector;
    this._classButtonDisable = formValidationConfig.classButtonDisable;
    this._errorMessage = this._inputItem.validationMessage;
  };

_cancelSubmit = (evt) => {
  evt.preventDefault();
};

_showInputError() {
  const errorElement = this._formItem.querySelector(`.${this._inputItem.name}-error`);
  this._inputItem.classList.add(this._classInputError);
  errorElement.classList.add(this._classErrorActive);
  errorElement.textContent = this._errorMessage;
};

_hideInputError() {
  const errorElement = this._formItem.querySelector(`.${this._inputItem.name}-error`);
  this._inputItem.classList.remove(this._classInputError);
  errorElement.classList.remove(this._classErrorActive);
  errorElement.textContent = '';
};

_cleanErrors() {
  const errorsElement = this._formItem.querySelectorAll(this._errorSelector);
  errorsElement.forEach((errorElement) => {
    errorElement.classList.remove(this._classErrorActive);
    errorElement.textContent = '';
  });

  const inputs = this._formItem.querySelectorAll(this._inputErrorSelector);
  inputs.forEach((input) => {
    input.classList.remove(this._classInputError);
  });
};

_checkInputValidity() {
  if (!this._inputItem.validity.valid) {
    this._showInputError(this._formItem, this._inputItem, this._config, this._inputItem.validationMessage);
  } else {
    this._hideInputError(this._formItem, this._inputItem, this._config);
  };

};

_toggleButtonSubmit() {
  const buttonSubmit = this._formItem.querySelector(this._buttonSubmitSelector);
  const isFormValid = this._formItem.checkValidity();
  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(this._classButtonDisable, !isFormValid);
};

_addInputListeners() {
  const inputList = Array.from(this._formItem.querySelectorAll(this._inputSelector));
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      this._checkInputValidity(inputItem);
    });
  });
};

enableValidation() {

    this._formItem.addEventListener('submit', () => this._cancelSubmit);
    this._formItem.addEventListener('input', () => {
      this._toggleButtonSubmit(this._formItem);
    });
    this._addInputListeners(this._formItem, this._config);
    this._toggleButtonSubmit(this._formItem, this._config);

  };
};
