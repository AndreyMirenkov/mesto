export class FormValidator{
    constructor(settings, form){
        this._settings = settings
        this._form = form
    }

    _showError(input, errorMessageText){
        const errorMessage = this._form.querySelector(`#${input.id}-error`);
        errorMessage.textContent = errorMessageText;
        errorMessage.classList.add(this._settings.errorClass);
        input.classList.add(this._settings.inputErrorClass);
      }
      
    _hideError(input){
        const errorMessage = this._form.querySelector(`#${input.id}-error`);
        errorMessage.textContent = '';
        errorMessage.classList.remove(this._settings.errorClass);
        input.classList.remove(this._settings.inputErrorClass);
      }

    _checkIfInputValid(input){
        if (!input.validity.valid) {
            this._showError(input, input.validationMessage);
        } else {
            this._hideError(input);
        }
      }

      _disabledSubmitButton(){
        this._submitButton.classList.add(this._settings.inactiveButtonClass);
        this._submitButton.disabled = true;
      }

      _ebableSubmitButton(){
        this._submitButton.classList.remove(this._settings.inactiveButtonClass);
        this._submitButton.disabled = false;
      }

      _hasInvalidInput = () => {
        return Array.from(this._inputs).some((el) => !el.validity.valid);
      }

      _toggleButtonError = () => {
        if (this._hasInvalidInput()) {
            this._disabledSubmitButton();
        } else {
          this._ebableSubmitButton();
        }
      }

    _setInputListeners(){
        this._inputs = this._form.querySelectorAll(this._settings.inputSelector);
        this._submitButton = this._form.querySelector(this._settings.submitButtonSelector);
        this._toggleButtonError();
        this._inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkIfInputValid(input);
                this._toggleButtonError();
            });
        });
      }

    enableValidation(){
            this._form.addEventListener('submit', (event) => {
                event.preventDefault();
            });
            this._setInputListeners();
      }
      resetValidation(){
        this._form.reset()
        this._toggleButtonError();
        this._inputs.forEach((input) =>{
          this._hideError(input);
        })
      }
}