import { ApiError } from "../errors/apiError";
import { answerQueries } from '../queries/AnswerQueries';
import { commentQueries } from "../queries/CommentQueries";

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
      const gAnswerById = await answerQueries.getAnswerById(id);
      gAnswerById.nickName = gAnswerById.User.nickName;
      delete gAnswerById.User;
      return gAnswerById;
      return answerQueries.getAnswerById(id);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAllAnswerOfComment(query) {
    try {
      const {comment_id, user_id} = query;
      const getAllAnswerComment = await answerQueries.getAllAnswerComment(comment_id);
      await Promise.all(getAllAnswerComment.map(async (value) => {
        const isGrade = await answerQueries.getGrade(user_id, value.id);
        if (isGrade === true) value.grade = 'like';
        if (isGrade === false) value.grade = 'dislike';
        if (isGrade === undefined) value.grade = '';
        value.nickName = value.User.nickName;
        delete value.User;
        delete value.id;
      }));
      return getAllAnswerComment;
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

  async dislike(answerId, userId) {
    try {
      return answerQueries.dislike(answerId, userId);
    } catch (e) {
      throw e;
    }
  }

}

export default new AnswerService();
