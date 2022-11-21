import { body, param } from 'express-validator';

import { ChannelValidation } from './channel.validation';
import {
  NOT_EXISTS,
  NOT_EXISTS_OR_EMPTY,
  NOT_ID_LIST,
  NOT_STRING,
  REG_EXP_FOR_ID_LIST
} from './txtErrors';

class PlaylistValidation extends ChannelValidation {
  edit;
  checkChannel_id;
  constructor() {
    super();

    this.edit = [
      body('updatingPlaylist.title').optional().isString().withMessage(NOT_STRING),
      body('uodatingPlaylist.description').optional().isString().withMessage(NOT_STRING),
      body('idList').exists({ checkFalsy: true }).withMessage(NOT_EXISTS_OR_EMPTY).isString().withMessage(NOT_STRING)
        .matches(REG_EXP_FOR_ID_LIST).withMessage(NOT_ID_LIST)
    ];

    this.checkChannel_id = [param('channel_id').exists().withMessage(NOT_EXISTS)];
  }
}

export default new PlaylistValidation();
