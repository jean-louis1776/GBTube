import channelService from '../services/channel.service';

class ChannelController {
  async create(req, res, next) {
    try {
      const { title, description, idList } = req.body;
      const userId = idList.split(';')[0];
      return res.json(await channelService.create(userId, title, description));
    } catch (e) {
      next(e);
    }
  }

  async encodeURIComponent(req, res, next) {
    try {
      const { updatingChannel, idList } = req.body;
      
    } catch (e) {
      next(e);
    }
  }

}

export default new ChannelController();
