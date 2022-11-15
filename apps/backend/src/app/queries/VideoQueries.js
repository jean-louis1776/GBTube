import { Video } from "../models/Video";
import { VideoInfo } from "../models/VideoInfo";
import { Op } from "sequelize";
import { ApiError } from "../errors/apiError";
import { PlayList } from "../models/PlayList";
import { Channel } from "../models/Channel";
import { ChannelInfo } from "../models/ChannelInfo";

class VideoQueries {

  parsingQueryModel(modelFromQuery) {
    modelFromQuery = modelFromQuery.toJSON();
    return {
      ...modelFromQuery.VideoInfo,
      id: modelFromQuery.id,
      title: modelFromQuery.title,
    };
  }


  async isVideo(title, channelId) {
    return !!(await Video.findOne({
      where: {
        [Op.and]:
          [{title}, {channelId}],
      },
    }));
  }

  /**
   * Загрузка видео
   * @param {number} playListId - id плэйлиста
   * @param {number} channelId - id канала
   * @param {string} hashName - зашифроное имя файла
   * @param {string} title - информация о видео
   * @param {string} category - категория видео
   * @param {string} description - подробная информация о видео
   * @returns {number}
   */
  async uploadVideo(playListId, channelId, hashName, title, category, description) {
    try {
      const uVideo = await Video.create({
        playListId,
        title,
        channelId,
      });
      if (uVideo) {
        await VideoInfo.create({
          hashName,
          category,
          description,
          videoId: uVideo.id,
        });
        return uVideo.id;
      }
      throw ApiError.BadRequest(`Не удалось загрузить видео!`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  /**
   * Выгрузка видео
   * @param {number} id - id видео
   * @returns {string}
   */
  async downloadVideo(id) {
    try {
      const videoHash = await VideoInfo.findOne({where: {id}});
      if (videoHash) return videoHash.toJSON().hashName;
      throw ApiError.BadRequest(`Данное видео отсутствует на сервере`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async updateVideoInfo(id, title, category, description) {
    try {
      const fVideo = await Video.findOne({where: id});
      if (title) {
        if (await Video.findOne(
          {
            where: {
              [Op.and]: [
                {channelId: fVideo.toJSON().channelId},
                {title},
                // {id: {[Op.ne]: id}}, // Что то вообще не понимаю для чего нам эта строчка для проверки уникальности
              ],
            },
          },
        )) {
          throw ApiError.BadRequest(`Видео с именем ${title} уже существует канале!`);
        }
        await Video.update({title}, {where: {id}});
      }
      return !!(await VideoInfo.update({category, description}, {where: {videoId: id}}));
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async findVideoById(id) {
    try {
      const videoById = Video.findOne({
        where: {id},
        include: [{model: VideoInfo, attributes: {exclude: ['videoId']}}],
      });
      if (videoById) return this.parsingQueryModel(videoById);
      throw ApiError.BadRequest(`Виде с id: ${id} не найдено`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async findAllVideoByPlayList(playListId) {
    try {
      const videoByPlayListId = await Video.findAll({
        where: {playListId},
        include: [{model: VideoInfo, attributes: {exclude: ['videoId']}}],
      });
      if (!videoByPlayListId) return null;
      const result = [];
      for (const videoByList of videoByPlayListId) {
        result.push(this.parsingQueryModel(videoByList));
      }
      return result;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }



  /**
   * Удаление видео
   * @param {number} channelId - id канала с видео
   * @returns {Object}
   */
  async deleteChannel(id) {
    try {
      return !!(await Video.destroy({where: {id}}));
    } catch (e) {
      return false;
    }
  }
}

export const videoQueries = new VideoQueries();
