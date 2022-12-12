import $authApi from '../api/AuthClient';
import { PLAYLIST } from '@constants/frontend';

export default class GetChildrenController {
  static async getAllItemsById(parent_id, childrenType) {
    const url = `/${childrenType}/get_all/${parent_id}`;
    return (await $authApi.get(url)).data;
  }
  static async getItemById(childType, id, userId = 0) {
    const url = childType === PLAYLIST ? `/${childType}/get_one/${id}` :
      `/${childType}/get_one?channel_id=${id}&user_id=${userId}`;
    return (await $authApi.get(url)).data;
  }
  static async getSubscriptions(userId) {
    const url = `channel/subscribes_list/${userId}`;
    return (await $authApi.get(url)).data;
  }
}
