import $authApi from '../api/AuthClient';

export default class VideoController {
  static async addVideo(formData) {
    return $authApi.post('/video/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async loadVideo(id) {
    return $authApi.get(`/video/download/${id}`);
  }

  static async getVideoInfo(videoId, userId = '0') {
    const url = `/video/get_one?video_id=${videoId}&user_id=${userId}`;
    return (await $authApi.get(url)).data;
  }

  static async getVideoName(id) {
    return (await $authApi.get(`/video/get_name/${id}`)).data;
  }

  static async getVideoById(id) {
    return $authApi.get(`/video/${id}`);
  }

  static async editVideo(video) {
    return $authApi.patch(`/video/edit/${video.id}`, { ...video });
  }

  static async deleteVideo(id) {
    return $authApi.delete(`/video/${id}`);
  }

  static async getAllVideoFromChannel(channelId) {
    return $authApi.get(`video/channel/${channelId}`);
  }

  static async getFrameShotVideo(id) {
    return $authApi.get(`video/frameshot/${id}`);
  }

  static async getVideoCompilation() {
    return (await $authApi.get('/video/get_favorite')).data;
  }

  static async getSearchQueryCompilation(query) {
    return (await $authApi.get(`/video/query/${query}`)).data;
  }

  static async getVideoHistory(userId) {
    return (await $authApi.get(`/video/history/${userId}`)).data;
  }

  static async getVideoLikes(userId) {
    return (await $authApi.get(`/video/likes_list/${userId}`)).data;
  }

  static async getVideoByChannel(channelId) {
    const url = `/video/channel/${channelId}`;
    return (await $authApi.get(url)).data;
  }

  static async sendLikeReactionVideo(videoId, userId) {
    const dto = { userId: +userId, id: +videoId };
    return await $authApi.patch(`/video/like`, dto);
  }

  static async sendDislikeReactionVideo(videoId, userId) {
    const dto = { userId: +userId, id: +videoId };
    return await $authApi.patch(`/video/dislike`, dto);
  }
}
