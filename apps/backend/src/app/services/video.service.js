import path from 'path';
import { v4 as uuidV4} from 'uuid';
import ffmpeg from 'ffmpeg';
import fs from 'fs-extra';

import { ApiError } from '../errors/apiError.js';
import { videoExtensions } from '../util/videoImageExtensions.js';
import { ftpServer } from '../../main.js';
import { videoQueries } from '../queries/VideoQueries.js';
import { userQueries } from '../queries/UserQueries.js';
import { Channel } from '../models/Channel.js';


/* eslint-disable no-useless-catch */
class VideoService {
  async getNickAndPlaylistNames(idList) {
    try {
      const [userId, channelId] = idList.split(';');
      const nickName = await userQueries.getNickNameById(+userId);
      const channelName = (await Channel.findOne({attributes: ['title'], where: { id: +channelId }})).toJSON().title;
      return { nickName, channelName };
    } catch (e) {
      throw(e);
    }
  }

  async isNameUnique(channelId, title) {
    try {
      return await videoQueries.isVideoNameUnique(title, channelId);
    } catch (e) {
      throw e;
    }
  }

  async upload(res, files, idList, title, category, description) {
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
        'tmp/jpg',
        {
          number: 2,
          every_n_percentage: 50
        },
        async (err, files) => {
          if (!err) {
            await ftpServer.put(files[1], frameHashName);
          }
          await fs.remove(path.resolve(path.resolve(), 'tmp'));
          return res.json(await videoQueries.uploadVideo(idList, videoHashName, title, category, description));
        }
      );
    } catch (e) {
      throw e;
    }
  }

  async download(id) {
    try {
      const hashName = await videoQueries.downloadVideo(id);
      return await ftpServer.get(hashName);
    } catch (e) {
      throw e;
    }
  }

  async getFrameShot(id) {
    try {
      const hashName = await videoQueries.downloadVideo(id);
      const frameName = path.parse(hashName).name + ".jpg";
      return await ftpServer.get(frameName);
    } catch (e) {
      throw e;
    }
  }

  async getVideoInfoById(id) {
    try {
      const video = await videoQueries.findVideoById(id);
      const nickChannelNames = await this.getNickAndPlaylistNames(video.idList);
      return { ...video, ...nickChannelNames };
    } catch (e) {
      throw e;
    }
  }

  async getVideosInfoByPlaylistId(playlistId) {
    try {
      const videos = await videoQueries.findAllVideoByPlayList(playlistId);
      const nickChannelNames = await this.getNickAndPlaylistNames(videos[0].idList);
      return videos.map(video => {
        return { ...video, ...nickChannelNames }
      });
    } catch (e) {
      throw e;
    }
  }
}

export default new VideoService();
