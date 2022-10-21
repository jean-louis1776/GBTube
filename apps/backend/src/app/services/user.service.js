import bcrypt from 'bcrypt';

import { ApiError } from '../errors/apiError.js';
import tokenService from './token.service.js';
import { userModel, userInfoModel, tokenModel } from '../../stub.js';     //! Это заглушка, ждем БД

class UserService {
  async getAll() {
    return userModel.findAll();
  }

  async registration(nickName, email, password, role) {
    //const candidate = await userModel.findOne({ where: { nickName } });
    const candidate = userModel.findOneByName(nickName);      //! TMP
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с именем ${nickName} уже существует`);
    }
    password = await bcrypt.hash(password, 5);
    //newUser = await userModel.create(nickName, email, password, role);
    const newUser = userModel.create(nickName);      //! TMP
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
    const isEqual = await bcrypt.compare(password, newUserInfo.password);
    if (!isEqual) {
      throw ApiError.BadRequest('Неправильный пароль');
    }
    return await tokenService.createNewTokens({ ...newUser, email: newUserInfo.email, role: newUserInfo.role });
  }

  async logout(refreshTokenId) {
    //const index = await tokenModel.destroy({ where: { id: refreshTokenId } });
    const index = tokenModel.destroy(refreshTokenId);             //! TMP
    return !!index;
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

  async remove(id) {
    //TODO Удалить все Answers написанные User'ом
    //TODO Удалить все Comments написанные User'ом
    //TODO Удалить все подписки сделанные User'ом
    //TODO Удалить таблицу лайков-дизлайков для каждого Answers, относящиеся к Comments, относящиеся к Videos, относящиеся к Channels, относящиеся к Users
    //TODO Удалить все Answers, относящиеся к Comments, относящиеся к Videos, относящиеся к Channels, относящиеся к Users
    //TODO Удалить таблицу лайков-дизлайков для каждого Comments, относящиеся к Videos, относящиеся к Channels, относящиеся к Users
    //TODO Удалить все Comments, относящиеся к Videos, относящиеся к Channels, относящиеся к Users
    //TODO Удалить все Videos, относящиеся к Channels, относящиеся к Users
    //TODO Удалить все подписки, относящиеся к Channels, относящиеся к Users
    //TODO Удалить все Channels, относящиеся к Users
    //TODO Удалить все Tokens, относящиеся к Users
    tokenModel.deleteAllByUserId(id);
    //TODO Удалить UserInfo, относящееся к Users
    userInfoModel.delete(id);
    //TODO Удалить Users
    userModel.delete(id);
  }
}

export default new UserService();
