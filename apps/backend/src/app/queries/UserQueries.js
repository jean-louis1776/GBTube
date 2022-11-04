import { User } from "../models/Users";
import { UserInfo } from "../models/UserInfo";
import { where } from "sequelize";

class UserQueries {

  /**
   * Создание пользователя
   * @param {string} nickName - nickName пользователя
   * @param {Object} userInfo - информация о пользователе
   * @returns {boolean}
   */
  async createUser(nickName, userInfo) {
    if (this.checkUser(nickName)) {
      const cUser = await User.create({
        nickName: nickName,
      });
      await UserInfo.create({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        userId: cUser.id,
      });
      return true;
    } else return false;
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
        where: {
          id: id,
        },
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

  /**
   * Обновление таблицы пользователя
   * @param {Object} data - обьект с данными для изменения информации
   * @returns {boolean}
   */
  async updateUser(data) {
    return await User.update(
      {
        nickName: data.nickName,
      },
      {
        where: {
          Id: data.Id,
        },
      },
    );
  }

  /**
   * Обновление таблицы информации о пользователе
   * @param {Object} data - обьект с данными для изменения информации
   * @returns {boolean}
   */
  async updateUserInfo(data) {
    return await UserInfo.update(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: data.role,
        isBaned: data.isBaned,
        channelsCount: data.channelsCount,
        activateLink: data.activateLink,
        isActivate: data.isActivate,
        birthDay: data.birthDay,
      }, {
        where: {
          userId: data.id
        },
      },
    )
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
