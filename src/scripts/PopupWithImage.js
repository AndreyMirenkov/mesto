import { Popup } from './Popup.js'

export class PopupWithImage extends Popup{

    open(link, text){
        const image = this._popup.querySelector('.popup__img-element');
        const caption = this._popup.querySelector('.popup__img-text');
        
        image.src = link;
        caption.textContent = text;
        super.open()
    }

}