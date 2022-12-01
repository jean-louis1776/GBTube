import { validateError } from "../errors/validateError";
import AnswerService from "../services/answer.service";

class AnswerController {

  async create(req, res, next) {
    try {
      validateError(req);
      const {userId, description, idList} = req.body;
      const commentId = idList.split('_')[4];
      return res.status(201).json(await AnswerService.create(idList, commentId, userId, description));
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      validateError(req);
      const {description, idList} = req.body;
      const answerId = idList.split('_')[5];
      return res.json(await AnswerService.edit(answerId, description));
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      validateError(req);
      return res.status(204).json(await AnswerService.remove(req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      validateError(req);
      return res.json(await AnswerService.getOne(req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getAllAnswerOfComment(req, res, next) {
    try {
      // validateError(req);
      return res.json(await AnswerService.getAllAnswerOfComment(req.params.commentId));
    } catch (e) {
      next(e);
    }
  }

  async like(req, res, next) {
    try {
      // validateError(req);
      const {answerId, userId} = req.body;
      return res.json(await AnswerService.like(answerId, userId));
    } catch (e) {
      next(e);
    }
  }

  async dislike(req, res, next) {
    try {
      // validateError(req);
      const {answerId, userId} = req.body;
      return res.json(await AnswerService.dislike(answerId, userId));
    } catch (e) {
      next(e);
    }
  }

}

export default new AnswerController();
