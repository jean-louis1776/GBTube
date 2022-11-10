import $authApi from '../api/AuthClient';

export default class VideoController {
  static async addVideo(video) {
    const formData = new FormData();

    formData.append('attachment', video.attachment);
    formData.append('description', video.description);
    formData.append('name', video.name);

    return $authApi.post('/video/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async loadVideo(id) {
    return $authApi.get(`/video/udownload/${id}`);
  }

  static async getVideobyId(id) {
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
}
