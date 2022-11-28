import { param } from 'express-validator';

import { NOT_EXISTS } from '../util/validationMessages';
import { Validation } from './validation';

export class ChannelValidation extends Validation {
  checkUser_id;
  constructor() {
    super();

    this.checkUser_id = [ param('user_id').exists().withMessage(NOT_EXISTS) ];
  }
}

export default new ChannelValidation();
