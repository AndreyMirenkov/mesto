import { Popup } from './Popup.js'

export class PopupWithForm extends Popup{
    constructor(popupSelector, handleSubmit){
        super(popupSelector)
        this._handleSubmit = handleSubmit
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = [...this._form.querySelectorAll('.popup__input')]
        this._saveButton = this._popup.querySelector('.popup__save-button');
    }
    _getInputValues(){
        const values = {}
        this._inputs.forEach((input) =>{
            values[input.name] = input.value
        })
        return values;
    }

    addSaveTextButton(){
        this._saveButton.textContent = '';
        this._saveButton.textContent = 'Сохранение...';
    }

    removeSaveTextButton(){
        this._saveButton.textContent = '';
        this._saveButton.textContent = 'Сохранить';
    }

    changeSumbitHandler(newSubmitHandler){
        this._handleSubmit = newSubmitHandler;
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener('submit',(evt) =>{
        evt.preventDefault()
        this._handleSubmit(this._getInputValues());
        })
    }
    
    close(){
        super.close();
        this._form.reset();
    }
}