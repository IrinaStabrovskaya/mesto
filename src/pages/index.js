import { Card } from '../components/Card.js';
import { initialCards } from '../components/cards.js';
import { FormValidator } from '../components/FormValidator.js';
import { formValidationConfig } from '../components/object.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { buttonOpenPopUpEdit, buttonOpenPopUpAdd, formEdit, formCreate } from '../components/constants.js';
import './index.css';

//создание экземпляров класса валидации
const formEditValid = new FormValidator(formValidationConfig, formEdit);
formEditValid.enableValidation();

const formCreateValid = new FormValidator(formValidationConfig, formCreate);
formCreateValid.enableValidation();

//создание экземпляра класса UserInfo
const userData = new UserInfo({ inputNameSelector: '.pop-up__form-input_type_name', inputJobSelector: '.pop-up__form-input_type_job' });

//создание экземпляра класса PopupWithImage
const openPopupWithImage = new PopupWithImage('.pop-up_type_big-pic');

//создание новой карточки
const createCard = ({ link, name }) => {
  const newCard = new Card('#photos__element', { link: link, name: name, handleCardClick: () => openPopupWithImage.open({ link, name }) });
  openPopupWithImage.setEventListeners();
  const cardElem = newCard.generateCard();
  return cardElem;
};

//создание экземпляра класса Section и начальных карточек на странице
initialCards.reverse();
const cardList = new Section({
  items: initialCards, renderer: (link, name) => {
    cardList.addItem(createCard(link, name));
  }
}, '.photos__elements');
cardList.renderItems();

//создание экземпляра класса PopupWithForm для попапа добавления карточек
const popupCreate = new PopupWithForm('.pop-up_type_create-card', (link, name) => {
  cardList.addItem(createCard(link, name));
}, '.photos__elements');
popupCreate.setEventListeners();


//создание экземплярв класса PopupWithForm для попапа профайла
const popupEdit = new PopupWithForm('.pop-up_type_edit', (data) => {
  userData.setUserInfo(data);
});
popupEdit.setEventListeners();


//открытие попапа по кнопке редактирования профиля
buttonOpenPopUpEdit.addEventListener('click', function () {
  formEditValid.resetValidation();
  popupEdit.open();
});

// открытие попапа добавления карточки
buttonOpenPopUpAdd.addEventListener('click', function () {
  formCreate.reset();
  formCreateValid.resetValidation();
  popupCreate.open();
});
















