import { ApiError } from '../errors/apiError';
import { channelQueries } from '../queries/ChannelQueries';

class ChannelService {
  async create(userId, title, description) {
    try {
      if (!userId) {
        throw ApiError.BadRequest('Не указан владелец канала');
      }
      if(!title) {
        throw ApiError.BadRequest('Не указано название канала');
      }
      return channelQueries.createChannel(userId, title, description);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async edit(channelId, userId, updatingChannel) {
    try {
      return channelQueries.updateChannel(channelId, userId, updatingChannel);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async subscribe(id, userId) {
    try {
      return channelQueries.subscriber(id, userId);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async remove(id) {
    try {
      return channelQueries.deleteChannel(id);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getOne(id) {
    try {
      const channel = await channelQueries.findChannelById(id);
      const idList = `${channel.userId.toString()};${channel.id.toString()};`;
      delete channel.id;
      delete channel.userId;
      return { idList, ...channel };
    } catch(e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAllOfUser(userId) {
    try {
      const channels = await channelQueries.findAllChannelByUserId(userId);
      let result = [];
      for (const channel of channels) {
        const idList = `${channel.userId.toString()};${channel.id.toString()};`;
        delete channel.id;
        delete channel.userId;
        result.push({ idList, ...channel });
      }
      return result;
    } catch(e) {
      console.log(e.message);
      throw(e);
    }
  }
}

export default new ChannelService();
