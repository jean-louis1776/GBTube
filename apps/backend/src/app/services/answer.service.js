import { ApiError } from "../errors/apiError";
import { answerQueries } from '../queries/AnswerQueries';

class AnswerService {

  async create(idList, commentId, userId, description) {
    try {
      return answerQueries.createAnswer(idList, commentId, userId, description);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async edit(id, description) {
    try {
      return answerQueries.updateAnswer(id, description);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async remove(id) {
    try {
      return answerQueries.deleteAnswer(id);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getOne(id) {
    try {
      return answerQueries.getAnswerById(id);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAllAnswerOfComment(commentId) {
    try {
      return answerQueries.getAllAnswerComment(commentId);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async like(answerId, userId) {
    try {
      return answerQueries.like(answerId, userId);
    } catch (e) {
      throw e;
    }
  }

}

export default new AnswerService();
