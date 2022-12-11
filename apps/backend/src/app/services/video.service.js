import dotenv from 'dotenv';
import remove from 'remove';
import path from 'path';
import { v4 as uuidV4 } from 'uuid';
import fs from 'fs';

import { ApiError } from '../errors/apiError.js';
import { videoExtensions } from '../util/videoImageExtensions.js';
import { videoQueries } from '../queries/VideoQueries.js';
import { userQueries } from '../queries/UserQueries.js';
import { Channel } from '../models/Channel.js';
import { playListQueries } from '../queries/PlayListQueries.js';
import { sendMediaToBack } from '../gRPC/sendMediaToBack.grpc.js';
import { removeFile } from '../gRPC/removeFile.grpc.js';

/* eslint-disable no-useless-catch */
dotenv.config();

class VideoService {
  async getNickAndPlaylistNames(idList) {
    try {
      const [userId, channelId] = idList.split('_');
      const nickName = await userQueries.getNickNameById(+userId);
      const channelName = (await Channel.findOne({attributes: ['title'], where: {id: +channelId}})).toJSON().title;
      return {nickName, channelName};
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

  async upload(res, files, idList, title, category, description, thumbnail, duration) {
    try {
      if (!files) {
        throw ApiError.BadRequest('Отсутствует видеофайл для сохранения');
      }

      const file = files.videoName;
      const extension = path.extname(file.name);
      if (!videoExtensions.includes(extension)) {
        throw ApiError.BadRequest('Формат файла не соответствует видеоформату');
      }

      const hashName = uuidV4();
      const videoHashName = hashName + extension;

      const tempFilePath = path.resolve(path.dirname(file.tempFilePath), videoHashName);
      fs.renameSync(file.tempFilePath, tempFilePath);

      return sendMediaToBack(tempFilePath, videoHashName, async () => {
        await remove('tmp', { verbose : true, ignoreErrors : false }, err => {if (err) console.log(err.message)});
        return res.status(201).json(await videoQueries.uploadVideo(idList, videoHashName, title, category, description, thumbnail, duration));
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async download(id) {
    try {
      const video = await videoQueries.checkVideoById(id);
      if (!video) {
        throw ApiError.NotFound(`Видео с id ${id} не существует`);
      }
      return await videoQueries.downloadVideo(id);
    } catch (e) {
      throw e;
    }
  }

  async edit(idList, data) {
    try {
      const idArray = idList.split('_');
      if (data.playlistId) {
        idArray[2] = data.playlistId.toString();
        data.idList = idArray.join('_');
      }
      return await videoQueries.updateVideoInfo(+idArray[3], data);
    } catch (e) {
      throw e;
    }
  }

  async getVideoInfoById(id, userId) {
    try {
      const video = await videoQueries.findVideoById(id);
      const [, channelId] = video.idList.split('_');
      const channelName = (await Channel.findOne({attributes: ['title'], where: {id: +channelId}})).toJSON().title;
      const grade = await videoQueries.gradeLikeDislikeOfVideoByUserId(id, userId);
      return { ...video, channelName, grade };
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
      console.log('playlistId = ', playlistId);
      const videos = await videoQueries.findAllVideoByPlayList(playlistId);
      if (!videos?.length) return null;
      const [, channelId] = videos[0].idList.split('_');
      const channelName = (await Channel.findOne({attributes: ['title'], where: {id: +channelId}})).toJSON().title;
      return videos.map(video => {
        return { ...video, channelName };
      });
    } catch (e) {
      throw e;
    }
  }

  async findVideoByPartName(title) {
    try {
      return videoQueries.findVideoByPartName(title);
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
    const fullVideoIdList = await videoQueries.getIdListsOfAllVideo();
    let portion = Math.min(process.env.VIDEO_PORTION, fullVideoIdList.length);
    const favoriteIdList = [];

    while (portion) {
      const index = Math.floor(Math.random() * portion);
      favoriteIdList.push(fullVideoIdList[index]);
      fullVideoIdList.splice(index, 1);
      portion--;
    }
    return favoriteIdList;
  }

  async remove(id) {
    try {
      const hashName = await videoQueries.downloadVideo(id);
      removeFile(hashName);
      return videoQueries.deleteVideo(id);
    } catch (e) {
      throw e;
    }
  }

  async changeStatusOfVideo(req) {
    try {
      const { video_id, user_id } = req.query;
      videoQueries.viewsIncrement(video_id);
      if (user_id) await videoQueries.createVideoHistory(user_id, video_id);
      return;
    } catch (e) {
      throw e;
    }
  }

  async findHistory(userId) {
    try {
      const videosId = await videoQueries.findVideoHistoryByUserId(userId);
      if (!videosId) return [];
      return await videoQueries.getVideoIdListByVideoId(videosId);
    } catch (e) {
      throw e;
    }
  }

  async getLikesList(userId) {
    try {
      const videosId = await videoQueries.getLikesListByUserId(userId);
      if (!videosId) return [];
      return await videoQueries.getVideoIdListByVideoId(videosId);
    } catch (e) {
      throw e;
    }
  }
}

export default new VideoService();
