//отмена сабмита
function cancelSubmit(evt) {
  evt.preventDefault();
};

//функция показа ошибки
function showInputError(formItem, inputItem, config, errorMessage) {
  const errorElement = formItem.querySelector(`.${inputItem.name}-error`);
  console.log(errorElement);
  inputItem.classList.add(config.classInputError);
  errorElement.classList.add(config.classErrorActive);
  errorElement.textContent = errorMessage;
};

//функция сокрытия ошибки
function hideInputError(formItem, inputItem, config) {
  const errorElement = formItem.querySelector(`.${inputItem.name}-error`);
  inputItem.classList.remove(config.classInputError);
  errorElement.classList.remove(config.classErrorActive);
  errorElement.textContent = '';
};

// проверка валидности инпута
function checkInputValidity(formItem, inputItem, config) {

  if(!inputItem.validity.valid) {
    showInputError(formItem, inputItem, config, inputItem.validationMessage);
  } else {
    hideInputError(formItem, inputItem, config);
  };
};

function toggleButtonSubmit(formItem, config) {
  const buttonSubmit = formItem.querySelector(config.buttonSubmitSelector);
  const isFormValid = formItem.checkValidity();
  buttonSubmit.disabled = !isFormValid;
  buttonSubmit.classList.toggle(config.classButtonDisable, !isFormValid);
};

function addInputListeners(formItem, config) {
  const inputList = Array.from(formItem.querySelectorAll(config.inputSelector));
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', () => {
      checkInputValidity(formItem, inputItem, config);
    });
  });
};

//функция наложения валидации
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formItem) => {
    formItem.addEventListener('submit', cancelSubmit);
    formItem.addEventListener('input', () => {
      toggleButtonSubmit(formItem, config);
    });
    addInputListeners(formItem, config);
    toggleButtonSubmit(formItem, config);
  });
};

enableValidation(formValidationConfig);
