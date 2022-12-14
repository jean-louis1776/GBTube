import $authApi from '../api/AuthClient';

export default class UserController {
  static async getUsers() {
    return $authApi.get('/user');
  }

  static async getUserById(userId) {
    return (await $authApi.get(`user/find/${userId}`)).data;
  }

  static async getUserNick(id) {
    return (await $authApi.get(`/user/find_min/${id}`)).data;
  }

  static async updateUser(userId, userData) {
    const dto = {updatingObject: userData};
    const url = `/user/edit/${userId}`;
    console.log(url);
    console.log(dto);
    await $authApi.patch(url, dto);
  }

  static async deleteUser(id) {
    return $authApi.delete(`/user/${id}`);
  }

  static async changePassword(userId, oldPassword, newPassword) {
    const dto = { id: userId, oldPassword, newPassword };
    await $authApi.patch(`/user/change_password`, dto);
  }

  static async addAvatar(userId, formData) {
    const url = `/user/avatar/${userId}`;
    await $authApi.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
