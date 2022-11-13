import $authApi from '../api/AuthClient';
import { METHOD_PATCH, METHOD_POST } from '@constants/frontend';

export default class EditItemController {
  static async getItemById(elemType, id) {
    return await $authApi.get(`/${elemType}/${id}`);
  }

  static async deleteItem(elemType, id) {
    return await $authApi.delete(`/${elemType}/${id}`);
  }

  /**
   * @param {'channel' | 'playlist'} elemType
   * @param {FormData} formData
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async addItem(elemType, formData) {
    return await this.#abstractEditItem(METHOD_POST, elemType, formData);
  }
  /**
   * @param {'channel' | 'playlist'} elemType
   * @param {FormData} formData
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async updateItem(elemType, formData) {
    return await this.#abstractEditItem(METHOD_PATCH, elemType, formData);
  }

  /**
   * @param {'post' | 'patch'} method
   * @param {'channel' | 'playlist'} elemType
   * @param {{idList: string, title: string, description: string}} dto
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async #abstractEditItem(method, elemType, dto) {
    const action = method === METHOD_POST ? 'create' : 'edit';
console.log(dto);
    return await $authApi[method](`/${elemType}/${action}`, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
