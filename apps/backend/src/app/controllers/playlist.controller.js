import playlistService from '../services/playlist.service';

class PlaylistController {
  async create(req, res, next) {
    try {
      const { idList, title, description } = req.body;
      const channelId = idList.split(';')[1];
      return res.json(await playlistService.create(+channelId, title, description));
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      const { idList, updatingPlaylist} = req.body;
      const [, channelId, playlistId] = idList.split(';');
      return res.json(await playlistService.edit(+playlistId, +channelId, updatingPlaylist));
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      return res.json(await playlistService.getOne(+req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getAllOfChannel(req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }
}

export default new PlaylistController();
