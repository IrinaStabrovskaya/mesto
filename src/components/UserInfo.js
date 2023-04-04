export class UserInfo {
  constructor({ inputNameSelector, inputJobSelector }) {
    this._inputName = document.querySelector(inputNameSelector);
    this._inputJob = document.querySelector(inputJobSelector);
  }

  getUserInfo() {
    this._userProfile = {};
    this._userProfile['name'] = this._inputName.textContent;
    this._userProfile['job'] = this._inputJob.textContent;

    return this._userProfile;
  }

  setUserInfo() {
    const profileTitle = document.querySelector('.profile__title');
    const profileSubtitle = document.querySelector('.profile__subtitle');
    profileTitle.textContent = this._inputName.value;
    profileSubtitle.textContent = this._inputJob.value;
  }
}
