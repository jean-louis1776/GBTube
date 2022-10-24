import {DataTypes} from 'sequelize';
import {sequelize} from "../dbConfig/db";


export const UserInfo = sequelize.define('UserInfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    role: {
      type: DataTypes.CHAR,
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
      defaultValue: 0,
    },
  }, {
    timestamps: true,
    createdAt: 'createdTimestamp',
    updatedAt: 'updateTimestamp',
  }
);
