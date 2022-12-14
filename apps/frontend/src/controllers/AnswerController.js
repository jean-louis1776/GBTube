import $authApi from '../api/AuthClient';

export default class AnswerController {
  static async getAllItems(commentId, userId) {
    console.log('getAllCommentsByVideo run');
    const url = `/answer/get_all?comment_id=${commentId}&user_id=${userId}`;
    console.log(url);
    return (await $authApi.get(url)).data;
  }
  static async getInfoAbout(answerId) {
    const url = `/answer/${answerId}`;
    return (await $authApi.get(url)).data;
  }
  static async send(idList, userId, textContent) {
    const url = `/answer/create`;
    console.log(url);
    const dto = {idList, userId, description: textContent};
    console.log(dto);
    return await $authApi.post(url, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  static async edit(id, textContent) {
    const url = `/answer/edit/${id}`;
    console.log(url);
    const dto = {id, description: textContent};
    return await $authApi.patch(url, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  static async delete(answerId) {
    const url = `/answer/${answerId}`;
    return await $authApi.delete(url);
  }

  static async dislike(answerId, userId) {
    const url = `/answer/dislike`;
    return await $authApi.patch(url, {answerId, userId});
  }

  static async like(answerId, userId) {
    const url = `/answer/like`;
    return await $authApi.patch(url,{answerId, userId});
  }
}
