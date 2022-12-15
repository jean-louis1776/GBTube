import { Validation } from './validation';
import { query } from "express-validator";
import { NOT_EXISTS, NOT_STRING } from "../util/validationMessages";

export class ChannelValidation extends Validation {
  constructor() {
    super();
    this.getOne = [
      query('channel_id').exists().withMessage(NOT_EXISTS).isString().withMessage(NOT_STRING),
      query('user_id').exists().withMessage(NOT_EXISTS).isString().withMessage(NOT_STRING)
    ];
  }
}

export default new ChannelValidation();
