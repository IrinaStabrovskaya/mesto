import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopUp = document.querySelector('.pop-up__image');
    this._captionImagePopUp = document.querySelector('.pop-up__caption');
  }

  open(data) {
    this._imagePopUp.src = data.link;
    this._imagePopUp.alt = `фото  ${data.name}`;
    this._captionImagePopUp.textContent = data.name;

    super.open();
  }
}
