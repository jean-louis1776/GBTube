import { User } from "../models/Users";
import { UserInfo } from "../models/UserInfo";
import { Token } from "../models/Tokens";
import { ApiError } from "../errors/apiError";

class UserQueries {
  parsingQueryModel(modelFromQuery) {
    modelFromQuery = JSON.parse(JSON.stringify(modelFromQuery));
    const user = {
      ...modelFromQuery.UserInfo,
      id: modelFromQuery.id,
      nickName: modelFromQuery.nickName
    };
    delete user.userId;
    delete user.updateTimestamp;
    return user;
  }

  async createUser(nickName, email, password, activateLink) {
    try {
      if (await User.findOne({where: {nickName}})) {
        throw ApiError.BadRequest(`Пользователь с именем ${nickName} уже существует`);
      }
      if (await UserInfo.findOne({where: {email}})) {
        throw ApiError.BadRequest(`Пользователь с email ${email} уже существует`);
      }
      const userId = (await User.create({nickName})).dataValues.id;
      console.log('USERID = ', userId);
      await UserInfo.create({email, password, activateLink, userId: userId});
      return userId;
    } catch (e) {
      return ApiError.BadRequest(e.message);
    }
  }

  /**
   * Проверка на существование пользователя
   * @param {string} nickName - nickName пользователя
   * @returns {boolean}
   */
  async checkUser(nickName) {
    return !!(await this.findOneByName(nickName));
  }

  /**
   * Поиск пользователя по id
   * @param {number} id - id пользователя
   * @returns {Object}
   */
  async findOneById(id) {
    const result = await User.findOne(
      {
        where: {id},
        include: [
          {
            model: UserInfo,
          },
        ],
      },
    );
    return this.parsingQueryModel(result);
  }

  /**
   * Поиск пользователя по nickName
   * @param nickName - nickName пользователя
   * @returns {Object}
   */
  async findOneByName(nickName) {
    return await (User.findOne(
      {
        where: {
          nickName: nickName,
        },
        include: [
          {
            model: UserInfo,
          },
        ],
      },
    ));
  }

  async findOneByEmail(email) {
    try {
      const result = (await User.findOne({include: [{model: UserInfo, where: {email}}]}));
      return this.parsingQueryModel(result);
    } catch (e) {
      console.log(e);
    }
  }

  async findOneByActivateLink(activateLink) {
    try {
      const result = await UserInfo.findOne({where: {activateLink}});
      return result.dataValues;
    } catch (e) {
      return e;
    }
  }

/**
   * Поиск всех пользователей
   * @returns {Object[]}
   */
  async findAllUsers() {
    try {
      const users = await User.findAll(
        {
          include: [
            {
              model: UserInfo,
            },
          ],
        },
      );
      const result = [];
      for (const user of users) {
        result.push(this.parsingQueryModel(user));
      }
      return result;
    } catch (e) {
      return e;
    }
  }

  async updateUser(id, data) {
    let updateCount = 0;
    try {
      if (data.nickName) {
        updateCount += await User.update({nickName: data.nickName}, {where: {id}});
        delete data.nickName;
      }
      let count = 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (let key in data) count++;
      if (count > 0) {
        updateCount += await UserInfo.update({...data}, {where: {userId: id}});
      }
      return !!updateCount;
    } catch (e) {
      return ApiError.BadRequest(e.message);
    }
  }

  /**
   * Удаление пользователя
   * @param {number} id - id пользователя
   * @returns {boolean}
   */
  async deleteUser(id) {
    try {
      return !!(await User.destroy({
        where: {id},
        include: [{model: UserInfo}, {model: Token}]
      }));
    } catch (e) {
      return false;
    }
  }
}

export const userQueries = new UserQueries();
