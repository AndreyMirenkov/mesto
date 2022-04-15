class Api {
    constructor({baseUrl, headers}) {
      this._headers = headers;
      this._baseUrl = baseUrl;
    }
  
    getProfile(){
        return fetch(`${this._baseUrl}/users/me`,{
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(res));
    }

    editProfile(name, about){
       return fetch('https://mesto.nomoreparties.co/v1/cohort-39/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name,
                about
            })
        }).then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(res));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`,{
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(res));
    }
  

    newCard(name,link){
        return fetch(`${this._baseUrl}/cards`,{
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name,
                link
            })
        }).then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(res));
    }

    deleteCard(id){
        return fetch(`${this._baseUrl}/cards/${id}`,{
            method: 'DELETE',
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(res));
    }

    deleteLikes(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes`,{
            method: 'DELETE',
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(res));
    }

    addLikes(id){
        return fetch(`${this._baseUrl}/cards/${id}/likes`,{
            method: 'PUT',
            headers: this._headers
        }).then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(res));
    }

    updateAvatar(avatar){
        return fetch(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }).then(res => res.ok ? res.json() : Promise.reject(res.status))
        .catch(res => console.log(res));
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