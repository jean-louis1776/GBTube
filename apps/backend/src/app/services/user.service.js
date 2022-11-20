import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import path from 'path';
import fs from 'fs-extra';

import { ApiError } from '../errors/apiError.js';
import tokenService from './token.service.js';
import mailService from './mail.service.js';
import { userQueries } from '../queries/UserQueries.js';
import { tokenQueries } from '../queries/TokenQueries.js';
import { imageExtensions } from '../util/videoImageExtensions.js';
import { ftpServer } from '../../main.js';

class UserService {
  async getAll() {
    return userQueries.findAllUsers();
  }

  async getOneById(id) {
    const user = await userQueries.findOneById(id);
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с id ${id} не найден`);
    }
    delete user.activateLink;
    delete user.password;
    return user;
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
      console.log(e.message);
      throw e;
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
      console.log(e.message);
      throw e;
    }
  }

  async logout(refreshTokenId) {
    try {
      const result = await tokenQueries.removeToken(refreshTokenId);
      if (!result) {
        throw ApiError.InternalServerError('Error! Can\'t logout');
      }
      return result;
    } catch (e) {
      console.log(e.message);
    }
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnAuthorization();
    }

    const user = tokenService.validateToken(refreshToken, true);
    const refreshTokenFromDB = await tokenQueries.findByToken(refreshToken);
    const userFromDB = await userQueries.findOneById(user.id);
    if (!user || !refreshTokenFromDB || !userFromDB) {
      throw ApiError.UnAuthorization();
    }

    return await tokenService.createNewTokens(
      {
        id: userFromDB.id,
        nickName: userFromDB.nickName,
        email: userFromDB.email,
        role: userFromDB.role
      },
      refreshTokenFromDB.id
    );
  }

  async changePassword(id, oldPassword, newPassword, refreshTokenId) {
    try {
      const DBPassword = await userQueries.getPasswordByUserId(id);
      if (!(await bcrypt.compare(oldPassword, DBPassword))) {
        throw ApiError.BadRequest('Неправильный пароль');
      }
      newPassword = await bcrypt.hash(newPassword, 5);
      if (!(await userQueries.updateUser(id, { password: newPassword }))) {
        throw ApiError.InternalServerError('Не удалось сменить пароль');
      }
      // Далее разлогиниваем текущего User на других устройствах
      await tokenQueries.removeOtherDevicesTokens(id, refreshTokenId);
      return { message: 'Замена пароля прошла успешно' };
    } catch (e) {
      console.log(e.message);
      throw(e);
    }

  }

  async edit(id, updatingUser) {
    return await userQueries.updateUser(id, updatingUser);
  }

  async activate(link) {
    try {
      const user = await userQueries.findOneByActivateLink(link);
      if (!user) {
        throw ApiError.BadRequest('Пользователь не найден');
      }
      await userQueries.updateUser(user.userId, { isActivate: true });
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async remove(id) {
    //TODO Удалить все Answers написанные User'ом
    // Удалить все Comments написанные User'ом
    // Удалить все подписки сделанные User'ом
    // Удалить таблицу лайков-дизлайков для каждого Answers, относящиеся к Comments, относящиеся к Videos, относящиеся к Channels, относящиеся к Users
    // Удалить все Answers, относящиеся к Comments, относящиеся к Videos, относящиеся к Channels, относящиеся к Users
    // Удалить таблицу лайков-дизлайков для каждого Comments, относящиеся к Videos, относящиеся к Channels, относящиеся к Users
    // Удалить все Comments, относящиеся к Videos, относящиеся к Channels, относящиеся к Users
    // Удалить все Videos, относящиеся к Channels, относящиеся к Users
    // Удалить все подписки, относящиеся к Channels, относящиеся к Users
    // Удалить все Channels, относящиеся к Users
    if (!userQueries.deleteUser(id)) {                  // удаляет Users, UserInfos, Tokens
      throw ApiError.InternalServerError('Can\'t remove user');
    }
    return;
  }

  async uploadAvatar(id, files) {
    try {
      if (!files) {
        throw ApiError.BadRequest('Отсутствует файл аватара для загрузки');
      }
      const file = files.avatarFile;
      const extension = path.extname(file.name);

      if (!imageExtensions.includes(extension)) {
        throw ApiError.UnProcessableEntity('Формат файла не соответствует видеоформату');
      }

      const oldAvatar = await userQueries.getUserAvatarById(id);              // Проверяем нет ли у юзера аватарки
      if (oldAvatar) {
        await ftpServer.delete(oldAvatar);                                       // Если есть - удаляем
      }

      const hashName = uuidV4() + extension;
      await ftpServer.put(file.tempFilePath, hashName);                          // Сохраняем аватарку на ftp-сервер
      const result = await userQueries.updateUser(id, { avatar: hashName });     //Прописываем имя файла сохраненной аватарки в userInfos
      await fs.remove(path.resolve(path.resolve(), 'tmp'), err => { if (err) console.log(err); });
      return result;
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async downloadAvatar(id) {
    try {
      const avatarName = await userQueries.getUserAvatarById(id);
      if (!avatarName) {
        throw ApiError.InternalServerError('У данного пользователя нет аватара');
      }
      return await ftpServer.get(avatarName);
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  }

  async removeAvatar(id) {
    try {
      const avatarName = await userQueries.getUserAvatarById(id);
      if (!avatarName) {
        throw ApiError.InternalServerError('У данного пользователя нет аватара');
      }
      await ftpServer.delete(avatarName);
      return await userQueries.updateUser(id, {avatar: null});
    } catch (e) {
      console.log(e.message);
      throw e;
    }

  }

  async isNickNameUnique(nickName) {
    return await userQueries.isNickNameUnique(nickName);
  }

  async isEmailUnique(email) {
    return await userQueries.isEmailUnique(email);
  }

}

export default new UserService();
