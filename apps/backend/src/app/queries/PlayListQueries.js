import { PlayList } from '../models/PlayList';
import { ApiError } from "../errors/apiError";
import { Video } from "../models/Video";


class PlayListQueries {
  /**
   * Создание плэйлиста
   * @param {number} channelId - номер канала для которого создается плэйлист
   * @param {string} title - Название плэйлиста
   * @param {string} description - Описание плэйлиста
   * @returns {number} - id созданого плэйлиста
   */
  async createPlayList(channelId, title, description) {
    try {
      if (await PlayList.findOne({where: {channelId, title}})) {
        throw ApiError.BadRequest(`Плэйлист с именем ${title} уже существует!`);
      }
      const cPlayList = (await PlayList.create({title, channelId, description})).toJSON();
      return cPlayList.id;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  /**
   * Обновление данных плэйлиста
   * @param {number} id - id плэйлиста
   * @param {number} channelId - id канала которому принадлежит плэйлист
   * @param {Object} data - обьект новых данных плэйлиста
   * @returns {boolean}
   */
  async updatePlayList(id, channelId, data) {
    try {
      if (await PlayList.findOne({where: {channelId, title: data.title}})) {
        throw ApiError.BadRequest(`Плэйлист с именем ${data.title} уже существует!`);
      }
      if (Object.keys(data).length) {
        return !!(await PlayList.update({...data}, {where: {id}}));
      }
      return false;
    } catch (e) {
      return ApiError.InternalServerError(e.message);
    }
  }

  /**
   * Удаление плэйлиста
   * @param id - id удаляемого плэйлиста
   * @returns {boolean}
   */
  async deletePlayList(id) {
    try {
      return !!(await PlayList.destroy({
        where: {id},
        include: [{model: Video}],
      }));
    } catch (e) {
      return false;
    }
  }

  /**
   * Поиск плэйлиста по id
   * @param {number} id - id плэйлиста
   * @returns {Object} - плэйлист
   */
  async findPlayListById(id) {
    try {
      return (await PlayList.findOne({where: id})).toJSON();
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  /**
   * Поиск плэйлиста по id канала к которому он привязан
   * @param {number} channelId - id канала к которому привязан плэйлист
   * @returns {Object[]} - массив обьектов с плэйлистами
   */
  async findAllPlayList(channelId) {
    try {
      return (await PlayList.findAll({where: channelId}));
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }
}

export const playList = new PlayList();
