import { Comment } from '../models/Comment';
import { CommentLike } from '../models/CommentLike';
import { ApiError } from "../errors/apiError";


class CommentQueries {

  async createComment(userId, videoId, textInfo) {
    try {
      const cComment = (await Comment.create({userId, videoId, textInfo})).toJSON();
      if (cComment) return cComment.id;
      throw ApiError.BadRequest(`Комментарий не создан`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async updateComment(id, textInfo) {
    try {
      return !!(await Comment.update({textInfo}, {where: {id}}));
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async deleteComment(id) {
    try {
      return !!(await Comment.destroy({where: {id}}));
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getCommentById(id) {
    try {
      const gCommentById = await Comment.findOne({where: {id}, include: {exclude: ['updateTimestamp']}}).toJSON();
      if (gCommentById) return gCommentById;
      throw ApiError.BadRequest(`Комментарий по Id не найден`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAllCommentsVideo(videoId) {
    try {
      const gAllCommentsVideo = Comment.findAll({where: {videoId}, include: {exclude: ['updateTimestamp']}});
      if (gAllCommentsVideo) {
        return (await gAllCommentsVideo).map(value => value.toJSON());
      }
      throw ApiError.BadRequest(`Комментарии к видео не найдены`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async like(commentId, userId) {
    try {
      const lComment = await Comment.findOne({where: {commentId}});
      if (await CommentLike.findOne({where: {commentId, userId, liked: false}})) {
        await CommentLike.update({liked: true}, {where: {commentId, userId, liked: false}});
        await lComment.increment('likesCount', {by: 1});
        return true;
      }
      if (await CommentLike.findOne({where: {commentId, userId, liked: true}})) {
        await CommentLike.destroy({where: {commentId, userId, liked: true}});
        await lComment.decrement('likesCount', {by: 1});
        return false;
      }
      await CommentLike.create({where: {commentId, userId, liked: true}});
      await lComment.increment('likesCount', {by: 1});
      return true;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async dislike(commentId, userId) {
    try {
      const dlComment = await Comment.findOne({where: {commentId}});
      if (await CommentLike.findOne({where: {commentId, userId, liked: true}})) {
        await CommentLike.update({liked: false}, {where: {commentId, userId, liked: true}});
        await dlComment.increment('dislikesCount', {by: 1});
        return true;
      }
      if (await CommentLike.findOne({where: {commentId, userId, liked: false}})) {
        await CommentLike.destroy({where: {commentId, userId, liked: false}});
        await dlComment.decrement('dislikesCount', {by: 1});
        return false;
      }
      await CommentLike.create({where: {commentId, userId, liked: false}});
      await dlComment.increment('dislikesCount', {by: 1});
      return true;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async likesCount(commentId) {
    try {
      const lCount = await CommentLike.count({where: {commentId, liked: true}});
      if (lCount) return lCount;
      throw ApiError.BadRequest(`Лайки отсутствуют`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async dislikesCount(commentId) {
    try {
      const dislikesCount = await CommentLike.count({where: {commentId, liked: false}});
      if (dislikesCount) return dislikesCount;
      throw ApiError.BadRequest(`Дизайки отсутствуют`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }
}

export const commentQueries = new CommentQueries();
