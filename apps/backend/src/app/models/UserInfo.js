import {DataTypes, INTEGER} from 'sequelize';
import {sequelize} from "./index";

export const UserInfo = sequelize.define('UserInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    role: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "user",
    },
    isBaned: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "false",
    },
    channelsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {}
);
