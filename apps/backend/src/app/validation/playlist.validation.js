import { param } from 'express-validator';

import { Validation } from './validation';
import { NOT_DIGIT, NOT_EXISTS, REG_EXP_FOR_DIGITS } from '../util/validationMessages';

class PlaylistValidation extends Validation {
  checkChannel_id;
  constructor() {
    super();

    this.checkChannel_id = [ param('channel_id').exists().withMessage(NOT_EXISTS).matches(REG_EXP_FOR_DIGITS).withMessage(NOT_DIGIT) ];
  }
}

export default new PlaylistValidation();
