import { makeAutoObservable } from 'mobx';

class MobxStore {
  authorizationToken = null;

  constructor() {
    makeAutoObservable(this);
  }

  updateAuthorizationToken(token: any) {
    this.authorizationToken = token;
  }
}

export default MobxStore;