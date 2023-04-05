export class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileJob = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    this._userProfile = {};
    this._userProfile['name'] = this._profileName.textContent;
    this._userProfile['job'] = this._profileJob.textContent;

    return this._userProfile;
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}
