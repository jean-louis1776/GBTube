import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

// console.log('db', db);
export const User = sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickName: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
    }

  }, {
  // timestamps: true,
  }
);

// export const Token = sequelize.define('Token', {
//   refresh: {type: DataTypes.STRING, allowNull: false}
// });
//
// User.hasOne(Token);
// Token.belongsTo(User);
