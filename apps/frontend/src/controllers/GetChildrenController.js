import $authApi from '../api/AuthClient';

export default class GetChildrenController {
  static async getAllItemsById(parent_id, childrenType) {
    const url = `/${childrenType}/get_all/${parent_id}`;
    return (await $authApi.get(url)).data;
  }
  static async getItemById(childType, id) {
    const url = `/${childType}/get_one/${id}`;
    return (await $authApi.get(url)).data;
  }
}
