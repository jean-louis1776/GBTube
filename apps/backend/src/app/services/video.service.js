import dotenv from 'dotenv';
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
import { playListQueries } from '../queries/PlayListQueries.js';
import { filledInputClasses } from '@mui/material';

/* eslint-disable no-useless-catch */
dotenv.config();

class VideoService {
  async getNickAndPlaylistNames(idList) {
    try {
      const [userId, channelId] = idList.split('_');
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
        throw ApiError.BadRequest('Формат файла не соответствует видеоформату');
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
          return res.status(201).json(await videoQueries.uploadVideo(idList, videoHashName, title, category, description));
        }
      );
    } catch (e) {
      throw e;
    }
  }

  async download(id) {
    try {
      const video = await videoQueries.checkVideoById(id);
      if (!video) {
        throw ApiError.NotFound(`Видео с id ${id} не существует`);
      }
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
      const playlist = !!(await playListQueries.findPlayListById(playlistId));
      if (!playlist) {
        throw ApiError.NotFound(`Плайлист с id ${playlistId} не найден`);
      }
      const videos = await videoQueries.findAllVideoByPlayList(playlistId);
      if (!videos?.length) return null;
      const nickChannelNames = await this.getNickAndPlaylistNames(videos[0].idList);
      return videos.map(video => {
        return { ...video, ...nickChannelNames }
      });
    } catch (e) {
      throw e;
    }
  }

  async like(userId, videoId, isLike) {
    try {
      const user = await userQueries.checkUserById(userId);
      if (!user) {
        throw ApiError.NotFound(`Пользователь с id ${userId} не найден`);
      }
      const video = await videoQueries.checkVideoById(videoId);
      if (!video) {
        throw ApiError.NotFound(`Видео с id ${videoId} не найдено`);
      }
      if (isLike) return await videoQueries.like(videoId, userId);
      return await videoQueries.dislike(videoId, userId);
    } catch (e) {
      throw e;
    }
  }

  async getFavoriteIdList() {
    const fullVideoIdList = await videoQueries.getIdOfAllVideo();
    let portion = Math.min(process.env.VIDEO_PORTION, fullVideoIdList.length);
    const favoriteIdList = [];

    for (; portion; portion--) {
      const index = Math.floor(Math.random() * portion);
      favoriteIdList.push(fullVideoIdList[index].toString());
      fullVideoIdList.splice(index, 1);
    }
    return favoriteIdList;
  }
}

export default new VideoService();
