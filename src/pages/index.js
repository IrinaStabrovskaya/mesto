import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { formValidationConfig } from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import {
  buttonOpenPopUpEdit,
  buttonOpenPopUpAdd,
  formEdit,
  formCreate,
  formAvatar,
} from "../utils/constants.js";
import "./index.css";
import { data } from "autoprefixer";

let userId = null;
//создание экземпляра класса Api
const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-62",
  headers: {
    authorization: "519bc60f-1765-4721-8a2c-733284c363a9",
    "content-type": "application/json"
  }
});

//создание экземпляра класса Section
const cardList = new Section(
  {
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".photos__elements"
);

//создание экземпляров класса валидации
const formEditValid = new FormValidator(formValidationConfig, formEdit);
formEditValid.enableValidation();

const formCreateValid = new FormValidator(formValidationConfig, formCreate);
formCreateValid.enableValidation();

const formAvatarValid = new FormValidator(formValidationConfig, formAvatar);
formAvatarValid.enableValidation();

//загрузка и отрисовка начальных данных с сервера
api.getAllInitialData()
.then((data) => {
  const [profile, cards] = data;
  userId = profile._id;
  userData.setUserInfo(profile);
  userData.setUserAvatar(profile);
  cards.reverse();
  cardList.renderItems(cards);
})
.catch((err) => console.log(err));

//создание экземпляра класса UserInfo
const userData = new UserInfo({
  profileNameSelector: ".profile__title",
  profileAboutSelector: ".profile__subtitle",
  profileAvatarSelector: ".profile__avatar",
});

//создание экземпляра класса PopupWithImage
const popupImage = new PopupWithImage(".pop-up_type_big-pic");
popupImage.setEventListeners();

//создание экземпляра класса PopupWithForm замены аватара
const popupUpdateAvatar = new PopupWithForm(
  ".pop-up_type_update-avatar",
  (avatar) => {
    return api
      .setAvatar(avatar)
      .then((data) => {
        userData.setUserAvatar(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
popupUpdateAvatar.setEventListeners();

//создание новой карточки
const createCard = (card) => {
  const newCard = new Card("#photos__element", {
    userId,
    card,
    handleCardClick: (card) => popupImage.open(card._link, card._name),

    handleTrashIcon: (card) => {
      popupConfirm.open();
      popupConfirm.setSubmitAction(() => {
        return api
          .deleteCard(card._cardId)
          .then(() => {
            newCard.deleteCard();
          })
          .catch((err) => console.log(err));
      });
    },
    handleLikeIcon: (card) => {
      if (newCard.checkOwnerId()) {
        api
          .disLikeCard(card)
          .then((card) => {
            newCard.checkStatusLikes(card.likes);
          })
          .catch((err) => console.log(err));
      } else {
        api
          .isLikeCard(card)
          .then((card) => {
            newCard.checkStatusLikes(card.likes);
          })
          .catch((err) => console.log(err));
      }
    },
  });
  const cardElem = newCard.generateCard();
  return cardElem;
};

//создание экземпляра класса PopupWithForm для попапа добавления карточек
const popupAddCard = new PopupWithForm(
  ".pop-up_type_create-card",
  (data) => {
    return api
      .setNewCard(data)
      .then((data) => {
        cardList.addItem(createCard(data));
      })
      .catch((err) => console.log(err));
  },
  ".photos__elements"
);
popupAddCard.setEventListeners();

//создание экземпляра класса PopupWithForm для попапа профайла
const popupEditProfile = new PopupWithForm(".pop-up_type_edit", (data) => {
  return api
    .setInfo(data)
    .then(({ name, about }) => {
      userData.setUserInfo({ name, about });
    })
    .catch((err) => {
      console.log(err);
    });
});
popupEditProfile.setEventListeners();

//создание экземпляра класса PopupWithConfirmation
const popupConfirm = new PopupWithConfirmation(".pop-up_type_confirm");
popupConfirm.setEventListeners();

//открытие попапа по кнопке редактирования профиля
buttonOpenPopUpEdit.addEventListener("click", function () {
  popupEditProfile.setInputValues(userData.getUserInfo());
  formEditValid.resetValidation();
  popupEditProfile.open();
});

// открытие попапа добавления карточки
buttonOpenPopUpAdd.addEventListener("click", function () {
  formCreate.reset();
  formCreateValid.resetValidation();
  popupAddCard.open();
});

//открытие попапа замены аватара
const buttonReplaceAvatar = document.querySelector(".profile__avatar-btn");
buttonReplaceAvatar.addEventListener("click", function () {
  formAvatarValid.resetValidation();
  popupUpdateAvatar.open();
});
