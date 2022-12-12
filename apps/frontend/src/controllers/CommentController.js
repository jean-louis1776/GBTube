import $authApi from '../api/AuthClient';

export default class CommentController {
  static async getAllItemsByVideo(videoId, userId) {
    console.log('getAllCommentsByVideo run');
    const url = `/comment/get_all/?video_id=${videoId}&user_id=${userId}`;
    console.log(url);
    return (await $authApi.get(url)).data;
  }
  static async getInfoAbout(commentId) {
    const url = `/comment/videoId/id/${commentId}`;
    return (await $authApi.get(url)).data;
  }
  static async send(idList, userId, textContent) {
    const url = `/comment/create`;
    console.log(url);
    const dto = {idList, userId, description: textContent};
    console.log(dto);
    return await $authApi.post(url, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  static async edit(idList, textContent) {
    const url = `/comment/edit`;
    console.log(url);
    const dto = {idList, description: textContent};
    return await $authApi.patch(url, dto, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  static async delete(commentId) {
    const url = `/comment/${commentId}`;
    return await $authApi.delete(url);
  }
  static async dislike(commentId, userId) {
    const url = `/comment/dislike`;
    return await $authApi.patch(url, {commentId, userId});
  }
  static async like(commentId, userId) {
    const url = `/comment/like`;
    return await $authApi.patch(url,{commentId, userId});
  }
}
