import bcrypt from 'bcrypt';

import { ApiError } from '../errors/apiError.js';
import tokenService from './token.service.js';
import { userModel, tokenModel } from '../../stub.js';     //! Это заглушка, ждем БД

class UserService {
  async registration(name, email, password, role = 'user') {
    let newUser = await userModel.findOne({ where: { name } });
    if (newUser) {
      throw ApiError.BadRequest(`Пользователь с именем ${name} уже существует`);
    }
    password = await bcrypt.hash(password, 5);
    newUser = await userModel.create(name, email, password, role);
    return await tokenService.createNewTokens(newUser);
  }

  async login(name, password) {
    let newUser = await userModel.findOne({ where: { name } });
    if (!newUser) {
      throw ApiError.BadRequest(`Пользователя с именем ${name} не существует`);
    }
    const isEqual = await bcrypt.compare(password, newUser.password);
    if (!isEqual) {
      throw ApiError.BadRequest('Неправильный пароль');
    }
    return await tokenService.createNewTokens(newUser);
  }

  async logout(refreshTokenId) {
    await tokenModel.destroy({ where: { id: refreshTokenId } });
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnAuthorization();
    }

    const user = tokenService.validateToken(refreshToken, true);
    const refreshTokenFromDB = await tokenModel.findOne({ where: { token: refreshToken } });
    if (!user || !refreshTokenFromDB) {
      throw ApiError.UnAuthorization();
    }

    return await tokenService.createNewTokens(user, refreshTokenFromDB.id);
  }
}

export default new UserService();
