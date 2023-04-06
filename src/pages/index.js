import { Card } from '../components/Card.js';
import { initialCards } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import { formValidationConfig } from '../utils/constants.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { buttonOpenPopUpEdit, buttonOpenPopUpAdd, formEdit, formCreate } from '../utils/constants.js';
import './index.css';

//создание экземпляров класса валидации
const formEditValid = new FormValidator(formValidationConfig, formEdit);
formEditValid.enableValidation();

const formCreateValid = new FormValidator(formValidationConfig, formCreate);
formCreateValid.enableValidation();

//создание экземпляра класса UserInfo
const userData = new UserInfo({ profileNameSelector: '.profile__title', profileJobSelector: '.profile__subtitle' });

//создание экземпляра класса PopupWithImage
const popupImage = new PopupWithImage('.pop-up_type_big-pic');
popupImage.setEventListeners();

//создание новой карточки
const createCard = ({ link, name }) => {
  const newCard = new Card('#photos__element', { link: link, name: name, handleCardClick: () => popupImage.open({ link, name }) });
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
const popupAddCard = new PopupWithForm('.pop-up_type_create-card', (link, name) => {
  cardList.addItem(createCard(link, name));
}, '.photos__elements');
popupAddCard.setEventListeners();


//создание экземплярв класса PopupWithForm для попапа профайла
const popupEditProfile = new PopupWithForm('.pop-up_type_edit', ({ name, job }) => {
  userData.setUserInfo({ name, job });
});
popupEditProfile.setEventListeners();


//открытие попапа по кнопке редактирования профиля
buttonOpenPopUpEdit.addEventListener('click', function () {
  popupEditProfile.setInputValues(userData.getUserInfo());
  formEditValid.resetValidation();
  popupEditProfile.open();
});

// открытие попапа добавления карточки
buttonOpenPopUpAdd.addEventListener('click', function () {
  formCreate.reset();
  formCreateValid.resetValidation();
  popupAddCard.open();
});
















