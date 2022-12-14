import $authApi from '../api/AuthClient';

export default class EditItemController {
  static async getItemById(elemType, id) {
    return await $authApi.get(`/${elemType}/${id}`);
  }

  static async deleteItem(elemType, id) {
    return await $authApi.delete(`/${elemType}/${id}`);
  }

  /**
   * @param {'channel' | 'playlist'} elemType
   * @param {{idList: string, title: string, description: string}} dto
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async addItem(elemType, dto) {
    const url = `/${elemType}/create`;
    console.log(url);
    console.log(dto);
    return await $authApi.post(url, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  /**
   * @param {'channel' | 'playlist'} elemType
   * @param {{idList: string, title: string, description: string}} data
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async updateItem(elemType, data) {
    const url = `/${elemType}/edit`;
    console.log(url);
    const dto = { updatingObject: data };
    console.log(dto);
    return await $authApi.patch(url, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  static async subscribe(channelId, userId) {
    const url = `/channel/subscribe`;
    const dto = {id: channelId, userId};
    return (await $authApi.patch(url, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    })).data;
  }
}
