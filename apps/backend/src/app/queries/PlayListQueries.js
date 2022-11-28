import { Op } from 'sequelize';
import { PlayList } from '../models/PlayList';
import { ApiError } from "../errors/apiError";
import { Video } from "../models/Video";


class PlayListQueries {
  /**
   * Создание плэйлиста
   * @param {string} idList - Список идентификаторов родителей плэйлиста
   * @param {string} title - Название плэйлиста
   * @param {string} description - Описание плэйлиста
   * @returns {number} - id созданого плэйлиста
   */
  async createPlayList(idList, title, description) {
    try {
      const [, channelId] = idList.split('_');
      if (await PlayList.findOne({where: {channelId, title}})) {
        throw ApiError.Conflict(`Плэйлист с именем "${title}" уже существует!`);
      }
      const cPlayList = (await PlayList.create({title, channelId, description})).toJSON();
      if (!cPlayList) {
        throw ApiError.InternalServerError('Не удалось создать плэйлист');
      }
      const id = cPlayList.id;
      idList += `_${id.toString()}`;
      await this.updatePlayList(id, channelId, {idList});
      return id;
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
      if (data.title && await PlayList.findOne(
        {
          where: {
            [Op.and]: [
              {channelId},
              {title: data.title},
              {id: {[Op.ne]: id}},
            ],
          },
        },
      )) {
        throw ApiError.Conflict(`Плэйлист с именем ${data.title} уже существует!`);
      }
      if (Object.keys(data).length) {
        return !!(await PlayList.update({...data}, {where: {id}}));
      }
      return false;
    } catch (e) {
      console.log(e.message);
      throw(e);
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
      const fPlayListById = await PlayList.findOne({where: {id}});
      if (fPlayListById) return fPlayListById.toJSON();
      throw ApiError.NotFound(`Плэйлист с id ${id} не найден!`);
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
      const playList = (await PlayList.findAll({where: {channelId}}));
      if (playList) return playList.map(value => value.toJSON());
      return null;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

}

export const playListQueries = new PlayListQueries();

