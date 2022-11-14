import $authApi from '../api/AuthClient';

export default class GetChildrenController {
  static async getAllItemsById(childrenType, parent_id) {
    const url = `/${childrenType}/get_all/${parent_id}`;
    console.log(url);
    return await $authApi.get(url);
  }
  static async getItemById(childType, id) {
    const url = `/${childType}/get_one/${id}`;
    console.log(url);
    return await $authApi.get(url);
  }
}
