import $api from '../api/AxiosClient';
import $authApi from '../api/AuthClient';

export default class AuthController {
  static async login(email, password) {
    return $authApi.post('/user/login', { email, password });
  }

  static async registration(nickName, email, password) {
    return $authApi.post('/user/registration', { nickName, email, password });
  }

  static async logout() {
    return $authApi.post('/user/logout');
  }

  static async checkAuth() {
    return $api.get('/user/refresh', { withCredentials: true });
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
