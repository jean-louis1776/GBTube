import * as dotenv from 'dotenv';

import userService from '../services/user.service.js'

dotenv.config();

class UserController {
  constructor() {
    this.MAX_AGE = process.env.REFRESH_LIVE_IN_DAYS * 24 * 60 * 60 * 1000;
  }

  createCookies(res, userResponse) {
    res.cookie('refreshToken', userResponse.refreshToken, {maxAge: this.MAX_AGE, httpOnly: true});
    res.cookie('refreshTokenId', userResponse.refreshTokenId, {maxAge: this.MAX_AGE, httpOnly: true});
  }

  async create(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const userResponse = await userService.registration(username, email, password);
      this.createCookies(res, userResponse);
      return res.json({id: userResponse.id, accessToken: userResponse.accessToken});
    } catch(e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
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
      if (await userService.logout(+req.cookies.refreshTokenId)) {
        res.clearCookie('refreshToken');
        res.clearCookie('refreshTokenId');
        return res.status(200).json({ message: 'Logout is success' });
      }
      return res.status(500).json({ message: 'Error! Can\'t logout' });
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const tokenObject = await userService.refresh(req.cookies.refreshToken);
      this.createCookies(res, tokenObject);
      return res.json(tokenObject.accessToken);
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      if (await userService.remove(req.params.id)) return res.status(200).json({ message: 'User has been removed' });
      return res.ststus(500).json({ message: 'Can\'t remove user' });
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res) {
    return res.json(await userService.getAll());
  }

  async activate(req, res, next) {
    try {
      await userService.activate(req.params.link);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
