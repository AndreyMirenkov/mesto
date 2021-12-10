
const editButton = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_profile');
const profileCloseButton = popupProfile.querySelector('.popup__close');
const profileForm = popupProfile.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');
const popopAddItemClose= document.querySelector('.popup__close_addItem');
const popupAddItem = document.querySelector('.popup_additem')
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
    imageEl.alt = item.name;
    imageEl.addEventListener('click', () => {handleImg(item)});
    textEl.textContent = item.name;

    const buttonDelete = newItem.querySelector('.element__trash');
    buttonDelete.addEventListener('click', handleDelete);

    const buttonLike = newItem.querySelector('.element__like-button');
    buttonLike.addEventListener('click', handleLike);
    
    function handleImg(item){
      popupImgSrc.src = item.link;
      popupImgSrc.alt = item.name
      popupImgText.textContent = item.name;
      openPopup(popupImg);
    }


    return newItem;
    }

function openPopup(item){
    item.classList.add('popup_opened');
}

function closePopup(item){
    item.classList.remove('popup_opened');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    newName.textContent = nameInput.value;
    newWork.textContent = workInput.value;
    closePopup(popupProfile);
}

function handleAddCard (evt){
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

editButton.addEventListener('click', () => {
  nameInput.value = newName.textContent;
  workInput.value = newWork.textContent;
  openPopup(popupProfile)
});
profileCloseButton.addEventListener('click',() => {closePopup(popupProfile)});
profileForm.addEventListener('submit', handleProfileFormSubmit);
addButton.addEventListener('click', () => {openPopup(popupAddItem)});
popopAddItemClose.addEventListener('click', () => {closePopup(popupAddItem)});
addImageButton.addEventListener('submit', handleAddCard);
buttonImgClose.addEventListener('click', () => {closePopup(popupImg)});

render();
