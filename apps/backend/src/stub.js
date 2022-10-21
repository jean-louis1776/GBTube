//! ЭТО ФАЙЛ-ЗАГЛУШКА. ЖДУ БАЗУ ДАННЫХ

// interface Users {
//   id: number;
//   nickName: string;
// }
//
// interface UserInfo {
//   userId: number;
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   password: string;
//   role: string;
//   isBanned: boolean;
//   channelsCount: number;
// }
//
// interface Tokens {
//   id: number;
//   userId: number;
//   token: string;
// }

const getId = (arr) => {
  let id = arr.length + 1;
  let find;
  do {
    find = false;
    for (const el of arr) {
      if (el.id === id) {
        find = true;
        id++;
        break;
      }
    }
  } while (find);
  return id;
}

class UserModel {
  userList = [];

  create(nickName) {
    const user = { id: getId(this.userList), nickName }
    this.userList.push(user);
    // console.log(this.userList);
    return user;
  }

  findOneById(id) {
    return this.userList.find((user) => user.id === id);
  }

  findOneByName(nickName) {
    return this.userList.find((user) => user.nickName === nickName);
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

class UserInfoModel {
  userInfoList = [];

  create(userId, email, password, role) {
    const userInfo = {
      userId,
      email,
      password,
      role,
      isBanned: false,
      channelsCount: 0
    };
    this.userInfoList.push(userInfo);
    // console.log(this.userInfoList);
    return userInfo;
  }

  findOneById(userId) {
    return this.userInfoList.find((el) => el.userId === userId);
  }

  delete(id) {
    const findIndex = this.userInfoList.findIndex(el => el.userId === id);
    if (findIndex === -1) return false;
    this.userInfoList.splice(findIndex, 1);
    return true;
  }
}

class TokenModel {
  tokenList = [];

  create(userId, token) {
    const newToken = { id: getId(this.tokenList), userId, token };
    this.tokenList.push(newToken);
    // console.log(this.tokenList);
    return newToken;
  }

  update(token, id) {
    const findIndex = this.tokenList.findIndex((tokenElement) => tokenElement.id === id);
    this.tokenList[findIndex].token = token;
    // console.log(this.tokenList[findIndex].token);
    return this.tokenList[findIndex].token;
  }

  findOneByToken(token) {
    return this.tokenList.find((tokenElement) => tokenElement.token === token);
  }

  destroy(id) {
    const findIndex = this.tokenList.findIndex((token) => token.id === id);
    if (findIndex === -1) return false;
    this.tokenList.splice(findIndex, 1);
    console.log('tokenList = ', this.tokenList);
    return true;
  }

  deleteAllByUserId(userId) {
    this.tokenList = this.tokenList.filter(el => el.userId !== userId);
  }
}

export const userModel = new UserModel(), tokenModel = new TokenModel(), userInfoModel = new UserInfoModel();
