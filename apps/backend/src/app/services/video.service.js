import path from 'path';
import { v4 as uuidV4} from 'uuid';
import ffmpeg from 'ffmpeg';
import fs from 'fs-extra';

import { ApiError } from '../errors/apiError.js';
import { videoExtensions } from '../util/videoImageExtensions.js';
import { ftpServer } from '../../main.js';
import { Video } from '../models/Video.js';
import { videoQueries } from '../queries/VideoQueries.js';


/* eslint-disable no-useless-catch */
class VideoService {
  async isNameUnique(channelId, title) {
    try {
      return !(await Video.findOne({ where: { channelId, title }}));
    } catch (e) {
      throw e;
    }
  }

  async upload(res, files, playlistId, channelId, title, category, description) {
    try {
      if (!files) {
        throw ApiError.BadRequest('Отсутствует видеофайл для сохранения');
      }
      const file = files.videoFile;
      const extension = path.extname(file.name);
      if (!videoExtensions.includes(extension)) {
        throw ApiError.UnProcessableEntity('Формат файла не соответствует видеоформату');
      }

      const hashName = uuidV4();
      const videoHashName = hashName + extension;
      const frameHashName = hashName + '.jpg';

      await ftpServer.put(file.tempFilePath, videoHashName);

      const video = await new ffmpeg(file.tempFilePath);
      await video.fnExtractFrameToJPG(
        'tmp',
        {
          number: 1,
          every_n_percentage: 50
        },
        async (err, files) => {
          if (!err) {
            await ftpServer.put(files[0], frameHashName);
          }
          await fs.remove(path.resolve(path.resolve(), 'tmp'));
          console.log(videoHashName);
          return res.json(await videoQueries.uploadVideo(playlistId, channelId, videoHashName, title, category, description));
        }
      );
    } catch (e) {
      throw e;
    }
  }

  async create (playlistId, channelId, hashName, title, category, description) {
    try {
      return videoQueries.uploadVideo(playlistId, channelId, hashName, title, category, description);
    } catch (e) {
      throw e;
    }
  }
}

export default new VideoService();
