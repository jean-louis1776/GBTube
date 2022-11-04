import { Channel } from "../models/Channel";
import { ChannelInfo } from "../models/ChannelInfo";
import { ChannelSubscriber } from "../models/ChannelSubscribers";

class ChannelQueries {
  //TODO реализовать обновление информации о канале
  /**
   * Добавление канала
   * @param {number} userId - id пользователя
   * @param {string} channelName - название канала
   * @param {Object} channelInfo - информация о канале
   * @returns {boolean}
   */
  async createChannel(userId, channelName, channelInfo) {
    const cChannel = await Channel.create({
      name: channelName,
      userId: userId,
    });
    const cChannelInfo = await ChannelInfo.create({
      description: channelInfo.description,
      channelId: cChannel.id,
    });
    return !!(cChannelInfo);
  }

  /**
   * Поиск канала по имени
   * @param {string} channelName - имя канала
   * @returns {Object}
   */
  async findChannel(channelName) {
    return Channel.findOne(
      {
        where: {
          name: channelName,
        },
        include: [
          {
            model: ChannelInfo,
          },
        ],
      },
    );
  }

  /**
   * Поиск всех каналов
   * @returns {Object[]}
   */
  async findAllChannel() {
    return await Channel.findAll(
      {
        include: [
          {
            model: ChannelInfo,
          },
        ],
      },
    );
  }

  /**
   * Добавление подписки
   * @param {number} userId - id подписавшегося пользователя
   * @param {number} channelId - id канала на который подписались
   * @returns {boolean}
   */
  async addSubscriber(userId, channelId) {
    return !!(
      await ChannelSubscriber.create({
        userId: userId,
        channelId: channelId,
      })
    );
  }

  /**
   * Удаление подписки
   * @param {number} userId - id пользователя отписавшегося от канала
   * @returns {boolean}
   */
  async deleteSubscriber(userId) {
    return !!(
      await ChannelSubscriber.destroy({
        where: {
          userId: userId,
        },
      })
    );
  }

  //TODO надо уточнить по какому параметру будет удаляться канал
  /**
   * Удаление канала
   * @param {number} id - id канала
   * @returns {Object}
   */
  async deleteChannel(id) {
    return await Channel.destroy({
      where: {
        id: id,
      },
    });
  }
}

export const channelQueries = new ChannelQueries();
