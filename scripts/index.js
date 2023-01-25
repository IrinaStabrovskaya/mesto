const popUpEdit = document.querySelector('.pop-up_type_edit'); // Попап редактирования профиля
const popUpCreate = document.querySelector('.pop-up_type_create-card'); //Попап создания карточки
const popUpBigPic = document.querySelector('.pop-up_type_big-pic'); // Попап просмотра картинки

const openPopUpEditButton = document.querySelector('.profile__edit-btn'); // Кнопка редактирования профиля
const openPopUpAddButton = document.querySelector('.profile__add-btn'); // Кнопка добавления карточки

const photosImageAll = document.querySelectorAll('.photos__image'); // нашли все картинки
const photosImage = document.querySelector('.photos__image'); //нашли картинку в карточке

const closePopUpButton = document.querySelectorAll('.pop-up__close-btn'); // нашли все крестики кнопки

const popUpImage = document.querySelector('.pop-up__image'); // картинка в попапе
const popUpCaption = document.querySelector('.pop-up__caption'); // подпись картинки в попапе

const cardDelBtn = document.querySelector('.photos__delete-btn'); //выбрали одну кнопку
const cardDelBtnAll = document.querySelectorAll('.photos__delete-btn');//выбрали все кнопки удаления

const likeBtn = document.querySelector('.photos__heart-btn');
const likeBtnAll = document.querySelectorAll('.photos__heart-btn');

const cardList = document.querySelector('.photos__elements');
const cardTemplate = document.querySelector('#photos__element').content;

// сохранение данных на странице через внесение их в форму попапа редактирования профиля
const formElementEdit = popUpEdit.querySelector('.pop-up__form'); //
const nameInputEdit = popUpEdit.querySelector('.pop-up__form-input_type_name'); //
const jobInputEdit = popUpEdit.querySelector('.pop-up__form-input_type_job'); //
const profileTitle = document.querySelector('.profile__title'); //
const profileSubtitle = document.querySelector('.profile__subtitle'); //

// создание новой карточки через форму попапа добавления карточек
const formElementCreate = popUpCreate.querySelector('.pop-up__form');
const placeTitleInputCreate = popUpCreate.querySelector('.pop-up__form-input_type_place-title');
const linkInputCreate = popUpCreate.querySelector('.pop-up__form-input_type_link');

//общая функция открытия попапов
function openPopUp(popup) {
  popup.classList.add('pop-up_opened');
};

//общая функция закрытия попапов
function closePopUp(popup) {
  popup.classList.remove('pop-up_opened');
};

//открытие попапа по кнопке редактирования профиля
openPopUpEditButton.addEventListener('click', function () {
  openPopUp(popUpEdit);
  nameInputEdit.value = profileTitle.textContent;
  jobInputEdit.value = profileSubtitle.textContent;
});

// открытие попапа добавления карточки
openPopUpAddButton.addEventListener('click', () => openPopUp(popUpCreate));

//закрытие попапа по кнопке-крестику
const buttonClose = closePopUpButton.forEach((button) => {
  const popUp = button.closest('.pop-up');
  button.addEventListener('click', () => closePopUp(popUp));
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
const deleteCard = (cardDelBtn) => {
  cardDelBtn.closest('.photos__element').remove();
}

const deleteThisCard = cardDelBtnAll.forEach((delBtn) => {
  delBtn.addEventListener('click', (evt) => deleteCard(evt.target));
});

//лайки
const clickLike = (likeBtn) => {
  likeBtn.classList.toggle('photos__heart-btn_active');
};

const clickLikeCard = likeBtnAll.forEach((like) => {
  like.addEventListener('click', (evt) => clickLike(evt.target));
});

//открытие попапа просмотра изображения по нажатию на картинку в карточке
const openBigPic = (photosImage) => {
  popUpImage.src = photosImage.src;
  popUpCaption.textContent = photosImage.closest('.photos__element').textContent;
  openPopUp(popUpBigPic);
};

const openThisBigPic = photosImageAll.forEach((pic) => {
  pic.addEventListener('click', (evt) => openBigPic(evt.target));
});

//создание новой карточки
const createCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.photos__image').src = card.link;
  cardElement.querySelector('.photos__image').alt = 'фото ' + card.name;
  cardElement.querySelector('.photos__title').textContent = card.name;
  cardElement.querySelector('.photos__delete-btn').addEventListener('click', (evt) => deleteCard(evt.target));
  cardElement.querySelector('.photos__heart-btn').addEventListener('click', (evt) => clickLike(evt.target));
  cardElement.querySelector('.photos__image').addEventListener('click', (evt) => openBigPic(evt.target));

  return cardElement;
};

//добавление новой карточки на страницу
const renderCard = (card) => {
  cardList.prepend(createCard(card));
};

//создание карточек при загрузке страницы
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Маяк Анива',
    link: 'https://images.unsplash.com/photo-1660548842498-852ef7793ae2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
  }
];

const addCards = initialCards.forEach((item) => {
  createCard(item);
  cardList.append(createCard(item));
});

formElementEdit.addEventListener('submit', handleFormSubmitEdit);
formElementCreate.addEventListener('submit', handleFormSubmitCreate);
