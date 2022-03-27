export class UserInfo{
    constructor({profileNameSelector, profileWorkSelector}){
        this._nameElement = document.querySelector(profileNameSelector);
        this._workElement = document.querySelector(profileWorkSelector);
    }

    setUserInfo(title, job){
        this._nameElement.textContent = title
        this._workElement.textContent = job
    }

    getUserInfo(){
        return{
            name: this._nameElement.textContent,
            job: this._workElement.textContent
        }
    }
}