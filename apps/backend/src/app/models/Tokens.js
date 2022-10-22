import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const Token = sequelize.define('Token', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userID: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    token: {
      type: DataTypes.CHAR,
    },
  }, {}
);
