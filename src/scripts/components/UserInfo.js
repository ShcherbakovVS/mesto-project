export default class UserInfo {
    constructor({ nameSelector, userInfoSelector, imgSelector }, userDataReceivingAPI, userDataUpdatingAPI) {
        this.nameElement = document.querySelector(nameSelector);
        this.userInfoElement = document.querySelector(userInfoSelector);
        this.avatarElement = document.querySelector(imgSelector);
        this._userDataReceivingAPI = userDataReceivingAPI;
        this._userDataUpdatingAPI = userDataUpdatingAPI;
        this.ownerId = '';
    }

    getUserInfo() {
        return this._userDataReceivingAPI()
            .then(info => { return {
                name: info.name,
                about: info.about,
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    setUserInfo(name, about) {
        return this._userDataUpdatingAPI(name, about)
            .then(res => {
                this.nameElement.textContent = res.name;
                this.userInfoElement.textContent = res.about;
            })
    }
}