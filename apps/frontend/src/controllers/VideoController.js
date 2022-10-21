import $authApi from '../api/AuthClient';

export default class VideoController {
  static async createVideo() {
    return $authApi.post('/video');
  }

  static async updateVideo(video) {
    return $authApi.patch(`/video/${video.id}`, { ...video });
  }

  static async deleteVideo(id) {
    return $authApi.delete(`/video/${id}`);
  }

  static async getVideobyId(id) {
    return $authApi.get(`/video/${id}`);
  }
}
