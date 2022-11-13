import $authApi from '../api/AuthClient';

export default class EditItemController {
  /**
   * @param {'channel' | 'playListQueries'} type
   * @param {{title: string, description: string}} item
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async addItem(type, item) {
    const formData = new FormData();

    formData.append('description', item.description);
    formData.append('title', item.title);

    return $authApi.post(`/${type}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async getItemById(type, id) {
    return $authApi.get(`/${type}/${id}`);
  }

  static async updateItem(type, item) {
    return $authApi.patch(`/${type}/${item.id}`, { ...item });
  }

  static async deleteItem(type, id) {
    return $authApi.delete(`/${type}/${id}`);
  }
}
