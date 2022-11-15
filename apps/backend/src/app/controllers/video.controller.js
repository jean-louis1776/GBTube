import { ApiError } from '../errors/apiError.js';
import videoService from '../services/video.service.js';

class VideoController {
  async create(req, res, next) {
    try {
      const { idList, title, category, description } = req.body;
      const [, channelId, playlistId] = idList.split(';');
      if (!await videoService.isNameUnique(+channelId, title)) {
        return next(ApiError.BadRequest(`Видео с названием ${title} уже существует`))
      }
      return await videoService.upload(res, req.files, +playlistId, +channelId, title, category, description);
    } catch (e) {
      next(e);
    }
  }

  // Находит видео на бэке и отправляет его на фронт
  async download(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.BadRequest('Отсутствует идентификатор видеофайла'));
      }
      const stream = await videoService.download(+id);
      stream.pipe(res);
    } catch (e) {
      next(e);
    }
  }

  async getFrameShot(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return next(ApiError.BadRequest('Отсутствует идентификатор видеофайла'));
      }
      const stream = await videoService.getFrameShot(+id);
      stream.pipe(res);
    } catch (e) {
      next(e);
    }
  }

}

export default new VideoController();
