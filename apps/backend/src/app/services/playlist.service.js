import { Channel } from '../models/Channel';
import { playListQueries } from '../queries/PlayListQueries';

/* eslint-disable no-useless-catch */
class PlaylistService {
  async getUserIdByChannelId (channelId) {
    return (await Channel.findOne({
      where: {id: channelId},
      attributes: ['userId']
    })).toJSON().userId;
  }
  makeResultObject(userId, playlist) {
    const idList = [userId, playlist.channelId, playlist.id].join(';');
    delete playlist.channelId;
    delete playlist.id;
    return { ...playlist, idList };
  }
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

  async remove(id) {
    try {
      return await playListQueries.deletePlayList(id);
    } catch (e) {
      throw(e);
    }
  }

  async getOne(id) {
    try {
      const playlist = await playListQueries.findPlayListById(id);
      const userId = await this.getUserIdByChannelId(playlist.channelId);
      return this.makeResultObject(userId, playlist);
    } catch (e) {
      throw(e);
    }
  }

  async getAllOfChannel(channelId) {
    try {
      const playlists = await playListQueries.findAllPlayList(channelId);
      const userId = await this.getUserIdByChannelId(channelId);
      return playlists.map(playlist => this.makeResultObject(userId, playlist));
    } catch (e) {
      throw(e);
    }
  }
}

export default new PlaylistService();
