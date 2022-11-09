import { BOOLEAN, DataTypes } from 'sequelize';
import { sequelize } from "../dbConfig/db";
import { bool } from "prop-types";


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
    birthDay: {
      type: DataTypes.DATE,
    },
    avatar: {
      type: DataTypes.STRING,
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
    activateLink: {
      type: DataTypes.CHAR,
    },
    isActivate: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "false",
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
  },
);
