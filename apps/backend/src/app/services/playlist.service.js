import { ApiError } from '../errors/apiError';
import { channelQueries } from '../queries/ChannelQueries';
import { playListQueries } from '../queries/PlayListQueries';
import { removeFile } from '../gRPC/removeFile.grpc.js';
import { videoQueries } from "../queries/VideoQueries";

/* eslint-disable no-useless-catch */
class PlaylistService {
  async create(idList, title, description) {
    try {
      return await playListQueries.createPlayList(idList, title, description);
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
      const videoIdArr = await videoQueries.findVideosIdInPlayList(id);
      await Promise.all(videoIdArr.map(value => removeFile(value)));
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
      delete playlist.channelId;
      delete playlist.id;
      return playlist;
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
      return playlists.map(playlist => {
        delete playlist.channelId;
        delete playlist.id;
        return playlist;
      });
    } catch (e) {
      throw(e);
    }
  }
}

export default new PlaylistService();
