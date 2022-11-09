import path from 'path';
import { v4 as uuidV4 } from 'uuid';
import ffmpeg from 'ffmpeg';
import fs from 'fs-extra';

import { ApiError } from '../errors/apiError.js';
import { videoExtensions } from '../util/videoImageExtensions.js';
import { ftpServer } from '../../main.js';
import userService from '../services/user.service.js';

class VideoController {
  // Принять видео с фронта, сделать frameShot и сохранить
  async upload(req, res, next) {
    try {
      if (!req.files) {
        next(ApiError.BadRequest('Отсутствует видеофайл для загрузки'));
      }

      const file = req.files.videoFile;
      const extension = path.extname(file.name);
      const hashName = uuidV4();
      const videoHashName = hashName + extension;
      const frameHashName = hashName + '.jpg';
      if (!videoExtensions.includes(extension)) {
        next(ApiError.UnProcessableEntity('Формат файла не соответствует видеоформату'));
      }

      await ftpServer.put(file.tempFilePath, videoHashName);

      const video = await new ffmpeg(file.tempFilePath);
      await video.fnExtractFrameToJPG(
        'tmp',
        {
          number: 1,
          every_n_percentage: 50
        },
        async (err, files) => {
          if (err) {
            console.log('error = ', err);                     //TODO   Задать вопрос на созвоне
          } else {
            await ftpServer.put(files[0], frameHashName);
            await fs.remove(path.resolve(path.resolve(), 'tmp'), err => { if (err) console.log(err); });
            return res.json({videoHashName});
          }
        }
      );
    } catch (e) {
      console.log('e = ', e);
      next(e);
    }
  }

  async download(req, res, next) {
    // Найти видео на бэке и отправить на фронт
    try {
      if (!req.params?.videoName) {
        next(ApiError.BadRequest('Отсутствует название видеофайла'));
      }

      const { videoName } = req.params;
      const hashName = videoName;  // TODO Получить hashName из базы
      if (!hashName) {
        next(ApiError.BadRequest(`Видеофайл ${videoName} не найден`));
      }

      const stream = await ftpServer.get(hashName);
      stream.pipe(res);
    } catch (e) {
      next(e);
    }
  }
}

export default new VideoController();
