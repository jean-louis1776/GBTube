import { ApiError } from '../errors/apiError';
import { Channel } from '../models/Channel';
import { channelQueries } from '../queries/ChannelQueries';
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
      const result = await playListQueries.deletePlayList(id);
      if (!result) {
        throw ApiError.NotFound(`Плейлиста с id ${id} не существует`);
      }
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
      const channel = await channelQueries.isChannel(channelId);
      if (!channel) {
        throw ApiError.NotFound(`Канал с id ${channelId} не найден`);
      }
      const playlists = await playListQueries.findAllPlayList(channelId);
      if (!playlists) return null;
      const userId = await this.getUserIdByChannelId(channelId);
      return playlists.map(playlist => this.makeResultObject(userId, playlist));
    } catch (e) {
      throw(e);
    }
  }
}

export default new PlaylistService();
