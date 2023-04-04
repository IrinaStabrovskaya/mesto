export class Card {

  constructor(templateSelector, { link, name, handleCardClick }) {
    this._link = link;
    this._name = name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.photos__element')
      .cloneNode(true);

    return cardElement;
  };

  _clickLike() {
    this._likeButton.classList.toggle('photos__heart-btn_active');
  };

  _deleteCard() {
    this._element.remove();
  };

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.photos__image');
    this._cardTitle = this._element.querySelector('.photos__title');
    this._likeButton = this._element.querySelector('.photos__heart-btn');
    this._deleteButton = this._element.querySelector('.photos__delete-btn');

    this._cardImage.src = this._link;
    this._cardImage.alt = `фото  ${this._name}`;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  };

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => this._clickLike());

    this._deleteButton.addEventListener('click', () => this._deleteCard());

    this._cardImage.addEventListener('click', () => this._handleCardClick());
  };
}
