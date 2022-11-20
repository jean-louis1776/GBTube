import { ApiError } from '../errors/apiError.js';
import tokenService from '../services/token.service.js';
import { userQueries } from '../queries/UserQueries.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(ApiError.httpForbidden());
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.httpForbidden());
    }

    const userProperties = tokenService.validateToken(accessToken, false);
    if (!userProperties) {
      return next(ApiError.httpForbidden());
    }

    const userFromDB = userQueries.findOneById(userProperties.id);
    if (!userFromDB) {
      return next(ApiError.httpForbidden());
    }

    next();
  } catch (e) {
    next(ApiError.httpForbidden());
  }
}
