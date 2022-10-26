import path from 'path';
import { v4 as uuidV4 } from 'uuid';
import Client from 'ftp';
import * as dotenv from 'dotenv';

import { ApiError } from '../errors/apiError.js';
import { videoExtensions } from '../util/videoExtensions.js';

dotenv.config();

class VideoController {
  ftpServerConnect() {
    const ftpServer =  new Client();
    ftpServer.connect({
      host: process.env.STORE_SERVER_HOST,
      port: process.env.STORE_SERVER_PORT,
      user: process.env.STORE_SERVER_USER,
      password: process.env.STORE_SERVER_PASSWORD
    });
    return ftpServer;
  }
  // Принять видео с фронта и сохранить
  upload(req, res, next) {
    try {
      if (!req.files) {
        next(ApiError.BadRequest('Отсутствует видеофайл для загрузки'));
      }

      const file = req.files.videoFile;
      const extension = path.extname(file.name);
      const hashName = uuidV4() + extension;
      if (!videoExtensions.includes(extension)) {
        next(ApiError.UnProcessableEntity('Формат файла не соответствует видеоформату'));
      }

      const ftpServer = this.ftpServerConnect();

      ftpServer.on('ready', async () => {
        ftpServer.put(file.data, hashName, err => {
          if (err) {
            return next(ApiError.InternalServerError(err));
          }
          ftpServer.end();
          return res.json(hashName);
        })
      });
    } catch (e) {
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

      const ftpServer = this.ftpServerConnect();

      ftpServer.on('ready', () => {
        ftpServer.get(hashName, (err, stream) => {
          if (err) {
            return next(ApiError.InternalServerError(err));
          }
          stream.once('close', () => {
            ftpServer.end();
          });
          stream.pipe(res);
        });
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new VideoController();
