import { ApiError } from '../errors/apiError';
import { channelQueries } from '../queries/ChannelQueries';
import { userQueries } from '../queries/UserQueries';
import { ChannelInfo } from "../models/ChannelInfo";

class ChannelService {
  makeResultObject(channel) {
    const idList = [channel.userId, channel.id].join('_');
    delete channel.id;
    delete channel.userId;
    return {idList, ...channel};
  }

  async create(userId, title, description) {
    try {
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
      const isSubscribe = (await channelQueries.subscriber(id, userId));
      const subscribe = (await ChannelInfo.findOne({where: {channelId: id}, attributes: ['subscribersCount']})).toJSON();
      subscribe.isSubscribe = isSubscribe;
      return subscribe;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async remove(id) {
    try {
      const result = channelQueries.deleteChannel(id);
      if (!result) {
        throw ApiError.NotFound(`Канала с id ${id} не существует`);
      }
      return !!result;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getOne(query) {
    try {
      const {channel_id, user_id} = query;
      const channel = await channelQueries.findChannelById(channel_id);
      const isSub = await channelQueries.isSubscriber(channel_id, user_id);
      channel.isSubscribed = isSub;
      console.log(isSub);
      return this.makeResultObject(channel);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAllOfUser(userId) {
    try {
      const isUser = await userQueries.checkUserById(userId);
      if (!isUser) {
        throw ApiError.NotFound(`Пользователя с id ${userId} не существует`);
      }
      const channels = await channelQueries.findAllChannelByUserId(userId);
      if (!channels) return null;
      return channels.map(channel => this.makeResultObject(channel));
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getSubscribedList(userId) {
    try {
      const channels = await channelQueries.getSubscribedListByUserId(userId);
      if (!channels) return [];
      return channels.map(channel => [channel.userId, channel.id].join('_'));
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }
}

export default new ChannelService();
