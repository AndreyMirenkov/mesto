
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

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
  const card = new Card(item, '#template-elements', handleImg)
  const CardEl = card.getItem();
  cardsList.append(CardEl);
}

function openPopup(item){
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(item){
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    newName.textContent = nameInput.value;
    newWork.textContent = workInput.value;
    closePopup(popupProfile);
}

function handleImg(name, link){
  popupImgSrc.src = link;
  popupImgSrc.alt = name
  popupImgText.textContent = name;
  openPopup(popupImg);
}

function handleAddCard (evt){
  evt.preventDefault();
  const inputElText = textImageInput.value;
  const inputElImage = imageInput.value;
  const itemList = new Card({name:inputElText, link: inputElImage}, '#template-elements', handleImg);
  const newItem  = itemList.getItem()
  cardsList.prepend(newItem);
  closePopup(popupAddItem);
  textImageInput.value = '';
  imageInput.value = '';
}

function closeByEscape(evt){
  if (evt.key ==='Escape'){
    const openPopup = document.querySelector('.popup_opened')
    closePopup(openPopup)
  }
}

function initializationOverlay (){
  const overlays = document.querySelectorAll('.popup__overlay');
  overlays.forEach((overlay) => {
    overlay.addEventListener('click', closeByOverlay);
  })
}

function closeByOverlay(evt){
  const overlay = evt.target;
  const openPopup = overlay.closest('.popup')
  closePopup(openPopup);
}

editButton.addEventListener('click', () => {
  editProfileValidator.resetErrors();
  editProfileValidator.ebableSubmitButton();
  nameInput.value = newName.textContent;
  workInput.value = newWork.textContent;
  openPopup(popupProfile)
});

profileCloseButton.addEventListener('click',() => {closePopup(popupProfile)});

profileForm.addEventListener('submit', handleProfileFormSubmit);

addButton.addEventListener('click', () => {
  addCardValidator.enableValidation()
  openPopup(popupAddItem)
});

popupAddItemClose.addEventListener('click', () => {closePopup(popupAddItem)});
addImageButton.addEventListener('submit', handleAddCard);
buttonImgClose.addEventListener('click', () => {closePopup(popupImg)});

initialCards.forEach((data) =>{
render(data);
})
initializationOverlay();