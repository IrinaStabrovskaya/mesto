import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".pop-up__form");
    this._inputList = this._form.querySelectorAll(".pop-up__form-input");
    this._button = this._form.querySelector(".pop-up__form-save-btn");
  }

  getInputValues = () => {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  };

  setInputValues = (data) => {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  };

  setEventListeners = () => {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const initialText = this._button.textContent;
      this._button.textContent = "Сохранение...";
      this._handleFormSubmit(this.getInputValues())
        .then(() => this.close())
        .finally(() => {
          this._button.textContent = initialText;
        })
    });
  };

  close = () => {
    super.close();
    this._form.reset();
  };
}
