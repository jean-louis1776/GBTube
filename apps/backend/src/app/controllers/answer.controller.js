import { validateError } from "../errors/validateError";
import AnswerService from "../services/answer.service";

class AnswerController {

  async create(req, res, next) {
    try {
      validateError(req);

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
