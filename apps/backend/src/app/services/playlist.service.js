import { Channel } from '../models/Channel';
import { playListQueries } from '../queries/PlayListQueries';

/* eslint-disable no-useless-catch */
class PlaylistService {
  async create(channelId, title, description) {
    try {
      return await playListQueries.createPlayList(channelId, title, description);
    } catch (e) {
      throw(e);
    }
  }

  async edit(id, channelId, data) {
    try {
      return await playListQueries.updatePlayList(id, channelId, data);
    } catch (e) {
      throw(e);
    }
  }

  async getOne(id) {
    try {
      const playlist = await playListQueries.findPlayListById(id);
      const userId = (await Channel.findOne({
        where: {id: playlist.channelId},
        attributes: ['userId']
      })).toJSON().userId;
      const idList = [userId, playlist.channelId, playlist.id].join(';');
      delete playlist.channelId;
      delete playlist.id;
      return { idList, ...playlist };
    } catch (e) {
      throw(e);
    }
  }
}

export default new PlaylistService();
