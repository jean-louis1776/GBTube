import { Video } from "../models/Video";
import { VideoInfo } from "../models/VideoInfo";
import { Op } from "sequelize";
import { ApiError } from "../errors/apiError";

class VideoQueries {

  parsingQueryModel(modelFromQuery) {
    modelFromQuery = modelFromQuery.toJSON();
    return {
      ...modelFromQuery.VideoInfo,
      title: modelFromQuery.title,
    };
  }


  async isVideoNameUnique(title, channelId) {
    return !(await Video.findOne({
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
  async uploadVideo(idList, hashName, title, category, description) {
    try {
      const [, channelId, playListId] = idList.split('_');  //!
      const uVideo = await Video.create({
        playListId: +playListId,
        title,
        channelId: +channelId,
      });
      if (uVideo) {
        const videoId = uVideo.toJSON().id;
        idList += `_${videoId.toString()}`;                 //!

        await VideoInfo.create({
          hashName,
          category,
          description,
          idList,
          videoId,
        });
        return videoId;
      }
      throw ApiError.InternalServerError(`Не удалось сохранить видео!`);
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
                {id: {[Op.ne]: id}},
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
      const videoById = await Video.findOne({
        where: {id},
        include: [{model: VideoInfo, attributes: {exclude: ['id', 'videoId', 'path', 'hashName']}}],
      });
      if (videoById) return this.parsingQueryModel(videoById);
      throw ApiError.BadRequest(`Видео с id: ${id} не найдено`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async findAllVideoByPlayList(playListId) {
    try {
      const videoByPlayListId = await Video.findAll({
        where: {playListId},
        include: [{model: VideoInfo, attributes: {exclude: ['id', 'videoId', 'path', 'hashName']}}],
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
