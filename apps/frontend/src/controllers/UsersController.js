import $authApi from '../api/AuthClient';

export default class UserController {
  static async getUsers() {
    return $authApi.get('/user');
  }

  static async getUserById(user) {
    return $authApi.get(`user/find/${user.id}`);
  }

  static async updateUser(user) {
    return $authApi.patch(`/user/edit/${user.id}`, { ...user });
  }

  static async deleteUser(id) {
    return $authApi.delete(`/user/${id}`);
  }

  static async changePassword(pass) {
    return $authApi.post(`/user/edit/${pass.id}`, { ...pass });
  }
}
