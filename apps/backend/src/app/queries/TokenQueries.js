import { ApiError } from '../errors/apiError';
import { Token } from '../models/Tokens';

class TokenQueries {
  /**
   * Запись токена пользователя
   * @param {number} userId - id пользователя
   * @param {string} token - token пользователя
   * @returns {Object}
   */
  async createToken(token, userId) {
    try {
      return (await Token.create({token, userId})).dataValues;
    } catch (e) {
      return ApiError.InternalServerError('Не удалось создать токен');
    }
  }

  async updateToken(id, token) {
    return await Token.update({token}, {where: {id}});
  }

  async removeToken(id) {
    try {
      return !!(await Token.destroy({where: {id}}));
    } catch (e) {
      return false;
    }
  }

  async findByToken(token) {
    try {
      const result = await Token.findOne({where: {token}});
      return result?.dataValues;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }
}

export const tokenQueries = new TokenQueries();
