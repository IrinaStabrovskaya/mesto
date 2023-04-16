export class Card {

  constructor(templateSelector, { card, handleCardClick, handleTrashIcon, handleLikeIcon, userId }) {
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._card = card;
    this._link = card.link;
    this._cardId = card._id;
    this._name = card.name;
    this._likes = card.likes;
    this._ownerId = card.owner._id;
    this._handleTrashIcon = handleTrashIcon;
    this._handleLikeIcon = handleLikeIcon;
    this._handleCardClick = handleCardClick;
  };

  _getTemplate = () => {
    const cardElement = document.querySelector(this._templateSelector)
      .content
      .querySelector('.photos__element')
      .cloneNode(true);
    return cardElement;
  };

  //лайк включен
  isLikeState = () => {
    this._likeButton.classList.add('photos__heart-btn_active');
  }

  //лайк выключен
  disLikeState = () => {
    this._likeButton.classList.remove('photos__heart-btn_active');
  }

  //функция проверки id лайков
  checkOwnerId = () => {

    return this._likes.find((like) => like._id === this._userId);
  }

  //функция переключения режима счетчика( виден/не виден)
  _counterContainerState = () => {
    if (this._likes.length == 0) {
      this._counter.textContent = '';
      this._counterContainer.classList.remove('photos__like_with-counter');
    } else {
      this._counterContainer.classList.add('photos__like_with-counter');
    }
  }

  //проверка id владельца карточки для того чтобы установить или убрать иконку удаления(корзину)
  _isCardOwnerId = () => {
    return this._userId === this._ownerId;
  }

  //функция удаления карточки
  deleteCard = () => {
    this._element.remove();
  };

  //функция проверки моего лайка, изменения состояние на активное или нет,
  //и подсчет и запись количества лайков карточки в каунтер
  //ф-ция вызвана при создании карточки и как метод класса в handleLikeIcon
  checkStatusLikes(likes) {
    this._likes = likes;
    this._counter.textContent = this._likes.length;
    if (this._likes.find((like) => like._id === this._userId)) {
      this.isLikeState();
    } else {
      this.disLikeState();
    };
    this._counterContainerState();
  }

  generateCard = () => {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.photos__image');
    this._cardTitle = this._element.querySelector('.photos__title');
    this._likeButton = this._element.querySelector('.photos__heart-btn');
    this._deleteButton = this._element.querySelector('.photos__delete-btn');
    this._counterContainer = this._element.querySelector('.photos__like');
    this._counter = this._element.querySelector('.photos__like-counter');
    this._cardImage.src = this._link;
    this._cardImage.alt = `фото  ${this._name}`;
    this._cardTitle.textContent = this._name;

    this.checkStatusLikes(this._card.likes);
    this._setEventListeners();

    return this._element;
  };

  _setEventListeners = () => {
    this._cardImage.addEventListener('click', () => this._handleCardClick());
    if (this._isCardOwnerId()) {
      this._deleteButton.addEventListener('click', () => this._handleTrashIcon(this));
    } else {
      this._deleteButton.remove();
    }
    this._likeButton.addEventListener('click', () => this._handleLikeIcon(this._cardId));
  };
}
