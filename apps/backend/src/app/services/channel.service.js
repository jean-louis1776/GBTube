import { ApiError } from '../errors/apiError';
import { channelQueries } from '../queries/ChannelQueries';

class ChannelService {
  async create(userId, title, description) {
    try {
      if (!userId) {
        throw ApiError.BadRequest('Не указан владелец канала');
      }
      if(!title) {
        throw ApiError.BadRequest('Не указано название канала');
      }
      return await channelQueries.createChannel(userId, title, description);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }
}

export default new ChannelService();
