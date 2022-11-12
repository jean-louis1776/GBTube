import $authApi from '../api/AuthClient';

export default class GetChildrenController {
  static async getAllItemsById(childrenType, parent_id) {
    return await $authApi.get(`/${childrenType}/get_all/${parent_id}`);
  }
  static async getItemById(childType, id) {
    return await $authApi.get(`/${childType}/get_one/${id}`);
  }
}
