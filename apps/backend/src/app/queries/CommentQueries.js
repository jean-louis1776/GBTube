import { Comment } from '../models/Comment';
import { CommentLike } from '../models/CommentLike';
import { ApiError } from "../errors/apiError";


class CommentQueries {

  async createComment(idList, videoId, userId, description) {
    try {
      const cComment = (await Comment.create({idList, videoId, userId, description})).toJSON();
      if (cComment) return cComment.id;
      throw ApiError.BadRequest(`Комментарий не создан`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async updateComment(id, description) {
    try {
      return !!(await Comment.update({description}, {where: {id}}));
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
      const gCommentById = await Comment.findOne({where: {id}, attributes: {exclude: ['updateTimestamp']}});
      if (gCommentById) return gCommentById.toJSON();
      throw ApiError.BadRequest(`Комментарий по Id не найден`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAllCommentsVideo(videoId) {
    try {
      const gAllCommentsVideo = Comment.findAll({where: {videoId}, attributes: {exclude: ['updateTimestamp']}});
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
      const lComment = await Comment.findOne({where: {id: commentId}});
      if (!lComment) throw ApiError.NotFound(`Ответ с id ${commentId} не найден`);
      if (await CommentLike.findOne({where: {commentId, userId, liked: false}})) {
        await CommentLike.update({liked: true}, {where: {commentId, userId, liked: false}});
        await lComment.increment('likesCount', {by: 1});
        await lComment.decrement('dislikesCount', {by: 1});
        return true;
      }
      if (await CommentLike.findOne({where: {commentId, userId, liked: true}})) {
        await CommentLike.destroy({where: {commentId, userId, liked: true}});
        await lComment.decrement('likesCount', {by: 1});
        return false;
      }
      await CommentLike.create( {commentId, userId, liked: true});
      await lComment.increment('likesCount', {by: 1});
      return true;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async dislike(commentId, userId) {
    try {
      const dlComment = await Comment.findOne({where: {id: commentId}});
      if (await CommentLike.findOne({where: {commentId, userId, liked: true}})) {
        await CommentLike.update({liked: false}, {where: {commentId, userId, liked: true}});
        await dlComment.increment('dislikesCount', {by: 1});
        await dlComment.decrement('likesCount', {by: 1});
        return true;
      }
      if (await CommentLike.findOne({where: {commentId, userId, liked: false}})) {
        await CommentLike.destroy({where: {commentId, userId, liked: false}});
        await dlComment.decrement('dislikesCount', {by: 1});
        return false;
      }
      await CommentLike.create( {commentId, userId, liked: false});
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
