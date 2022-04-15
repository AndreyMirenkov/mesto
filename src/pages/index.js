import { enableValidation, initialCards } from "../utils/constants.js"
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js"

import './index.css';

let userId

api.getProfile()
.then(res => {
  userInfo.setAvatarInfo(res.avatar);
  userInfo.setUserInfo(res.name, res.about);
  userId = res._id
})

api.getInitialCards()
.then(dataList => {
  dataList.forEach(data =>{
    const card = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id
    })
    section.addItem(card)
  })
})


const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const profileForm = popupProfile.querySelector('.popup__form-profile');
const addButton = document.querySelector('.profile__add-button');
const popupAddItem = document.querySelector('.popup_additem');
const addItemForm  = popupAddItem.querySelector('.popup__form');
const nameInput = popupProfile.querySelector('.popup__input_type_name');
const workInput = popupProfile.querySelector('.popup__input_type_work');
const avatarButton = document.querySelector('.profile__avatar-button')
const avatarForm = document.querySelector('.popup__form-avatar');
const cardsList = document.querySelector(".elements");

const editProfileValidator = new FormValidator(enableValidation, profileForm)
const addCardValidator = new FormValidator(enableValidation, addItemForm)
const editAvatarValidator = new FormValidator(enableValidation, avatarForm);

editProfileValidator.enableValidation();
addCardValidator.enableValidation()
editAvatarValidator.enableValidation();


function render(item){
  const cardElement = createCard(item)
  section.addItem(cardElement)
}

function createCard(item){
  const card = new Card(item, '#template-elements', () =>{
    popupWithImage.open(item.link, item.name)
  }, (id) =>{
    confirmPopup.open()
    confirmPopup.changeSumbitHandler(() =>{
      api.deleteCard(id)
      .then(res =>{
         confirmPopup.close();
         card.deleteCard();
      })
    })
  }, (id) => {
    if(card.isLiked()){
      api.deleteLikes(id)
    .then(res => {
      card.setLikes(res.likes);
    })
    } else {
      api.addLikes(id)
    .then(res => {
      card.setLikes(res.likes);
    })
    }
  })
  const cardEl = card.getItem();
  return cardEl;
}

const handleProfileFormSubmit = (data) => {
  const {name, work} = data
  editProfilePopup.addSaveTextButton();
  api.editProfile(name, work)
  .then(res => {
    userInfo.setUserInfo(name, work);
    editProfilePopup.close();
    nameInput.value = res.name
    workInput.value = res.about 
    editProfilePopup.removeSaveTextButton();
  })
}

const handleAddCard = (data) =>{
  addCardPopup.addSaveTextButton();
  api.newCard(data['name-image'],data.image)
  .then(res => {
      const newItem = createCard(
    { 
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id,
      userId: userId,
      ownerId: res.owner._id
    })
    section.addItem(newItem);
    addCardPopup.close();
    addCardPopup.removeSaveTextButton();
  })
}

const handleAvatarFormSubmit = (data) => {
  const link = data.image;
  avatarPopup.addSaveTextButton()
  api.updateAvatar(link)
  .then(res => {
    userInfo.setAvatarInfo(res.avatar);
    avatarPopup.close();
    avatarPopup.removeSaveTextButton();
  })
}

avatarButton.addEventListener('click', () => {
  editAvatarValidator.resetValidation();
  avatarPopup.open();
})

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

const section = new Section ({items: [], renderer: render}, '.elements');
section.renderItems()

const popupWithImage = new PopupWithImage('.popup_img');
popupWithImage.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_profile', handleProfileFormSubmit);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_additem', handleAddCard);
addCardPopup.setEventListeners();

const confirmPopup = new PopupWithForm('.popup_delete')
confirmPopup.setEventListeners()

const avatarPopup = new PopupWithForm('.popup_avatar', handleAvatarFormSubmit);
avatarPopup.setEventListeners();

const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileWorkSelector: '.profile__text', avatarSelector: '.profile__avatar'})