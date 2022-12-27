let popUp = document.querySelector('.pop-up');
let openPopUpButton = document.querySelector('.profile__edit-btn');
let closePopUpButton = document.querySelector('.pop-up__close-btn');

function openPopUp() {
  popUp.classList.add('pop-up_opened');
}
function closePopUp() {
  popUp.classList.remove('pop-up_opened');
}

openPopUpButton.addEventListener('click', openPopUp);
closePopUpButton.addEventListener('click', closePopUp);



// Находим форму в DOM
let formElement = document.querySelector('.pop-up__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.pop-up__form-input-name');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.pop-up__form-input-job');// Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  nameInput.getAttribute('value');
  jobInput.getAttribute('value');
  // Выберите элементы, куда должны быть вставлены значения полей
  let profileTitle = document.querySelector('.profile__title');
  let profileSubtitle = document.querySelector('.profile__subtitle');
  // Вставьте новые значения с помощью textContent
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);
