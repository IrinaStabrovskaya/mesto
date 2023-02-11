const popUpEdit = document.querySelector('.pop-up_type_edit'); // Попап редактирования профиля
const popUpCreate = document.querySelector('.pop-up_type_create-card'); //Попап создания карточки
const popUpBigPic = document.querySelector('.pop-up_type_big-pic'); // Попап просмотра картинки

const buttonOpenPopUpEdit = document.querySelector('.profile__edit-btn'); // Кнопка редактирования профиля
const buttonOpenPopUpAdd = document.querySelector('.profile__add-btn'); // Кнопка добавления карточки
const buttonsClosePopUp = document.querySelectorAll('.pop-up__close-btn'); // нашли все крестики кнопки
const buttonDelCard = document.querySelector('.photos__delete-btn'); //выбрали одну кнопку удаления карточки
const buttonLike = document.querySelector('.photos__heart-btn'); //одна кнопка-сердечко

const imagePhotos = document.querySelector('.photos__image'); //нашли картинку в карточке
const imagePopUp = document.querySelector('.pop-up__image'); // картинка в попапе
const captionImagePopUp = document.querySelector('.pop-up__caption'); // подпись картинки в попапе

const containerCards = document.querySelector('.photos__elements');
const cardTemplate = document.querySelector('#photos__element').content;

// сохранение данных на странице через внесение их в форму попапа редактирования профиля
const formEdit = popUpEdit.querySelector('.pop-up__form'); //
const nameInputEdit = popUpEdit.querySelector('.pop-up__form-input_type_name'); //
const jobInputEdit = popUpEdit.querySelector('.pop-up__form-input_type_job'); //
const profileTitle = document.querySelector('.profile__title'); //
const profileSubtitle = document.querySelector('.profile__subtitle'); //

// создание новой карточки через форму попапа добавления карточек
const formCreate = popUpCreate.querySelector('.pop-up__form');
const placeTitleInputCreate = popUpCreate.querySelector('.pop-up__form-input_type_place-title');
const linkInputCreate = popUpCreate.querySelector('.pop-up__form-input_type_link');

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

//функция закрытия попапа пооверлею
const popups = document.querySelectorAll('.pop-up');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', function(evt) {
      if(!evt.target.closest('.pop-up__container')) {
        closePopUp(evt.target.closest('.pop-up'));
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
  const newCreateCard = renderCard({ name: placeTitleInputCreate.value, link: linkInputCreate.value });
  closePopUp(popUpCreate);
};

//удаление карточки по нажатию на кнопку удаления
const deleteCard = (buttonDelCard) => {
  buttonDelCard.closest('.photos__element').remove();
}

//лайки
const clickLike = (buttonLike) => {
  buttonLike.classList.toggle('photos__heart-btn_active');
};

//открытие попапа просмотра изображения по нажатию на картинку в карточке
const openBigPic = (imagePhotos) => {
  imagePopUp.src = imagePhotos.src;
  imagePopUp.alt = imagePhotos.alt;
  captionImagePopUp.textContent = imagePhotos.closest('.photos__element').textContent;
  openPopUp(popUpBigPic);
};

//создание новой карточки
const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const imageTemplate = cardElement.querySelector('.photos__image');

  imageTemplate.src = card.link;
  imageTemplate.alt = 'фото ' + card.name;
  cardElement.querySelector('.photos__title').textContent = card.name;
  cardElement.querySelector('.photos__delete-btn').addEventListener('click', (evt) => deleteCard(evt.target));
  cardElement.querySelector('.photos__heart-btn').addEventListener('click', (evt) => clickLike(evt.target));
  cardElement.querySelector('.photos__image').addEventListener('click', (evt) => openBigPic(evt.target));

  return cardElement;
};

//добавление новой карточки на страницу
const renderCard = (card) => {
  containerCards.prepend(createCard(card));
};

//создание карточек при загрузке страницы
initialCards.forEach((item) => {
  createCard(item);
  containerCards.append(createCard(item));
});

//закрытие попапа по кнопке-крестику

buttonsClosePopUp.forEach((button) => {
  const popUp = button.closest('.pop-up');
  button.addEventListener('click', () => closePopUp(popUp));
});

formEdit.addEventListener('submit', handleFormSubmitEdit);
formCreate.addEventListener('submit', handleFormSubmitCreate);

//открытие попапа по кнопке редактирования профиля
buttonOpenPopUpEdit.addEventListener('click', function () {
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
  openPopUp(popUpEdit);
});

// открытие попапа добавления карточки
buttonOpenPopUpAdd.addEventListener('click', function () {
  formCreate.reset();
  toggleButtonSubmit(formCreate, formValidationConfig);
  openPopUp(popUpCreate);
});




