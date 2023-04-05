import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopUp = this._popup.querySelector('.pop-up__image');
    this._captionImagePopUp = this._popup.querySelector('.pop-up__caption');
  }

  open(data) {
    this._imagePopUp.src = data.link;
    this._imagePopUp.alt = `фото  ${data.name}`;
    this._captionImagePopUp.textContent = data.name;

    super.open();
  }
}
