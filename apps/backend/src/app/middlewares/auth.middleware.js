import { jwt } from 'jsonwebtoken';
import dotenv from 'dotenv';

import { ApiError } from '../errors/apiError.js'

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(ApiError.UnAuthorization());
    }

    const accessToken = authorization.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnAuthorization());
    }

    const userProperties = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    if (!userProperties) {
      return next(ApiError.UnAuthorization());
    }

    // const userFromDB = await функцияДляПолученияЮзераИзБазыПоIdИEmail(userProperty.id, userProperty.email);
    // if (!userFormDB) {
    //   return next(ApiError.UnAuthorization());
    // }

    next();
  } catch (e) {
    next(ApiError.UnAuthorization());
  }
}
