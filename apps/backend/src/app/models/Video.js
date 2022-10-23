import {DataTypes} from 'sequelize';
import {sequelize} from "./index";

export const Video = sequelize.define('Video', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    path: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
    },
    categoty: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fullDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dislikesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    createdAt: 'createdTimestamp',
    updatedAt: 'updateTimestamp',
  }
);
