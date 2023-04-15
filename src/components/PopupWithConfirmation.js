import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.pop-up__form');
    this._button = this._form.querySelector('.pop-up__form-save-btn');
  }
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  open() {
    this._button.textContent = 'Да';
    super.open();
  }
  setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._button.textContent = 'Удаление...';
      this._handleFormSubmit();
    });
    super.setEventListeners();
  }
}
