export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('pop-up_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('pop-up_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose = (event) => {
    if (event.key === 'Escape') {
      const openedPopUp = document.querySelector('.pop-up_opened');
      this.close(openedPopUp);
    }
  }

  setEventListeners() {
    const closeButton = this._popup.querySelector('.pop-up__close-btn');
    closeButton.addEventListener('click', () => this.close());

    this._popup.addEventListener('mousedown', (evt) => {
      if (!evt.target.closest('.pop-up__container')) {
        this.close();
      };
    });
  }
}
