import { body, param } from 'express-validator';

import { NOT_EXISTS, NOT_INT, NOT_STRING } from '../util/validationMessages';
import { Validation } from './validation';

class VideoValidation extends Validation {
  checkName;
  checkPlaylistId;
  constructor() {
    super();

    this.create.push(body('category').optional().isString().withMessage(NOT_STRING));

    this.edit.push(body('updatingObject.category').optional().isString().withMessage(NOT_STRING));
    this.edit.push(body('updatingObject.playlistId').optional().isNumeric().withMessage(NOT_INT));

    this.checkName = [ param('hash_name').exists().withMessage(NOT_EXISTS) ];

    this.checkPlaylistId = [ param('playlist_id').exists().withMessage(NOT_EXISTS) ];
  }
}

export default new VideoValidation();
