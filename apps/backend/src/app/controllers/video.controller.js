import { ApiError } from '../errors/apiError.js';
import { ftpServer } from '../../main.js';
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


  async download(req, res, next) {
    // Найти видео на бэке и отправить на фронт
    try {
      if (!req.params.id) {
        return next(ApiError.BadRequest('Отсутствует идентификатор видеофайла'));
      }
      const { id } = req.params;

      const hashName = videoName;  // TODO Получить hashName из базы
      if (!hashName) {
        return next(ApiError.BadRequest(`Видеофайл ${videoName} не найден`));
      }

      const stream = await ftpServer.get(hashName);
      stream.pipe(res);
    } catch (e) {
      next(e);
    }
  }
}

export default new VideoController();
