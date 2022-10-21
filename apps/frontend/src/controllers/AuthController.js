import $authApi from '../api/AuthClient';

export default class AuthController {
  static async login(email, password) {
    return $authApi.post('/user/login', { email, password });
  }

  static async registration(email, password) {
    return $authApi.post('/user/registration', { email, password });
  }

  static async logout() {
    return $authApi.post('/user/logout');
  }
}
