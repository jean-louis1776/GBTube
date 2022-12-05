import { body, param } from 'express-validator';
import { Validation } from "./validation";
import { NOT_DIGIT, NOT_EXISTS, NOT_INT, REG_EXP_FOR_PARAMS_ID } from "../util/validationMessages";

export class CommentValidation extends Validation {
  getAllCommentsVideo;
  constructor() {
    super();
    this.create.shift();
    this.create.push(body('userId').optional().isNumeric().withMessage(NOT_INT));

    this.edit.shift();
    this.getAllCommentsVideo = [ param('videoId').exists().withMessage(NOT_EXISTS).matches(REG_EXP_FOR_PARAMS_ID).withMessage(NOT_DIGIT) ];
  }
}

export default new CommentValidation();
