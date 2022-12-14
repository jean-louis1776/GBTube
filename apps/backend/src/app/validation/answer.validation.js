import { body, param, query } from 'express-validator';
import { Validation } from "./validation";
import { NOT_DIGIT, NOT_EXISTS, NOT_EXISTS_OR_EMPTY, NOT_INT, REG_EXP_FOR_DIGITS } from "../util/validationMessages";

export class AnswerValidation extends Validation {
  getAllAnswerComment;

  constructor() {
    super();
    this.create.shift();
    this.create.push(body('userId').optional().isNumeric().withMessage(NOT_INT));

    this.edit.shift();
    this.getAllAnswerComment = [query('comment_id').exists().withMessage(NOT_EXISTS).matches(REG_EXP_FOR_DIGITS).withMessage(NOT_DIGIT),
      query('user_id').exists().withMessage(NOT_EXISTS).matches(REG_EXP_FOR_DIGITS).withMessage(NOT_DIGIT)];

    this.subscribeOrLike = [
      body('answerId').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isNumeric().withMessage(NOT_INT),
      body('userId').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isNumeric().withMessage(NOT_INT)
    ]
  }
}

export default new AnswerValidation();
