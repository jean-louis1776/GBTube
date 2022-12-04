import { body, param } from 'express-validator';
import { Validation } from "./validation";
import { NOT_DIGIT, NOT_EXISTS, NOT_INT, REG_EXP_FOR_PARAMS_ID } from "../util/validationMessages";

export class AnswerValidation extends Validation {
  getAllAnswerComment;
  constructor() {
    super();
    this.create.shift();
    this.create.push(body('userId').optional().isNumeric().withMessage(NOT_INT));

    this.edit.shift();
    //??? что то не то наверное ) ??????
    // this.getAllAnswerComment = [param('commentId').exists({checkFalsy: true}).isString().withMessage(NOT_EXISTS)];
    this.getAllAnswerComment = [ param('commentId').exists().withMessage(NOT_EXISTS).matches(REG_EXP_FOR_PARAMS_ID).withMessage(NOT_DIGIT) ];
  }
}

export default new AnswerValidation();
