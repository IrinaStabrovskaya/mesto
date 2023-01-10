let popUp = document.querySelector('.pop-up');
let openPopUpButton = document.querySelector('.profile__edit-btn');
let closePopUpButton = document.querySelector('.pop-up__close-btn');
let formElement = document.querySelector('.pop-up__form');
let nameInput = document.querySelector('.pop-up__form-input_type_name');
let jobInput = document.querySelector('.pop-up__form-input_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

nameInput.getAttribute('value');
jobInput.getAttribute('value');

function openPopUp() {
  popUp.classList.add('pop-up_opened');

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function closePopUp() {
  popUp.classList.remove('pop-up_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopUp();
}

openPopUpButton.addEventListener('click', openPopUp);
closePopUpButton.addEventListener('click', closePopUp);
formElement.addEventListener('submit', handleFormSubmit);