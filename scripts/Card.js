
export class Card {
    constructor(data, cardTemplateSelector, handleCardClick) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.element');
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
    }

    _handleDelete = () =>{
        this._newItem.remove();
      }

    _handleLike = () =>{
        this._buttonLike.classList.toggle('element__like-button_active');
      }

    _setEventListeners(){
        this._buttonDelete = this._newItem.querySelector('.element__trash');

        this._buttonDelete.addEventListener('click',this._handleDelete);
        this._buttonLike.addEventListener('click', this._handleLike);
        this._imageEl.addEventListener('click', () => this._handleCardClick());
    }

    getItem(){
        this._newItem = this._cardTemplate.cloneNode(true);
        this._imageEl = this._newItem.querySelector('.element__image');
        const textEl = this._newItem.querySelector('.element__text');
    
        this._imageEl.src = this._link;
        this._imageEl.alt = this._name;
        textEl.textContent = this._name;
    
        this._buttonLike = this._newItem.querySelector('.element__like-button');

        this._setEventListeners()

        return this._newItem;
        }

}
