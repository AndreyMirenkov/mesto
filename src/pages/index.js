import { enableValidation, initialCards } from "../utils/constants.js"
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";


import './index.css';

const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const profileForm = popupProfile.querySelector('.popup__form-profile');
const addButton = document.querySelector('.profile__add-button');
const popupAddItem = document.querySelector('.popup_additem');
const addItemForm  = popupAddItem.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const workInput = popupProfile.querySelector('.popup__input_type_work');
const cardsList = document.querySelector(".elements");

const editProfileValidator = new FormValidator(enableValidation, profileForm)
const addCardValidator = new FormValidator(enableValidation, addItemForm)

editProfileValidator.enableValidation();
addCardValidator.enableValidation()


function render(item){
  const cardElement = createCard(item)
  section.addItem(cardElement)
}

function createCard(item){
  const card = new Card(item, '#template-elements', () =>{
    popupWithImage.open(item.link, item.name)
  })
  const cardEl = card.getItem();
  return cardEl;
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