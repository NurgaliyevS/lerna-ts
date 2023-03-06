import { observable, action } from 'mobx';
import axios from 'axios';

class Storage {
  @observable isAuthenticated = false;
  @observable data = {};

  @action
  async login(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      await this.fetchData();
    } else {
      throw new Error('Invalid username or password');
    }
  }

  @action
  async fetchData() {
    const response = await axios.get('http://46.175.122.190:8500/v1/kv/test');
    const data = response.data[0].Value;
    const decodedData = atob(data);
    this.data = JSON.parse(decodedData);
  }

  @action
  logout(): void {
    this.isAuthenticated = false;
  }
}

const store = new Storage();
export default store;