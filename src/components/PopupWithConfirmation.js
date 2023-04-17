import { Popup } from "./Popup.js";
export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".pop-up__form");
    this._button = this._form.querySelector(".pop-up__form-save-btn");
  }
  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const initialText = this._button.textContent;
      this._button.textContent = "Удаление...";
      this._handleFormSubmit(this)
        .then(() => this.close())
        .finally(() => {
          this._button.textContent = initialText;
        })
    });
  }
}
