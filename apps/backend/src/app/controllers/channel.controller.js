import channelService from '../services/channel.service';

class ChannelController {
  async create(req, res, next) {
    try {
      console.log(req.body);
      const { title, description, idList } = req.body;
      const userId = idList.split(';')[0];
      return res.json(await channelService.create(userId, title, description));
    } catch (e) {
      next(e);
    }
  }

  async edit(req, res, next) {
    try {
      const { updatingChannel, idList } = req.body;
      const [userId, channelId] = idList.split(';');
      return res.json(await channelService.edit(+channelId, +userId, updatingChannel));
    } catch (e) {
      next(e);
    }
  }

  async subscribe(req, res, next) {
    try {
      const { id, userId } = req.body;
      const isSubscribe = await channelService.subscribe(id, userId);
      return res.json({ isSubscribe });
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      return res.json(await channelService.remove(req.params.id));
    } catch(e) {
      next(e)
    }
  }

  async getOne(req, res, next) {
    try {
      return res.json(await channelService.getOne(+req.params.id));
    } catch (e) {
      next(e);
    }
  }

  async getAllChannelsOfUser(req, res, next) {
    try {
      return res.json(await channelService.getAllOfUser(+req.params.user_id));
    } catch (e) {
      next(e);
    }
  }
}

export default new ChannelController();
