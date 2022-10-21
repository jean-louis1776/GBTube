import { ApiError } from '../errors/apiError.js';
import { userModel } from '../../stub.js';
import tokenService from '../services/token.service.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(ApiError.UnAuthorization());
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnAuthorization());
    }

    const userProperties = tokenService.validateToken(accessToken, false);
    if (!userProperties) {
      return next(ApiError.UnAuthorization());
    }

    // const userFormDB = await userModel.findOne({ where: { id: userProperties.id } });    //! TMP
    const userFromDB = userModel.findOneById(userProperties.id);
    if (!userFromDB) {
      return next(ApiError.UnAuthorization());
    }

    next();
  } catch (e) {
    next(ApiError.UnAuthorization());
  }
}
