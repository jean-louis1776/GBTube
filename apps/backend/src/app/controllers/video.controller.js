import path from 'path';

import { ApiError } from '../errors/apiError.js';
import { validateError } from '../errors/validateError.js';
import { createMediaStream } from '../gRPC/createMediaStream.grpc.js';
import videoService from '../services/video.service.js';

class VideoController {
  async create(req, res, next) {
    try {
      validateError(req);
      const { idList, title, category, description, thumbnail, duration } = req.body;
      const [, channelId] = idList.split('_');
      if (!await videoService.isNameUnique(+channelId, title)) {
        return next(ApiError.Conflict(`Видео с названием "${title}" уже существует`));
      }
      return await videoService.upload(res, req.files, idList, title, category, description, thumbnail, duration);
    } catch (e) {
      next(e);
    }
  }

  async findHistory(req, res, next) {
    try {
      validateError(req);
      const videoList = await videoService.findHistory(req.params.user_id);
      let statusCode = 200;
      if (!videoList.length) statusCode = 204;
      return res.status(statusCode).json(videoList);
    } catch (e) {
      next(e);
    }
  }

  async getLikesList(req, res, next) {
    try {
      validateError(req);
      const videoList = await videoService.getLikesList(req.params.user_id);
      let statusCode = 200;
      if (!videoList.length) statusCode = 204;
      return res.status(statusCode).json(videoList);
    } catch (e) {
      next(e);
    }
  }

  async getHashName(req, res, next) {
    try {
      validateError(req);
      return res.json({hashName: await videoService.download(+req.params.id)});
    } catch (e) {
      next(e);
    }
  }

  async download(req, res, next) {
    try {
      validateError(req);
      return createMediaStream(req, res, req.query.hash_name, videoService.changeStatusOfVideo);
    } catch (e) {
      next(e);
    }
  }

  async getFrameShot(req, res, next) {
    try {
      validateError(req);
      return createMediaStream(req, res, path.parse(req.params.hash_name).name + '.jpg');
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      validateError(req);
      const {idList, updatingObject} = req.body;
      return res.json(await videoService.edit(idList, updatingObject));
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      validateError(req);
      return res.status(204).json(await videoService.remove(+req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getVideoInfoById(req, res, next) {
    try {
      validateError(req);
      const { video_id, user_id } = req.query;
      return res.json(await videoService.getVideoInfoById(+video_id, +user_id));
    } catch (e) {
      next(e);
    }
  }

  async getVideosInfoByPlaylistId(req, res, next) {
    try {
      validateError(req);
      const videos = await videoService.getVideosInfoByPlaylistId(+req.params.playlist_id);
      if (!videos) return res.status(204).json([]);
      return res.json(videos);
    } catch (e) {
      next(e);
    }
  }

  async getVideoByChannelId(req, res, next) {
    try {
      validateError(req);
      const videos = await videoService.getVideoByChannelId(+req.params.id);
      if (!videos) return res.status(204).json([]);
      return res.json(videos);
    } catch (e) {
      next(e);
    }
  }

  async findVideoByPartName(req, res, next) {
    try {
      validateError(req);
      const videos = await videoService.findVideoByPartName(req.params.title);
      if (!videos) return res.status(204).json([]);
      return res.json(videos);
    } catch (e) {
      next(e);
    }
  }

  async like(req, res, next) {
    try {
      validateError(req);
      const {id, userId} = req.body;
      return res.json(await videoService.like(userId, id, true));
    } catch (e) {
      next(e);
    }
  }

  async dislike(req, res, next) {
    try {
      validateError(req);
      const {id, userId} = req.body;
      return res.json(await videoService.like(userId, id, false));
    } catch (e) {
      next(e);
    }
  }

  async getFavoriteIdList(req, res, next) {
    try {
      const videoIdList = await videoService.getFavoriteIdList();
      let statusCode = 200;
      if (!videoIdList.length) statusCode = 204;
      return res.status(statusCode).json(videoIdList);
    } catch (e) {
      next(e);
    }
  }

}

export default new VideoController();
