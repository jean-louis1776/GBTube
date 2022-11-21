import { body, param } from 'express-validator';

import {
  NOT_EXISTS,
  NOT_EXISTS_OR_EMPTY,
  NOT_ID_LIST,
  NOT_INT,
  NOT_STRING,
  REG_EXP_FOR_ID_LIST
} from './txtErrors';

export class ChannelValidation {
  create;
  edit;
  checkId;
  checkUser_id;
  subscribe;
  constructor() {
    this.create = [
      body('title').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING),
      body('description').optional().isString().withMessage(NOT_STRING),
      body('idList').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING)
        .matches(REG_EXP_FOR_ID_LIST).withMessage(NOT_ID_LIST)
    ];

    this.edit = [
      body('updatingChannel.title').optional().isString().withMessage(NOT_STRING),
      body('uodatingChannel.description').optional().isString().withMessage(NOT_STRING),
      body('idList').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING)
        .matches(REG_EXP_FOR_ID_LIST).withMessage(NOT_ID_LIST)
    ];

    this.checkId = [param('id').exists().withMessage(NOT_EXISTS)];

    this.checkUser_id = [param('user_id').exists().withMessage(NOT_EXISTS)];

    this.subscribe = [
      body('id').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isNumeric().withMessage(NOT_INT),
      body('userId').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isNumeric().withMessage(NOT_INT)
    ]
  }
}

export default new ChannelValidation();
