import { Video } from "../models/Video";
import { VideoInfo } from "../models/VideoInfo";

class VideoQueries {
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
      description: videoInfo.description,
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

export const videoQueries = new VideoQueries();
