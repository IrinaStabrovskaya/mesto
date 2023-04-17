export class UserInfo {
  constructor({
    profileNameSelector,
    profileAboutSelector,
    profileAvatarSelector,
  }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    this._userProfile = {};
    this._userProfile["name"] = this._profileName.textContent;
    this._userProfile["about"] = this._profileAbout.textContent;
    this._userProfile["avatar"] = this._profileAvatar.src;

    return this._userProfile;
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }

  setUserAvatar(data) {
    console.log(data);
    this._profileAvatar.src = data.avatar;
  }

  setUserId({ _id }) {
    this._userId = _id;
  }
}
