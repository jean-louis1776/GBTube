import { Video } from "../models/Video";
import { VideoInfo } from "../models/VideoInfo";
import { VideoHistory } from "../models/VideoHistory";
import { Op } from "sequelize";
import { ApiError } from "../errors/apiError";
import { VideoLike } from "../models/VideoLike";

class VideoQueries {

  parsingQueryModel(modelFromQuery) {
    modelFromQuery = modelFromQuery.toJSON();
    return {
      ...modelFromQuery.VideoInfo,
      title: modelFromQuery.title,
    };
  }

  async isVideoNameUnique(title, channelId) {
    try {
      return !(await Video.findOne({where: {title, channelId}}));
    } catch (e) {
      console.log(e);
      throw e;
    }
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
  async uploadVideo(idList, hashName, title, category, description, thumbnail, duration) {
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
          thumbnail,
          duration
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
      const videoHash = await VideoInfo.findOne({where: {videoId: id}});
      if (videoHash) return videoHash.toJSON().hashName;
      throw ApiError.NotFound(`Видео с id ${id} не найдено`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  //async updateVideoInfo(id, title, category, description) {
  async updateVideoInfo(id, data) {
    try {
      let isUpdate = 0;
      const fVideo = await Video.findOne({where: id});
      const updObj = {};
      if (data.title) {
        if (await Video.findOne(
          {
            where: {
              [Op.and]: [
                {channelId: fVideo.toJSON().channelId},
                {title: data.title},
                {id: {[Op.ne]: id}},
              ],
            },
          },
        )) {
          throw ApiError.BadRequest(`Видео с именем ${data.title} уже существует канале!`);
        }
        updObj.title = data.title;
        delete data.title;
      }
      if (data.playlistId) {
        updObj.playlistId = data.playlistId;
        delete data.playlistId;
      }
      if (Object.keys(updObj).length) isUpdate += await Video.update({title: data.title}, {where: {id}});
      if (Object.keys(data).length) isUpdate += await VideoInfo.update(data, {where: {videoId: id}});
      return !!isUpdate;
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
      throw ApiError.NotFound(`Видео с id: ${id} не найдено`);
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

  async findVideoByPartName(title) {
    try {
      const videoByPartName = await Video.findAll({
        include: [{model: VideoInfo, attributes: ['idList']}],
        where: {title: {[Op.substring]: title}},
      });
      if (videoByPartName) {
        return (videoByPartName).map(value => value.toJSON().VideoInfo.idList);
      }
      return null;
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
  async deleteVideo(id) {
    try {
      return !!(await Video.destroy({where: {id}}));
    } catch (e) {
      return false;
    }
  }

  async countViews(id) {
    try {
      const vCount = await VideoInfo.findOne({where: {id}});
      if (vCount !== null) return vCount.toJSON().viewsCount;
      return 0;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async viewsIncrement(videoId) {
    try {
      const vIncrement = await VideoInfo.findOne({where: {videoId}});
      if (vIncrement) return !!(await vIncrement.increment('viewsCount', {by: 1}));
      throw ApiError.NotFound('Ошибка добавления просмотра!');
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async like(videoId, userId) {
    try {
      const lVideo = await VideoInfo.findOne({where: {videoId}});
      if (!lVideo) throw ApiError.NotFound(`Видео с id ${videoId} не найден`);
      if (await VideoLike.findOne({where: {videoId, userId, liked: false}})) {
        await VideoLike.update({liked: true}, {where: {videoId, userId, liked: false}});
        await lVideo.increment('likesCount', {by: 1});
        await lVideo.decrement('dislikesCount', {by: 1});
        return true;
      }
      if (await VideoLike.findOne({where: {videoId, userId, liked: true}})) {
        await VideoLike.destroy({where: {videoId, userId, liked: true}});
        await lVideo.decrement('likesCount', {by: 1});
        return false;
      }
      await VideoLike.create({videoId, userId, liked: true});
      await lVideo.increment('likesCount', {by: 1});
      return true;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async dislike(videoId, userId) {
    try {
      const dlVideo = await VideoInfo.findOne({where: {videoId}});
      if (!dlVideo) throw ApiError.NotFound(`Видео с id ${videoId} не найден`);
      if (await VideoLike.findOne({where: {videoId, userId, liked: true}})) {
        await VideoLike.update({liked: false}, {where: {videoId, userId, liked: true}});
        await dlVideo.increment('dislikesCount', {by: 1});
        await dlVideo.decrement('likesCount', {by: 1});
        return true;
      }
      if (await VideoLike.findOne({where: {videoId, userId, liked: false}})) {
        await VideoLike.destroy({where: {videoId, userId, liked: false}});
        await dlVideo.decrement('dislikesCount', {by: 1});
        return false;
      }
      await VideoLike.create({videoId, userId, liked: false});
      await dlVideo.increment('dislikesCount', {by: 1});
      return true;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async likesCount(videoId) {
    try {
      return await VideoLike.count({where: {videoId, liked: true}});
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async dislikesCount(videoId) {
    try {
      return await VideoLike.count({where: {videoId, liked: false}});
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async gradeLikeDislikeOfVideoByUserId(videoId, userId) {
    if (!userId) return '';
    const video = await VideoLike.findOne({where: {videoId, userId}});
    if (!video) return '';
    if (video.toJSON().liked) return 'like';
    return 'dislike';
  }

  async checkVideoById(id) {
    try {
      return !!(await Video.findOne({where: {id}}));
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getIdListsOfAllVideo() {
    try {
      const videoIdList = await VideoInfo.findAll({attributes: ['idList']});
      if (!videoIdList) return [];
      return videoIdList.map(videoId => videoId.toJSON().idList);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async createVideoHistory(userId, videoId) {
    try {
      if (await VideoHistory.findOne({where: {userId, videoId}})) {
        return (await VideoHistory.update({updatedTimestamp: Date.now()}, {where: {userId, videoId}}));
      }
      return !!(await VideoHistory.create({userId, videoId, updatedTimestamp: Date.now()}));
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async findVideoHistoryByUserId(userId) {
    try {
      const fVideoHistoryByUserId = await VideoHistory.findAll({
        where: {userId},
        order: [['updatedTimestamp','DESC']],
        attributes: ['videoId']
      });
      if (fVideoHistoryByUserId) return (fVideoHistoryByUserId).map(value => value.toJSON().videoId);
      return null;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getSortVideoIdListByChannelId(channelId) {
    try {
      const videos = await Video.findAll({
        where: {channelId},
        attributes: {exclude: ['id', 'title', 'channelId', 'playListId']},
        include: [{
          model: VideoInfo,
          attributes: ['idList'],
        }],
        order: [[{model: VideoInfo} , 'createTimestamp', 'DESC']],
      });
      if (!videos) return null;
      return videos.map(video => { return {idList: video.toJSON().VideoInfo.idList}});
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async getLikesListByUserId(userId) {
    try {
      const videoList = await VideoLike.findAll({where: {userId}});
      if (!videoList) return null;
      return (videoList).map(value => value.toJSON().videoId);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }


  async getVideoIdListByVideoId(listOfVideosId) {
    try {
      const videosList = await VideoInfo.findAll({where: {videoId: listOfVideosId}, attributes: ['idList']});
      if (!videosList) throw ApiError.InternalServerError('Внутренняя ошибка сервера');
      return videosList.map(video => video.toJSON().idList);
  } catch (e) {
      console.log(e.message);
      throw e;
    }
  }
}

export const videoQueries = new VideoQueries();
