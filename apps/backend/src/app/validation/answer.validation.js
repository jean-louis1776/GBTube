import { body, param } from 'express-validator';
import { Validation } from "./validation";
import { NOT_INT } from "../util/validationMessages";

export class AnswerValidation extends Validation {
constructor() {
  super();
  this.create.shift();
  this.create.push(body('userId').optional().isNumeric().withMessage(NOT_INT))

  this.edit.shift();


}
}

export default new AnswerValidation();
