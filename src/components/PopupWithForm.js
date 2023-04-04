import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmitForm) {
    super(popupSelector);
    this._handleFormSubmitForm = handleFormSubmitForm;
    this._form = this._popup.querySelector('.pop-up__form');
    this._inputList = this._form.querySelectorAll('.pop-up__form-input');
  }

  _getInputValues = () => {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
      console.log(this._inputValues)
    });

    return this._inputValues;
  }

  setInputValues = (data) => {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmitForm(this._getInputValues());
      this.close();
    }
    );
  }

  close = () => {
    super.close();
    this._form.reset();
  }
}
