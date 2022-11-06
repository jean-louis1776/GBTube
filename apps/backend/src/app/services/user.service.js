import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';

import { ApiError } from '../errors/apiError.js';
import tokenService from './token.service.js';
import mailService from './mail.service.js';
import { userQueries } from '../queries/UserQueries.js';
import { tokenQueries } from '../queries/TokenQueries.js';

class UserService {
  async getAll() {
    return userQueries.findAllUsers();
  }

  async registration(nickName, email, password) {
    try {
      password = await bcrypt.hash(password, 5);
      const activateLink = uuidV4();

      const newUserId = await userQueries.createUser(nickName, email, password, activateLink);
      const tokenObject =  await tokenService.createNewTokens({ id: newUserId, nickName, email, role: 'user' });
      await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activateLink}`);
      return { id: newUserId, ...tokenObject };
    } catch (e) {
      return e;
    }
  }

  async login(email, password) {
    try {
      const newUser = await userQueries.findOneByEmail(email);
      if (!newUser) {
        throw ApiError.BadRequest(`Пользователя с email ${email} не существует`);
      }
      const isEqual = await bcrypt.compare(password, newUser.password);
      if (!isEqual) {
        throw ApiError.BadRequest('Неправильный пароль');
      }
      delete newUser.password;
      delete newUser.activateLink;
      const tokenObject = await tokenService.createNewTokens({
        id: newUser.id,
        nickName: newUser.nickName,
        email: newUser.email,
        role: newUser.role
      });
      return { newUser, tokenObject };
    } catch (e) {
      return e;
    }
  }

  async logout(refreshTokenId) {
    return await tokenQueries.removeToken(refreshTokenId);
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnAuthorization();
    }

    const user = tokenService.validateToken(refreshToken, true);
    const refreshTokenFromDB = tokenQueries.findByToken(refreshToken);
    if (!user || !refreshTokenFromDB) {
      throw ApiError.UnAuthorization();
    }

    return await tokenService.createNewTokens(user, refreshTokenFromDB.id);
  }

  async edit(id, updatedUser) {
    return await userQueries.updateUser(id, updatedUser);
  }

  async activate(link) {
    try {
      const user = await userQueries.findOneByActivateLink(link);
      if (!user) {
        throw ApiError.BadRequest('Пользователь не найден');
      }
      await userQueries.updateUser(user.userId, { isActivate: true });
    } catch (e) {
      return ApiError.BadRequest('Активация не прошла');
    }
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
    //TODO Удалить UserInfo, относящееся к Users
    //TODO Удалить Users
    id;
  }
}

export default new UserService();
