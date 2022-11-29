import { validateError } from "../errors/validateError";
import AnswerService from "../services/answer.service";
import channelService from "../services/channel.service";
import { answerQueries } from "../queries/AnswerQueries";

class AnswerController {

  async create(req, res, next) {
    try {
      validateError(req);
      const { userId, description, idList } = req.body;
      const commentId = idList.split('_')[4]
      return res.status(201).json(await AnswerService.create(idList, commentId, userId, description));
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      validateError(req);

    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      validateError(req);

    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      validateError(req);

    } catch (e) {
      next(e);
    }
  }

  async getAllAnswerOfComment(req, res, next) {
    try {
      validateError(req);

    } catch (e) {
      next(e);
    }
  }

  async like(req, res, next) {
    try {
      validateError(req);

    } catch (e) {
      next(e);
    }
  }

  async dislike(req, res, next) {
    try {
      validateError(req);

    } catch (e) {
      next(e);
    }
  }

}

export default new AnswerController();
