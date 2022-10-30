import { User } from "./Users";
import { UserInfo } from "./UserInfo";
import { Token } from "./Tokens";
import { Video } from "./Video";
import { VideoInfo } from "./VideoInfo";
import { Channel } from "./Channel";
import { ChannelInfo } from "./ChannelInfo";
import { ChannelSubscriber } from "./ChannelSubscribers";
import { PlayList } from "./PlayList";
import { Comment } from "./Comment";
import { Answer } from "./Answer";
import { AnswerLike } from "./AnswerLike";
import { CommentLike } from "./CommentLike";
import { VideoLike } from "./VideoLike";


class UserModel {
  userList = [];

  /**
   * @param {string} nickName - nickName пользователя
   * @param {Object} userInfo - информация о пользователе
   * @returns {boolean}
   */
  async createUser(nickName, userInfo) {
    if (this.checkUser(nickName)) {
      const cUser = await User.create({
        nickName: nickName,
      });
      const cUserInfo = await UserInfo.create({
        firstName: userInfo.firstName ? firstName : '',
        lastName: userInfo.lastName ? lastName : '',
        email: userInfo.email,
        password: userInfo.password,
        userId: cUser.id,
      });
      return true;
    } else return false;
  }

  /**
   * @param {string} nickName - nickName пользователя
   * @returns {boolean}
   */
  async checkUser(nickName) {
    return !!(await User.findOne({
      where: {
        nickName: nickName,
      },
    }));
  }

  async findOneById(id) {
    return await User.findAll({
      where: {
        id: id,
      },
    });
  }

  async findOneByName(nickName) {
    return await User.findAll({
      where: {
        nickName: nickName,
      },
    });
  }

  findAll() {
    return this.userList;
  }

  delete(id) {
    const findIndex = this.userList.findIndex(el => el.id === id);
    if (findIndex === -1) return false;
    this.userList.splice(findIndex, 1);
    return true;
  }
}

//
// class UserInfoModel {
//   userInfoList = [];
//
//   create(userId, email, password, role) {
//     const userInfo = {
//       userId,
//       email,
//       password,
//       role,
//       isBanned: false,
//       channelsCount: 0,
//     };
//     this.userInfoList.push(userInfo);
//     // console.log(this.userInfoList);
//     return userInfo;
//   }
//
//   findOneById(userId) {
//     return this.userInfoList.find((el) => el.userId === userId);
//   }
//
//   delete(id) {
//     const findIndex = this.userInfoList.findIndex(el => el.userId === id);
//     if (findIndex === -1) return false;
//     this.userInfoList.splice(findIndex, 1);
//     return true;
//   }
// }
//
// class TokenModel {
//   tokenList = [];
//
//   create(userId, token) {
//     const newToken = {id: getId(this.tokenList), userId, token};
//     this.tokenList.push(newToken);
//     // console.log(this.tokenList);
//     return newToken;
//   }
//
//   update(token, id) {
//     const findIndex = this.tokenList.findIndex((tokenElement) => tokenElement.id === id);
//     this.tokenList[findIndex].token = token;
//     // console.log(this.tokenList[findIndex].token);
//     return this.tokenList[findIndex].token;
//   }
//
//   findOneByToken(token) {
//     return this.tokenList.find((tokenElement) => tokenElement.token === token);
//   }
//
//   destroy(id) {
//     const findIndex = this.tokenList.findIndex((token) => token.id === id);
//     if (findIndex === -1) return false;
//     this.tokenList.splice(findIndex, 1);
//     console.log('tokenList = ', this.tokenList);
//     return true;
//   }
//
//   deleteAllByUserId(userId) {
//     this.tokenList = this.tokenList.filter(el => el.userId !== userId);
//   }
// }

export const userModel = new UserModel(); //, tokenModel = new TokenModel(), userInfoModel = new UserInfoModel();
