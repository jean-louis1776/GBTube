import { validateError } from '../errors/validateError';
import channelService from '../services/channel.service';

class ChannelController {
  async create(req, res, next) {
    try {
      validateError(req);
      const { title, description, idList } = req.body;
      const userId = idList.split('_')[0];
      return res.json(await channelService.create(+userId, title, description));
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      validateError(req);
      const { updatingObject, idList } = req.body;
      const [userId, channelId] = idList.split('_');
      return res.json(await channelService.edit(+channelId, +userId, updatingObject));
    } catch (e) {
      next(e);
    }
  }

  async subscribe(req, res, next) {
    try {
      validateError(req);
      const { id, userId } = req.body;
      const isSubscribe = await channelService.subscribe(id, userId);
      return res.json( isSubscribe );
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      validateError(req);
      return res.status(204).json(await channelService.remove(+req.params.id));
    } catch(e) {
      next(e)
    }
  }

  async getOne(req, res, next) {
    try {
      validateError(req);
       return res.json(await channelService.getOne(req.query));
    } catch (e) {
      next(e);
    }
  }

  async getAllChannelsOfUser(req, res, next) {
    try {
      validateError(req);
      console.log('USER_ID = ', req.params.user_id);
      const channels = await channelService.getAllOfUser(+req.params.user_id);
      if (!channels) return res.status(204).json('У данного пользователя нет каналов');
      return res.json(await channelService.getAllOfUser(+req.params.user_id));
    } catch (e) {
      next(e);
    }
  }

  async getSubscribedList(req, res, next) {
    try {
      validateError(req);
      const channelList = await channelService.getSubscribedList(req.params.user_id);
      let statusCode = 200;
      if (!channelList.length) statusCode = 204;
      return res.status(statusCode).json(channelList);
    } catch (e) {
      next(e);
    }
  }
}

export default new ChannelController();
