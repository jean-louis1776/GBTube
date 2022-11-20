import { body } from 'express-validator';

import {
  NOT_EXISTS_OR_EMPTY,
  NOT_ID_LIST,
  NOT_STRING
} from './txtErrors';

class ChannelValidation {
  create;
  constructor() {
    this.create = [
      body('title').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING),
      body('description').optional().isString().withMessage(NOT_STRING),
      body('idList').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING)
        .matches(/^((\d+_)*\d+)$/).withMessage(NOT_ID_LIST)
    ];
  }
}

export default new ChannelValidation();
