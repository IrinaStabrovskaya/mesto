import { Card } from './Card.js';
import { initialCards } from './cards.js';
import { FormValidator } from './FormValidator.js';
import { formValidationConfig } from './object.js';

const popUpEdit = document.querySelector('.pop-up_type_edit'); // Попап редактирования профиля
const popUpCreate = document.querySelector('.pop-up_type_create-card'); //Попап создания карточки
const popUpBigPic = document.querySelector('.pop-up_type_big-pic'); // Попап просмотра картинки
const buttonOpenPopUpEdit = document.querySelector('.profile__edit-btn'); // Кнопка редактирования профиля
const buttonOpenPopUpAdd = document.querySelector('.profile__add-btn'); // Кнопка добавления карточки
const closeButtons = document.querySelectorAll('.pop-up__close-btn'); // нашли все крестики кнопки
const imagePopUp = document.querySelector('.pop-up__image'); // картинка в попапе
const captionImagePopUp = document.querySelector('.pop-up__caption'); // подпись картинки в попапе
const containerCards = document.querySelector('.photos__elements');

// сохранение данных на странице через внесение их в форму попапа редактирования профиля
const formEdit = document.forms['profile-form']; //
const nameInputEdit = popUpEdit.querySelector('.pop-up__form-input_type_name'); //
const jobInputEdit = popUpEdit.querySelector('.pop-up__form-input_type_job'); //
const profileTitle = document.querySelector('.profile__title'); //
const profileSubtitle = document.querySelector('.profile__subtitle'); //

// создание новой карточки через форму попапа добавления карточек
const formCreate = document.forms['card-form'];
const placeTitleInputCreate = popUpCreate.querySelector('.pop-up__form-input_type_place-title');
const linkInputCreate = popUpCreate.querySelector('.pop-up__form-input_type_link');

//создание
const formEditValid = new FormValidator(formValidationConfig, formEdit);
formEditValid.enableValidation();

const formCreateValid = new FormValidator(formValidationConfig, formCreate);
formCreateValid.enableValidation();

//общая функция открытия попапов
function openPopUp(popup) {
  popup.classList.add('pop-up_opened');
  document.addEventListener('keydown', closePopUpByEsc);
};

//общая функция закрытия попапов
function closePopUp(popup) {
  popup.classList.remove('pop-up_opened');
  document.removeEventListener('keydown', closePopUpByEsc);
};

//функция закрытия попапа по кнопке Esc
function closePopUpByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopUp = document.querySelector('.pop-up_opened');
    closePopUp(openedPopUp);
  };
};

//функция закрытия попапа по оверлею
const popups = document.querySelectorAll('.pop-up');

popups.forEach((popup) => {
  popup.addEventListener('mousedown', function (evt) {
    if (!evt.target.closest('.pop-up__container')) {
      closePopUp(popup);
    };
  });
});

//функция сохранения новых данных профиля через форму "Сохранить"
function handleFormSubmitEdit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInputEdit.value;
  profileSubtitle.textContent = jobInputEdit.value;
  closePopUp(popUpEdit);
};

//функция сохранения новой карточки по нажатию на кнопку "Создать"
function handleFormSubmitCreate(evt) {
  evt.preventDefault();
  renderCard({ name: placeTitleInputCreate.value, link: linkInputCreate.value });
  closePopUp(popUpCreate);
};

//открытие попапа просмотра изображения по нажатию на картинку в карточке
const openBigPic = (link, name) => {
  imagePopUp.src = link;
  imagePopUp.alt = `фото  ${name}`;
  captionImagePopUp.textContent = name;

  openPopUp(popUpBigPic);
};

//создание новой карточки
const createCard = (card) => {
  const newCard = new Card('#photos__element', card.link, card.name, openBigPic);
  const cardElem = newCard.generateCard();
  return cardElem;
};

//добавление новой карточки на страницу
const renderCard = (card) => {
  containerCards.prepend(createCard(card));
};

//создание карточек при загрузке страницы
initialCards.forEach((item) => {
  containerCards.append(createCard(item));
});

//закрытие попапа по кнопке-крестику

closeButtons.forEach((button) => {
  const popUp = button.closest('.pop-up');
  button.addEventListener('click', () => closePopUp(popUp));
});

formEdit.addEventListener('submit', handleFormSubmitEdit);
formCreate.addEventListener('submit', handleFormSubmitCreate);

//открытие попапа по кнопке редактирования профиля
buttonOpenPopUpEdit.addEventListener('click', function () {
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
  formEditValid.resetValidation();

  openPopUp(popUpEdit);
});

// открытие попапа добавления карточки
buttonOpenPopUpAdd.addEventListener('click', function () {
  formCreate.reset();
  formCreateValid.resetValidation();

  openPopUp(popUpCreate);
});



