class Api {
    constructor({baseUrl, headers}) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
  
    _checkResponce(res){
        if (res.ok){
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
    }

    getProfile(){
        return fetch(`${this._baseUrl}/users/me`,{
            headers: this._headers
        }).then(this._checkResponce)
    }

    editProfile(name, about){
       return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then(this._checkResponce)
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`,{
            headers: this._headers
        }).then(this._checkResponce)
    }
  

    newCard(name,link){
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        }).then(this._checkResponce)
    }

    deleteCard(id){
        return fetch(`${this._baseUrl}/cards/${id}`,{
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponce)
    }

    deleteLikes(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes`,{
            method: 'DELETE',
            headers: this._headers
        }).then(this._checkResponce)
    }

    addLikes(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes`,{
            method: 'PUT',
            headers: this._headers
        }).then(this._checkResponce)
    }

    updateAvatar(avatar){
        return fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }).then(this._checkResponce)
    }
    // другие методы работы с API
  }
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
      authorization: '73249683-ecf7-4186-9a38-2636b44d0deb',
      'Content-Type': 'application/json'
    }
  });