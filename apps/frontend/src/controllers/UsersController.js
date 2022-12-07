import $authApi from '../api/AuthClient';

export default class UserController {
  static async getUsers() {
    return $authApi.get('/user');
  }

  static async getUserById(user) {
    return $authApi.get(`user/find/${user.id}`);
  }

  static async getUserNick(id) {
    return (await $authApi.get(`/user/find_min/${id}`)).data;
  }

  static async updateUser(user) {
    return $authApi.patch(`/user/edit/${user.id}`, { updatingUser: user });
  }

  static async deleteUser(id) {
    return $authApi.delete(`/user/${id}`);
  }

  static async changePassword(pass) {
    const { id, oldPassword, newPassword } = pass;
    return $authApi.post(`/user/change_password`, { id, oldPassword, newPassword });
  }
}
