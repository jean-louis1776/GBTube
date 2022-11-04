import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { tokenModel } from '../../stub.js';     //! Это заглушка, ждем БД

dotenv.config();

class TokenService {
  async createNewTokens (user, refreshTokenId) {
    const tokens = this.generateTokens(user);
    refreshTokenId = await this.saveRefreshTokenToDB(user.id, tokens.refreshToken, refreshTokenId);
    return { ...tokens, refreshTokenId };
  }

  generateTokens(user) {
    const payload = {
      id: user.id,
      nickName: user.nickName,
      email: user.email,
      role: user.role
    }
    return {
      accessToken: jwt.sign(payload, process.env.ACCESS_KEY, {expiresIn: `${process.env.ACCESS_LIVE_IN_MINUTES}m`}),
      refreshToken: jwt.sign(payload, process.env.REFRESH_KEY, {expiresIn: `${process.env.REFRESH_LIVE_IN_DAYS}d`})
    };
  }

  async saveRefreshTokenToDB (userId, refreshToken, refreshTokenId) {
  // if (refreshTokenId === undefined) refreshTokenId = (await tokenModel.create({ userId, token: refreshToken })).id;
  // else await tokenModel.update(
  //   { token: refreshToken },
  //   { where: { id: refreshTokenId }}
  // );
    if (refreshTokenId === undefined) refreshTokenId = (tokenModel.create(userId, refreshToken)).id;
    else tokenModel.update(refreshToken, refreshTokenId);
    return refreshTokenId;
  }

  validateToken (token, isRefresh) {
    try {
      return jwt.verify(token, isRefresh ? process.env.REFRESH_KEY : process.env.ACCESS_KEY);
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
