import $api from '../api/AxiosClient';
import $authApi from '../api/AuthClient';

export default class AuthController {
  static async login(email, password) {
    return (await $authApi.post('/user/login', { email, password })).data;
  }

  static async registration(nickName, email, password) {
    return (await $authApi.post('/user/registration', { nickName, email, password })).data;
  }

  static async logout() {
    return $authApi.post('/user/logout');
  }

  static async checkAuth() {
    return (await $api.get('/user/refresh', { withCredentials: true })).data;
  }

  static async activate(link) {
    return $authApi.get(`/user/activate/${link}`);
  }

  static async checkUnique(data) {
    let params = {};
    const dataEntries = Object.entries(data);

    for (const [key, value] of dataEntries) {
      if (value) {
        params[key] = value;
      }
    }
    return $api.get(`/user/activate/check`, { params });
  }
}
