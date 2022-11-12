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

  async edit(req, res, next) {
    try {
      const { updatingChannel, idList } = req.body;
      const [userId, channelId] = idList.split(';');
      console.log('userId = ', userId);
      console.log('channelId = ', channelId);
      return res.json(await channelService.edit(+channelId, +userId, updatingChannel));
    } catch (e) {
      next(e);
    }
  }

}

export default new ChannelController();
