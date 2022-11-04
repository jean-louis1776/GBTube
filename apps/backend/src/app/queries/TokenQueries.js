import { Token } from "../models/Tokens";

class TokenQueries {
  /**
   * Запись токена пользователя
   * @param {number} userId - id пользователя
   * @param {string} token - token пользователя
   * @returns {Object}
   */
  async writeToken(userId, token) {
    return await Token.create({
      token: token,
      userId: userId,
    });
  }
}

export const tokenQueries = new TokenQueries();
