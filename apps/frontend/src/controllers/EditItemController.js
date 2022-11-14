import $authApi from '../api/AuthClient';
// import { METHOD_PATCH, METHOD_POST } from '@constants/frontend';

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
    // console.log(dto, elemType, METHOD_POST);
    // const res = await this.abstractEditItem(METHOD_POST, elemType, dto);
    // console.log(res);
    // return res;

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
   * @param {{idList: string, title: string, description: string}} dto
   * @returns {Promise<AxiosResponse<any>>}
   */
  static async updateItem(elemType, dto) {
    // return await this.abstractEditItem(METHOD_PATCH, elemType, dto);

    const url = `/${elemType}/edit`;
    console.log(url);
    console.log(dto);
    return await $authApi.patch(url, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * @param {'post' | 'patch'} method
   * @param {'channel' | 'playlist'} elemType
   * @param {{idList: string, title: string, description: string}} dto
   * @returns {Promise<AxiosResponse<any>>}
   */
  // static async abstractEditItem(method, elemType, dto) {
  //   const action = method === METHOD_POST ? 'create' : 'edit';
  //   const url = `/${elemType}/${action}`;
  //   console.log(url);
  //   console.log(dto);
  //   return await $authApi[method](url, dto, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }
}
