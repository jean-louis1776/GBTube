/* eslint-disable @typescript-eslint/no-empty-function */
//! ЭТО ЗАГЛУШКА. ЖДУ БАЗУ ДАННЫХ
class UserModel {
  async create() {}
  async findOne() {}
}

class TokenModel {
  async create() {}
  async update() {}
  async findOne() {}
  async destroy() {}
}

export const userModel = new UserModel(), tokenModel = new TokenModel();
