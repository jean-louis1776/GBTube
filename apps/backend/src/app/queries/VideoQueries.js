import { Video } from "../models/Video";
import { VideoInfo } from "../models/VideoInfo";
import { Op } from "sequelize";
import { ApiError } from "../errors/apiError";

class VideoQueries {
  //вот тут я не совсем понял тебе что возвращать ошибку через try/catch или все таки true/false
  async isVideo(playListId, channelId) {
    return !!(await Video.findOne({
      where: {
        [Op.and]:
          [{playListId}, {channelId}],
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
      const dVideo = await Video.create({
        playListId,
        title,
        channelId,
      });
      if (dVideo) {
        const videoId = dVideo.toJSON().id;
        await VideoInfo.create({
          hashName,
          category,
          description,
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
      const videoHash = await VideoInfo.findOne({where: {[Op.eq]: {videoId: id}}});
      if (videoHash) return videoHash.toJSON().hashName;
      throw ApiError.BadRequest(`Данное виде отсутствует на сервере`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
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

export const videoQueries = new VideoQueries();
