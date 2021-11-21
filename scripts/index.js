
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
let nameInput = popup.querySelector('.popup__input_type_name');
let workInput = popup.querySelector('.popup__input_type_work');
let newName = document.querySelector('.profile__name');
let newWork = document.querySelector('.profile__text');

function openPopup(){
    nameInput.value = newName.textContent;
    workInput.value = newWork.textContent;
    popup.classList.add('popup_opened');
}

function closePopup(){
    nameInput.value= "";
    workInput.value= "";
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    newName.textContent = nameInput.value;
    newWork.textContent = workInput.value;
    closePopup();
}

editButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);