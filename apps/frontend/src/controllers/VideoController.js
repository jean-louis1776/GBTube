import $authApi from '../api/AuthClient';

export default class VideoController {
  static async addVideo(video) {
    const formData = new FormData();

    formData.append('attachment', video.attachment);
    formData.append('description', video.description);
    formData.append('name', video.name);

    return $authApi.post('/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  static async getVideobyId(id) {
    return $authApi.get(`/video/${id}`);
  }

  static async updateVideo(video) {
    return $authApi.patch(`/video/${video.id}`, { ...video });
  }

  static async deleteVideo(id) {
    return $authApi.delete(`/video/${id}`);
  }
}
