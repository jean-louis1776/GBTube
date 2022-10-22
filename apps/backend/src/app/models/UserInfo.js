import {DataTypes, INTEGER} from 'sequelize';
import {sequelize} from "./index";

export const UserInfo = sequelize.define('UserInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userID: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.CHAR,
    },
    password: {
      type: DataTypes.CHAR,
    },
    role: {
      type: DataTypes.TINYINT,
      defaultValue: 'user',
    },
    isBaned: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    channelsCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {}
);
