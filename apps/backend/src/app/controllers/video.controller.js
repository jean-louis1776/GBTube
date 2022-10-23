import path from 'path';
import { v4 as uuidV4 } from 'uuid';

import { ApiError } from '../errors/apiError.js';
import { videoExtensions } from '../util/videoExtensions.js';

class VideoController {
  // Принять видео с фронта и сохранить
  upload(req, res, next) {
    try {
      if (!req.files) {
        next(ApiError.BadRequest('Отсутствует видеофайл для загрузки'));
      }

      const file = req.files.videoFile;
      const pathToFile = path.resolve(path.resolve(), 'apps', 'backend', 'src', 'assets', 'static');
      const extension = path.extname(file.name);
      const hashName = uuidV4() + extension;
      const fileName = path.join(pathToFile, hashName);
      if (!videoExtensions.includes(extension)) {
        next(ApiError.UnProcessableEntity('Формат файла не соответствует видеоформату'));
      }

      file.mv(fileName, err => {
        if (err) {
          next(ApiError.InternalServerError(err));
        }
      });

      return res.json(hashName);
    } catch (e) {
      next(e);
    }
  }
  //TODO Найти видео на бэке и отправить на фронт
}

export default new VideoController();
