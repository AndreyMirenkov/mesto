
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const profileCloseButton = popupProfile.querySelector('.popup__close');
const profileForm = popupProfile.querySelector('.popup__form-profile');
const addButton = document.querySelector('.profile__add-button');
const popupAddItemClose= document.querySelector('.popup__close_addItem');
const popupAddItem = document.querySelector('.popup_additem');
const addItemForm  = popupAddItem.querySelector('.popup__form');
const addImageButton = document.querySelector('.popup__form-image');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const workInput = popupProfile.querySelector('.popup__input_type_work');
const newName = document.querySelector('.profile__name');
const newWork = document.querySelector('.profile__text');
const textImageInput = document.querySelector('.popup__input_type_text');
const imageInput = document.querySelector('.popup__input_type_image');
const popupImg = document.querySelector('.popup_img');
const buttonImgClose = document.querySelector('.popup__close_img');
const popupImgSrc = document.querySelector('.popup__img-element');
const popupImgText = document.querySelector('.popup__img-text');
const imageTemplate = document.querySelector('#template-elements').content;
const cardsList = document.querySelector(".elements");
const popupOverlayProfile = document.querySelector('.popup__overlay_profile');
const popupOverlayAddItem = document.querySelector('.popup__overlay_additem');
const popupOverlayImg = document.querySelector('.popup__overlay_img');


const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editProfileValidator = new FormValidator(enableValidation, profileForm)
const addCardValidator = new FormValidator(enableValidation, addItemForm)

editProfileValidator.enableValidation();
addCardValidator.enableValidation()


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
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];


function render(item){
  const cardElement = createCard(item)
  cardsList.append(cardElement);
}

function createCard(item){
  const card = new Card(item, '#template-elements', () =>{
    popupWithImage.open(item.link, item.name)
  })
  const CardEl = card.getItem();
  return CardEl;
}

const handleProfileFormSubmit = (data) => {
  const {name, work} = data
    userInfo.setUserInfo(name, work);
    editProfilePopup.close();
}

const handleAddCard = (data) =>{
  const newItem = createCard(
    { 
      name: data['name-image'],
      link: data.image
    });
  section.addItem(newItem);
  addCardPopup.close();
}

editButton.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  editProfileValidator.resetValidation();
  nameInput.value = data.name
  workInput.value = data.job 
  editProfilePopup.open()
});

addButton.addEventListener('click', () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

const section = new Section ({items: initialCards, renderer: render}, '.elements');
section.renderItems()

const popupWithImage = new PopupWithImage('.popup_img');
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_profile', handleProfileFormSubmit);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_additem', handleAddCard);
addCardPopup.setEventListeners();

const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileWorkSelector: '.profile__text'})