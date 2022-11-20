import { body, cookie, param, query } from 'express-validator';

import {
  NOT_STRING,
  NOT_EXISTS_OR_EMPTY,
  NOT_EMAIL,
  NOT_EXISTS,
  EMPTY,
  NOT_DATE,
  NOT_INT
} from './txtErrors';

class UserValidator {
  create;
  login;
  logout;
  checkId;
  edit;
  changePassword;
  chechLink;
  refresh;
  checkUnique;
  constructor() {
    this.create = [
      body('nickName').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING),
      body('email').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isEmail().withMessage(NOT_EMAIL),
      body('password').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING)
    ];

    this.login = [
      body('email').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isEmail().withMessage(NOT_EMAIL),
      body('password').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING)
    ];

    this.logout = [ cookie('refreshTokenId').exists({ checkFalsy: true }).withMessage(`в cookie ${NOT_EXISTS_OR_EMPTY}`) ];

    this.checkId = [ param('id').exists().withMessage(NOT_EXISTS) ];

    this.edit = [
      param('id').exists().withMessage(NOT_EXISTS),
      body('updatingUser.nickName').optional().notEmpty().withMessage(EMPTY).isString().withMessage(NOT_STRING),
      body('updatingUser.email').optional().notEmpty().withMessage(EMPTY).isEmail().withMessage(NOT_EMAIL),
      body('updatingUser.firstName').optional().isString().withMessage(NOT_STRING),
      body('updatingUser.lastName').optional().isString().withMessage(NOT_STRING),
      body('updatingUser.birthDate').optional().isISO8601().withMessage(NOT_DATE)
    ];

    this.changePassword = [
      body('id').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isNumeric().withMessage(NOT_INT),
      body('oldPassword').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING),
      body('newPassword').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING)
    ];

    this.chechLink = [ param('link').exists().withMessage(NOT_EXISTS) ];

    this.refresh = [
      cookie('refreshTokenId').exists({ checkFalsy: true }).withMessage(`в cookie ${NOT_EXISTS_OR_EMPTY}`),
      cookie('refreshToken').exists({ checkFalsy: true }).withMessage(`в cookie ${NOT_EXISTS_OR_EMPTY}`)
    ];

    this.checkUnique = [
      query('nickName').optional().notEmpty().withMessage(EMPTY),
      query('email').optional().notEmpty().withMessage(EMPTY).isEmail().withMessage(NOT_EMAIL)
    ];
  }
}

export default new UserValidator();
