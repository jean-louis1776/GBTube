import $authApi from '../api/AuthClient';

export default class AuthController {
  static async login(email, password) {
    return $authApi.post('/user/login', { email, password });
  }

  static async registration(username, email, password) {
    return $authApi.post('/user/registration', { username, email, password });
  }

  static async logout() {
    return $authApi.post('/user/logout');
  }
}
