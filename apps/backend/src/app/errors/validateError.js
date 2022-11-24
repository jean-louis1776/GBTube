/* eslint-disable no-useless-catch */
import { validationResult } from 'express-validator';

import { ApiError } from './apiError';

export const validateError = (req) => {
  try {
    const errors = validationResult(req);
    if (errors.isEmpty()) return;
    throw ApiError.BadRequest(errors.errors.map(error => `Параметр ${error.param} ${error.msg}`));
  } catch (e) {
    throw e;
  }
}
