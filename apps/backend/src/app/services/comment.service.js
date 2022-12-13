import { commentQueries } from '../queries/CommentQueries';
import { userQueries } from '../queries/UserQueries';

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
      const gCommentById = await commentQueries.getCommentById(id);
      gCommentById.nickName = gCommentById.User.nickName;
      delete gCommentById.User;
      return gCommentById;
    } catch (e) {
      console.log(e.message);
      throw(e);
    }
  }

  async getAllCommentsVideo(query) {
    try {
      const {video_id, user_id} = query;
      const getAllCommentsVideo = await commentQueries.getAllCommentsVideo(video_id);
      await Promise.all(getAllCommentsVideo.map(async (value) => {
        const isGrade = await commentQueries.getGrade(user_id, value.id);
        if (isGrade === true) value.grade = 'like';
        if (isGrade === false) value.grade = 'dislike';
        if (isGrade === undefined) value.grade = '';
        value.nickName = value.User.nickName;
        delete value.User;
      }));
      return getAllCommentsVideo;
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
