import { Answer } from "../models/Answer";
import { ApiError } from "../errors/apiError";
import { AnswerLike } from "../models/AnswerLike";

class AnswerQueries {


  async createAnswer(idList, commentId, userId, description) {
    try {
      const cAnswer = (await Answer.create({idList, commentId, userId, description})).toJSON();
      if (cAnswer) return cAnswer.id;
      throw ApiError.BadRequest(`Ответ не создан`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async updateAnswer(id, description) {
    try {
      return !!(await Answer.update({description}, {where: {id}}));
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async deleteAnswer(id) {
    try {
      const dAnswer = await Answer.destroy({where: {id}});
      if (!dAnswer) throw ApiError.NotFound(`Ответа с id ${id} не существует`);
      return !!(dAnswer);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAnswerById(id) {
    try {
      const gAnswerById = await Answer.findOne({where: {id}, attributes: {exclude: ['updateTimestamp']}});
      if (gAnswerById) return gAnswerById.toJSON();
      throw ApiError.BadRequest(`Ответ по Id не найден`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAllAnswerComment(commentId) {
    try {
      const gAllAnswerComment = Answer.findAll({where: {commentId}, attributes: {exclude: ['updateTimestamp']}});
      if (gAllAnswerComment) {
        return (await gAllAnswerComment).map(value => value.toJSON());
      }
      throw ApiError.NotFound(`Ответа с id ${commentId} не существует`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async like(answerId, userId) {
    try {
      const lAnswer = await Answer.findOne({where: {id: answerId}});
      if (!lAnswer) throw ApiError.NotFound(`Ответ с id ${answerId} не найден`);
      if (await AnswerLike.findOne({where: {answerId, userId, liked: false}})) {
        await AnswerLike.update({liked: true}, {where: {answerId, userId, liked: false}});
        await lAnswer.increment('likesCount', {by: 1});
        await lAnswer.decrement('dislikesCount', {by: 1});
        return true;
      }
      if (await AnswerLike.findOne({where: {answerId, userId, liked: true}})) {
        await AnswerLike.destroy({where: {answerId, userId, liked: true}});
        await lAnswer.decrement('likesCount', {by: 1});
        return false;
      }
      await AnswerLike.create({answerId, userId, liked: true});
      await lAnswer.increment('likesCount', {by: 1});
      return true;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async dislike(answerId, userId) {
    try {
      const dlAnswer = await Answer.findOne({where: {id: answerId}});
      if (await AnswerLike.findOne({where: {answerId, userId, liked: true}})) {
        await AnswerLike.update({liked: false}, {where: {answerId, userId, liked: true}});
        await dlAnswer.increment('dislikesCount', {by: 1});
        await dlAnswer.decrement('likesCount', {by: 1});
        return true;
      }
      if (await AnswerLike.findOne({where: {answerId, userId, liked: false}})) {
        await AnswerLike.destroy({where: {answerId, userId, liked: false}});
        await dlAnswer.decrement('dislikesCount', {by: 1});
        return false;
      }
      await AnswerLike.create({answerId, userId, liked: false});
      await dlAnswer.increment('dislikesCount', {by: 1});
      return true;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async likesCount(answerId) {
    try {
      const lCount = await AnswerLike.count({where: {answerId, liked: true}});
      if (lCount) return lCount;
      throw ApiError.BadRequest(`Лайки отсутствуют`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async dislikesCount(answerId) {
    try {
      const dislikesCount = await AnswerLike.count({where: {answerId, liked: false}});
      if (dislikesCount) return dislikesCount;
      throw ApiError.BadRequest(`Дизайки отсутствуют`);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }
}

export const answerQueries = new AnswerQueries();
