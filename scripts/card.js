export class Card {

  constructor(cardTemplate, link, name, openBigPic) {
    this._link = link;
    this._name = name;
    this._cardTemplate = cardTemplate;
    this._openBigPic = openBigPic;
  }

  _getTemplate() {
    const cardElement = document.querySelector('#photos__element')
      .content
      .querySelector('.photos__element')
      .cloneNode(true);

    return cardElement;
  }

  _clickLike() {
    this._element.querySelector('.photos__heart-btn').classList.toggle('photos__heart-btn_active');
  }

  _deleteCard() {
    this._element.querySelector('.photos__delete-btn').closest('.photos__element').remove();
  }

  _setEventListeners() {
    this._element.querySelector('.photos__heart-btn')
      .addEventListener('click', () => this._clickLike());

    this._element.querySelector('.photos__delete-btn')
      .addEventListener('click', () => this._deleteCard());

    this._element.querySelector('.photos__image')
      .addEventListener('click', () => this._openBigPic(this._link, this._name));
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.photos__image').src = this._link;
    this._element.querySelector('.photos__image').alt = `фото  ${this._name}`;
    this._element.querySelector('.photos__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
