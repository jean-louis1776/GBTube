import { validateError } from "../errors/validateError";
import CommentService from "../services/comment.service";

class CommentController {

  async create(req, res, next) {
    try {
      validateError(req);
      const {userId, description, idList} = req.body;
      return res.status(201).json(await CommentService.create(idList, userId, description));
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      validateError(req);
      const {description, idList} = req.body;

      return res.json(await CommentService.edit(idList, description));
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      validateError(req);
      return res.status(204).json(await CommentService.remove(req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    try {
      validateError(req);
      return res.json(await CommentService.getOne(req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getAllCommentsVideo(req, res, next) {
    try {
      validateError(req);
      return res.json(await CommentService.getAllCommentsVideo(req.params.videoId));
    } catch (e) {
      next(e);
    }
  }

  async like(req, res, next) {
    try {
      validateError(req);
      const {commentId, userId} = req.body;
      return res.json(await CommentService.like(commentId, userId));
    } catch (e) {
      next(e);
    }
  }

  async dislike(req, res, next) {
    try {
      validateError(req);
      const {commentId, userId} = req.body;
      return res.json(await CommentService.dislike(commentId, userId));
    } catch (e) {
      next(e);
    }
  }


}

export default new CommentController();
