import { ApiError } from '../errors/apiError';
import { channelQueries } from '../queries/ChannelQueries';

class ChannelService {
  makeResultObject(channel) {
    const idList = [channel.userId, channel.id].join(';');
    delete channel.id;
    delete channel.userId;
    return { idList, ...channel };
  }

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
      return this.makeResultObject(channel);
    } catch(e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAllOfUser(userId) {
    try {
      const channels = await channelQueries.findAllChannelByUserId(userId);
      return channels.map(channel => this.makeResultObject(channel));
    } catch(e) {
      console.log(e.message);
      throw(e);
    }
  }
}

export default new ChannelService();
