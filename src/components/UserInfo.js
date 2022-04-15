export class UserInfo{
    constructor({profileNameSelector, profileWorkSelector, avatarSelector}){
        this._nameElement = document.querySelector(profileNameSelector);
        this._workElement = document.querySelector(profileWorkSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    setUserInfo(title, job){
        this._nameElement.textContent = title
        this._workElement.textContent = job
    }

    setAvatarInfo(avatar){
        this._avatar.src = avatar
    }

    getUserInfo(){
        return{
            name: this._nameElement.textContent,
            job: this._workElement.textContent
        }
    }
}