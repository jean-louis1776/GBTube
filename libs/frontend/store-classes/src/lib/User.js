import { ChannelGroup } from "./ChannelGroup";

export const LIKE = 'like';
export const DISLIKE = 'dislike';
export const UNGRADED = 'ungraded';

export class User {
  //TODO вспомнить зачем оно нужно
  #subscribers = new Set();
  #subscriptions = new Set();
  #id = '';
  #birthDay = new Date;
  #email = '';
  #nicName = '';
  #firstName = '';
  #lastName = '';
  #createDate = new Date();
  /**
   * @param {{id: string, nicName: string, email: string, createDate: Date}} personalData
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


        const { id, email, nicName, createDate } = personalData;
        this.#id = id;
        this.#email = email;
        this.#nicName = nicName;
        this.#createDate = createDate;
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
      this.#subscribers.add(subscriberId);
    }
  /**
   * @returns {Date}
   */
  getCreateDate() {
    return this.#createDate;
  }
  /**
   * @returns {string}
   */
    getEmail() {
        return this.#email;
    }
  /**
   * @returns {Date}
   */
  getBirthDay() {
      return this.#birthDay;
    }
  /**
   * @returns {string}
   */
  getFirstName() {
      return this.#firstName;
    }

  /**
   * @returns {string}
   */
  getLastName() {
      return this.#lastName;
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
   * @returns {string}
   */
  getId() {
      return this.#id;
    }
  /**
   * @returns {string}
   */
  getName() {
      return this.#nicName;
    }
  /**
   * @returns {Set<string>}
   */
  getSubscribers() {
      return this.#subscribers;
    }
  /**
   * @returns {number}
   */
  getSubscribersCount() {
      return this.#subscribers.size;
    }
  /**
   * @returns {Set<string>}
   */
  getSubscriptions() {
        return this.#subscriptions;
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
      return this.#subscriptions.has(userId);
    }
  /**
   * @param {Date} birthDay
   */
  setBirthDay(birthDay) {
      this.#birthDay = birthDay;
    }
  /**
   * @param {string} firstName
   */
  setFirstName(firstName) {
      this.#firstName = firstName;
    }
  /**
   * @param {string} lastName
   */
  setLastName(lastName) {
    this.#lastName = lastName;
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
        this.#subscriptions.add(userId);
    }
  /**
   * @param {string} userId
   */
  unsubscribe(userId) {
        this.#subscriptions.delete(userId);
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
