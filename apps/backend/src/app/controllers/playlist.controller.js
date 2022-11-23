import { validateError } from '../errors/validateError';
import playlistService from '../services/playlist.service';

class PlaylistController {
  async create(req, res, next) {
    try {
      validateError(req);
      const { idList, title, description } = req.body;
      return res.status(201).json(await playlistService.create(idList, title, description));
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      validateError(req);
      const { idList, updatingObject } = req.body;
      const [, channelId, playlistId] = idList.split('_');
      return res.json(await playlistService.edit(+playlistId, +channelId, updatingObject));
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      validateError(req);
      return res.status(204).json(await playlistService.remove(+req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      validateError(req);
      return res.json(await playlistService.getOne(+req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getAllOfChannel(req, res, next) {
    try {
      validateError(req);
      const playlists = await playlistService.getAllOfChannel(+req.params.channel_id);
      if (!playlists) return res.status(204).json([]);
      return res.json(playlists);
    } catch (e) {
      next(e);
    }
  }
}

export default new PlaylistController();
