import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { ApiError } from '../errors/apiError.js';
import tokenService from './token.service.js';
import { userModel, userInfoModel, tokenModel } from '../../stub.js';     //! Это заглушка, ждем БД
import mailService from './mail.service.js';
import { userQueries } from '../queries/UserQueries.js';

class UserService {
  async getAll() {
    return userModel.findAll();
  }

  async registration(nickName, email, password) {
    try {
      password = await bcrypt.hash(password, 5);
      const activateLink = uuidV4();

      const newUserId = await userQueries.create(nickName, email, password, activateLink);
      const tokenObject =  await tokenService.createNewTokens({ id: newUserId, nickName, email, role: 'user' });
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activateLink}`);
      return { id: newUserId, ...tokenObject };
    } catch (e) {
      return e;
    }
  }

  async login(email, password) {
    try {
      const newUser = userQueries.findOneByEmail(email);
      if (!newUser) {
        throw ApiError.BadRequest(`Пользователя с email ${email} не существует`);
      }
      const isEqual = await bcrypt.compare(password, newUser.password);
      if (!isEqual) {
        throw ApiError.BadRequest('Неправильный пароль');
      }
      const tokenObject = await tokenService.createNewTokens({
        id: newUser.id,
        nickName: newUser.nickName,
        email: newUser.email,
        role: newUser.role
      });
      return { ...newUser, ... tokenObject };
    } catch (e) {
      return e;
    }
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

  async activate(link) {
    const user = userInfoModel.findOneByActivateLink(link);
    if (!user) {
      throw ApiError.BadRequest('Пользователь не найден');
    }
    user.isActivated = true;
    const updatedUser = userInfoModel.update(user.userId, user);
    if (!updatedUser) throw ApiError.BadRequest(`Пользователь не сохранен`);
    return updatedUser;
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
