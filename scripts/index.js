
const editButton = document.querySelector(".profile__edit-button_active");
const popup = document.querySelector(".popup");
const popupCloseButton = popup.querySelector(".popup__close");
const formElement = popup.querySelector(".popup__form_edit");
let nameInput = popup.querySelector(".popup__input_name");
let workInput = popup.querySelector(".popup__input_work");
let newName = document.querySelector(".profile__name_edit");
let newWork = document.querySelector(".profile__text_edit");
const saveButton = popup.querySelector(".popup__save-button_active");

function open(){
    nameInput.value = newName.textContent;
    workInput.value = newWork.textContent;
    popup.classList.add("popup_opened");
}

function close(){
    nameInput.value= "";
    workInput.value= "";
    popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    newName.textContent = nameInput.value;
    newWork.textContent = workInput.value;
    close();
}

editButton.addEventListener("click", open);
popupCloseButton.addEventListener("click", close);
formElement.addEventListener("submit", formSubmitHandler);