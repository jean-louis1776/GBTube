import * as dotenv from 'dotenv';

import userService from '../services/user.service.js';
import { ApiError } from '../errors/apiError';
import { validateError } from '../errors/validateError.js';

dotenv.config();

class UserController {
  constructor() {
    this.MAX_AGE = process.env.REFRESH_LIVE_IN_DAYS * 24 * 60 * 60 * 1000;
  }
  createCookies(res, userResponse) {
    console.log(userResponse);
    res.cookie('refreshToken', userResponse.refreshToken, {maxAge: this.MAX_AGE, httpOnly: true});
    res.cookie('refreshTokenId', userResponse.refreshTokenId, {maxAge: this.MAX_AGE, httpOnly: true});
  }

  async create(req, res, next) {
    try {
      validateError(req);
      const { nickName, email, password } = req.body;
      const userResponse = await userService.registration(nickName, email, password);
      this.createCookies(res, userResponse);
      return res.status(201).json({ id: userResponse.id, accessToken: userResponse.accessToken });
    } catch(e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      validateError(req);
      const { email, password } = req.body;
      const userResponse = await userService.login(email, password);
      this.createCookies(res, userResponse.tokenObject);
      return res.json({ ...userResponse.newUser, accessToken: userResponse.tokenObject.accessToken });
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      validateError(req);
      await userService.logout(+req.cookies.refreshTokenId);
      res.clearCookie('refreshToken');
      res.clearCookie('refreshTokenId');
      return res.json({ message: 'Logout is success' });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      validateError(req);
      const tokenObject = await userService.refresh(req.cookies.refreshToken);
      this.createCookies(res, tokenObject);
      return res.json(tokenObject.accessToken);
    } catch (e) {
      next(e);
    }
  }

  async changePassword(req, res, next) {
    try {
      validateError(req);
      const { id, oldPassword, newPassword } = req.body;
      return res.json(await userService.changePassword(id, oldPassword, newPassword, +req.cookies.refreshTokenId));
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      validateError(req);
      await userService.remove(+req.params.id);
      return res.status(204).json({ message: 'User has been removed' });
    } catch (e) {
      next(e);
    }
  }

  async getOneById(req, res, next) {
    try {
      validateError(req);
      return res.json(await userService.getOneById(+req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res) {
    return res.json(await userService.getAll());
  }

  async activate(req, res, next) {
    try {
      validateError(req);
      await userService.activate(req.params.link);
      return res.redirect(`${process.env.CLIENT_URL}/emailConfirm`);
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      validateError(req);
      return res.json(await userService.edit(req.params.id, req.body.updatingUser));
    } catch (e) {
      next(e);
    }
  }

  async uploadAvatar(req, res, next) {
    try {
      validateError(req);
      return res.json(await userService.uploadAvatar(+req.params.id, req.files));
    } catch (e) {
      next(e);
    }
  }

  async downloadAvatar(req, res, next) {
    try {
      validateError(req);
      const stream = await userService.downloadAvatar(+req.params.id);
      if (!stream) return res.status(204).json({ message: 'У данного пользователя нет аватара' });
      stream.pipe(res);
    } catch (e) {
      next(e);
    }
  }

  async removeAvatar(req, res, next) {
    try {
      validateError(req);
      await userService.removeAvatar(+req.params.id);
      return res.status(204).json({ message: 'Avatar has been removed'});
    } catch (e) {
      next(e);
    }
  }

  async checkUnique(req, res, next) {
    try {
      validateError(req);
      const { nickName, email } = req.query;
      if (!nickName && !email) {
        next(ApiError.BadRequest('Отсутствует объект проверки на уникальность!!!'));
      }
      let uniqueNickName = true, uniqueEmail = true;
      const message = [];
      if (nickName) uniqueNickName = await userService.isNickNameUnique(nickName);
      if (email) uniqueEmail = await userService.isEmailUnique(email);
      if (!uniqueNickName) message.push('nickName не является уникальным');
      if (!uniqueEmail) message.push('email не является уникальным');
      if (!uniqueNickName || !uniqueEmail) {
        throw ApiError.Conflict(message);
      }
      res.status(204).json({unique: true});
    } catch (e) {
      next(e);
    }
  }

  async getNickNameById(req, res, next) {
    try {
      validateError(req);
      return res.json(await userService.getNickNameById(+req.params.id));
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
