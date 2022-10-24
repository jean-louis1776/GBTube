import { ChannelGroup } from "./ChannelGroup";

export const LIKE = 'like';
export const DISLIKE = 'dislike';
export const UNGRADED = 'ungraded';

export class User {
  /**
   * @param {{id: number, name: string, email: string, createDate: Date}} personalData
   */
    constructor(personalData) {
        this.gradedUsersComments = {
            liked: new Set(),
            disliked: new Set(),
        };
        this.gradedUsersVideos = {
            liked: new Set(),
            disliked: new Set(),
        };
        //TODO вспомнить зачем оно нужно
        this.subscribers = new Set();
        this.subscriptions = new Set();
        const { id, email, name, createDate } = personalData;
        this.id = id;
        this.email = email;
        this.name = name;
        this.createDate = createDate;
    }
  /**
   * @param {string} commentId
   */
  addCommentDisliked(commentId) {
      this.gradedUsersVideos.disliked.add(commentId);
    }
  /**
   * @param {string} commentId
   */
  addCommentLiked(commentId) {
      this.gradedUsersVideos.liked.add(commentId);
    }
  /**
   * @param {string} videoId
   */
  addVideoDisliked(videoId) {
        this.gradedUsersVideos.disliked.add(videoId);
    }
  /**
   * @param {string} videoId
   */
  addVideoLiked(videoId) {
      this.gradedUsersVideos.liked.add(videoId);
    }
  /**
   * @param {string} subscriberId
   */
  addSubscriber(subscriberId) {
      this.subscribers.add(subscriberId);
    }
  /**
   * @returns {Date}
   */
  getCreateDate() {
    return this.createDate;
  }
  /**
   * @returns {string}
   */
    getEmail() {
        return this.email;
    }
  /**
   * @param {Map<string, ChannelGroup>} channelGroup
   */
  getVideosViewCount(channelGroup) {
    const videoViewCount = new Map();
        channelGroup.forEach((channel) => {
            channel.getChildren().forEach((playList) => {
              // @ts-ignore
                playList.getChildren().forEach((video) => {
                    videoViewCount.set(video.getId(), video.getViewingCount());
                });
            });
        });
        return videoViewCount;
    }
//TODO Доработать методы выборки
  /**
   * @param {Map<string, ChannelGroup>} channelGroup
   */
  getCommentsCount(channelGroup) {
        const commentCount = new Map();
        let counter = 0;
        channelGroup.forEach((channel) => {
            channel.getChildren().forEach((playList) => {
              // @ts-ignore
                playList.getChildren().forEach((video) => {
                    const videoId = video.getId();
                    video.getChildren().forEach((/** @type {{ getChildren: () => any[]; }} */ masterComment) => {
                        counter += 1;
                        masterComment.getChildren().forEach(() => {
                            counter += 1;
                        });
                    });
                    commentCount.set(videoId, counter);
                    counter = 0;
                });
            });
        });
        return commentCount;
    }

  /**
   * @param {Map<string, ChannelGroup>} channelGroup
   */
  getGradedOwnVideosCount(channelGroup) {
        const videoGradeCount = new Map();
        channelGroup.forEach((channel) => {
            channel.getChildren().forEach((playList) => {
              // @ts-ignore
                playList.getChildren().forEach((video) => {
                    videoGradeCount.set(video.getId(), video.getGrades());
                });
            });
        });
        return videoGradeCount;
    }
  /**
   * @returns {number}
   */
  getId() {
      return this.id;
    }
  /**
   * @returns {string}
   */
  getName() {
      return this.name;
    }
  /**
   * @returns {Set<string>}
   */
  getSubscribers() {
      return this.subscribers;
    }
  /**
   * @returns {number}
   */
  getSubscribersCount() {
      return this.subscribers.size;
    }
  /**
   * @returns {Set<string>}
   */
  getSubscriptions() {
        return this.subscriptions;
    }
  /**
   * @param {string} commentId
   * @returns {string}
   */
  getCommentGrade(commentId) {
      if (this.gradedUsersComments.disliked.has(commentId)) {
          return DISLIKE;
      }
      if (this.gradedUsersComments.liked.has(commentId)) {
          return LIKE;
      }
      return UNGRADED;
    }
  /**
   * @param {string} videoId
   * @returns {string}
   */
  getVideoGrade(videoId) {
      if (this.gradedUsersVideos.disliked.has(videoId)) {
          return DISLIKE;
      }
      if (this.gradedUsersVideos.liked.has(videoId)) {
          return LIKE;
      }
      return UNGRADED;
  }
  /**
   * @param {string} userId
   * @returns {boolean}
   */
  isSubscribed(userId) {
      return this.subscriptions.has(userId);
    }
  /**
   * @param {string} email
   */
  setEmail(email) {
    this.email = email;
  }
  /**
   * @param {string} name
   */
  setName(name) {
    this.name = name;
  }
  /**
   * @param {string} userId
   */
  subscribe(userId) {
        this.subscriptions.add(userId);
    }

  /**
   * @param {string} userId
   */
  unsubscribe(userId) {
        this.subscriptions.delete(userId);
    }
    //Moderator methods
    //TODO Подумать нужны ли тут методы модератора и админа
    toggleBanUser() {

    }
    deleteUserComment() {

    }
    deleteUserVideo() {

    }
    //Admin methods
    dropUserPassword() {

    }
    deleteUser() {

    }
    changeUserRole() {

    }
}
