import { ApiError } from '../errors/apiError.js';
import { validateError } from '../errors/validateError.js';
import { sendVideoFile } from '../gRPC/send-video-file.js';
import videoService from '../services/video.service.js';

class VideoController {
  async create(req, res, next) {
    try {
      console.log(req.body);
      validateError(req);
      console.log('Прошли валидацию');
      const { idList, title, category, description } = req.body;
      const [, channelId] = idList.split('_');
      if (!await videoService.isNameUnique(+channelId, title)) {
        return next(ApiError.Conflict(`Видео с названием "${title}" уже существует`));
      }
      return await videoService.upload(res, req.files, idList, title, category, description);
    } catch (e) {
      next(e);
    }
  }

  // Находит видео на бэке и отправляет его на фронт
  async download(req, res, next) {
    try {
      validateError(req);
      const hashName = await videoService.download(+req.params.id);
      return sendVideoFile(req, res, hashName);
    } catch (e) {
      next(e);
    }
  }

  async getFrameShot(req, res, next) {
    try {
      validateError(req);
      const stream = await videoService.getFrameShot(+req.params.id);
      stream.pipe(res);
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      validateError(req);
      const { idList, updatingObject } = req.body;
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
      return res.json(await videoService.getVideoInfoById(+req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getVideosInfoByPlaylistId(req, res, next) {
    try {
      validateError(req);
      console.log(req.params.playlist_id);
      const videos = await videoService.getVideosInfoByPlaylistId(+req.params.playlist_id);
      if (!videos) return res.status(204).json([]);
      return res.json(videos);
    } catch (e) {
      next(e);
    }
  }

  async like(req, res, next) {
    try {
      validateError(req);
      const { id, userId } = req.body;
      return res.json(await videoService.like(userId, id, true));
    } catch (e) {
      next(e);
    }
  }

  async dislike(req, res, next) {
    try {
      validateError(req);
      const { id, userId } = req.body;
      return res.json(await videoService.like(userId, id, false));
    } catch (e) {
      next(e);
    }
  }

  async getFavoriteIdList(req, res, next) {
    try {
      const videoIdList = await videoService.getFavoriteIdList();
      let statusCode = 200;
      if (videoIdList.length === 0) statusCode = 204;
      return res.status(statusCode).json(videoIdList);
    } catch (e) {
      next(e);
    }
  }
}

export default new VideoController();
