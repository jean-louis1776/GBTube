import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { tokenQueries } from '../queries/TokenQueries.js';

dotenv.config();

class TokenService {
  async createNewTokens (user, refreshTokenId) {
    const tokens = this.generateTokens(user);
    refreshTokenId = await this.saveRefreshTokenToDB(user.id, tokens.refreshToken, refreshTokenId);
    return { ...tokens, refreshTokenId, id: user.id, nickName: user.nickName, role: user.role };
  }

  generateTokens(payload) {
    return {
      accessToken: jwt.sign(payload, process.env.ACCESS_KEY, {expiresIn: `${process.env.ACCESS_LIVE_IN_MINUTES}m`}),
      refreshToken: jwt.sign(payload, process.env.REFRESH_KEY, {expiresIn: `${process.env.REFRESH_LIVE_IN_DAYS}d`})
    };
  }

  async saveRefreshTokenToDB (userId, refreshToken, refreshTokenId) {
    try {
      if (refreshTokenId === undefined) refreshTokenId = (await tokenQueries.createToken(refreshToken, userId)).id;
      else await tokenQueries.updateToken(refreshTokenId, refreshToken);
      return refreshTokenId;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
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
