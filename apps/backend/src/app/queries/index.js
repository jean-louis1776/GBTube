import { User } from "./Users";
import { UserInfo } from "./UserInfo";
import { Token } from "./Tokens";
import { Video } from "./Video";
import { VideoInfo } from "./VideoInfo";
import { Channel } from "./Channel";
import { ChannelInfo } from "./ChannelInfo";
import { ChannelSubscriber } from "./ChannelSubscribers";
import { PlayList } from "./PlayList";
import { Comment } from "./Comment";
import { Answer } from "./Answer";
import { AnswerLike } from "./AnswerLike";
import { CommentLike } from "./CommentLike";
import { VideoLike } from "./VideoLike";


class UserModel {

  /**
   * Создание пользователя
   * @param {string} nickName - nickName пользователя
   * @param {Object} userInfo - информация о пользователе
   * @returns {boolean}
   */
  async createUser(nickName, userInfo) {
    if (this.checkUser(nickName)) {
      const cUser = await User.create({
        nickName: nickName,
      });
      const cUserInfo = await UserInfo.create({
        firstName: userInfo.firstName ? userInfo.firstName : '',
        lastName: userInfo.lastName ? userInfo.lastName : '',
        email: userInfo.email,
        password: userInfo.password,
        userId: cUser.id,
      });
      return true;
    } else return false;
  }

  /**
   * Запись токена пользователя
   * @param {number} userId - id пользователя
   * @param {string} token - token пользователя
   * @returns {Object}
   */
  async writeToken(userId, token) {
    return await Token.create({
      token: token,
      userId: userId,
    });
  }

  /**
   * Проверка на существование пользователя
   * @param {string} nickName - nickName пользователя
   * @returns {boolean}
   */
  async checkUser(nickName) {
    return !!(await this.findOneByName(nickName));
  }

  /**
   * Поиск пользователя по id
   * @param {number} id - id пользователя
   * @returns {Object}
   */
  async findOneById(id) {
    return User.findOne(
      {
        where: {
          id: id,
        },
        include: [
          {
            model: UserInfo,
          },
        ],
      },
    );
  }

  /**
   * Поиск пользователя по nickName
   * @param nickName - nickName пользователя
   * @returns {Object}
   */
  async findOneByName(nickName) {
    return User.findOne(
      {
        where: {
          nickName: nickName,
        },
        include: [
          {
            model: UserInfo,
          },
        ],
      },
    );
  }

  /**
   * Поиск всех пользователей
   * @returns {Object[]}
   */
  async findAllUsers() {
    return await User.findAll(
      {
        include: [
          {
            model: UserInfo,
          },
        ],
      },
    );
  }

  //TODO надо уточнить по какому параметру будет удаляться пользователь
  /**
   * Удаление пользователя
   * @param {number} id - id пользователя
   * @returns {boolean}
   */
  async deleteUser(id) {
    return await User.destroy({
      where: {
        id: id,
      },
    });
  }
}

class ChannelModel {
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
      description: channelInfo.description ? channelInfo.description : '',
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

class VideoModel {
  //TODO реализовать обновление информации о видео, добавление плэйлиста, удаление плюйлиста, видеолайки.
  /**
   * Добавление видео
   * @param {number} userId - id пользователя
   * @param {string} videoName - название видео
   * @param {Object} videoInfo - информация о видео
   * @returns {boolean}
   */
  async createVideo(userId, videoName, videoInfo) {
    const cVideo = await Video.create({
      name: videoName,
      userId: userId,
    });
    const cVideoInfo = await VideoInfo.create({
      path: videoInfo.path,
      hashName: videoInfo.hashName,
      category: videoInfo.category,
      description: videoInfo.description ? videoInfo.description : '',
      videoId: cVideo.id,
    });
    return !!(cVideoInfo);
  }

  /**
   * Поиск видео по имени видео
   * @param {string} videoName - имя канала
   * @returns {Object}
   */
  async findChannelByName(videoName) {
    return Video.findOne(
      {
        where: {
          name: videoName,
        },
        include: [
          {
            model: VideoInfo,
          },
        ],
      },
    );
  }

  /**
   * Поиск видео принадлежащих каналу
   * @param {number} videoId  - имя канала
   * @returns {Object}
   */
  async findChannelByChannel(videoId) {
    return Video.findOne(
      {
        where: {
          videoId: videoId,
        },
        include: [
          {
            model: VideoInfo,
          },
        ],
      },
    );
  }

  /**
   * Удаление видео
   * @param {number} channelId - id канала с видео
   * @returns {Object}
   */
  async deleteChannel(channelId) {
    return await Video.destroy({
      where: {
        channelId: channelId,
      },
    });
  }
}

export const userModel = new UserModel(), channelModel = new ChannelModel(), videoModel = new VideoModel; //, tokenModel = new TokenModel(), userInfoModel = new UserInfoModel();
