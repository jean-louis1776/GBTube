import { User } from "../models/Users";
import { UserInfo } from "../models/UserInfo";
import { ApiError } from "../errors/apiError";

class UserQueries {
  async createUser(nickName, email, password, activateLink) {
    try {
      if (await User.findOne({where: {nickName}})) {
        throw ApiError.BadRequest(`Пользователь с именем ${nickName} уже существует`);
      }
      if (await UserInfo.findOne({where: {email}})) {
        throw ApiError.BadRequest(`Пользователь с email ${email} уже существует`);
      }
      const userId = (await User.create({nickName}).id);
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
    return User.findOne(
      {
        where: {id},
        include: [
          {
            model: UserInfo,
          },
        ],
      },
    );
  }

  /**
   * Поиск пользователя по nickName
   * @param nickName - nickName пользователя
   * @returns {Object}
   */
  async findOneByName(nickName) {
    return User.findOne(
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
    );
  }

  async findOneByEmail(email) {
    try {
      const result = (await User.findOne({include: [{model: UserInfo, where: {email}}]})).dataValues;
      const user = {
        ...result.UserInfo.dataValues,
        id: result.id,
        nickName: result.nickName
      };
      delete user.userId;
      delete user.updateTimestamp;
      return user;
    } catch (e) {
      console.log(e);
    }
  }

  async findOneByActivateLink(activateLink) {
    const result = await UserInfo.findOne({where: {activateLink}});
    return result.dataValues;
  }

/**
   * Поиск всех пользователей
   * @returns {Object[]}
   */
  async findAllUsers() {
    return await User.findAll(
      {
        include: [
          {
            model: UserInfo,
          },
        ],
      },
    );
  }

  async updateUser(id, data) {
    try {
      if (data.nickName) {
        await User.update({nickName: data.nickName}, {where: {id}});
        delete data.nickName;
      }
      let count = 0;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (let key in data) count++;
      if (count > 0) {
        await UserInfo.update({...data}, {where: {userId: id}});
      }
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
    return await User.destroy({
      where: {
        id: id,
      },
    });
  }
}

export const userQueries = new UserQueries();
