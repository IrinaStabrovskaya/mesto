import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopUp = this._popup.querySelector(".pop-up__image");
    this._captionImagePopUp = this._popup.querySelector(".pop-up__caption");
  }

  open(link, name) {

    this._imagePopUp.src = link;
    this._imagePopUp.alt = `фото  ${name}`;
    this._captionImagePopUp.textContent = name;

    super.open();
  }
}
