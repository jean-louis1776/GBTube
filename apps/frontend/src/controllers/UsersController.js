import $authApi from '../api/AuthClient';

export default class UserController {
  static async getUsers() {
    return $authApi.get('/user');
  }

  static async updateUser(user) {
    return $authApi.put(`/user/${user.id}`, { ...user });
  }

  static async deleteUser(id) {
    return $authApi.delete(`/user/${id}`);
  }
}
