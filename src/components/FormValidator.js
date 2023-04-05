import { formValidationConfig } from '../utils/constants.js';
export class FormValidator {
  constructor(formValidationConfig, formItem) {
    this._config = formValidationConfig;
    this._formItem = formItem;
    this._formSelector = formValidationConfig.formSelector;
    this._inputSelector = formValidationConfig.inputSelector;
    this._inputList = Array.from(this._formItem.querySelectorAll(this._inputSelector));
    this._inputErrorSelector = formValidationConfig.inputErrorSelector;
    this._classInputError = formValidationConfig.classInputError;
    this._errorSelector = formValidationConfig.errorSelector;
    this._classErrorActive = formValidationConfig.classErrorActive;
    this._classButtonDisabled = formValidationConfig.classButtonDisabled;
    this._buttonSubmitSelector = formValidationConfig.buttonSubmitSelector;
    this._buttonSubmit = this._formItem.querySelector(this._buttonSubmitSelector);
  };

  _cancelSubmit = (evt) => {
    evt.preventDefault();
  };

  _showInputError(inputItem, errorMessage) {
    const errorElement = this._formItem.querySelector(`.${inputItem.name}-error`);
    inputItem.classList.add(this._classInputError);
    errorElement.classList.add(this._classErrorActive);
    errorElement.textContent = errorMessage;
  };

  _hideInputError(inputItem) {
    const errorElement = this._formItem.querySelector(`.${inputItem.name}-error`);
    inputItem.classList.remove(this._classInputError);
    errorElement.classList.remove(this._classErrorActive);
    errorElement.textContent = '';
  };

  resetValidation() {
    this._toggleButtonSubmit();

    this._inputList.forEach((inputItem) => {
      this._hideInputError(inputItem);
    });
  }

  _checkInputValidity(inputItem) {
    if (!inputItem.validity.valid) {
      this._showInputError(inputItem, inputItem.validationMessage);
    } else {
      this._hideInputError(inputItem);
    };
  };

  _toggleButtonSubmit() {

    const isFormValid = this._formItem.checkValidity();
    this._buttonSubmit.disabled = !isFormValid;
    this._buttonSubmit.classList.toggle(this._classButtonDisabled, !isFormValid);
  };

  _addInputListeners() {

    this._inputList.forEach((inputItem) => {
      inputItem.addEventListener('input', () => {
        this._checkInputValidity(inputItem);
      });
    });
  };

  enableValidation() {

    this._formItem.addEventListener('submit', () => this._cancelSubmit);
    this._formItem.addEventListener('input', () => {
      this._toggleButtonSubmit();
    });
    this._addInputListeners();
    this._toggleButtonSubmit();
  };
};
