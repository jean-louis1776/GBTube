import { param } from 'express-validator';

import { Validation } from './validation';
import { NOT_EXISTS } from '../util/validationMessages';

class PlaylistValidation extends Validation {
  checkChannel_id;
  constructor() {
    super();

    this.checkChannel_id = [param('channel_id').exists().withMessage(NOT_EXISTS)];
  }
}

export default new PlaylistValidation();
