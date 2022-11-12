import { Channel } from "../models/Channel";
import { ChannelInfo } from "../models/ChannelInfo";
import { ChannelSubscriber } from "../models/ChannelSubscribers";
import { ApiError } from "../errors/apiError";
import { User } from "../models/Users";
import { PlayList } from "../models/PlayList";
import { Video } from "../models/Video";

class ChannelQueries {
  parsingQueryModel(modelFromQuery) {
    // modelFromQuery = JSON.parse(JSON.stringify(modelFromQuery));
    modelFromQuery = modelFromQuery.toJSON();
    return {
      ...modelFromQuery.ChannelInfos,
      id: modelFromQuery.id,
      title: modelFromQuery.title,
      userId: modelFromQuery.userId,
    };
  }

  /**
   * Добавление канала
   * @param {number} userId - id пользователя
   * @param {string} title - название канала
   * @param {string} description - описание канала
   * @returns {number} - id созданого канала
   */
  async createChannel(userId, title, description) {
    try {
      if (await Channel.findOne({where: {userId, title}})) {
        throw ApiError.BadRequest(`Канал с именем ${title} уже существует!`);
      }
      const cChannel = (await Channel.create({title, userId})).toJSON();
      await ChannelInfo.create({
        description,
        channelId: cChannel.id,
      });
      return cChannel.id;
    } catch (e) {
      console.log(e.message);
      throw (e);
    }
  }

  /**
   * Поиск канала по ID
   * @param {string} Id - имя канала
   * @returns {Object}
   */
  async findChannelById(Id) {
    try {
      const channel = Channel.findOne({
        where: {Id},
        include: [{model: ChannelInfo, attributes: {exclude: ['channelId', 'updateTimestamp']}}],
      });
      if (channel) {
        return this.parsingQueryModel(channel);
      }
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  /**
   * Поиск всех каналов по ID
   * @returns {Object[]}
   */
  async findAllChannelByUserId(UserId) {
    try {
      const channels = await Channel.findAll(
        {
          where: {UserId},
          include: [{model: ChannelInfo, attributes: {exclude: ['channelId', 'updateTimestamp']}}],
        },
      );
      if (!channels) return null;
      const result = [];
      for (const channel of channels) {
        result.push(this.parsingQueryModel(channel));
      }
      return result;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  /**
   * Добавление/Удаление подписки
   * @param {number} userId - id пользователя отписавшегося от канала
   * @param {number} channelId  id канала
   * @returns {boolean}
   */
  async subscriber(channelId, userId) {
    try {
      const subscribers = await ChannelInfo.findOne({where: {channelId}}).toJSON();
      if (await User.findOne({where: {channelId, userId}})) {
        await subscribers.increment('subscribersCount ', {by: 1});
        return !!(await ChannelSubscriber.destroy({where: {channelId, userId}}));
      }
      await subscribers.decrement('subscribersCount ', {by: 1});
      return !!(await ChannelSubscriber.create({channelId, userId}));
    } catch (e) {
      return false;
    }
  }

  /**
   * Удаление канала
   * @param {number} id - id канала
   * @returns {boolean}
   */
  async deleteChannel(id) {
    try {
      return !!(await Channel.destroy({
        where: {id},
        include: [{model: ChannelInfo}, {model: PlayList}, {model: ChannelSubscriber}, {model: Video}],
      }));
    } catch (e) {
      return false;
    }
  }

  /**
   * Обновление канала
   * @param {number} id - id канала
   * @param {number} userId - id пользователя
   * @param {Object} data - данные о канале
   * @returns {boolean}
   */
  async updateChannel(id, userId, data) {
    let isUpdate = 0;
    try {
      const uChannel = (await Channel.findOne({where: id})).toJSON();
      if (data.title) {
        if (uChannel.title !== data.title) {
          if (await Channel.findOne({where: {userId, title: data.title}})) {
            throw ApiError.BadRequest(`Канал с именем ${data.title} уже существует!`);
          }
          isUpdate += await Channel.update({title: data.title}, {where: {id}});
          delete data.title;
        }
      }
      if (Object.keys(data).length) {
        isUpdate += await ChannelInfo.update({...data}, {where: {channelId: id}});
      }
      return !!isUpdate;
    } catch (e) {
      return ApiError.InternalServerError(e.message);
    }
  }
}

export const channelQueries = new ChannelQueries();
