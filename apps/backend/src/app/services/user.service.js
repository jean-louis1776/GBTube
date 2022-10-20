import bcrypt from 'bcrypt';

import { ApiError } from '../errors/apiError.js';
import tokenService from './token.service.js';
import { userModel, userInfoModel, tokenModel } from '../../stub.js';     //! Это заглушка, ждем БД

class UserService {
  async registration(nickName, email, password, role) {
    //const candidate = await userModel.findOne({ where: { nickName } });
    const candidate = userModel.findOneByName(nickName);      //! TMP
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с именем ${nickName} уже существует`);
    }
    password = await bcrypt.hash(password, 5);
    //newUser = await userModel.create(nickName, email, password, role);
    const newUser = userModel.create(nickName);      //! TMP
    console.log(newUser);
    userInfoModel.create(newUser.id, email, password, role);      //! TMP
    return await tokenService.createNewTokens({ ...newUser, email, role });
  }

  async login(nickName, password) {
    //const newUser = await userModel.findOne({ where: { name } });
    const newUser = userModel.findOneByName(nickName);             //! TMP
    if (!newUser) {
      throw ApiError.BadRequest(`Пользователя с именем ${nickName} не существует`);
    }
    const newUserInfo = userInfoModel.findOneById(newUser.id);
    console.log('password = ', password);
    console.log('newUserInfo = ', newUserInfo);
    const isEqual = await bcrypt.compare(password, newUserInfo.password);
    if (!isEqual) {
      throw ApiError.BadRequest('Неправильный пароль');
    }
    return await tokenService.createNewTokens({ ...newUser, email: newUserInfo.email, role: newUserInfo.role });
  }

  async logout(refreshTokenId) {
    //await tokenModel.destroy({ where: { id: refreshTokenId } });
    tokenModel.destroy(refreshTokenId);             //! TMP
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnAuthorization();
    }

    const user = tokenService.validateToken(refreshToken, true);
    // const refreshTokenFromDB = await tokenModel.findOne({ where: { token: refreshToken } });
    const refreshTokenFromDB = tokenModel.findOneByToken(refreshToken);      //!TMP
    if (!user || !refreshTokenFromDB) {
      throw ApiError.UnAuthorization();
    }

    return await tokenService.createNewTokens(user, refreshTokenFromDB.id);
  }
}

export default new UserService();
