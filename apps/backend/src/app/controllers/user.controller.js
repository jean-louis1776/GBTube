import * as dotenv from 'dotenv';

import userService from '../services/user.service.js'

dotenv.config();

class UserController {
  constructor() {
    this.MAX_AGE = process.env.REFRESH_LIVE_IN_DAYS * 24 * 60 * 60 * 1000;
  }

  createCookies(res, tokensObject) {
    res.cookie('refreshToken', tokensObject.tokens.refreshToken, {maxAge: this.MAX_AGE, httpOnly: true});
    res.cookie('refreshTokenId', tokensObject.refreshTokenId, {maxAge: this.MAX_AGE, httpOnly: true});
    return res.json(tokensObject.tokens);
  }

  async create(req, res, next) {
    try {
      const { nickName, email, password, role } = req.body;
      const tokensObject = await userService.registration(nickName, email, password, role);
      return this.createCookies(res, tokensObject);
    } catch(e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { nickName, password } = req.body;
      const tokensObject = await userService.login(nickName, password);
      return this.createCookies(res, tokensObject);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      await userService.logout(req.cookies.refreshTokenId);
      res.clearCookie('refreshToken');
      res.clearCookie('refreshTokenId');
      return res.json('Logout is success')
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const tokenObject = await userService.refresh(req.cookies.refreshToken);
      return this.createCookies(res, tokenObject);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
