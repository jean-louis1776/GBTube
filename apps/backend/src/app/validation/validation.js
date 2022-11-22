import { body, param } from 'express-validator';

import {
  NOT_EXISTS,
  NOT_EXISTS_OR_EMPTY,
  NOT_ID_LIST,
  NOT_INT,
  NOT_STRING,
  REG_EXP_FOR_ID_LIST
} from '../util/validationMessages';

export class Validation {
  create;
  edit;
  checkId;
  subscribeOrLike;
  constructor() {
    this.create = [
      body('title').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING),
      body('description').optional().isString().withMessage(NOT_STRING),
      body('idList').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING)
        .matches(REG_EXP_FOR_ID_LIST).withMessage(NOT_ID_LIST)
    ];

    this.edit = [
      body('updatingObject.title').optional().isString().withMessage(NOT_STRING),
      body('uodatingObject.description').optional().isString().withMessage(NOT_STRING),
      body('idList').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING)
        .matches(REG_EXP_FOR_ID_LIST).withMessage(NOT_ID_LIST)
    ];

    this.checkId = [ param('id').exists().withMessage(NOT_EXISTS) ];

    this.subscribeOrLike = [
      body('id').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isNumeric().withMessage(NOT_INT),
      body('userId').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isNumeric().withMessage(NOT_INT)
    ];
  }
}
