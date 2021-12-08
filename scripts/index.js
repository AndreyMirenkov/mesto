
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const popopAddItemClose= document.querySelector('.popup__close_addItem');
const popupAddItem = document.querySelector('.popup__addItem')
const addImageButton = document.querySelector('.popup__form-image');
let nameInput = popup.querySelector('.popup__input_type_name');
let workInput = popup.querySelector('.popup__input_type_work');
let newName = document.querySelector('.profile__name');
let newWork = document.querySelector('.profile__text');
let textImageInput = document.querySelector('.popup__input_type_text');
let imageInput = document.querySelector('.popup__input_type_image');
const popupImg = document.querySelector('.popup__img');
const buttonImgClose = document.querySelector('.popup__close_img');
let popupImgSrc = document.querySelector('.popup__img-element');
let popupImgText = document.querySelector('.popup__img-text');
const imageTemplate = document.querySelector('#template-elements').content;
const cardsList = document.querySelector(".elements");

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

function render(){
  const html  = initialCards.map((item)=> {return getItem(item)});

  cardsList.append(...html);
}

  function getItem(item){
    const newItem = imageTemplate.cloneNode(true);
    const imageEl = newItem.querySelector('.element__image');
    const textEl = newItem.querySelector('.element__text');

    imageEl.src = item.link;
    imageEl.addEventListener('click', () => {handleImg(item)});
    textEl.textContent = item.name;

    const buttonDelete = newItem.querySelector('.element__trash');
    buttonDelete.addEventListener('click', handleDelete);

    const buttonLike = newItem.querySelector('.element__like-button');
    buttonLike.addEventListener('click', handleLike);
    
    function handleImg(item){
      popupImgSrc.src = item.link;
      popupImgText.textContent = item.name;
      openPopup(popupImg);
    }


    return newItem;
    }


function openPopup(item){
    nameInput.value = newName.textContent;
    workInput.value = newWork.textContent;
    item.classList.add('popup_opened');
}

function closePopup(item){
    nameInput.value= "";
    workInput.value= "";
    item.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    newName.textContent = nameInput.value;
    newWork.textContent = workInput.value;
    closePopup(popup);
}

function handleadd (evt){
  evt.preventDefault();
  const inputElText = textImageInput.value;
  const inputElImage = imageInput.value;
  const itemList = getItem({name: inputElText, link: inputElImage});
  cardsList.prepend(itemList);
  textImageInput.value = '';
  imageInput.value = '';
  closePopup(popupAddItem);

}

function handleDelete(evt){
  const targetEl = evt.target;
  const listItem = targetEl.closest('.element')
  listItem.remove();
}
function handleLike(evt){
  const element = evt.target;
  element.classList.toggle('element__like-button_active');
}

editButton.addEventListener('click', () => {openPopup(popup)});
popupCloseButton.addEventListener('click',() => {closePopup(popup)});
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', () => {openPopup(popupAddItem)});
popopAddItemClose.addEventListener('click', () => {closePopup(popupAddItem)});
addImageButton.addEventListener('submit', handleadd);
buttonImgClose.addEventListener('click', () => {closePopup(popupImg)});

render();
