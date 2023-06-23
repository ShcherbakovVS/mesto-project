export default class UserInfo {
    constructor({ nameSelector, userInfoSelector, imgSelector }, userDataUpdatingAPI) {
        this.nameElement = document.querySelector(nameSelector);
        this.userInfoElement = document.querySelector(userInfoSelector);
        this.avatarElement = document.querySelector(imgSelector);
        this._userDataUpdatingAPI = userDataUpdatingAPI;
        this.ownerId = '';
    }

    getUserInfo() {
        return {
            name: this.nameElement.textContent,
            about: this.userInfoElement.textContent,
            img: this.avatarElement.src
        }
    }

    setUserInfo(name, about) {
        this.nameElement.textContent = name;
        this.userInfoElement.textContent = about;
        return this._userDataUpdatingAPI(name, about);
    }

    setUserAvatar(src) {
        this.avatarElement.src = src;
    }
}