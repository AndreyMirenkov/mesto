
export class Card {
    constructor(data, cardTemplateSelector, handleCardClick, handleClickDelete, handleClickLikes) {
        this._cardTemplate = document.querySelector(cardTemplateSelector).content.querySelector('.element');
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data.id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;
        this._handleCardClick = handleCardClick;
        this._handleClickDelete = handleClickDelete;
        this._handleClickLikes = handleClickLikes;
    }

    deleteCard = () =>{
        this._newItem.remove();
      }


    _addLike = () =>{
        this._buttonLike.classList.add('element__like-button_active');
      }
    _deleteLike =() =>{
      this._buttonLike.classList.remove('element__like-button_active');
    }

      isLiked(){
        const userHasLikedCard = this._likes.find(user => user._id === this._userId)
        return userHasLikedCard;
      }

    _setEventListeners(){
        this._buttonDelete = this._newItem.querySelector('.element__trash');

        this._buttonDelete.addEventListener('click', () => this._handleClickDelete(this._id));
        this._buttonLike.addEventListener('click', () => this._handleClickLikes(this._id));
        this._imageEl.addEventListener('click', () => this._handleCardClick());
    }

    setLikes(newLikes){
      this._likes = newLikes;
      this._likeCountElement.textContent = this._likes.length;

      if(this.isLiked()){
        this._addLike();
      } else {
        this._deleteLike();
      }
    }

    getItem(){
        this._newItem = this._cardTemplate.cloneNode(true);
        this._imageEl = this._newItem.querySelector('.element__image');
        const textEl = this._newItem.querySelector('.element__text');
        this._likeCountElement = this._newItem.querySelector('.element__number');
    
        this._imageEl.src = this._link;
        this._imageEl.alt = this._name;
        textEl.textContent = this._name;
    
        this._buttonLike = this._newItem.querySelector('.element__like-button');

        this.setLikes(this._likes)
        this._setEventListeners()

      if (this._ownerId !== this._userId){
        this._buttonDelete.style.display = 'none';
      }

        return this._newItem;
        }

}
