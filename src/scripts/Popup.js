export class Popup {
    constructor(popupSelector){
        this._popup = document.querySelector(popupSelector);
        this._closeByEscape = this._closeByEscape.bind(this);
    }

    open(){
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeByEscape);
    }
    
    close(){
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._closeByEscape);
      }

    _closeByEscape(evt){
        if (evt.key ==='Escape'){
        this.close();
        }
      }

      setEventListeners(){
         const closeButton = this._popup.querySelector('.popup__close')

         this._popup.addEventListener('click', (evt) =>{
             if(!evt.target.closest('.popup__close_byoverlay')|| evt.target === closeButton){
                 this.close()
             }
         })

      }
}