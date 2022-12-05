import { commentQueries } from '../queries/CommentQueries';

class CommentService {

  async create(idList, userId, description) {
    try {
      const videoId = idList.split('_')[3];
      return commentQueries.createComment(idList, videoId, userId, description);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async edit(idList, description) {
    try {
      const id = idList.split('_')[4];
      return commentQueries.updateComment(id, description);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async remove(id) {
    try {
      return commentQueries.deleteComment(id);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getOne(id) {
    try {
      return commentQueries.getCommentById(id);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAllCommentsVideo(videoId) {
    try {
      return commentQueries.getAllCommentsVideo(videoId);
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async like(commentId, userId) {
    try {
      return commentQueries.like(commentId, userId);
    } catch (e) {
      throw e;
    }
  }

  async dislike(commentId, userId) {
    try {
      return commentQueries.dislike(commentId, userId);
    } catch (e) {
      throw e;
    }
  }

}

export default new CommentService();
