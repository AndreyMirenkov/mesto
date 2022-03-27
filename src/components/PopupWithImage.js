import { Popup } from './Popup.js'

export class PopupWithImage extends Popup{

    open(link, text){
        this._image = this._popup.querySelector('.popup__img-element');
        this._caption = this._popup.querySelector('.popup__img-text');
        
        this._image.src = link;
        this._image.alt = text;
        this._caption.textContent = text;
        super.open()
    }

}