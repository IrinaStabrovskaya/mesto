//объект используемый в валидации
export const formValidationConfig = {
  formSelector: '.pop-up__form', //form
  inputSelector: '.pop-up__form-input', //input
  inputErrorSelector: '.pop-up__form-input_type_error',
  classInputError: 'pop-up__form-input_type_error', //класс инпута, который добавляется при ошибке ввода данных
  errorSelector: '.pop-up__form-input-error_active',
  classErrorActive: 'pop-up__form-input-error_active', //класс для span, который показывает текст ошибки
  buttonSubmitSelector: '.pop-up__form-save-btn', //button
  classButtonDisabled: 'pop-up__form-save-btn_disabled'//класс для стилизации заблокированной кнопки
};

//начальные карточки
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'о.Русский',
    link: 'https://images.unsplash.com/photo-1630006746588-9dd9b6a4b7a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=626&q=80'
  },
  {
    name: 'Иваногородская крепость',
    link: 'https://images.unsplash.com/photo-1628934483549-e7d7adadd81c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1665584567788-c9d06af61bf2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1935&q=80'
  },
  {
    name: 'Маяк Анива',
    link: 'https://images.unsplash.com/photo-1660548842498-852ef7793ae2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
  }
];

const buttonOpenPopUpEdit = document.querySelector('.profile__edit-btn'); // Кнопка редактирования профиля
const buttonOpenPopUpAdd = document.querySelector('.profile__add-btn'); // Кнопка добавления карточки
const buttonDelCard = document.querySelector('.photos__delete-btn'); //Кнопка удаления карточки
const formEdit = document.forms['profile-form'];
const formCreate = document.forms['card-form'];
const formAvatar = document.forms['avatar-form'];

export { buttonOpenPopUpEdit, buttonOpenPopUpAdd, formEdit, formCreate, buttonDelCard, formAvatar };
